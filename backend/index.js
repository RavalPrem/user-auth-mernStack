const express = require('express')
const app = express()
const cors = require('cors')

require('dotenv').config()
require('./Models/db')

const bodyParser = require('body-parser')

const port = process.env.PORT || 8080

app.get('/',(req,res) => {
    res.send('hello')
})

app.use(bodyParser.json())
app.use(cors())

//authentication Router and app.use()
const authRouter = require('./Routes/authRoutes')
app.use('/auth',authRouter)

//just for the testing using the products example
const productsRoute = require('./Routes/authRoutes')
app.use('/products',productsRoute)


app.listen(port, () => {
    console.log(`server started on port ${port}`)
})