const UserModel = require("../Models/User")
const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')

const signup = async(req,res) => {
    try {
        const {name,email,password} = req.body
        const User = await UserModel.findOne({email})

        if(User) {
            return res.status(409)
                .json({ message : "User already exits you can log in ",success : false })
        }

        const userModel = new UserModel({name, email, password})

        //password hashing for encrypt the user's password
        userModel.password = await bcrypt.hash(password, 10)
        await userModel.save()

        res.status(201)
            .json({
                message : "signup successfully",
                success : true
            })

    } catch (error) {
        res.status(500)
            .json({
                message : "Internal server error",
                success : false
            })   
    }
}

const login = async(req,res) => {
    try {
        const {email,password} = req.body
        const User = await UserModel.findOne({email})

        const errorMessage = "Auth failed email or password is wrong";

        if(!User) {
            return res.status(403)
                .json({ message : errorMessage, success : false })
        }

        //matching the password with the database password
        const isMatched = await bcrypt.compare(password, User.password)

        if(!isMatched) {
            return res.status(403)
                .json({ message : errorMessage, success : false })
        }

        
        //if matched the jsonwebtoken is given to user
        const jwtToken = jwt.sign(
            {email : User.email, _id : User._id},
            process.env.JWT_SECRET,
            {expiresIn : '24h'}
        )

        res.status(200)
            .json({
                message : "login successfully",
                success : true,
                jwtToken,
                email,
                name : User.name
            })
    } catch (error) {
        res.status(500)
            .json({
                message : "Internal server error",
                success : false
            })   
    }
}

module.exports = {
    signup,
    login
}