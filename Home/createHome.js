async function create(req) {
    const m = require("../index")
    var collection = m.database.collection("Homes")
    console.log(req.body);

    var home = {
        name: req.body.name,
        landlord: req.body.landlord,
        bills: [],
        needs: [],
        tenants: []
    };
    
    var response = await collection.insertOne(home);
    return { message: "Success", homeID: response.insertedId }
}

module.exports = {
    create: create,
   
}