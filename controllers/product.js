const ProductModel = require("../models/product");
const Features = require("../utils/Features");


// add product (admin)-
const addProduct = async (req, res) => {
    try{
        const payload = req.body;
        const {name, price, category} = req.body;

        // fill all the details-
        if(!name || !price || !category){
            return res.status(401).json({error: "Please fill all the details"});
        }

        // get current time-
        let d = new Date();
        let utc = d.getTime() + (d.getTimezoneOffset() * 60000);
        let nd = new Date(utc + (3600000*+5.5));
        let ist =  nd.toLocaleString();

        // save product data-
        const product = ProductModel({...payload, createdAt: ist});
        await product.save();
        return res.status(201).json({message: "Product added successfully"})
    }
    catch(error){
        console.log(error);
        return res.status(401).json({error: "OOP's something is wrong, product not added"})
    }
}


// get all product (admin)-
const getAllProductsAdmin = async (req, res) => {
    try{
        const products = await ProductModel.find();
        return res.status(201).json({products})
    }
    catch(error){
        console.log(error);
        return res.status(401).json({error: "OOP's something is wrong, product not found"})
    }
}


// get all product -
const getAllProduct = async (req, res) => {
    try{
        const queryObj = {...req.query};
        const excludeFields = ["page", "limit", "sort", "fields", "search"];
        excludeFields.forEach((el)=> delete queryObj[el]);

        if(queryObj.category){
            const products = await ProductModel.find(req.query);
            return res.status(201).json({message: "Successfully get all products", products})
        }
        else{
            const products = await ProductModel.find();
            return res.status(201).json({message: "Successfully get all products", products})
        }
        // const resultPerPage = 8;
        // const productsCount = await ProductModel.countDocuments();

        // const apiFeature = new Features(ProductModel.find(), req.query).search().filter();
        // let products = await apiFeature.query;
        // let filteredProductsCount = products.length;
        // apiFeature.pagination(resultPerPage);
        // products = await apiFeature.query;

        return res.status(200).json({
            message: "Successfully get all products",
            products,
            productsCount,
            resultPerPage,
            filteredProductsCount,
          });

    }
    catch(error){
        console.log(error);
        return res.status(401).json({error: "OOP's something is wrong, product not found"})
    }
}


// get single product-
const getSingleProduct = async (req, res) => {
    try{
        const {_id} = req.params;
        const product = await ProductModel.findById({_id});
        return res.status(201).json({message: "Successfully get a single product", product})
    }
    catch(error){
        console.log(error);
        return res.status(401).json({error: "OOP's something is wrong, product not found"})
    }
}


// update product (admin)-
const updateProduct = async (req, res) => {
    try{
        const {_id} = req.params;
        await ProductModel.findByIdAndUpdate({_id}, req.body);
        return res.status(201).json({message: "Successfully updated"})
    }
    catch(error){
        console.log(error);
        return res.status(401).json({error: "OOP's something is wrong, product not updated"})
    }
}


// delete product (admin)-
const deleteProduct = async (req, res) => {
    try{
        const {_id} = req.params;
        await ProductModel.findByIdAndDelete({_id});
        return res.status(201).json({message: "Successfully deleted"})
    }
    catch(error){
        console.log(error);
        return res.status(401).json({error: "OOP's something is wrong, product not deleted"})
    }
}


// export-
module.exports = {addProduct, getAllProductsAdmin, getAllProduct, getSingleProduct, updateProduct, deleteProduct}