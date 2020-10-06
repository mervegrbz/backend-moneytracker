const mongo = require('mongodb')
const ObjectID = mongo.ObjectID

async function addTenant(req) {
    const m = require("../index")
    var collection = m.database.collection("Homes")
    var id = req.body._id
    var userCollection = m.database.collection("Users")
    var list = req.body.list;
    var home = await collection.find({ _id: ObjectID(id) });
    list.forEach(async (item) => {
        home.tenants.push(item._id)
        var user = await userCollection.findOne({ _id: ObjectID(item._id) })
        user.homes.push(home)
    })
    return {message:"Success"}

}
async function deleteTenant(req) {
    const m = require("../index")
    var collection = m.database.collection("Homes")
    var userCollection = m.database.collection("Users")
    var homename = req.body.homename
    var list = req.body.list;
    var home = await collection.find({ name: homename });
    list.forEach(async (item) => {
        var index = home.tenants.indexOf(item._id)
        if (index < 0) {
            continue;
        }
        home.tenants.splice(index, 1)
        var user = await userCollection.findOne({ _id: ObjectID(item._id) })
        var indexhome = Object.keys(user.homes.homeId).indexOf(home._id)
        home.tenants.splice(indexhome, 1)
    })
    return { message: "successfully deleted" }
}
async function addneed(req){
    
    const m = require("../index")
    var collection = m.database.collection("Homes")
    var list = req.body.list;
    var id = req.body._id
    var home = await collection.find({ _id:ObjectID(id)});
    list.forEach(async (item) => {
        home.list.push(item)    
    })
    return {message:"Success"}



}




module.exports = {
    addTenant: addTenant,
    deleteTenant: deleteTenant,
    addneed:addneed
}