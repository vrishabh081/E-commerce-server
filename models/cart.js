const mongoose = require("mongoose");


// schema-
const cartSchema = mongoose.Schema({
    name: {type: String},
    productPic: {type: String},
    quantity: {type: Number},
    price: {type: Number},
    category: {type: String},
    userGmail: {type: String},
    createdAt: {type: String}
})


// model-
const CartModel = mongoose.model("cart", cartSchema);


// exports-
module.exports = CartModel;