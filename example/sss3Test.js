let { SmartAPI, WebSocketClient, WebSocketV2 } = require('../lib');

let smart_api = new SmartAPI({
	api_key: 'smartapi_key', // PROVIDE YOUR API KEY HERE
	// OPTIONAL : If user has valid access token and refresh token then it can be directly passed to the constructor
	// access_token: "YOUR_ACCESS_TOKEN",
	// refresh_token: "YOUR_REFRESH_TOKEN"
});

// // If user does not have valid access token and refresh token then use generateSession method

// }
// smart_api
// 	.generateSession('CLIENT_CODE', 'PASSWORD', 'TOTP')
// 	.then((data) => {
// 		console.log(data);
		// return smart_api.getProfile();

	
			 smart_api.placeOrder({
			    "variety": "NORMAL",
			    "tradingsymbol": "SBIN-EQ",
			    "symboltoken": "304",
			    "transactiontype": "BUY",
			    "exchange": "NSE",
			    "ordertype": "LIMIT",
			    "producttype": "INTRADAY",
			    "duration": "DAY",
			    "price": "195",
			    "squareoff": "0",
			    "stoploss": "0",
			    "quantity": "1"
			}).then((data)=>{
                console.log("placeOrder:::",data);
            }).catch((error)=>{
                console.log("error:::",error);
            })
        // })