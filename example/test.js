let { SmartAPI, WebSocketClient, WebSocketV2 } = require('../lib');

let smart_api = new SmartAPI({
	api_key: "VG2s34Cq", // PROVIDE YOUR API KEY HERE
	// OPTIONAL : If user has valid access token and refresh token then it can be directly passed to the constructor
	access_token: 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VybmFtZSI6IkE1MjE2MzEzNCIsInJvbGVzIjowLCJ1c2VydHlwZSI6IlVTRVIiLCJ0b2tlbiI6ImV5SmhiR2NpT2lKSVV6VXhNaUlzSW5SNWNDSTZJa3BYVkNKOS5leUp6ZFdJaU9pSkJOVEl4TmpNeE16UWlMQ0psZUhBaU9qRTJPVGMyTVRVMU1qUXNJbWxoZENJNk1UWTVOelV4TnpZNE5Dd2lhblJwSWpvaVpHTTVZVGc1Wm1FdE5UVXdOQzAwTm1KbExUaGhZMll0TkRObU5ERXlZVGsyT0dKbElpd2liMjF1WlcxaGJtRm5aWEpwWkNJNk9Dd2ljMjkxY21ObGFXUWlPaUl6SWl3aWRYTmxjbDkwZVhCbElqb2lZMnhwWlc1MElpd2lkRzlyWlc1ZmRIbHdaU0k2SW5SeVlXUmxYMkZqWTJWemMxOTBiMnRsYmlJc0ltZHRYMmxrSWpvNExDSnpiM1Z5WTJVaU9pSXpJbjAuS1VtazN5Y1MwRUpHdDgxb3FIZEFyNnRUVTE4Q0VYWHREQmJnWUJ4UDlWaWcySm9kX2dONmlIZ3NrMEFSY0JCN0JiaVJmSktqRjB1VnhKTnZFQnNFdlEiLCJBUEktS0VZIjoiVkcyczM0Q3EiLCJpYXQiOjE2OTc1MTc3NDQsImV4cCI6MTY5NzYxNTUyNH0.Ykl_ADBV9ocMmGDInt8BwJR41xK3vMuTZ4dHkHLpUt5Gvq53EGXZ5OUSN017xrNo2iAYYOfJm3yDZfOeh5Fiwg',
	refresh_token: 'eyJhbGciOiJIUzUxMiJ9.eyJ0b2tlbiI6IlJFRlJFU0gtVE9LRU4iLCJSRUZSRVNILVRPS0VOIjoiZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SnpkV0lpT2lKQk5USXhOak14TXpRaUxDSmxlSEFpT2pFMk9UYzFOakE1TkRRc0ltbGhkQ0k2TVRZNU56VXhOelk0TkN3aWFuUnBJam9pTVRRMU5qTmpNR1l0TUdSa01TMDBORE0wTFRrek9XTXRPRFl6TVRSa1ltTXpZalprSWl3aWRHOXJaVzRpT2lKU1JVWlNSVk5JTFZSUFMwVk9JaXdpZFhObGNsOTBlWEJsSWpvaVkyeHBaVzUwSWl3aWRHOXJaVzVmZEhsd1pTSTZJblJ5WVdSbFgzSmxabkpsYzJoZmRHOXJaVzRpZlEuNUk5X1I4RHV6NDd6bDE4X0FaOVpaS0VkLWxqRVVRWnEwU3hSSHVaWVB1OEdfbV9VbFd5em11WEdCSi1rSVhZZE1NOFRNWkltSzZKYng5WHZmSmNndVEiLCJpYXQiOjE2OTc1MTc3NDR9.nRzIcjFpKJ9j_xJhKEkzQw5-TFyVK4gwmtYvzoSt5q-5I8CBv8XebNMEDgwwVg25pE8QuIU3qWGfIw8HB70Jww',
});

// // If user does not have valid access token and refresh token then use generateSession method

// }
// smart_api
// 	.generateSession('A52163134', '4321', '123295')
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

// return smart_api.getTradeBook();

// 		// 	// Portfolio Methods
// 	smart_api
// .getHolding()
// .then((data) => {
//   console.log("Success: ", data);
// })
// .catch((err) => {
//   console.log("Error:", err);
// });

// smart_api.getPosition().then((data) => {
// 	console.log("Success: ", data);
// })
// 	.catch((err) => {
// 		console.log("Error:", err);
// 	});

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
	// smart_api
    //     .createRule({
    //       tradingsymbol: "SBIN-EQ",
    //       symboltoken: "3045",
    //       exchange: "NSE",
    //       producttype: "MARGIN",
    //       transactiontype: "BUY",
    //       price: 100000,
    //       qty: 10,
    //       disclosedqty: 10,
    //       triggerprice: 200000,
    //       timeperiod: 365,
    //     })
    //     .then((data) => {
    //       console.log("Success cancel: ", data);
    //     })
    //     .catch((err) => {
    //       console.log("Error:", err);
    //     });
// smart_api
//   .modifyRule({
//     id: 1440101,
//     symboltoken: "3045",
//     exchange: "NSE",
//     qty: 10,
//   })
//   .then((data) => {
//     console.log("Success modify: ", data);
//   })
//   .catch((err) => {
//     console.log("Error:", err);
//   });
// smart_api
// 	.cancelRule({
// 		id: 1440101,
// 		symboltoken: "3045",
// 		exchange: "NSE",
// 	})
// 	.then((data) => {
// 		console.log("Success cancel: ", data);
// 	})
// 	.catch((err) => {
// 		console.log("Error:", err);
// 	});
// smart_api
//   .ruleDetails({
//     id: 1440395,
//   })
//   .then((data) => {
//     console.log("Success cancel: ", data);
//   })
//   .catch((err) => {
//     console.log("Error:", err);
//   });
		// 	smart_api
        // .ruleList({
        //   status: ["NEW", "CANCELLED"],
        //   page: 1,
        //   count: 10,
        // })
        // .then((data) => {
        //   console.log("Success cancel: ", data);
        // })
        // .catch((err) => {
        //   console.log("Error:", err);
        // });

			//Historical Methods
		// 	smart_api
        // .getCandleData({
        //   exchange: "NSE",
        //   symboltoken: "3045",
        //   interval: "ONE_MINUTE",
        //   fromdate: "2021-02-10 09:00",
        //   todate: "2021-02-10 09:20",
        // })
        // .then((data) => {
        //   console.log("Success cancel: ", data);
        // })
        // .catch((err) => {
        //   console.log("Error:", err);
        // });


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
// smart_api.searchScrip({
// 			"exchange": "BSE",
// 			"searchscrip":"Titan"
// 		}).then((data)=>{
// 			console.log(data);
// 		})

// get all holding method
// smart_api.getAllHolding().then((data)=>{
// 	console.log(data);
// })
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

// web_socket.connect().then(() => {
// 	let json_req = {
// 		correlationID: 'abcde12345',
// 		action: 1,
// 		mode: 2,
// 		exchangeType: 1,
// 		tokens: ['1594'],
// 	};

// 	web_socket.fetchData(json_req);

// 	web_socket.on('tick', receiveTick);

// 	function receiveTick(data) {
// 		console.log('receiveTick:::::', data);
// 	}

// setTimeout(() => {
// 	web_socket.close();
// }, 10000);
// });
// ########################### Socket V2 Sample Code End Here ###########################
