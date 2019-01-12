const request = require("supertest");
const { User } = require("../../../models/users");
const { Genre } = require("../../../models/genres");

describe("auth middleware", () => {
  beforeEach(() => {
    server = require("../../../index.js");
  });
  afterEach(async () => {
    server.close();
    await Genre.deleteMany({}); // clear the database
  });

  let token;
  const exec = async () => {
    const res = await request(server)
      .post("/api/genres")
      .set("x-auth-token", token)
      .send({ name: "genre1" });
    return res;
  };

  it("should return 401 if no token is provided", async () => {
    token = "";
    const res = await exec();
    expect(res.status).toBe(401);
  });

  it("should return 400 if token is invalid", async () => {
    token = "abc";
    const res = await exec();
    expect(res.status).toBe(400);
  });

  it("should return 200 token is valid", async () => {
    token = new User().generateAuthToken();
    const res = await exec();
    expect(res.status).toBe(200);
  });
});
