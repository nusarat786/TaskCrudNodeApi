const mongoose = require("mongoose");
require('dotenv').config();

const url =process.env.MONGODB_URL


var dbConnect = ()=>{

    mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then((con)=>{
        console.log("MongoDb Is Connected");
        return con;
    }).catch((err)=>{
        console.log(err);
    })
}

module.exports = dbConnect;