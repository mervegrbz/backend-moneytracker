const express = require('express')
const userRouter = express.Router()
const account = require('./Account')
const options = require('./userMethods')
const mongo = require('mongodb')

const ObjectID = mongo.ObjectID
userRouter.post("/signup", async (req, res) => {

    res.json(await account.signup(req))
})
userRouter.post("/signin", async (req, res) => {
    res.json(await account.signin(req))

})
userRouter.get("/balances/:id", async (req, res) => {
    const m = require("../index")
    var collection = m.database.collection("Users")
    console.log(req.params.id)

    var userBalance = await collection.findOne({ '_id': ObjectID(req.params.id)});
    res.json(userBalance);
})
userRouter.post('/changebalance', async (req, res) => {
    console.log("burada");
    res.json(await options.changebalance(req))
})
userRouter.post('./homesetting', async (req, res) => {
    res.json(options.homesetting(req, database))
})
module.exports = userRouter
