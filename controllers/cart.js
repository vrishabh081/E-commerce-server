const CartModel = require("../models/cart");


// get all product (authorize)-
const getCart = async (req, res) => {
    try{
        const userGmail = req.headers.authorization;

        const getItems = await CartModel.find({userGmail});
        return res.status(201).json({getItems})
    }
    catch(error){
        return res.status(401).json({error: "OOP's something is wrong, product not found"})
    }
}


// add product (authorize)-
const addCart = async (req, res) => {
    try{
        const userGmail = req.headers.authorization;
        const payload = req.body;

        // get current time-
        let d = new Date();
        let utc = d.getTime() + (d.getTimezoneOffset() * 60000);
        let nd = new Date(utc + (3600000*+5.5));
        let ist =  nd.toLocaleString();

        // save product data-
        const product = CartModel({...payload, userGmail, createdAt: ist});
        await product.save();
        return res.status(201).json({message: "Product added successfully"})
    }
    catch(error){
        return res.status(401).json({error: "OOP's something is wrong, product not added"})
    }
}


// add product (authorize)-
const updateCart = async (req, res) => {
    try{
        const {_id} = req.params;
        let {newQ} = req.body;
        await CartModel.findByIdAndUpdate({_id}, {quantity: newQ});
        return res.status(201).json({message: "Successfully updated"})
    }
    catch(error){
        console.log(error)
        return res.status(401).json({error: "OOP's something is wrong, product not updated"})
    }
}


// delete cart (authorize)-
const deleteCart = async (req, res) => {
    try{
        const {_id} = req.params;
        await CartModel.findByIdAndDelete({_id});
        return res.status(201).json({message: "Successfully deleted"})
    }
    catch(error){
        console.log(error);
        return res.status(401).json({error: "OOP's something is wrong, product not deleted"})
    }
}


// delete all (authorize)-
const deleteAllCart = async (req, res) => {
    try{
        const userGmail = req.headers.authorization;
        await CartModel.deleteMany({userGmail});
        return res.status(201).json({message: "Successfully deleted all"})
    }
    catch(error){
        console.log(error);
        return res.status(401).json({error: "OOP's something is wrong, product not deleted"})
    }
}



module.exports = {getCart, addCart, updateCart, deleteCart, deleteAllCart}