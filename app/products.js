const express = require('express');
const router = express.Router();
const config = require("../config");
const Product = require('../models/Product');
const auth = require('../middleware/auth');

router.get('/', async (req, res) => {
    let query;
    if (req.query.category) {
        query = {category: req.query.category}
    }
    const result = await Product.find(query);
    if (result) {
        res.send(result);
    } else {
        res.sendStatus(404);
    }
});

router.get('/:id', async (req, res) => {

    const result = await Product.findById(req.params.id).populate({path: "user"});
    if (result) {
        res.send(result);
    } else {
        res.sendStatus(404);
    }
});

router.post('/', auth, config.upload.single("image"), async (req, res) => {
    const productData = req.body;
    if (req.file) {
        productData.image = req.file.filename;
    }
    productData.user = req.user._id;
    const product = new Product(productData)
    try {
        await product.save();
        res.send(product);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.delete('/:id', auth, async (req, res) => {
    const result = await Product.findById({_id: req.params.id}).populate({path: "user"});
    if (req.user._id.toString() === result.user._id.toString()) {
        const newResult = await Product.findByIdAndDelete({_id: req.params.id});
        if (newResult) {
            res.send("Task removed");
        }
    } else {
        res.status(403).send({error: "Unauthorized"});
    }
});

module.exports = router;