require("mysql2/node_modules/iconv-lite").encodingExists("foo");

const supertest = require("supertest");
const { app } = require("../app");
const roleControllers = require("../controller/role.controller");

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
    const res = typeof roleControllers.create;
    expect(res).toEqual("function");
  });
  it("should not create role when no data is sent", async () => {
    const res = await apiServer.post("/roles");
    expect(res.statusCode).toEqual(400);
  });
  it("should create role when valid data", async () => {
    const res = await apiServer.post("/roles").send({
      roleName: "Admin",
      description: "Manage user processes",
      dateCreated: "2013-07-04"
    });
    expect(res.statusCode).toEqual(200);
  });
});

describe("GET /roles/all with findAll()", () => {
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
    const res = typeof roleControllers.findAll;
    expect(res).toEqual("function");
  });
  it("should fetch roles from the server", async () => {
    const res = await apiServer.get("/roles/all");
    expect(res.statusCode).toEqual(200);
  });
});

