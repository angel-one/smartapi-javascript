let { SmartAPI, WebSocketClient, WebSocketV2, WSOrderUpdates } = require('../lib');
const speakeasy = require('speakeasy');

const api_key = 'smartapi_key';
const totp_hash = 'totp';
const client_code = 'client_code';
const password = 'password';


let smart_api = new SmartAPI({
	api_key: api_key, // PROVIDE YOUR API KEY HERE
	// OPTIONAL : If user has valid access token and refresh token then it can be directly passed to the constructor
	// access_token: "YOUR_ACCESS_TOKEN",
	// refresh_token: "YOUR_REFRESH_TOKEN"
});
const totp = speakeasy.totp({
    secret: totp_hash,
    encoding: 'base32' // Ensure the secret is base32 encoded
});

// // If user does not have valid access token and refresh token then use generateSession method

// }
// smart_api
// 	.generateSession(client_code, password, totp)
// 	.then((data) => {
// 		console.log(data);
// 		return smart_api.getProfile();

// 		// 	// User Methods
// 		// 	// return smart_api.logout()

// 		// 	// return smart_api.getRMS();

// 		// 	// Order Methods
// 		// 	// return smart_api.placeOrder({
// 		// 	//     "variety": "NORMAL",
// 		// 	//     "tradingsymbol": "SBIN-EQ",
// 		// 	//     "symboltoken": "3045",
// 		// 	//     "transactiontype": "BUY",
// 		// 	//     "exchange": "NSE",
// 		// 	//     "ordertype": "LIMIT",
// 		// 	//     "producttype": "INTRADAY",
// 		// 	//     "duration": "DAY",
// 		// 	//     "price": "19500",
// 		// 	//     "squareoff": "0",
// 		// 	//     "stoploss": "0",
// 		// 	//     "quantity": "1"
// 		// 	// })

// 		// 	// return smart_api.modifyOrder({
// 		// 	//     "orderid": "201130000006424",
// 		// 	//     "variety": "NORMAL",
// 		// 	//     "tradingsymbol": "SBIN-EQ",
// 		// 	//     "symboltoken": "3045",
// 		// 	//     "transactiontype": "BUY",
// 		// 	//     "exchange": "NSE",
// 		// 	//     "ordertype": "LIMIT",
// 		// 	//     "producttype": "INTRADAY",
// 		// 	//     "duration": "DAY",
// 		// 	//     "price": "19500",
// 		// 	//     "squareoff": "0",
// 		// 	//     "stoploss": "0",
// 		// 	//     "quantity": "1"
// 		// 	// });

// 		// 	// return smart_api.cancelOrder({
// 		// 	//     "variety": "NORMAL",
// 		// 	//     "orderid": "201130000006424"
// 		// 	// });

// 		// 	// return smart_api.getOrderBook();

				// smart_api.getOrderBook().then((data)=>{
				// 	console.log(data);
				// })

// 		// 	// return smart_api.getTradeBook();

// 		// 	// Portfolio Methods
// 		// 	// return smart_api.getHolding();

// 		// 	// return smart_api.getPosition();

// 		// 	// return smart_api.convertPosition({
// 		// 	//     "exchange": "NSE",
// 		// 	//     "oldproducttype": "DELIVERY",
// 		// 	//     "newproducttype": "MARGIN",
// 		// 	//     "tradingsymbol": "SBIN-EQ",
// 		// 	//     "transactiontype": "BUY",
// 		// 	//     "quantity": 1,
// 		// 	//     "type": "DAY"
// 		// 	// });

// 		// 	// GTT Methods
// 		// 	// return smart_api.createRule({
// 		// 	//    "tradingsymbol" : "SBIN-EQ",
// 		// 	//    "symboltoken" : "3045",
// 		// 	//    "exchange" : "NSE",
// 		// 	//    "producttype" : "MARGIN",
// 		// 	//    "transactiontype" : "BUY",
// 		// 	//    "price" : 100000,
// 		// 	//    "qty" : 10,
// 		// 	//    "disclosedqty": 10,
// 		// 	//    "triggerprice" : 200000,
// 		// 	//    "timeperiod" : 365
// 		// 	// })
// 		// 	// return smart_api.modifyRule({
// 		// 	//             "id" : 1000014,
// 		// 	//             "symboltoken" : "3045",
// 		// 	//             "exchange" : "NSE",
// 		// 	//             "qty" : 10

// 		// 	// })
// 		// 	// return smart_api.cancelRule({
// 		// 	//      "id" : 1000014,
// 		// 	//      "symboltoken" : "3045",
// 		// 	//      "exchange" : "NSE"
// 		// 	// })
// 		// 	// return smart_api.ruleDetails({
// 		// 	//     "id" : 25
// 		// 	// })
// 		// 	// return smart_api.ruleList({
// 		// 	//      "status" : ["NEW","CANCELLED"],
// 		// 	//      "page" : 1,
// 		// 	//      "count" : 10
// 		// 	// })

// 		// 	// Historical Methods
// 		// 	// return smart_api.getCandleData({
// 		// 	//     "exchange": "NSE",
// 		// 	//     "symboltoken": "3045",
// 		// 	//     "interval": "ONE_MINUTE",
// 		// 	//     "fromdate": "2021-02-10 09:00",
// 		// 	//     "todate": "2021-02-10 09:20"
// 		// 	// })


		// Market Data Methods
		// smart_api.marketData({
 		// 			"mode": "FULL",
 		// 			"exchangeTokens": {
 		// 				"NSE": [
 		// 					"3045"
 		// 				]
 		// 			}
		// 		}).then((data) => {
		// 			console.log(JSON.stringify(data, null, 2));
		// 	        //  console.log(JSON.stringify(data))
   		// 		});

		// search Scrip Methods
		smart_api.searchScrip({
					"exchange": "BSE", 
					"searchscrip":"Titan"
				}).then((data)=>{
					console.log(data);
				})

		// get all holding method
		// smart_api.getAllHolding().then((data)=>{
		// 	console.log(data);
		// })

    // get individual order details
    // smart_api.indOrderDetails("GuiOrderID").then((data) => {
    //   console.log(data);
    // });

	// // margin api Method
	// smart_api
    // .marginApi({
    //   positions: [
    //     {
    //       exchange: "NFO",
    //       qty: 1500,
    //       price: 0,
    //       productType: "CARRYFORWARD",
    //       token: "154388",
    //       tradeType: "SELL",
    //     }
    //   ],
    // })
    // .then((data) => {
    //   console.log(data);
    // });

	//brokerage calculator
	// return smart_api.estimateCharges({
	// 	"orders": [
	// 		{
	// 			"product_type": "DELIVERY",
	// 			"transaction_type": "BUY",
	// 			"quantity": "10",
	// 			"price": "800",
	// 			"exchange": "NSE",
	// 			"symbol_name": "745AS33",
	// 			"token": "17117"
	// 		}, {
	// 			"product_type": "DELIVERY",
	// 			"transaction_type": "BUY",
	// 			"quantity": "10",
	// 			"price": "800",
	// 			"exchange": "BSE",
	// 			"symbol_name": "PIICL151223",
	// 			"token": "726131"
	// 		}
	// 	]
	// }).then(data=>{
	// 	console.log(data)
	// });

	//verifydis
	// return smart_api.verifyDis({
	// 	"isin":"INE528G01035",
	// 	"quantity":"1"
	// }).then(data => {
	// 	console.log(data)
	// });

	// return smart_api.generateTPIN({
	// 	"dpId":"33200",
	// 	"ReqId":"2351614738654050",
	// 	"boid":"1203320018563571",
	// 	"pan":"JZTPS2255C"
	// }).then(data => {
	// 	console.log(data)
	// });
	//getTransactionStatus
	// return smart_api.getTranStatus({
	// 	"ReqId":"2351614738654050"
	// }).then(data => {
	// 	console.log(data)
	// });

	// return smart_api.optionGreek({
	// 	"name":"TCS", // Here Name represents the Underlying stock
	// 	"expirydate":"25JAN2024"
	// }).then(data => {
	// 	console.log(data)
	// });
	
	// return smart_api.gainersLosers({
	// 	"datatype":"PercOIGainers", // Type of Data you want(PercOILosers/PercOIGainers/PercPriceGainers/PercPriceLosers)
	// 	"expirytype":"NEAR" // Expiry Type (NEAR/NEXT/FAR)
	// }).then(data => {
	// 	console.log(data)
	// });

	// return smart_api.putCallRatio().then(data => {
	// 	console.log(data)
	// });
	
	// return smart_api.oIBuildup({
	// 	"expirytype":"NEAR",
	// 	"datatype":"Long Built Up"
	// }).then(data => {
	// 	console.log(data)
	// });																																															


// })
// .then((data) => {
// 	console.log('PROFILE::', data);
// })
// .catch((ex) => {
// 	console.log('EX::', ex);
// });

// // // smart_api.generateToken("YOUR_REFRESH_TOKEN")
// // //     .then((data) => {
// // //         console.log(data)
// // //     });

// smart_api.setSessionExpiryHook(customSessionHook);

// function customSessionHook() {
//     // USER CAN GENERATE NEW JWT HERE
//     console.log("User loggedout");
// }

// ########################### Socket Sample Code Starts Here ###########################
// Old Websocket

// let web_socket = new WebSocket({
//     client_code: "CLIENT_CODE",
//     feed_token: "FEED_TOKEN"
// });

// web_socket.connect()
//     .then(() => {
//         web_socket.runScript("SCRIPT", "TASK") // SCRIPT: nse_cm|2885, mcx_fo|222900  TASK: mw|sfi|dp

//         setTimeout(function () {
//             web_socket.close()
//         }, 3000)
//     })

// web_socket.on('tick', receiveTick)

// function receiveTick(data) {
//     console.log("receiveTick:::::", data)
// }

// ########################### Socket Sample Code Ends Here ###########################

// ########################### Socket Sample Code Starts Here ###########################
// New websocket

// let web_socket = new WebSocketClient({
//     clientcode: "CLIENT_CODE",
//     jwttoken: 'JWT_TOKEN',
//     apikey: "API_KEY",
//     feedtype: "FEED_TYPE",
// });

// web_socket.connect()
//     .then(() => {
//         web_socket.fetchData("subscribe", "order_feed");  // ACTION_TYPE: subscribe | unsubscribe FEED_TYPE: order_feed

//         setTimeout(function () {
//             web_socket.close()
//         }, 60000)
//     });

// web_socket.on('tick', receiveTick);

// function receiveTick(data) {
//     console.log("receiveTick:::::", data);
// }

// ########################### Socket V2 Sample Code Start Here ###########################
// let web_socket = new WebSocketV2({
// 	jwttoken: 'JWT_TOKEN',
// 	apikey: 'API_KEY',
// 	clientcode: 'Client_code',
// 	feedtype: 'FEED_TYPE',
// });

// //For handling custom error 
// web_socket.customError();

// // handle reconnection
// web_socket.reconnection(reconnectType, delayTime, multiplier);

// web_socket.connect().then(() => {
// 	let json_req = {
// 		correlationID: "abcde12345",
// 		action: 1,
// 		mode: 2,
// 		exchangeType: 1,
// 		tokens: ["1594"],
// 	};

// 	web_socket.fetchData(json_req);

// 	web_socket.on("tick", receiveTick);

// 	function receiveTick(data) {
// 		console.log("receiveTick:::::", data);
// 	}

// 	// setTimeout(() => {
// 	// 	web_socket.close();
// 	// }, 2000);
	
// }).catch((err) => {
// 	console.log('Custom error :', err.message);
// });
// ########################### Socket V2 Sample Code End Here ###########################

// ########################### Socket Client updates Sample Code Start Here ###########################
// let ws_clientupdate = new WSOrderUpdates({
//   jwttoken: 'JWT_TOKEN',
// 	 apikey: 'API_KEY',
// 	 clientcode: 'Client_code',
// 	 feedtype: 'FEED_TYPE',
// });

// ws_clientupdate.connect().then(() => {

// 	ws_clientupdate.on("tick", receiveTick);

// 	function receiveTick(data) {
// 		console.log("receiveTick:::::", data);
// 	}

// 	// setTimeout(() => {
// 	// 	ws_clientupdate.close();
// 	// }, 10000);
	
// })
// ########################### Socket Client updates Sample Code End Here ###########################