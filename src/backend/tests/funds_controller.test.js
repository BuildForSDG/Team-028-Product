require("mysql2/node_modules/iconv-lite").encodingExists("foo");

const supertest = require("supertest");
const { app } = require("../app");
const fundsControllers = require("../controller/funds.controller");

let apiServer;

describe("create()", () => {
  beforeEach(async () => {
    if(!(apiServer && apiServer.listen)){
      apiServer = supertest(app);
    } 
  });
  afterEach(async () => {
    if (apiServer.close){
      await apiServer.close();
    } 
  });
  it("should be a function", () => {
    const res = typeof fundsControllers.create;
    expect(res).toEqual("function");
  });
  it("should not create funds when no data is sent", async () => {
    const res = await apiServer.post("/invest");
    expect(res.statusCode).toEqual(400);
  });
  it("should create funds when valid data", async () => {
    const res = await apiServer.post("/invest").send({
      fundId: 1,
      organizationId: 1,
      fundCatId: 2,
      amount: 2000,
      status: "success",
      dateInitiated: "12-03-1999"
    });
    expect(res.statusCode).toEqual(200);
  });
});

describe("GET /funds with findAll()", () => {
  beforeEach(async () => {
    if (!(apiServer && apiServer.listen)) {
      apiServer = supertest(app);
    }
  });
  afterEach(async () => {
    if (apiServer.close) {
      await apiServer.close();
    }
  });
  it("findAll() should be a function", () => {
    const res = typeof fundsControllers.findAll;
    expect(res).toEqual("function");
  });
  it("should fetch funds from the server", async () => {
    const res = await apiServer.get("/funds");
    expect(res.statusCode).toEqual(200);
  });
});

describe("GET /funds/status with findOne()", () => {
  beforeEach(async () => {
    if (!(apiServer && apiServer.listen)) {
      apiServer = supertest(app);
    }
  });
  afterEach(async () => {
    if (apiServer.close) {
      await apiServer.close();
    }
  });
  it("findOne() should be a function", () => {
    const res = typeof fundsControllers.findOne;
    expect(res).toEqual("function");
  });
  it("should fetch single fund info from the server", async () => {
    const res = await apiServer.get("/funds/status").send({ status: "3" });
    expect(res.statusCode).toEqual(200);
  });
  it("should not fetch fund data for an invalid id", async () => {
    const res = await apiServer.get("/funds/status").send({ disbursementId: "sgio" });
    expect(res.statusCode).toEqual(404);
  });
});

