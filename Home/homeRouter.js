const express = require('express')
const homeRouter = express.Router()
 const create = require('./CreateHome')
 const options = require('./homeSettings')
const mongo = require('mongodb')

const ObjectID = mongo.ObjectID
homeRouter.post("/create", async (req, res) => {

    res.json(await create.create(req))
})

homeRouter.post('./addTenant', async (req, res) => {
    res.json(await options.addTenant(req))
})
homeRouter.post('/deleteTenant',async (req, res) => {
    res.json(await options.deleteTenant(req))
})
homeRouter.post("/addneed", async (req, res)=>{
    res.json(await options.addneed(req))

})
homeRouter.post("/")
module.exports = homeRouter
