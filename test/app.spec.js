const app = require("../src/app");

describe(`GET /`, () => {
  context(`App smoke test`, () => {
    it("Loads server without crashing", () => {
      return supertest(app).get("/").expect(200);
    });
  });
});
