const request = require("supertest");
const { Genre } = require("../../../models/genres");
const { User } = require("../../../models/users");
const mongoose = require("mongoose");

let server;

describe("/api/genres -- test the genre routes", () => {
  // beforeEach() runs every time before each test (before the describe('...') block)
  beforeEach(() => {
    server = require("../../../index.js");
  });

  afterEach(async () => {
    server.close();
    await Genre.deleteMany({}); // clear the database
  });

  describe("GET /:id", () => {
    it("should return 404 if invalid id", async () => {
      const res = await request(server).get("/api/genres/1");
      expect(res.status).toBe(404);
    });

    it("should return 404 if id is valid but genre not found", async () => {
      const id = new mongoose.Types.ObjectId().toHexString();
      const res = await request(server).get("/api/genres/" + id);
      expect(res.status).toBe(404);
    });

    it("should return specified genred with id", async () => {
      const genre = new Genre({ name: "genre1" });
      await Genre.collection.insertOne(genre);
      const res = await request(server).get(`/api/genres/${genre._id}`);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("name", genre.name);

      // genre is an object while res is a string (Json), hence the test below will fail
      // expect(res.body).toMatchObject(genre);
    });
  });

  describe("GET /", () => {
    jest.setTimeout(10000);
    it("should return all genres", async () => {
      const genres = [{ name: "genre1" }, { name: "genre2" }];
      await Genre.collection.insertMany(genres);
      const res = await request(server).get("/api/genres");
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some(g => g.name === "genre1")).toBeTruthy();
      expect(res.body.some(g => g.name === "genre2")).toBeTruthy();
    });
  });

  describe("POST /", () => {
    // Define Response code block. res is data returned from server after making a request to an endpoint
    let token;
    let _name;
    const exec = async () => {
      const res = await request(server)
        .post("/api/genres")
        .set("x-auth-token", token)
        .send({ name: _name });
      return res;
    };

    beforeEach(() => {
      // generate a valid JWT auth token to access the route before each test runs.
      token = new User().generateAuthToken();
    });

    afterEach(async () => {
      await Genre.deleteMany({}); // clear the database
    });

    it("should return 401 if client is not logged in", async () => {
      token = "";
      const res = await exec();
      expect(res.status).toBe(401);
    });

    it("should return 400 if genre name has less than 5 chars", async () => {
      _name = "gen";
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("should return 400 if genre name has more than 50 chars", async () => {
      _name = new Array(52).join("a"); // produce a string of 51 chars
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("should save the genre if input is valid", async () => {
      _name = "genre1";
      const res = await exec();
      const saved_genre = await Genre.find({ name: _name });
      expect(saved_genre).not.toBeNull();
    });

    it("should return the genre if input is valid", async () => {
      _name = "genre1";
      const res = await exec();
      expect(res.body).toHaveProperty("_id");
      expect(res.body).toHaveProperty("name", _name);
    });
  });

  describe("PUT /:id", () => {
    let id;
    let token;
    let new_name;
    const exec = async () => {
      const res = await request(server)
        .put("/api/genres/" + id)
        .set("x-auth-token", token)
        .send({ name: new_name });
      return res;
    };

    beforeEach(async () => {
      token = new User({ isAdmin: true }).generateAuthToken();
      genre = new Genre({ name: "genre" });
      await genre.save();
      id = genre._id;
      new_name = "new_genreName";
    });

    afterEach(async () => {
      await Genre.deleteMany({}); // clear the database
    });

    it("should return 401 if client is not logged in", async () => {
      token = "";
      const res = await exec();
      expect(res.status).toBe(401);
    });

    it("should return 404 for invalid ID", async () => {
      id = "123";
      const res = await exec();
      expect(res.status).toBe(404);
    });

    it("should return 404 for invalid genre", async () => {
      id = new mongoose.Types.ObjectId().toHexString();
      const res = await exec();
      expect(res.status).toBe(404);
    });

    it("should return 400 if genre name has less than 5 chars", async () => {
      new_name = "gen";
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("should return 400 if genre name has more than 50 chars", async () => {
      new_name = new Array(52).join("a"); // produce a string of 51 chars
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("should return the updated genre if everything is valid", async () => {
      const res = await exec();
      const updated_genre = await Genre.findById(id);
      expect(res.body).toHaveProperty("_id");
      expect(res.body).toHaveProperty("name", updated_genre.name);
    });
  });

  describe("DELETE /:id", () => {
    let id;
    let token;

    const exec = async () => {
      const res = await request(server)
        .delete("/api/genres/" + id)
        .set("x-auth-token", token)
        .send({});
      return res;
    };

    beforeEach(async () => {
      token = new User({ isAdmin: true }).generateAuthToken();
      genre = new Genre({ name: "genre" });
      await genre.save();
      id = genre._id;
    });

    afterEach(async () => {
      await Genre.collection.deleteMany({});
    });

    it("should return 401 if user not logged in", async () => {
      token = "";
      const res = await exec();
      expect(res.status).toBe(401);
    });

    it("should return 403 if user is not admin", async () => {
      token = new User().generateAuthToken();
      const res = await exec();
      expect(res.status).toBe(403);
    });

    it("should return 404 for invalid id", async () => {
      id = "123";
      const res = await exec();
      expect(res.status).toBe(404);
    });

    it("should return 404 for invalid genre", async () => {
      id = new mongoose.Types.ObjectId().toHexString();
      const res = await exec();
      expect(res.status).toBe(404);
    });

    it("should return the genre that got removed if everything is valid", async () => {
      const res = await exec();
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("_id");
      expect(res.body).toHaveProperty("name", "genre");
    });
  });
});
