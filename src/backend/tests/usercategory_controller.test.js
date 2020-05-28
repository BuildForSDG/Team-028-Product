require("mysql2/node_modules/iconv-lite").encodingExists("foo");

const supertest = require("supertest");
const { app } = require("../app");
const userCatControllers = require("../controller/userCat.controller");

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
    const res = typeof userCatControllers.create;
    expect(res).toEqual("function");
  });
  it("should not create user category when no data is sent", async () => {
    const res = await apiServer.post("/category");
    expect(res.statusCode).toEqual(500);
  });
  it("should create user category with valid data", async () => {
    const res = await apiServer.post("/category").send({
      userCatId: 1,
      userId: 1,
      categoryName: "SME",
      description: "small scale enterprise",
      createdBy: "1"
    });
    expect(res.statusCode).toEqual(200);
  });
});

describe("GET /category/all with findAll()", () => {
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
    const res = typeof userCatControllers.findAll;
    expect(res).toEqual("function");
  });
  it("should fetch all user categories from the server", async () => {
    const res = await apiServer.get("/category/all");
    expect(res.statusCode).toEqual(200);
  });
});