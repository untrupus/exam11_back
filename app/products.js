const express = require('express');
const router = express.Router();
const config = require("../config");
const Product = require('../models/Product');
const auth = require('../middleware/auth');

router.get('/', async (req, res) => {
    const result = await Product.find();
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

module.exports = router;