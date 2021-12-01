 const mongoose = require('mongoose');

 const porductSchema = new mongoose.Schema({
     name:{
         type:String,
         required:true
     },
     description:{
        type:String,
        required:true
     },
     price:{
         type:Number
     }
    })

const Product = mongoose.model("Product", porductSchema);
module.exports = Product; 