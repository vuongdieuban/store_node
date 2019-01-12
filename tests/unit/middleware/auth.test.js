const { User } = require("../../../models/users");
const auth = require("../../../middleware/auth");
const mongoose = require("mongoose");

describe("auth middleware", () => {
  it("should set req.user into appropriate payload after decoded valid jwt token", () => {
    const mock_user = {
      _id: new mongoose.Types.ObjectId().toHexString(),
      isAdmin: true
    };
    const token = new User(mock_user).generateAuthToken();
    const req = {
      header: jest.fn().mockReturnValue(token)
    };
    const res = {};
    const next = jest.fn();
    auth(req, res, next);
    expect(req.user).toMatchObject(mock_user);
  });
});
