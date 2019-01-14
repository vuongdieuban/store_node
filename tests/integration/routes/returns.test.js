const request = require("supertest");
const moment = require("moment");
const { Rental } = require("../../../models/rentals");
const { User } = require("../../../models/users");
const { Movie } = require("../../../models/movies");

const mongoose = require("mongoose");

describe("/api/returns", () => {
  let server;
  let _customerId;
  let _movieId;
  let rental;
  let token;
  let movie;

  const exec = async () => {
    const res = await request(server)
      .post("/api/returns")
      .set("x-auth-token", token)
      .send({ customerId: _customerId, movieId: _movieId });
    return res;
  };

  beforeEach(async () => {
    server = require("../../../index.js");
    token = new User().generateAuthToken();
    _customerId = new mongoose.Types.ObjectId().toHexString();
    _movieId = new mongoose.Types.ObjectId().toHexString();

    rental = new Rental({
      customer: {
        _id: _customerId,
        name: "BanVuong",
        phone: "1234567"
      },
      movie: {
        _id: _movieId,
        name: "SuperMan",
        dailyRentalRate: 2
      }
    });
    await rental.save();

    movie = new Movie({
      _id : _movieId,
      name : "SuperMan", 
      dailyRentalRate: 2,
      genre : { name : "Action"},
      numberInStock:10
    })
    await movie.save();
  });

  afterEach(async () => {
    await Movie.deleteMany({}); // clear the database
    await Rental.deleteMany({}); // clear the database
    await server.close();
  });

  it("should return 401 if client is not logged in", async () => {
    token = "";
    const res = await exec();
    expect(res.status).toBe(401);
  });

  it("should return 400 if customerId is not provided", async () => {
    _customerId = "";
    const res = await exec();
    expect(res.status).toBe(400);
  });

  it("should return 400 if movieId is not provided", async () => {
    _movieId = "";
    const res = await exec();
    expect(res.status).toBe(400);
  });

  it("should return 404 if no rental found for this customerId/movieId", async () => {
    await Rental.deleteOne({});
    const res = await exec();
    expect(res.status).toBe(404);
  });

  it("should return 400 if return has already processed (aka dateReturned already set)", async () => {
    rental.dateReturned = new Date();
    await rental.save(); 
    const res = await exec();
    expect(res.status).toBe(400);
  });

  it("should set the return date if input is valid", async ()=>{
    const res = await exec();
    expect(res.body).toHaveProperty("dateReturned");
    expect(res.status).toBe(200);
  });

  it("should set the rental fee if input is valid", async ()=>{
    rental.dateRented = moment().add(-7, "days").toDate();
    await rental.save();

    const res = await exec();
    const rentalInDb = await Rental.findById(rental._id);
    expect(rentalInDb.rentalFee).toBe(14);
  });

  it("should increase numberInStock by 1 of the movie if input is valid", async ()=>{
    const res = await exec();
    const movieInDb = await Movie.findById(_movieId);
    expect(movieInDb.numberInStock).toBe(movie.numberInStock+1);
  });

  it("should match the rental if input is valid", async ()=>{
    const res = await exec();
    expect(res.body).toHaveProperty("customer");
    expect(res.body).toHaveProperty("movie");
    expect(res.body).toHaveProperty("dateRented");
    expect(res.body).toHaveProperty("dateReturned");
    expect(res.body).toHaveProperty("rentalFee");
  });
});
