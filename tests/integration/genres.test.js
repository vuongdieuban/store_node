const request = require("supertest");
const { Genre } = require("../../models/genres");
const mongoose = require("mongoose");

let server;

describe("/api/genres -- test the routes", () => {
  beforeEach(() => {
    server = require("../../index.js");
  });
  afterEach(async () => {
    server.close();
    await Genre.remove({}); // clear the database
  });

  describe("GET", () => {
    it("should return all genres", async () => {
      await Genre.collection.insertMany([
        { name: "genre1" },
        { name: "genre2" }
      ]);
      const res = await request(server).get("/api/genres");
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some(g => g.name === "genre1")).toBeTruthy();
      expect(res.body.some(g => g.name === "genre2")).toBeTruthy();
    });
  });

  describe("GET /:id", () => {
    it("should return specified genred with id", async () => {
      const genre = await Genre.collection.insertOne({ name: "genre1" });
      const res = await request(server).get(`/api/genres/${genre._id}`);
      expect(res.body).toHaveProperty("name", genre.name);

      // genre is an object while res is a string (Json), hence the test below will fail
      // expect(res.body).toMatchObject(genre);
    });

    it("should return 404 if invalid id", async () => {
      const res = await request(server).get("/api/genres/1");
      expect(res.status).toBe(404);
    });
  });
});
