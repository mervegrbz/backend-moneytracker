const mongo = require('mongodb');
const ObjectID = mongo.ObjectID


async function getbalances(req) {
    var userID = req.params.id;


}
async function changebalance(req) {
    const m = require("../index")
    var collection = m.database.collection("Users")
    var body = req.body;
    var userId = body._id;
    var command = body.command;
    console.log(body);
    await collection.findOne({ '_id': ObjectID(userId) }, (err, user) => {
        if (command.title == "outcome") {
            user.outcome.push({ 'lender': command.lender, 'amount': command.amount, takendate: Date(), hasGiven: false })
            collection.updateOne({ '_id': ObjectID(userId) },
                {
                    '$set': { outcome: user.outcome }
                }
            )
            console.log("simdu ");
            return ({ message: "outcome has been added" })
        }
        if (command.title == "income") {
            user.income.push({ "debitor": command.debitor, 'amount': command.amount, 'date': Date(), hasGiven: false })
            return { message: "income has been added" }
        }
        if (command.title == "home") {
            var home_id = command.homeId
            var productname = command.productname;
            var amount = command.amount
            var buyerId = command.buyerId
            var debitors = command.debitors
            if (buyerId == userId) {
                user.alinanlar.push({ "home": homeId, "product": productname, "amount": amount, "debitors": debitors })
                for (let i = 0; i < debitors.length; i++) {
                    collection.findOne({ "_id": ObjectID(debitors[i]) }, (err, user) => {
                        user.alinacaklar.push({ "home": homeId, "product": productname, "amount": amount / (debitors.length + 1), debitors: debitors })
                        collection.updateOne({ '_id': userId },
                            {
                                '$set': { outcome: user.outcome, income: user.income, alinanlar: user.alinanlar, alinacaklar: user.alinacaklar }
                            }
                        )

                    })
                }
                return { message: "the product you buy has added" }

            }
            else {
                user.alinacaklar.push({ "home": homeId, "product": productname, "amount": amount / (debitors.length + 1), debitors: debitors })
                return { message: "the product other buy has added" }

            }


        }
        collection.updateOne({ '_id': userId },
            {
                '$set': { outcome: user.outcome, income: user.income, alinanlar: user.alinanlar, alinacaklar: user.alinacaklar }
            }
        )

    })
    return { message: "sth has gone wrong" }

}
async function homesettings(req, database) {
    var userCollection = database.collection("Users")
    var homeCollection = database.collection("Homes")
    var body = req.body;
    var userId = body._id;
    var command = body.command;
    await userCollection.findOne({ _id: userId }, (err, user) => {
        if (command.todo == "delete") {
            var index = user.homes.indexOf(command.homeName)
            if (index > -1) {
                user.homes.splice(index, 1);
            }
            homeCollection.findOne({ name: command.homeName }, (err, home) => {
                var index = home.users.indexOf(userId)
                if (index > -1) {
                    home.users.splice(index, 1);
                }
            })

        }
        if (command.todo == "add") {

        }


    })


}
module.exports = {
    changebalance: changebalance
}