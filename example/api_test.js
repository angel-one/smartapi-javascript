let { SmartAPI, WebSocketClient, WebSocketV2, WSOrderUpdates } = require('../lib');

let smart_api = new SmartAPI({
	api_key: 'playstore_key', // PROVIDE YOUR API KEY HERE
	// OPTIONAL : If user has valid access token and refresh token then it can be directly passed to the constructor
	access_token: "eyJhbGciOiJIUzUxMiJ9.eyJ1c2VybmFtZSI6IlM1MjQ1MjE2MyIsInJvbGVzIjowLCJ1c2VydHlwZSI6IlVTRVIiLCJ0b2tlbiI6ImV5SmhiR2NpT2lKSVV6VXhNaUlzSW5SNWNDSTZJa3BYVkNKOS5leUp6ZFdJaU9pSlROVEkwTlRJeE5qTWlMQ0psZUhBaU9qRTNNRGd4TnpFNU5qY3NJbWxoZENJNk1UY3dPREE0TWpJeE5pd2lhblJwSWpvaVkyVXhPVEkzWkdRdFpXSTVNeTAwWVdVeExUbGtOelF0WW1GaVpHSmtaalJpTVRZeUlpd2liMjF1WlcxaGJtRm5aWEpwWkNJNk9Dd2ljMjkxY21ObGFXUWlPaUl6SWl3aWRYTmxjbDkwZVhCbElqb2lZMnhwWlc1MElpd2lkRzlyWlc1ZmRIbHdaU0k2SW5SeVlXUmxYMkZqWTJWemMxOTBiMnRsYmlJc0ltZHRYMmxrSWpvNExDSnpiM1Z5WTJVaU9pSXpJaXdpWkdWMmFXTmxYMmxrSWpvaU5tUTBabVkzTlRjdE5Ea3lNeTB6Wm1SbExXSmpOell0T0RWa09HSmtaRE5rWWpZMElpd2lZV04wSWpwN2ZYMC5aNE5qWFVSZEU2bG1HTlRMdE5sam1LUWMwQnNFcWJBcDRzN2lMRXM1cXFNVVVZNkw3OG9kZVJWUDZqTzZxS2hiVUdNX2s3VDc0aWkyZC1oLTJPNVBnQSIsIkFQSS1LRVkiOiJwbGF5c3RvcmVfa2V5IiwiaWF0IjoxNzA4MDgyMjc2LCJleHAiOjE3MDgxNzE5Njd9.7U-2Y7VoaCEtYW-a1NwNODQiFD93VrHbPMzU-9k0s4TESz3TnoVaN9sBcNycdrtUOS4R9Q5O-cYLdzYnhL1bMQ",
	refresh_token: "eyJhbGciOiJIUzUxMiJ9.eyJ0b2tlbiI6IlJFRlJFU0gtVE9LRU4iLCJSRUZSRVNILVRPS0VOIjoiZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SnpkV0lpT2lKVE5USTBOVEl4TmpNaUxDSmxlSEFpT2pFM01EZ3hOamcyTnpZc0ltbGhkQ0k2TVRjd09EQTRNakl4Tml3aWFuUnBJam9pWTJSa1pqUmhPV1V0TlRNeE1pMDBZbUpqTFRsbFlUTXROR1U0TW1RellUQTBPR000SWl3aWIyMXVaVzFoYm1GblpYSnBaQ0k2TUN3aWRHOXJaVzRpT2lKU1JVWlNSVk5JTFZSUFMwVk9JaXdpZFhObGNsOTBlWEJsSWpvaVkyeHBaVzUwSWl3aWRHOXJaVzVmZEhsd1pTSTZJblJ5WVdSbFgzSmxabkpsYzJoZmRHOXJaVzRpTENKa1pYWnBZMlZmYVdRaU9pSTJaRFJtWmpjMU55MDBPVEl6TFRObVpHVXRZbU0zTmkwNE5XUTRZbVJrTTJSaU5qUWlMQ0poWTNRaU9udDlmUS5RRXNrOVpvVm5kd0xiQjdQbjNnZEFYS3VoMWFvSWpoVFhleFFuaTJBMDlDckNHUm44bWhJN2VmZGwyR3pWdDNSdTE5dURXWko5RVZEa3FPQUpmVjA3dyIsImlhdCI6MTcwODA4MjI3Nn0.ordoY20B67_aJVne-hbQP_DWJERcotKDNgT6fe5xxOeY_tM3kI5ffzVcV-frifrkE0ScWag-IlyADy6LICl_ag"
});

// Order Methods
// return smart_api.placeOrder({
// 	"variety": "NORMAL",
// 	"tradingsymbol": "SBIN-EQ",
// 	"symboltoken": "3045",
// 	"transactiontype": "BUY",
// 	"exchange": "NSE",
// 	"ordertype": "LIMIT",
// 	"producttype": "INTRADAY",
// 	"duration": "DAY",
// 	"price": "19500",
// 	"squareoff": "0",
// 	"stoploss": "0",
// 	"quantity": "1"
// }).then((data)=>{
// 	console.log("place_order_data", data)
// })

// // If user does not have valid access token and refresh token then use generateSession method

// }
// smart_api
// 	.generateSession('CLIENT_CODE', 'PASSWORD', 'TOTP')
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

			// return smart_api.cancelOrder({
			//     "variety": "NORMAL",
			//     "orderid": "201130000006424"
			// });

		// 	// return smart_api.getOrderBook();

				smart_api.getOrderBook().then((data)=>{
					console.log(data);
				})

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