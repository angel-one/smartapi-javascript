let { SmartAPI, WebSocketClient, WebSocketV2 } = require("../lib");
var chai = require("chai");
var expect = chai.expect;

let smart_api = new SmartAPI({
  api_key: "VG2s34Cq",
  // OPTIONAL : If user has valid access token and refresh token then it can be directly passed to the constructor
  access_token:
    "eyJhbGciOiJIUzUxMiJ9.eyJ1c2VybmFtZSI6IkE1MjE2MzEzNCIsInJvbGVzIjowLCJ1c2VydHlwZSI6IlVTRVIiLCJ0b2tlbiI6ImV5SmhiR2NpT2lKSVV6VXhNaUlzSW5SNWNDSTZJa3BYVkNKOS5leUp6ZFdJaU9pSkJOVEl4TmpNeE16UWlMQ0psZUhBaU9qRTJPVGMxTXpFeE16QXNJbWxoZENJNk1UWTVOelF6TWpjMU5pd2lhblJwSWpvaU9Ea3pZMlUxWldVdFltRTNOQzAwT1RRd0xXRmhabUV0TnpJeVpHUmxPVFprWXpSbUlpd2liMjF1WlcxaGJtRm5aWEpwWkNJNk9Dd2ljMjkxY21ObGFXUWlPaUl6SWl3aWRYTmxjbDkwZVhCbElqb2lZMnhwWlc1MElpd2lkRzlyWlc1ZmRIbHdaU0k2SW5SeVlXUmxYMkZqWTJWemMxOTBiMnRsYmlJc0ltZHRYMmxrSWpvNExDSnpiM1Z5WTJVaU9pSXpJbjAuRzlxSnl1ZmxxVTdkM1JNckhGRzRkdXVaV3FJSHZPLTBmRkxpQmFCR0V1bm5SeDFsMWt0QktZWlpwczY2RzBNWVFwOXIxdWlWa0V6R05fZkctVWlJZXciLCJBUEktS0VZIjoiVkcyczM0Q3EiLCJpYXQiOjE2OTc0MzI4MTYsImV4cCI6MTY5NzUzMTEzMH0.cNBTyw40c0eW_ZyXi4Dh4ZZ5MVDykbWrsEXaBzercNl2JjNwD0hpU5I_7Y42uDsCP6StZX-MfMU6yNw5BSrNTg",
  refresh_token:
    "eyJhbGciOiJIUzUxMiJ9.eyJ0b2tlbiI6IlJFRlJFU0gtVE9LRU4iLCJSRUZSRVNILVRPS0VOIjoiZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SnpkV0lpT2lKQk5USXhOak14TXpRaUxDSmxlSEFpT2pFMk9UYzBOell3TVRZc0ltbGhkQ0k2TVRZNU56UXpNamMxTml3aWFuUnBJam9pWVdKbU5tVmhNMll0TnprelpDMDBObU0xTFRneFlUVXRZMlUxT1Rjell6azVOV1V6SWl3aWRHOXJaVzRpT2lKU1JVWlNSVk5JTFZSUFMwVk9JaXdpZFhObGNsOTBlWEJsSWpvaVkyeHBaVzUwSWl3aWRHOXJaVzVmZEhsd1pTSTZJblJ5WVdSbFgzSmxabkpsYzJoZmRHOXJaVzRpZlEuTTRYb1dkTHVnS043YnJFSW1TZXMwc190X29DNTF1amdmc1NmbUFpOU5SRTVkYXNBUDVTUWhkejN1VHdEaGtyakVDWXZxTHFhTTBiMzBYN3BHMnNaX1EiLCJpYXQiOjE2OTc0MzI4MTZ9.wiFmh17e52K7YZbWaX4JD949RRDVd3C76gZ7C3RBpmygIN164jbpC0N1tHEWn_QLh4Fk8bQfAeSGRT1pTjxJag",
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


