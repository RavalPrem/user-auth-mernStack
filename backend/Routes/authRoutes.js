const { signup, login } = require('../Controllers/authController')
const { signupValidation, loginValidation } = require('../Middlewares/authValidation')
const productauthCheking = require('../Middlewares/productAuth')

const route = require('express').Router()


route.post('/login',loginValidation,login )

// if signup validate, then it goes to the signup controllers
route.post('/signup',signupValidation,signup )

route.get('/',productauthCheking,(req,res)=> {
    res.json([
        {
            "name":"ok",
            "age":30
        },
        {
            "name":"anything",
            "age":50
        },
    ])
})

module.exports = route