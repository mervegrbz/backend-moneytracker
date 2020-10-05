var database
console.log("Connecting to DB")
const MongoClient = require("mongodb").MongoClient

const MongoURL = 'mongodb://localhost:27017';
const client = new MongoClient(MongoURL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
})

client.connect().then((database = client.db("Moneytracker")))
const express = require('express')
const cors = require('cors')
const app = express()



app.use(cors())
app.use(express.json())
app.listen(8080, () => {
  console.log("Listening on 8080")
})

var userRouter = require("./User/userRouter")
// const homeRouter=require("./Home/homeRouter.js")
// const productRouter=require("./Product/productRouter.js")
app.use("/user", userRouter)
// app.use("/home",homeRouter)
// app.use("/product",productRouter)

module.exports = { database: database, }