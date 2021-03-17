var ParserService = require("./parser");
describe("ParserService", () => {
  let service;
  beforeEach(async () => {
    service = new ParserService();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should fetch carrier data", async () => {
    const promise = service.fetchCarriers();
    return promise.then((data) => {
      expect(data.length).toBe(10);
    });
  });
});
