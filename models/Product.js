const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: String,
    category: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectID,
        ref: "User",
        required: true
    },
});

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;