const Joi = require('joi');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// MongoDB model for Genre collection
const Customer = mongoose.model('Customer', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 10
    },
    isGold: {
        type: Boolean,
        default: false,
    }
}));


/**--------------ListCreateView------------
 * endpoint: /api/customers/
 * GET request for querying all customers
 * POST request for creating a customer
 *-----------------------------------------*/

router.get('/', async (req, res) => {
    const customers = await Customer.find().sort("name");
    res.send(customers);
})

router.post('/', async (req, res) => {
    const result = validateReq(req.body);
    // console.log(result.error);
    if (result.error) return res.status(400).send(result.error.details[0].message);

    let new_customer = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold,
    });

    new_customer = await new_customer.save();
    res.send(new_customer);
})


/**--------------DetailView------------
 * endpoint: /api/customers/:id
 * GET request for querying <id> customer
 * PUT request for updating <id> customer
 * DELETE for deleting <id> customer
 *-----------------------------------------*/

router.get('/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).send('There is no customer with this specifid id');
    res.status(200).send(customer);
})


router.put('/:id', async (req, res) => {
    const result = validateReq(req.body);
    console.log(result.error);
    if (result.error) return res.status(400).send(result.error.details[0].message);

    // Update
    const customer = await Customer.findByIdAndUpdate({ _id: req.params.id }, {
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold,
    }, { new: true });

    if (!customer) return res.status(404).send('The customer with the given ID was not found.');
    res.send(customer);
})


router.delete('/:id', async (req, res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id);
    if (!customer) return res.status(404).send('There is no customer with this specifid id');
    res.send(customer);
})

// Utils func
function validateReq(customer) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        phone: Joi.string().min(5).max(10).required(),
        isGold: Joi.boolean()
    };
    const result = Joi.validate(customer, schema);
    return result;
}


module.exports = router;