const express = require("express");
const request = require("supertest");

const app = express();
const routes = require("./index");
app.use("/", routes);

describe("routes", () => {
  const filteredAndFlattenedResult = {
    key: "Allstate",
    carrier: "Allstate",
    state: "il",
    auto: true,
    fire: true,
    flood: false,
  };
  it("GET /carriers - single policy", async () => {
    const { text } = await request(app).get("/carriers?state=il&coverage=auto");

    expect(JSON.parse(text).length).toBe(6);
    expect(JSON.parse(text).shift()).toStrictEqual(filteredAndFlattenedResult);
  });

  it("GET /carriers - multiple policies", async () => {
    const { text } = await request(app).get(
      "/carriers?state=il&coverage=auto,fire"
    );

    expect(JSON.parse(text).length).toEqual(5);
    expect(JSON.parse(text).shift()).toStrictEqual(filteredAndFlattenedResult);
  });
});
