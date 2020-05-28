require("mysql2/node_modules/iconv-lite").encodingExists("foo");

const supertest = require("supertest");
const { app } = require("../app");
const fundAppControllers = require("../controller/fundApplication.controller");

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
    const res = typeof fundAppControllers.create;
    expect(res).toEqual("function");
  });
  it("should not apply for fund when no data is sent", async () => {
    const res = await apiServer.post("/fund/apply");
    expect(res.statusCode).toEqual(400);
  });
  it("should make a fund application with valid data", async () => {
    const res = await apiServer.post("/fund/apply").send({
      applicationId: 1,
      userId: 2,
      fundId: 1,
      fundCatId: 2,
      status: "success"
    });
    expect(res.statusCode).toEqual(200);
  });
});

describe("GET /fund/applications/list with findAll()", () => {
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
  it("findAll() should be a function", () => {
    const res = typeof fundAppControllers.findAll;
    expect(res).toEqual("function");
  });
  it("should fetch all fund applications from the server", async () => {
    const res = await apiServer.get("/fund/applications/list");
    expect(res.statusCode).toEqual(200);
  });
});

describe("GET /fund/application/:id with findOne()", () => {
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
  it("findOne() should be a function", () => {
    const res = typeof fundAppControllers.findOne;
    expect(res).toEqual("function");
  });
  it("should fetch single fund application info from the server", async () => {
    const res = await apiServer.get("/fund/application/1");
    expect(res.statusCode).toEqual(200);
  });
  it("should not fetch fund application data for an invalid id", async () => {
    const res = await apiServer.get("/fund/application/dfdfe");
    expect(res.statusCode).toEqual(500);
  });
});