require("mysql2/node_modules/iconv-lite").encodingExists("foo");

const supertest = require("supertest");
const { app } = require("../app");
const fundDisbusControllers = require("../controller/fundDisbursment.controller");

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
    const res = typeof fundDisbusControllers.create;
    expect(res).toEqual("function");
  });
  it("should not disburse fund  when no data is sent", async () => {
    const res = await apiServer.post("/disbursements");
    expect(res.statusCode).toEqual(500);
  });
  it("should disburse fund with valid data", async () => {
    const res = await apiServer.post("/disbursements").send({
      disbursementId: 2,
      applicationId: 2,
      fundId: 1,
      disbursedBy: "1",
      bankName: "GTBanks",
      accountNunber: "1202394004",
      status: "success"
    });
    expect(res.statusCode).toEqual(200);
  });
});

describe("GET /disbursed/all with findAll()", () => {
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
    const res = typeof fundDisbusControllers.findAll;
    expect(res).toEqual("function");
  });
  it("should fetch fund disbursements from the server", async () => {
    const res = await apiServer.get("/disbursed/all");
    expect(res.statusCode).toEqual(200);
  });
});

describe("GET /disbursed with findOne()", () => {
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
    const res = typeof fundDisbusControllers.findOne;
    expect(res).toEqual("function");
  });
  it("should fetch single fund disbursement info from the server", async () => {
    const res = await apiServer.get("/disbursed").send({ disbursementId: "2" });
    expect(res.statusCode).toEqual(200);
  });
  it("should not fetch fund disbursement data for an invalid id", async () => {
    const res = await apiServer.get("/disbursed").send({ disbursementId: "slfkgio" });
    expect(res.statusCode).toEqual(404);
  });
});

