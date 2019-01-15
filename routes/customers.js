const auth = require("../middleware/auth");
const admin = require("../middleware/admin.js");
const { Customer, validate } = require("../models/customers");
const express = require("express");
const validateObjectId = require("../middleware/validateObjectId");
const router = express.Router();

/**--------------ListCreateView------------
 * endpoint: /api/customers/
 * GET request for querying all customers
 * POST request for creating a customer
 *-----------------------------------------*/

router.get("/", async (req, res) => {
  const customers = await Customer.find().sort("name");
  res.send(customers);
});

router.post("/", auth, async (req, res) => {
  const result = validate(req.body);
  // console.log(result.error);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  let new_customer = new Customer({
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold
  });

  new_customer = await new_customer.save();
  res.send(new_customer);
});

/**--------------DetailView------------
 * endpoint: /api/customers/:id
 * GET request for querying <id> customer
 * PUT request for updating <id> customer
 * DELETE for deleting <id> customer
 *-----------------------------------------*/

router.get("/:id", validateObjectId, async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer)
    return res.status(404).send("There is no customer with this specifid id");
  res.status(200).send(customer);
});

router.put("/:id", validateObjectId, auth, async (req, res) => {
  const result = validate(req.body);
  console.log(result.error);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  // Update
  const customer = await Customer.findByIdAndUpdate(
    { _id: req.params.id },
    {
      name: req.body.name,
      phone: req.body.phone,
      isGold: req.body.isGold
    },
    { new: true }
  );

  if (!customer)
    return res.status(400).send("There is no customer with this specifid id");
  res.send(customer);
});

router.delete("/:id", validateObjectId, [auth, admin], async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);
  if (!customer) return res.status(400).send("Invalid Customer");
  res.send(customer);
});

module.exports = router;
