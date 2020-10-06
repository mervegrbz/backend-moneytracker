const mongodb = require('mongodb')
const ObjectID = mongodb.ObjectID


async function Signup(req) {
    const m = require("../index")
    var collection = m.database.collection("Users")
    console.log(req.body);

    var user = {
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        homes: [],// a:{gelir:10,gider:5}
        income: [], // Gelir kaynaklarım, evden bağımsız
        outcome: [], // Evden bağımsız 
        alinacaklar: [], // Ben almadım, başkası aldı ben parasını vereceğim
        alinanlar: [] ,// Eve ben aldım, başkaları bana para verecek 
        image:""


    };
    response = await collection.find({ $or: [{ username: user.username }, { email: user.email }] }).toArray();
    if (response.length != 0) {
        console.log(response[0].username);
        if (response[0].username == user.username) {
            console.log(1);
            return { message: "Username has already been taken." };

        } 
        else {
            return { message: "Email has already have an account" };
        }

    }
    var response = await collection.insertOne(user);
    return { message: "Success",userID:response.insertedId }
}
async function Signin(req) {
    const m = require("../index")
    var collection = m.database.collection("Users")

    var user = {
        username: req.body.username,
        password: req.body.password
    }
    response = await collection.find({ username: user.username }).toArray()
    if (response.length == 0) {
        return { message: "user not found" }
    }
    if (response[0].password != user.password) {
        return { message: "password is wrong" }
    }
    return { message: "Success",userID:response.insertedId }
}



async function getUser(req){
    var id=req.body._id;
    console.log(id);
    const m = require("../index")
    var collection = m.database.collection("Users")
    var user =await collection.findOne({_id:ObjectID(id)})
    if(user==null){
        return {message:"Not found"}
    }
    var user={
        _id:user._id,
        name: user.name,
        email: user.email,
        username: user.username,
       
        homes: user.homes,// a:{gelir:10,gider:5}
        income: user.income, // Gelir kaynaklarım, evden bağımsız
        outcome: user.outcome, // Evden bağımsız 
        alinacaklar: user.alinacaklar, // Ben almadım, başkası aldı ben parasını vereceğim
        alinanlar: user.alinanlar // Eve ben aldım, başkaları bana para verecek 

    }
    console.log(user);

    return {user:user, message:"Success"}


 }   
module.exports = {
    signup: Signup,
    signin: Signin,
    getUser:getUser
}