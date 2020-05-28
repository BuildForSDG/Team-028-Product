require("mysql2/node_modules/iconv-lite").encodingExists("foo");

const supertest = require("supertest");
const { app } = require("../app");
const userLoginControllers = require("../controller/userLogin.controller");

let apiServer;

describe("GET /login with findOne()", () => {
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
    const res = typeof userLoginControllers.findOne;
    expect(res).toEqual("function");
  });
  it("should login with valid data", async () => {
    const res = await apiServer.post("/login");
    expect(res.statusCode).toEqual(200).send({ username: "sme", password: "admin" });
  });
  it("should not login with invalid data", async () => {
    const res = await apiServer.get("/login").send({ username: "test", password: "password" });
    expect(res.statusCode).toEqual(404);
  });
});
