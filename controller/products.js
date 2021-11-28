const productModel = require('../models/Product');

//미들웨어 함수들정의 
exports.createProduct = (req, res, next)=>{
    productModel.create(req.body);
}
