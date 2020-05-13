/* eslint-disable quotes */
const fs = require("fs");

describe("Test if the frontend and backend servers exist", () => {
  test("check if backend server exist", () => {
    const backend = fs.readFileSync("./src/backend/package.json");
    expect(backend).toBeDefined();
  });

  test("check if frontend server exist", () => {
    const frontend = fs.readFileSync("./src/frontend/package.json");
    expect(frontend).toBeDefined();
  });
});
