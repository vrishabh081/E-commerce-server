const AuthModel = require("../models/auth");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();


// register-
const register = async (req, res) => {
    try{
        const payload = req.body;
        const {name, email, password} = req.body;

        // fill all the details-
        if(!name || !email || !password){
            return res.status(401).json({error: "Please fill all the details"});
        }

        // may be user not exist-
        const existingUser = await AuthModel.findOne({email})
        if(existingUser){
            return res.status(401).json({error: "User is already exist with this email address"});
        }

        // while user exist, so hash the password-
        const hashPassword = bcrypt.hashSync(password, 8);
        
        // save user data-
        const saveUserData = await new AuthModel({...payload, password: hashPassword})
        await saveUserData.save();
        return res.status(201).json({message: "Successfully registered"});

    } 
    catch(error){
        console.log(error);
        return res.status(500).json({error: "Something is wrong, an internal error issue"});
    }
}


// login-
const login = async (req, res) => {
    try{
        const {email, password} = req.body;

        // fill all the details-
        if(!email || !password){
            return res.status(401).json({error: "Please fill all the details"});
        }

        // may be user not exist-
        const existingUser = await AuthModel.findOne({email})
        if(!existingUser){
            return res.status(401).json({error: "User is not exist with this email address"});
        }

        // now, compare user's password with existing password-
        const comparePassword = bcrypt.compareSync(password, existingUser.password);
        if(!comparePassword){
            return res.status(401).json({error: "Password is incorrect"});
        }

        // secret logic for separate admin and user-
        if(existingUser.role === "admin"){
            let x = ("" + Math.random()).substring(2, 10);
            return res.status(201).json(
                {
                    message: "Successfully logged in",
                    user: {name: existingUser.name, email: existingUser.email, userId: x}
                }
            );
        }
        else if(existingUser.role === "co-admin"){
            let x = ("" + Math.random()).substring(2, 9);
            return res.status(201).json(
                {
                    message: "Successfully logged in",
                    user: {name: existingUser.name, email: existingUser.email, userId: x}
                }
            );
        }
        else{
            let x = ("" + Math.random()).substring(2, 8);
            return res.status(201).json(
                {
                    message: "Successfully logged in",
                    user: {name: existingUser.name, email: existingUser.email, userId: x}
                }
            );
        }
    }
    catch(error){
        console.log(error);
        return res.status(500).json({error: "Something is wrong, an internal error issue"});
    }
}


// set address-
const setAddress = async (req, res) => {
    try{
        const userGmail = req.headers.authorization;
        await AuthModel.findOneAndUpdate({email: userGmail}, {address: req.body})
        return res.status(201).json({message: "Address saved successfully"})
    }
    catch(error){
        console.log(error);
        return res.status(401).json({error: "Something is worng"});
    }

}


// get single user data-
const getSingleUserData = async (req, res) => {
    try{
        const userGmail = req.headers.authorization;
        let userDetails = await AuthModel.findOne({email: userGmail}).select({password: 0, role: 0})
        return res.status(201).json({message: "Successfully get user profile", userDetails})
    }
    catch(error){
        console.log(error);
        return res.status(401).json({error: "Something is worng"});
    }
}


// trial-
const getAllUser = async (req, res) => {
    try{
        const users = await AuthModel.find();
        return res.json({users})
    }
    catch(error){
        console.log(error);
        return res.status(401).json({error: "Something is worng"});
    }
}

// exports-
module.exports = {register, login, getSingleUserData, setAddress, getAllUser};