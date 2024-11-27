# SmartAPI Javascript Client SDK

## Installation

```bash
npm i smartapi-javascript
```

## Getting started with API

```javascript
let { SmartAPI, WebSocket,WebSocketV2 } = require('smartapi-javascript');
const speakeasy = require('speakeasy');

const api_key = 'smartapi_key';
const totp_hash = 'totp';
const client_code = 'client_code';
const password = 'password';

let smart_api = new SmartAPI({
	api_key: api_key, // PROVIDE YOUR API KEY HERE
	// OPTIONAL : If user has valid access token and refresh token then it can be directly passed to the constructor.
	// access_token: "YOUR_ACCESS_TOKEN",
	// refresh_token: "YOUR_REFRESH_TOKEN"
});

const totp = speakeasy.totp({
    secret: totp_hash,
    encoding: 'base32' // Ensure the secret is base32 encoded
});

// If user does not have valid access token and refresh token then use generateSession method
smart_api
	.generateSession(client_code, password, totp)
	.then((data) => {
		return smart_api.getProfile();

		// User Methods
		// return smart_api.getProfile()

		// return smart_api.logout()

		// return smart_api.getRMS();

		// Order Methods
		// return smart_api.placeOrder({
		//     "variety": "NORMAL",
		//     "tradingsymbol": "SBIN-EQ",
		//     "symboltoken": "3045",
		//     "transactiontype": "BUY",
		//     "exchange": "NSE",
		//     "ordertype": "LIMIT",
		//     "producttype": "INTRADAY",
		//     "duration": "DAY",
		//     "price": "19500",
		//     "squareoff": "0",
		//     "stoploss": "0",
		//     "quantity": "1"
		// })

		// return smart_api.modifyOrder({
		//     "orderid": "201130000006424",
		//     "variety": "NORMAL",
		//     "tradingsymbol": "SBIN-EQ",
		//     "symboltoken": "3045",
		//     "transactiontype": "BUY",
		//     "exchange": "NSE",
		//     "ordertype": "LIMIT",
		//     "producttype": "INTRADAY",
		//     "duration": "DAY",
		//     "price": "19500",
		//     "squareoff": "0",
		//     "stoploss": "0",
		//     "quantity": "1"
		// });

		// return smart_api.cancelOrder({
		//     "variety": "NORMAL",
		//     "orderid": "201130000006424"
		// });

		// return smart_api.getOrderBook();

		// return smart_api.getTradeBook();

		// Portfolio Methods
		// return smart_api.getHolding();

		// return smart_api.getPosition();

		// return smart_api.convertPosition({
		//     "exchange": "NSE",
		//     "oldproducttype": "DELIVERY",
		//     "newproducttype": "MARGIN",
		//     "tradingsymbol": "SBIN-EQ",
		//     "transactiontype": "BUY",
		//     "quantity": 1,
		//     "type": "DAY"
		// });

		// GTT Methods
		// return smart_api.createRule({
		//    "tradingsymbol" : "SBIN-EQ",
		//    "symboltoken" : "3045",
		//    "exchange" : "NSE",
		//    "producttype" : "MARGIN",
		//    "transactiontype" : "BUY",
		//    "price" : 100000,
		//    "qty" : 10,
		//    "disclosedqty": 10,
		//    "triggerprice" : 200000,
		//    "timeperiod" : 365
		// })
		// return smart_api.modifyRule({
		//             "id" : 1000014,
		//             "symboltoken" : "3045",
		//             "exchange" : "NSE",
		//             "qty" : 10

		// })
		// return smart_api.cancelRule({
		//      "id" : 1000014,
		//      "symboltoken" : "3045",
		//      "exchange" : "NSE"
		// })
		// return smart_api.ruleDetails({
		//     "id" : 25
		// })
		// return smart_api.ruleList({
		//      "status" : ["NEW","CANCELLED"],
		//      "page" : 1,
		//      "count" : 10
		// })

		// Historical Methods
		// return smart_api.getCandleData({
		//     "exchange": "NSE",
		//     "symboltoken": "3045",
		//     "interval": "ONE_MINUTE",
		//     "fromdate": "2021-02-10 09:00",
		//     "todate": "2021-02-10 09:20"
		// })
	})
	.then((data) => {
		// Profile details
	})
	.catch((ex) => {
		//Log error
	});

// TO HANDLE SESSION EXPIRY, USERS CAN PROVIDE A CUSTOM FUNCTION AS PARAMETER TO setSessionExpiryHook METHOD
smart_api.setSessionExpiryHook(customSessionHook);

function customSessionHook() {
	console.log('User loggedout');

	// NEW AUTHENTICATION CAN TAKE PLACE HERE
}
```

## Getting started with SmartAPI Websocket's

```javascript
########################### Socket Sample Code Starts Here ###########################
// Old websocket

let web_socket = new WebSocket({
    client_code: "CLIENT_CODE",
    feed_token: "FEED_TOKEN"
});

web_socket.connect()
    .then(() => {
        web_socket.runScript("SCRIPT", "TASK") // SCRIPT: nse_cm|2885, mcx_fo|222900  TASK: mw|sfi|dp

        setTimeout(function () {
            web_socket.close()
        }, 3000)
    })

web_socket.on('tick', receiveTick)


function receiveTick(data) {
    console.log("receiveTick:::::", data)
}

 ########################### Socket Sample Code Ends Here ###########################

 ########################### Socket Sample Code Starts Here ###########################
// New websocket

let web_socket = new WebSocketClient({
    clientcode: "CLIENT_CODE",
    jwttoken: "jwt_token",
    apikey: "smartapi_key",
    feedtype: "order_feed",
});

web_socket.connect()
    .then(() => {
        web_socket.fetchData("ACTION_TYPE", "FEED_TYPE");  // ACTION_TYPE: subscribe | unsubscribe FEED_TYPE: order_feed

        setTimeout(function () {
            web_socket.close()
        }, 60000)
    });

web_socket.on('tick', receiveTick);


function receiveTick(data) {
    console.log("receiveTick:::::", data);
}

 ########################### Socket Sample Code Ends Here ###########################

 // ########################### Socket V2 Sample Code Start Here ###########################
let web_socket = new WebSocketV2({
	jwttoken: 'JWT_TOKEN',
	apikey: 'API_KEY',
	clientcode: 'Client_code',
	feedtype: 'FEED_TYPE',
});
 // for mode, action and exchangeTypes , can use values from constants file.
web_socket.connect().then((res) => {
	let json_req = {
		correlationID: 'correlation_id',
		action: 1,
		mode : 1,
		exchangeType: 1,
		tokens: ["123"],
	};

	web_socket.fetchData(json_req);
	web_socket.on('tick', receiveTick);

	function receiveTick(data) {
		console.log('receiveTick:::::', data);
	}
});

// ########################### Socket V2 Sample Code End Here ###########################
```
## Version 1.0.21
- TLS Version Upgrade
## IF Facing issue Https module not found error in smartApi, run the below command
npm install https

## Version 1.0.22
- Added error logs using winston
- It will create Error file if not created early , will capture error logs in the same file.

## Version 1.0.23
- Integrated EDIS anD Brokerage Calculator API
- INtegrated Option Greeks,op Gainers/Losers, PCR and OI Buildup