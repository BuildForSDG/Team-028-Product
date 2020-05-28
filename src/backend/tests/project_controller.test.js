require("mysql2/node_modules/iconv-lite").encodingExists("foo");

const supertest = require("supertest");
const { app } = require("../app");
const projectControllers = require("../controller/project.controller");

let apiServer;

describe("create()", () => {
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
  it("should be a function", () => {
    const res = typeof projectControllers.create;
    expect(res).toEqual("function");
  });
  it("should not create projects when no data is sent", async () => {
    const res = await apiServer.post("/projects");
    expect(res.statusCode).toEqual(500);
  });
  it("should create projects with valid data", async () => {
    const res = await apiServer.post("/projects").send({
      projectId: 1,
      projectCatId: 2,
      projectName: "fishing support",
      description: "advance medium and small scale fish farms",
      createdBy: "1",
      dateStart: "23-01-2010",
      dateEnd: "24-10-2020"
    });
    expect(res.statusCode).toEqual(200);
  });
});

describe("GET /projects/list with findAll()", () => {
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
    const res = typeof projectControllers.findAll;
    expect(res).toEqual("function");
  });
  it("should fetch all projects from the server", async () => {
    const res = await apiServer.get("/projects/list");
    expect(res.statusCode).toEqual(200);
  });
});

describe("GET /project with findOne()", () => {
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
    const res = typeof projectControllers.findOne;
    expect(res).toEqual("function");
  });
  it("should fetch single project info from the server", async () => {
    const res = await apiServer.get("/project").send({ projectId: 1 });
    expect(res.statusCode).toEqual(200);
  });
  it("should not fetch project data for an invalid id", async () => {
    const res = await apiServer.get("/project").send({ projectId: "dfasdf" });
    expect(res.statusCode).toEqual(400);
  });
});
