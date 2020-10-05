async function Signup(req){
   const m = require("../index") 
   var collection = m.database.collection("Users")
   console.log(req.body);

   var user={
       name: req.body.name,
       email: req.body.email,
       username: req.body.username,
       password: req.body.password,
       homes:[],
       income:[],
       outcome:[],
       alinacaklar:[],
       alinanlar:[]

   };
   response=await collection.find({$or:[{username:user.username},{email:user.email}]}).toArray();
   if(response.length!=0)
   {
       console.log(response[0].username);
       if(response[0].username==user.username)
       {
           console.log(1);
           return {message:"username has already been taken"};
       }else
       {
           return {message:"Email has already have an account"};
       }

   }
   var response = await collection.insertOne(user);
   return {message:"Success"}
}
async function Signin(req)
{
    const m = require("../index") 
   var collection = m.database.collection("Users")
   
    var user={
        username:req.body.username,
        password:req.body.password
    }
    response=await collection.find({username:user.username}).toArray()
    if(response.length==0)
    {
        return{message:"user not found"}
    }
   if(response[0].password!=user.password)
   {
       return {message:"password is wrong"}
   }
   return {message:"Success"}
}
module.exports={
    signup:Signup,
    signin:Signin
}