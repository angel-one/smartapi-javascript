let WebSocket = require('ws');
const Parser = require('binary-parser').Parser;
let { CONSTANTS, ACTION, MODE, EXCHANGES } = require('../config/constant');

let triggers = {
	connect: [],
	tick: [],
};

let WebSocketV2 = function (params) {
	try {
		let { clientcode, jwttoken, apikey, feedtype } = params;
		let self = this;
		let ws = null;
		let headers = {
			'x-client-code': clientcode,
			Authorization: jwttoken,
			'x-api-key': apikey,
			'x-feed-token': feedtype,
		};
		const url = CONSTANTS?.websocketURL;
		let ping_Interval = CONSTANTS?.Interval;
		let timeStamp;
		let stopInterval;
		let subscribeData = [];
		let reset;
		let open = 1;

		let connected = false; // Add a connection status flag

		this.connect = function () {
			try {
				return new Promise((resolve, reject) => {
					if (
						headers?.['x-client-code'] === null ||
						headers?.['x-feed-token'] === null ||
						headers?.['x-api-key'] === null ||
						headers?.Authorization === null
					) {
						return 'client_code or jwt_token or api_key or feed_token is missing';
					}
					ws = new WebSocket(url, { headers });

					ws.onopen = function onOpen(evt) {
						if (subscribeData.length > 0) {
							let reSubscribe = subscribeData;
							subscribeData = [];
							reSubscribe.map((data) => {
								self.fetchData(data);
							});
						}
						reset = setInterval(function () {
							ws.send('ping');
						}, ping_Interval);
						connected = true;
						resolve(connected);
					};

					ws.onmessage = function (evt) {
						let result = evt.data;
						timeStamp = Math.floor(Date.now() / 1000);
						const buf = Buffer.from(result);
						const receivedData = setResponse(buf, result);
						trigger('tick', [receivedData]);
						resolve(result);
					};

					stopInterval = setInterval(function () {
						let currentTimeStamp = Math.floor(Date.now() / 1000);
						let lastMessageTimeStamp = currentTimeStamp - timeStamp;
						if (lastMessageTimeStamp > 20) {
							if (ws?._readyState === open) {
								ws.close();
							}
							clearInterval(reset);
							clearInterval(stopInterval);
							self.connect();
						}
					}, 5000);

					ws.onerror = function (evt) {
						if (evt?.message?.match(/\d{3}/)?.[0] == 401) {
							throw new Error(evt.message);
						}
						try {
							if (ws?._readyState === open) {
								ws.close();
							}
							clearInterval(reset);
						} catch (error) {
							throw new Error(error);
						}
					};
					ws.onclose = function (evt) { };
				});
			} catch (error) {
				throw new Error(error);
			}
		};

		this.fetchData = function (json_req) {
			subscribeData.push(json_req);
			const { correlationID, action, mode, exchangeType, tokens } = json_req;
			if (action !== ACTION.Subscribe && action !== ACTION.Unsubscribe) {
				throw new Error('Invalid Action value passed');
			}
			if (
				mode !== MODE.LTP &&
				mode !== MODE.Quote &&
				mode !== MODE.SnapQuote &&
				mode !== MODE.Depth
			) {
				throw new Error("Invalid Mode value passed");
			}

			if (
				exchangeType !== EXCHANGES.bse_cm &&
				exchangeType !== EXCHANGES.bse_fo &&
				exchangeType !== EXCHANGES.cde_fo &&
				exchangeType !== EXCHANGES.mcx_fo &&
				exchangeType !== EXCHANGES.ncx_fo &&
				exchangeType !== EXCHANGES.nse_cm &&
				exchangeType !== EXCHANGES.nse_fo
			) {
				throw new Error('Invalid Exchange type passed');
			}

			if (mode === MODE.Depth) {
				if (tokens.length > 50) {
					throw new Error(
						"Quota exceeded: You can subscribe to a maximum of 50 tokens"
					);
				}
				if (mode === MODE.Depth && exchangeType !== EXCHANGES.nse_cm) {
					throw new Error(
						"Invalid exchange type: Please check the exchange type and try again"
					);
				}
			}


			let reqBody = {
				action,
				params: {
					mode,
					tokenList: [
						{
							exchangeType,
							tokens,
						},
					],
				},
			};
			if (correlationID) {
				reqBody.correlationID = correlationID;
			}
			if (ws?._readyState === open) {
				ws.send(JSON.stringify(reqBody));
			}
		};

		this.on = function (e, callback) {
			if (triggers.hasOwnProperty(e)) {
				triggers[e].push(callback);
			}
		};

		this.close = function () {
			clearInterval(stopInterval);
			ws.close();
		};
	} catch (error) {
		throw new Error(error);
	}
};

function trigger(e, args) {
	if (!triggers[e]) return;
	for (var n = 0; n < triggers[e].length; n++) {
		triggers[e][n].apply(triggers[e][n], args ? args : []);
	}
}

function _atos(array) {
	var newarray = [];
	try {
		for (var i = 0; i < array.length; i++) {
			newarray.push(String.fromCharCode(array[i]));
		}
	} catch (e) {
		throw new Error(e);
	}

	let token = JSON.stringify(newarray.join(''));
	return token.replaceAll('\\u0000', '');
}

function LTP(buf) {
	const ltp = new Parser()
		.endianness('little')
		.int8('subscription_mode', { formatter: toNumber })
		.int8('exchange_type', { formatter: toNumber })
		.array('token', {
			type: 'uint8',
			length: 25,
			formatter: _atos,
		})
		.int64('sequence_number', { formatter: toNumber })
		.int64('exchange_timestamp', { formatter: toNumber })
		.int32('last_traded_price', { formatter: toNumber });

	return ltp.parse(buf);
}

function QUOTE(buf) {
	const quote = new Parser()
		.endianness('little')
		.uint8('subscription_mode', { formatter: toNumber, length: 1 })
		.uint8('exchange_type', { formatter: toNumber, length: 1 })
		.array('token', { type: 'int8', length: 25, formatter: _atos })
		.uint64('sequence_number', { formatter: toNumber, length: 8 })
		.uint64('exchange_timestamp', { formatter: toNumber, length: 8 })
		.uint64('last_traded_price', { formatter: toNumber, length: 8 })
		.int64('last_traded_quantity', { formatter: toNumber, length: 8 })
		.int64('avg_traded_price', { formatter: toNumber, length: 8 })
		.int64('vol_traded', { formatter: toNumber, length: 8 })
		.doublele('total_buy_quantity', { formatter: toNumber, length: 8 })
		.doublele('total_sell_quantity', { formatter: toNumber, length: 8 })
		.int64('open_price_day', { formatter: toNumber, length: 8 })
		.int64('high_price_day', { formatter: toNumber, length: 8 })
		.int64('low_price_day', { formatter: toNumber, length: 8 })
		.int64('close_price', {
			formatter: toNumber,
			length: 8,
		});

	return quote.parse(buf);
}

function SNAP_QUOTE(buf) {
	const bestFiveData = new Parser()
		.endianness('little')
		.int16('flag', { formatter: toNumber, length: 2 })
		.int64('quantity', { formatter: toNumber, length: 8 })
		.int64('price', { formatter: toNumber, length: 8 })
		.int16('no_of_orders', { formatter: toNumber, length: 2 });

	const snapQuote = new Parser()
		.endianness('little')
		.uint8('subscription_mode', { formatter: toNumber, length: 1 })
		.uint8('exchange_type', { formatter: toNumber, length: 1 })
		.array('token', { type: 'int8', length: 25, formatter: _atos })
		.uint64('sequence_number', { formatter: toNumber, length: 8 })
		.uint64('exchange_timestamp', { formatter: toNumber, length: 8 })
		.uint64('last_traded_price', { formatter: toNumber, length: 8 })
		.int64('last_traded_quantity', { formatter: toNumber, length: 8 })
		.int64('avg_traded_price', { formatter: toNumber, length: 8 })
		.int64('vol_traded', { formatter: toNumber, length: 8 })
		.doublele('total_buy_quantity', { formatter: toNumber, length: 8 })
		.doublele('total_sell_quantity', { formatter: toNumber, length: 8 })
		.int64('open_price_day', { formatter: toNumber, length: 8 })
		.int64('high_price_day', { formatter: toNumber, length: 8 })
		.int64('low_price_day', { formatter: toNumber, length: 8 })
		.int64('close_price', {
			formatter: toNumber,
			length: 8,
		})
		.int64('last_traded_timestamp', { formatter: toNumber, length: 8 })
		.int64('open_interest', { formatter: toNumber, length: 8 })
		.doublele('open_interest_change', {
			formatter: toNumber,
			length: 8,
		})
		.array('best_5_buy_data', { type: bestFiveData, lengthInBytes: 100 })
		.array('best_5_sell_data', { type: bestFiveData, lengthInBytes: 100 })
		.int64('upper_circuit', { formatter: toNumber, length: 8 })
		.int64('lower_circuit', { formatter: toNumber, length: 8 })
		.int64('fiftytwo_week_high', {
			formatter: toNumber,
			length: 8,
		})
		.int64('fiftytwo_week_low', { formatter: toNumber, length: 8 });

	// let response = snapQuote.parse(buf);
	return snapQuote.parse(buf);
}

function DEPTH(buf) {
	const depthTwenty = new Parser()
		.endianness("little")
		.int32("quantity", { formatter: toNumber, length: 4 })
		.int32("price", { formatter: toNumber, length: 4 })
		.int16("no_of_orders", { formatter: toNumber, length: 2 });

	const depth = new Parser()
		.endianness("little")
		.uint8("subscription_mode", { formatter: toNumber, length: 1 })
		.uint8("exchange_type", { formatter: toNumber, length: 1 })
		.array("token", { type: "int8", length: 25, formatter: _atos })
		.uint64("exchange_timestamp", { formatter: toNumber, length: 8 })
		.int64("packet_received_time", { formatter: toNumber, length: 8 })
		.array("depth_twenty_buy_data", { type: depthTwenty, lengthInBytes: 200 })
		.array("depth_twenty_sell_data", {
			type: depthTwenty,
			lengthInBytes: 200,
		});

	return depth.parse(buf);
}

function toNumber(number) {
	return number.toString();
}

function setResponse(buf, result) {
	const subscription_mode = new Parser().uint8('subscription_mode');

	switch (subscription_mode.parse(buf)?.subscription_mode) {
		case MODE.LTP:
			return LTP(buf);
		case MODE.Quote:
			return QUOTE(buf);
		case MODE.SnapQuote:
			return SNAP_QUOTE(buf);
		case MODE.Depth:
			return DEPTH(buf);
		default:
			return result;
	}
}

module.exports = WebSocketV2;
