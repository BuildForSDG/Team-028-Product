/* eslint-disable quotes */
/* eslint-disable import/no-unresolved */
/**
 * @jest-environment jsdom
 */

const app = require("../src/frontend/src/app");

describe("app module", () => {
  test("it exists", async () => {
    expect(app).toBeDefined();
  });

  test("it returns program name with SDGs", async () => {
    const result = await app();
    const sdgPos = (result || "").indexOf("SDG");
    expect(sdgPos).toBeGreaterThanOrEqual(0);
  });
});
