'use strict';

let axios = require('axios');
let querystring = require('querystring');
let address = require('address');
let publicIp = require('public-ip');
const https = require('https');
let { API } = require('../config/api');
const { errorLogger } = require('./winston_log');
/**
 * @constructor
 * @name SmartApi
 * @param {Object} params
 * @param {string} api_key
 * @param {string} root
 * @param {string} timeout
 * @param {string} debug
 * @param {string} access_token
 * @param {string} refresh_token
 * @param {string} default_login_uri
 * @param {string} session_expiry_hook
 */
var SmartApi = function (params) {
	var self = this;

	self.totp = params.totp;
	self.api_key = params.api_key;
	self.client_code = params.client_code || null;
	self.root = params.root || API.root;
	self.timeout = params.timeout || API.timeout;
	self.debug = params.debug || API.debug;
	self.access_token = params.access_token || null;
	self.refresh_token = params.refresh_token || null;
	self.default_login_uri = API.login;
	self.session_expiry_hook = null;

	self.local_ip = null;
	self.mac_addr = null;
	self.public_ip = null;

	address(function (err, addrs) {
		self.local_ip = addrs !== undefined ? addrs.ip : '192.168.168.168';
		self.mac_addr =
			addrs !== undefined ? addrs.mac : 'fe80::216e:6507:4b90:3719';
	});

	(async () => {
		self.public_ip = await publicIp.v4();
	})();

	var requestInstance = axios.create({
		baseURL: self.root,
		timeout: self.timeout,
		headers: {
			'X-ClientLocalIP': self.local_ip, //'192.168.168.168',
			'X-ClientPublicIP': self.public_ip, //'106.193.147.98',
			'X-MACAddress': self.mac_addr, //'fe80::216e:6507:4b90:3719',
		},

		paramsSerializer: function (params) {
			return querystring.stringify(params);
		},

		httpsAgent : new https.Agent({
			minVersion: 'TLSv1.2',
        	maxVersion: 'TLSv1.3'
		})
		
	});

	// Set content type as form encoded for PUT and POST
	requestInstance.defaults.headers.post['Content-Type'] = 'application/json';
	requestInstance.defaults.headers.put['Content-Type'] = 'application/json';

	// Add a request interceptor
	requestInstance.interceptors.request.use(function (request) {
		if (self.debug) console.log(request);
		return request;
	});

	// Add a response interceptor
	requestInstance.interceptors.response.use(
		(response) => {
			try {
				if (self.debug) console.log(response);
				// console.log('response::', response);
				if (response?.status === 200) {
					if (response?.data?.success || response?.data?.status) {
						return response.data;
					} else {
						// USER INPUT OR TOKEN RELATED ERROR TO BE HANDLED HERE
						if (
							response?.data?.errorCode === 'AG8001' &&
							self.session_expiry_hook !== null
						) {
							self.session_expiry_hook();
						}
						// REFRESH TOKEN ISSUES
						// else if (response.data.errorCode === "AB8050") {
						//     // CUSTOM
						// }
						errorLogger.error({ message : "Error on response data",clientId : self.client_code,response : response})
						return response?.data;
					}
				} else {
					errorLogger.error({ message : "Error if status not 200",clientId : self.client_code,response : response})
					return response?.data;
				}
			} catch (error) {
				errorLogger.error({ message : "Error on catch block",clientId : self.client_code,response : error})
				return [];
			}
		},
		(error) => {
			try {
				// console.log(error);
				let errorObj = {};
				if (error?.response?.status) {
					errorObj.status = error?.response?.status;
					errorObj.message = error?.response?.statusText;
					errorLogger.error({ message : "Error Response in if block",clientId : self.client_code,response : error.response})
				}
				else if(error){
					errorLogger.error({ message : "Error Response in else if block",clientId : self.client_code,response : error})
				} 
				else {
					errorObj.status = 500;
					errorObj.message = 'Error';
					errorLogger.error({ message : "Error Response in else if block",clientId : self.client_code,response : error.response})
				}
				return errorObj;
				// return Promise.reject(errorObj);
			} catch (error) {
				errorLogger.error({ message : "Error catch block",clientId : self.client_code,response : error})
				return [];
			}
		}
	);

	/**
	 * Used to set access_token
	 * @method setAccessToken
	 * @param {string} access_token
	 */
	self.setAccessToken = function (access_token) {
		self.access_token = access_token;
	};

	/**
	 * Description
	 * @method setPublicToken
	 * @param {string} refresh_token
	 */
	self.setPublicToken = function (refresh_token) {
		self.refresh_token = refresh_token;
	};

	self.setClientCode = function (client_code) {
		self.client_code = client_code;
	};

	/**
	 * Description
	 * @method setSessionExpiryHook
	 * @param {function} cb Callback
	 */
	self.setSessionExpiryHook = function (cb) {
		self.session_expiry_hook = cb;
	};

	/**
	 * Description
	 * @method generateSession
	 * @param {string} clientcode
	 * @param {string} password
	 * @param {string} totp
	 */
	self.generateSession = function (client_code, password, totp) {
		let params = {
			clientcode: client_code,
			password: password,
			totp: totp,
		};
		let token_data = post_request('user_login', params);

		token_data
			.then((response) => {
				if (response.status) {
					// console.log(response.data.jwtToken)
					self.setClientCode(client_code);
					if(response.data){
						if(response.data.jwtToken){
							self.setAccessToken(response.data.jwtToken);
						}
						if(response.data.refreshToken){
							self.setPublicToken(response.data.refreshToken);
						}
					}
				}
			})
			.catch(function (err) {
				throw err;
			});

		return token_data;
	};

	/**
	 * Description
	 * @method getLoginURL
	 */
	self.getLoginURL = function () {
		return self.default_login_uri + '?api_key=' + self.api_key;
	};

	/**
	 * Description
	 * @method generateToken
	 * @param {string} refresh_token
	 */
	self.generateToken = function (refresh_token) {
		let token_data = post_request('generate_token', {
			refreshToken: refresh_token,
		});

		token_data.then((response) => {
			if (response.status) {
				self.setAccessToken(response.data.jwtToken);
				self.setPublicToken(response.data.refreshToken);
			}
		});

		return token_data;
	};

	/**
	 * Description
	 * @method logout
	 */
	self.logout = function (client_code) {
		if (client_code != null)
			return post_request('logout', { clientcode: client_code });
		else
			return {
				status: 500,
				message: 'Client Code is required.',
			};
	};

	/**
	 * Description
	 * @method getProfile
	 */
	self.getProfile = function () {
		return get_request('get_profile');
	};

	/**
	 * Description
	 * @method placeOrder
	 * @param {object} params
	 * @param {string} variety (NORMAL or STOPLOSS)
	 * @param {string} tradingsymbol (RELIANCE-EQ, INFY-EQ, SBIN-EQ)
	 * @param {string} exchange (NSE or BSE)
	 * @param {string} transactiontype (BUY or SELL)
	 * @param {string} ordertype (MARKET, LIMIT, STOPLOSS_MARKET, STOPLOSS_LIMIT)
	 * @param {string} producttype (DELIVERY, MARGIN, INTRADAY, AMO_DELIVERY, AMO_INTRADAY)
	 * @param {number} price
	 * @param {number} quantity
	 * @param {number} disclosedquantity
	 * @param {string} duration (DAY or IOC)
	 */
	self.placeOrder = function (params) {
		return post_request('order_place', params);
	};

	/**
	 * Description
	 * @method modifyOrder
	 * @param {object} params
	 * @param {string} orderid
	 * @param {string} variety (NORMAL or STOPLOSS)
	 * @param {string} tradingsymbol (RELIANCE-EQ, INFY-EQ, SBIN-EQ)
	 * @param {string} exchange (NSE or BSE)
	 * @param {string} transactiontype (BUY or SELL)
	 * @param {string} ordertype (MARKET, LIMIT, STOPLOSS_MARKET, STOPLOSS_LIMIT)
	 * @param {string} producttype (DELIVERY, MARGIN, INTRADAY, AMO_DELIVERY, AMO_INTRADAY)
	 * @param {number} price
	 * @param {number} quantity
	 * @param {number} disclosedquantity
	 * @param {string} duration (DAY or IOC)
	 */
	self.modifyOrder = function (params) {
		return post_request('order_modify', params);
	};

	/**
	 * Description
	 * @method cancelOrder
	 * @param {string} order_id
	 */
	self.cancelOrder = function (params) {
		return post_request('order_cancel', params);
	};

	/**
	 * Description
	 * @method getOrderBook
	 */
	self.getOrderBook = function () {
		return get_request('order_get_book');
	};

	/**
	 * Description
	 * @method getTradeBook
	 */
	self.getTradeBook = function () {
		return get_request('get_tradebook');
	};

	/**
	 * Description
	 * @method getRMS
	 */
	self.getRMS = function () {
		return get_request('get_rms');
	};

	/**
	 * Description
	 * @method getHolding
	 */
	self.getHolding = function () {
		return get_request('get_holding');
	};

	/**
	 * Description
	 * @method getPosition
	 */
	self.getPosition = function () {
		return get_request('get_position');
	};

	/**
	 * Description
	 * @method convertPosition
	 * @param {object} params
	 * @param {string} exchange
	 * @param {string} symboltoken
	 * @param {string} producttype
	 * @param {string} newproducttype
	 * @param {string} tradingsymbol
	 * @param {string} symbolname
	 * @param {string} instrumenttype
	 * @param {string} priceden
	 * @param {string} pricenum
	 * @param {string} genden
	 * @param {string} gennum
	 * @param {string} precision
	 * @param {string} multiplier
	 * @param {string} boardlotsize
	 * @param {string} buyqty
	 * @param {string} sellqty
	 * @param {string} buyamount
	 * @param {string} sellamount
	 * @param {string} transactiontype
	 * @param {string} quantity
	 * @param {string} type
	 */
	self.convertPosition = function (params) {
		return post_request('convert_position', params);
	};

	/**
	 * Description
	 * @method createRule
	 * @param {object} params
	 * @param {string} tradingsymbol
	 * @param {string} symboltoken
	 * @param {string} exchange
	 * @param {string} producttype
	 * @param {string} side
	 * @param {string} price
	 * @param {string} qty
	 * @param {string} disclosedqty
	 * @param {string} triggerprice
	 * @param {string} timeperiod
	 */
	self.createRule = function (params) {
		return post_request('create_rule', params);
	};

	/**
	 * Description
	 * @method modifyRule
	 * @param {object} params
	 * @param {string} id
	 * @param {string} symboltoken
	 * @param {string} exchange
	 * @param {string} qty
	 */
	self.modifyRule = function (params) {
		return post_request('modify_rule', params);
	};

	/**
	 * Description
	 * @method cancelRule
	 * @param {object} params
	 * @param {string} id
	 * @param {string} symboltoken
	 * @param {string} exchange
	 */
	self.cancelRule = function (params) {
		return post_request('cancel_rule', params);
	};

	/**
	 * Description
	 * @method ruleDetails
	 * @param {object} params
	 * @param {string} id
	 */
	self.ruleDetails = function (params) {
		return post_request('rule_details', params);
	};

	/**
	 * Description
	 * @method ruleList
	 * @param {object} params
	 * @param {Array} status
	 * @param {string} page
	 * @param {string} count
	 */
	self.ruleList = function (params) {
		// Array length check
		if (Array.isArray(params.status)) return post_request('rule_list', params);
		else
			return {
				status: 500,
				message:
					'Invalid status. Please refer Smart API documentation for more details.',
			};
	};

	/**
	 * Description
	 * @method marketData
	 * @param {object} params
	 * @param {string} mode
	 * @param {string} exchangeTokens
	 */
	self.marketData = function (params) {
		return post_request('market_data', params);
	};

	/**
	 * Description
	 * @method searchScrip
	 * @param {object} params
	 * @param {string} exchange
	 * @param {string} searchscrip
	 */
	self.searchScrip = function (params) {
		return post_request('search_scrip', params)
			.then((data) => {
				if (data?.status === true && data?.data?.length > 0) {
					const tradingSymbols = data.data.map((item, index) => {
						return `${index + 1}. exchange: ${item.exchange}, tradingsymbol: ${item.tradingsymbol}, symboltoken: ${item.symboltoken}`;
					});
					const searchData = `Search successful. Found ${data.data.length} trading symbols for the given query:\n${tradingSymbols.join('\n')}`;
					console.log(searchData);
					return data.data;
				} else if (data?.status === true && data?.data?.length === 0) {
					console.log("Search successful. No matching trading symbols found for the given query.");
					return data.data
				} else {
					return data;
				}
			})
			.catch((error) => {
				return error;
			});
	};

	/**
	 * Description
	 * @method getAllHolding
	 */
	self.getAllHolding = function () {
		return get_request('get_all_holding');
	};

	/**
	 * Description
	 * @method indOrderDetails
	 * @param {string} qParams
	 */
	self.indOrderDetails = function (qParams) {
		return get_request_qParams("ind_order_details", qParams);
	};

	/**
	 * Description
	 * @method marginApi
	 * @param {object} params
	 * @param {array} positions
	 */
	self.marginApi = function (params) {
		return post_request("margin_api", params);
	};

	/**
	 * Description
	 * @method ruleList
	 * @param {object} params
	 * @param {string} exchange
	 * @param {string} symboltoken
	 * @param {string} interval
	 * @param {string} fromdate
	 * @param {string} todate
	 */
	self.getCandleData = function (params) {
		return post_request('candle_data', params);
	};

	self.estimateCharges = (params)=>{
		return post_request('estimateCharges',params);
	}

	self.verifyDis = (params)=>{
		return post_request('verifyDis',params);
	}

	self.generateTPIN = (params)=>{
		return post_request('generateTPIN',params);
	}

	self.getTranStatus = (params)=>{
		return post_request('getTranStatus',params);
	}

	self.optionGreek = (params)=>{
		return post_request('optionGreek',params);
	}

	self.gainersLosers = (params)=>{
		return post_request('gainersLosers',params);
	}

	self.putCallRatio = ()=>{
		return get_request('putCallRatio');
	}

	self.oIBuildup = (params)=>{
		return post_request('OIBuildup',params);
	}

	function get_request(route, params, responseType, responseTransformer) {
		return request_util(
			route,
			'GET',
			params || {},
			responseType,
			responseTransformer
		);
	}

	function post_request(route, params, responseType, responseTransformer) {
		return request_util(
			route,
			'POST',
			params || {},
			responseType,
			responseTransformer
		);
	}

	function get_request_qParams(route, qParams) {
		return request_util_qParams(
			route, 
			"GET", 
			qParams
		);
	}

	function request_util(
		route,
		method,
		params,
		responseType,
		responseTransformer
	) {
		let url = API[route],
			payload = null;

		if (method !== 'GET' || method !== 'DELETE') {
			payload = params;
		}

		let options = {
			method: method,
			url: url,
			// params: queryParams,
			data: JSON.stringify(payload),
			// Set auth header
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				'X-UserType': 'USER',
				'X-SourceID': 'WEB',
				'X-PrivateKey': self.api_key, // ? self.api_key : 'smartapi_key'
			},
		};

		// console.log('options', options);
		if (self.access_token) {
			options['headers']['Authorization'] = 'Bearer ' + self.access_token;
		}

		// Set response transformer
		if (responseTransformer) {
			options.transformResponse =
				axios.defaults.transformResponse.concat(responseTransformer);
		}

		return requestInstance.request(options);
	}

	function request_util_qParams(
		route,
		method,
		qParams
	) {
		let url = API[route],
			payload = null;

		if (qParams) {
			url = `${url}/${qParams}`;
		}

		let options = {
			method: method,
			url: url,
			// params: queryParams,
			data: JSON.stringify(payload),
			// Set auth header
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				"X-UserType": "USER",
				"X-SourceID": "WEB",
				"X-PrivateKey": self.api_key, // ? self.api_key : 'smartapi_key'
			},
		};

		// console.log('options', options);
		if (self.access_token) {
			options["headers"]["Authorization"] = "Bearer " + self.access_token;
		}

		return requestInstance.request(options);
	}
};

module.exports = SmartApi;
