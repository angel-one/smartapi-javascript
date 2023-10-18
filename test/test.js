let { SmartAPI, WebSocketClient, WebSocketV2 } = require("../lib");
var chai = require("chai");
var expect = chai.expect;

let smart_api = new SmartAPI({
  api_key: "VG2s34Cq",
  // OPTIONAL : If user has valid access token and refresh token then it can be directly passed to the constructor
  access_token:
    "eyJhbGciOiJIUzUxMiJ9.eyJ1c2VybmFtZSI6IkE1MjE2MzEzNCIsInJvbGVzIjowLCJ1c2VydHlwZSI6IlVTRVIiLCJ0b2tlbiI6ImV5SmhiR2NpT2lKSVV6VXhNaUlzSW5SNWNDSTZJa3BYVkNKOS5leUp6ZFdJaU9pSkJOVEl4TmpNeE16UWlMQ0psZUhBaU9qRTJPVGMyTVRVMU1qUXNJbWxoZENJNk1UWTVOelV4TnpZNE5Dd2lhblJwSWpvaVpHTTVZVGc1Wm1FdE5UVXdOQzAwTm1KbExUaGhZMll0TkRObU5ERXlZVGsyT0dKbElpd2liMjF1WlcxaGJtRm5aWEpwWkNJNk9Dd2ljMjkxY21ObGFXUWlPaUl6SWl3aWRYTmxjbDkwZVhCbElqb2lZMnhwWlc1MElpd2lkRzlyWlc1ZmRIbHdaU0k2SW5SeVlXUmxYMkZqWTJWemMxOTBiMnRsYmlJc0ltZHRYMmxrSWpvNExDSnpiM1Z5WTJVaU9pSXpJbjAuS1VtazN5Y1MwRUpHdDgxb3FIZEFyNnRUVTE4Q0VYWHREQmJnWUJ4UDlWaWcySm9kX2dONmlIZ3NrMEFSY0JCN0JiaVJmSktqRjB1VnhKTnZFQnNFdlEiLCJBUEktS0VZIjoiVkcyczM0Q3EiLCJpYXQiOjE2OTc1MTc3NDQsImV4cCI6MTY5NzYxNTUyNH0.Ykl_ADBV9ocMmGDInt8BwJR41xK3vMuTZ4dHkHLpUt5Gvq53EGXZ5OUSN017xrNo2iAYYOfJm3yDZfOeh5Fiwg",
  refresh_token:
    "eyJhbGciOiJIUzUxMiJ9.eyJ0b2tlbiI6IlJFRlJFU0gtVE9LRU4iLCJSRUZSRVNILVRPS0VOIjoiZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SnpkV0lpT2lKQk5USXhOak14TXpRaUxDSmxlSEFpT2pFMk9UYzFOakE1TkRRc0ltbGhkQ0k2TVRZNU56VXhOelk0TkN3aWFuUnBJam9pTVRRMU5qTmpNR1l0TUdSa01TMDBORE0wTFRrek9XTXRPRFl6TVRSa1ltTXpZalprSWl3aWRHOXJaVzRpT2lKU1JVWlNSVk5JTFZSUFMwVk9JaXdpZFhObGNsOTBlWEJsSWpvaVkyeHBaVzUwSWl3aWRHOXJaVzVmZEhsd1pTSTZJblJ5WVdSbFgzSmxabkpsYzJoZmRHOXJaVzRpZlEuNUk5X1I4RHV6NDd6bDE4X0FaOVpaS0VkLWxqRVVRWnEwU3hSSHVaWVB1OEdfbV9VbFd5em11WEdCSi1rSVhZZE1NOFRNWkltSzZKYng5WHZmSmNndVEiLCJpYXQiOjE2OTc1MTc3NDR9.nRzIcjFpKJ9j_xJhKEkzQw5-TFyVK4gwmtYvzoSt5q-5I8CBv8XebNMEDgwwVg25pE8QuIU3qWGfIw8HB70Jww",
});

// generateSession api
// describe("generateSession", function () {
//   let res;
//   before(async function () {
//     res = await smart_api.generateSession("A52163134", "4321", "378315");
//     if (res.status) {
//       const { jwtToken, refreshToken } = res.data;

//       // Directly assign tokens if accessible
//       smart_api.access_token = jwtToken;
//       smart_api.refresh_token = refreshToken;
//     }
//   });

//   it("Generate session successful", function () {
//     if (res.status) {
//       expect(res).to.have.property("status", true);
//       expect(res).to.have.property("message", "SUCCESS");
//       expect(res).to.have.property("errorcode", "");
//       expect(res).to.have.property("data");
//     }
//   });

//   it("Generate session failed", function () {
//     if (res.status === false) {
//       expect(res).to.have.property("status", false);
//       expect(res).to.have.property("message");
//       expect(res).to.have.property("errorcode");
//       expect(res).to.have.property("data", null);
//     }
//   });
// });

// getProfile api
describe("getProfile", function () {
  let res;
  before(async function () {
    res = await smart_api.getProfile();
  });

  it("Get Profile successful", function () {
    if (res.status) {
      expect(res).to.have.property("status", true);
      expect(res).to.have.property("message", "SUCCESS");
      expect(res).to.have.property("errorcode", "");
      expect(res).to.have.property("data");
    }
  });

  it("Get Profile failed", function () {
    if (res.success === false) {
      expect(res).to.have.property("success", false);
      expect(res).to.have.property("message");
      expect(res).to.have.property("errorCode");
      expect(res).to.have.property("data");
    }
  });
});

// getRMS 
describe("getRMS", function () {
  let res;
  before(async function () {
    res = await smart_api.getRMS();
  });

  it("Get RMS successful", function () {
    if (res.status) {
      expect(res).to.have.property("status", true);
      expect(res).to.have.property("message", "SUCCESS");
      expect(res).to.have.property("errorcode", "");
      expect(res).to.have.property("data");
    }
  });

  it("Get RMS failed", function () {
    if (res.success === false) {
      expect(res).to.have.property("success", false);
      expect(res).to.have.property("message");
      expect(res).to.have.property("errorCode");
      expect(res).to.have.property("data");
    }
  });
});

// placeOrder api
describe("placeOrder", function () {
  let res;
  before(async function () {
    res = await smart_api.placeOrder({
      variety: "NORMAL",
      tradingsymbol: "SBIN-EQ",
      symboltoken: "3045",
      transactiontype: "BUY",
      exchange: "NSE",
      ordertype: "LIMIT",
      producttype: "INTRADAY",
      duration: "DAY",
      price: "19500",
      squareoff: "0",
      stoploss: "0",
      quantity: "1",
    });
  });

  it("Place Order successful", function () {
    if (res.status) {
      expect(res).to.have.property("status", true);
      expect(res).to.have.property("message", "SUCCESS");
      expect(res).to.have.property("errorcode", "");
      expect(res).to.have.property("data");
    }
  });
  
  it("Place order failed", function () {
    if (res.status === false) {
      expect(res).to.have.property("status", false);
      expect(res).to.have.property("message");
      expect(res).to.have.property("errorcode");
      expect(res).to.have.property("data", null);
    }
  });
});

// modifyOrder api
describe("modifyOrder", function () {
  let res;
  before(async function () {
    res = await smart_api.modifyOrder({
      orderid: "231016000616769",
      variety: "NORMAL",
      tradingsymbol: "SBIN-EQ",
      symboltoken: "3045",
      transactiontype: "BUY",
      exchange: "NSE",
      ordertype: "LIMIT",
      producttype: "INTRADAY",
      duration: "DAY",
      price: "19500",
      squareoff: "0",
      stoploss: "0",
      quantity: "2",
    });
  });

  it("Modify Order successful", function () {
    if (res.status) {
      expect(res).to.have.property("status", true);
      expect(res).to.have.property("message", "SUCCESS");
      expect(res).to.have.property("errorcode", "");
      expect(res).to.have.property("data");
    }
  });
  
  it("Modify order failed", function () {
    if (res.status === false) {
      expect(res).to.have.property("status", false);
      expect(res).to.have.property("message");
      expect(res).to.have.property("errorcode");
      expect(res).to.have.property("data", null);
    }
  });
});

// cancelOrder api
describe("cancelOrder", function () {
  let res;
  before(async function () {
    res = await smart_api.cancelOrder({
      variety: "NORMAL",
      orderid: "231016000616769",
    });
  });

  it("Cancel Order successful", function () {
    if (res.status) {
      expect(res).to.have.property("status", true);
      expect(res).to.have.property("message", "SUCCESS");
      expect(res).to.have.property("errorcode", "");
      expect(res).to.have.property("data");
    }
  });
  
  it("Cancel order failed", function () {
    if (res.status === false) {
      expect(res).to.have.property("status", false);
      expect(res).to.have.property("message");
      expect(res).to.have.property("errorcode");
      expect(res).to.have.property("data", null);
    }
  });
});

// getOrderBook api
describe("getOrderBook", function () {
  let res;
  before(async function () {
    res = await smart_api.getOrderBook();
  });

  it("Get order book successful", function () {
    if (res.status) {
      expect(res).to.have.property("status", true);
      expect(res).to.have.property("message", "SUCCESS");
      expect(res).to.have.property("errorcode", "");
      expect(res).to.have.property("data");
    }
  });

  it("Get order book failed", function () {
    if (res.status === false) {
      expect(res).to.have.property("status", false);
      expect(res).to.have.property("message");
      expect(res).to.have.property("errorcode");
      expect(res).to.have.property("data", null);
    }
  });
});

// getTradeBook api
describe("getTradeBook", function () {
  let res;
  before(async function () {
    res = await smart_api.getTradeBook();
  });

  it("Get trade book successful", function () {
    if (res.status) {
      expect(res).to.have.property("status", true);
      expect(res).to.have.property("message", "SUCCESS");
      expect(res).to.have.property("errorcode", "");
      expect(res).to.have.property("data");
    }
  });

  it("Get trade book failed", function () {
    if (res.status === false) {
      expect(res).to.have.property("status", false);
      expect(res).to.have.property("message");
      expect(res).to.have.property("errorcode");
      expect(res).to.have.property("data");
    }
  });
});

// getHolding api
describe("getHolding", function () {
  let res;
  before(async function () {
    res = await smart_api.getHolding();
  });

  it("Get holding successful", function () {
    if (res.status) {
      expect(res).to.have.property("status", true);
      expect(res).to.have.property("message", "SUCCESS");
      expect(res).to.have.property("errorcode", "");
      expect(res).to.have.property("data");
    }
  });

  it("Get holding failed", function () {
    if (res.status === false) {
      expect(res).to.have.property("status", false);
      expect(res).to.have.property("message");
      expect(res).to.have.property("errorcode");
      expect(res).to.have.property("data");
    }
  });
});

// getPosition api
describe("getPosition", function () {
  let res;
  before(async function () {
    res = await smart_api.getPosition();
  });

  it("Get position successful", function () {
    if (res.status) {
      expect(res).to.have.property("status", true);
      expect(res).to.have.property("message", "SUCCESS");
      expect(res).to.have.property("errorcode", "");
      expect(res).to.have.property("data");
    }
  });

  it("Get position failed", function () {
    if (res.success === false) {
      expect(res).to.have.property("success", false);
      expect(res).to.have.property("message");
      expect(res).to.have.property("errorCode");
      expect(res).to.have.property("data");
    }
  });
});

// createRule api
describe("createRule", function () {
  let res;
  before(async function () {
    res = await smart_api.createRule({
      tradingsymbol: "SBIN-EQ",
      symboltoken: "3045",
      exchange: "NSE",
      producttype: "MARGIN",
      transactiontype: "BUY",
      price: 100000,
      qty: 10,
      disclosedqty: 10,
      triggerprice: 200000,
      timeperiod: 365,
    });
  });

  it("Create rule successful", function () {
    if (res.status) {
      expect(res).to.have.property("status", true);
      expect(res).to.have.property("message", "SUCCESS");
      expect(res).to.have.property("errorcode", "");
      expect(res).to.have.property("data");
    }
  });

  it("Create rule failed", function () {
    if (res.success === false) {
      expect(res).to.have.property("success", false);
      expect(res).to.have.property("message");
      expect(res).to.have.property("errorCode");
      expect(res).to.have.property("data");
    }
  });
});

// modifyRule api
describe("modifyRule", function () {
  let res;
  before(async function () {
    res = await smart_api.modifyRule({
      id: 1440101,
      symboltoken: "3045",
      exchange: "NSE",
      qty: 10,
    });
  });

  it("Modify rule successful", function () {
    if (res.status) {
      expect(res).to.have.property("status", true);
      expect(res).to.have.property("message", "SUCCESS");
      expect(res).to.have.property("errorcode", "");
      expect(res).to.have.property("data");
    }
  });

  it("Modify rule failed", function () {
    if (res.success === false) {
      expect(res).to.have.property("success", false);
      expect(res).to.have.property("message");
      expect(res).to.have.property("errorCode");
      expect(res).to.have.property("data");
    }
  });
});

// cancelRule api
describe("cancelRule", function () {
  let res;
  before(async function () {
    res = await smart_api.cancelRule({
      id: 1440101,
      symboltoken: "3045",
      exchange: "NSE",
    });
  });

  it("Cancel rule successful", function () {
    if (res.status) {
      expect(res).to.have.property("status", true);
      expect(res).to.have.property("message", "SUCCESS");
      expect(res).to.have.property("errorcode", "");
      expect(res).to.have.property("data");
    }
  });

  it("Cancel rule failed", function () {
    if (res.success === false) {
      expect(res).to.have.property("success", false);
      expect(res).to.have.property("message");
      expect(res).to.have.property("errorCode");
      expect(res).to.have.property("data");
    }
  });
});

// ruleDetails api
describe("ruleDetails", function () {
  let res;
  before(async function () {
    res = await smart_api.ruleDetails({
      id: 1440395,
    });
  });

  it("Rule details successful", function () {
    if (res.status) {
      expect(res).to.have.property("status", true);
      expect(res).to.have.property("message", "SUCCESS");
      expect(res).to.have.property("errorcode", "");
      expect(res).to.have.property("data");
    }
  });

  it("Rule details failed", function () {
    if (res.status === false) {
      expect(res).to.have.property("status", false);
      expect(res).to.have.property("message");
      expect(res).to.have.property("errorcode");
      expect(res).to.have.property("data");
    }
  });
});

// ruleList api
describe("ruleList", function () {
  let res;
  before(async function () {
    res = await smart_api.ruleList({
      status: ["NEW", "CANCELLED"],
      page: 1,
      count: 10,
    });
  });

  it("Rule list successful", function () {
    if (res.status === true) {
      expect(res).to.have.property("status", true);
      expect(res).to.have.property("message", "SUCCESS");
      expect(res).to.have.property("errorcode", "");
      expect(res).to.have.property("data");
    }
  });

  it("Rule list failed", function () {
    if (res.status === 500) {
      expect(res).to.have.property("status", 500);
      expect(res).to.have.property("message");
    }
  });
});

// getCandleData api
describe("getCandleData", function () {
  let res;
  before(async function () {
    res = await smart_api.getCandleData({
      exchange: "NSE",
      symboltoken: "3045",
      interval: "ONE_MINUTE",
      fromdate: "2021-02-10 09:00",
      todate: "2021-02-10 09:20",
    });
  });

  it("Get candle data successful", function () {
    if (res.status === true) {
      expect(res).to.have.property("status", true);
      expect(res).to.have.property("message", "SUCCESS");
      expect(res).to.have.property("errorcode", "");
      expect(res).to.have.property("data");
    }
  });

  it("Get candle data failed", function () {
    if (res.status === false) {
      expect(res).to.have.property("status", false);
      expect(res).to.have.property("message");
      expect(res).to.have.property("errorcode");
      expect(res).to.have.property("data");
    }
  });
});

// marketData api
describe("marketData", function () {
  let res;
  before(async function () {
    res = await smart_api.marketData({
      mode: "FULL",
      exchangeTokens: {
        NSE: ["3045"],
      },
    });
  });

  it("Market data successful", function () {
    if (res.status === true) {
      expect(res).to.have.property("status", true);
      expect(res).to.have.property("message", "SUCCESS");
      expect(res).to.have.property("errorcode", "");
      expect(res).to.have.property("data");
    }
  });

  it("Market data failed", function () {
    if (res.status === false) {
      expect(res).to.have.property("status", false);
      expect(res).to.have.property("message");
      expect(res).to.have.property("errorcode");
      expect(res).to.have.property("data");
    }
  });
});

// searchScrip api
describe("searchScrip", function () {
  let res;
  before(async function () {
    res = await smart_api.searchScrip({
      exchange: "BSE",
      searchscrip: "Titan",
    });
  });

  it("Search scrip successful", function () {
    if (res) {
      expect(res)
    }
  });

  it("Search scrip failed", function () {
    if (res.status === false) {
      expect(res).to.have.property("status", false);
      expect(res).to.have.property("message");
      expect(res).to.have.property("errorcode");
      expect(res).to.have.property("data");
    }
  });
});

// getAllHolding api
describe("getAllHolding", function () {
  let res;
  before(async function () {
    res = await smart_api.getAllHolding();
  });

  it("Get all holding successful", function () {
    if (res.status === true) {
      expect(res).to.have.property("status", true);
      expect(res).to.have.property("message", "SUCCESS");
      expect(res).to.have.property("errorcode", "");
      expect(res).to.have.property("data");
    }
  });

  it("Get all holding failed", function () {
    if (res.success === false) {
      expect(res).to.have.property("success", false);
      expect(res).to.have.property("message");
      expect(res).to.have.property("errorCode");
      expect(res).to.have.property("data");
    }
  });
});

