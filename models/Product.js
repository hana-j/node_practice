 const mongoose = require('mongoose');

 const porductSchema = new mongoose.Schema({
     name:{
         type:String,
         require:true
     },
     description:{
        type:String,
        require:true
     },
     price:{
         type:Number
     }
    })

const Product = mongoose.model("Product", porductSchema);
module.exports = Product; 