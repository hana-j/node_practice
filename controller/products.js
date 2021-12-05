const productModel = require('../models/Product');

//미들웨어 함수들정의 
exports.createProduct = async( req, res, next)=>{
      try{
        const createdProduct = await productModel.create(req.body);
      res.status(201).json(createdProduct);
      }
      catch(erorr){
        next(erorr)
      }
      

};
exports.getPoducts = async(req, res, next) =>{
  try{
    const allProducts = await productModel.find({});
    res.status(200).json(allProducts);
  }catch(error){
    next(error)
  }
  
}
exports.getProductById  = async (req, res, next)=>{
  try{
    const product = await productModel.findById(req.params.productId)
    if(product){
      res.status(200).json(product);
    }else{
      res.status(404).send();
    }
  }catch(error){
    console.log(error);
    next(error);
  }
 
  
}
exports.updateProduct = async(req, res,next)=>{
  let updatedProduct = await productModel.findByIdAndUpdate(
    req.params.productId,
    req.body,
    {new:true}
  )
  if(updatedProduct){
    res.status(200).json(updatedProduct);
  }else{
    res.status(404).send();
  }
  
};

exports.deleteProduct = async(req, res, next)=>{
  try{
    let deletedProduct = await productModel.findByIdAndDelete(req.params.productId);
  if(deletedProduct){
    res.status(200).json(deletedProduct);
  }else{
    res.status(404).send();
  }
  }catch(error){
    next(error);
    }
  
  
};