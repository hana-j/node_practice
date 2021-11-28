const productController = require('../../controller/products');
const productModel = require('../../models/Product');
const httpMocks = require('node-mocks-http');
const newProduct = require('../data/new-product.json');

productModel.create = jest.fn();

let req, res, next; //전역공간에 할당 
beforeEach(()=>{
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = null;
});

describe("Product Controller Create",()=>{
    beforeEach(()=>{
        req.body = newProduct;      //임의로 만들어둔 data파일에 값을 body에 넣어준다. 
    })
    it("should have a createProduct function",()=>{
        expect(typeof productController.createProduct).toBe("function");// 프로덕트함수 생성을 해서 테스트
    })
    it("should call ProductModel.create",()=>{
        productController.createProduct(req, res, next);
        expect(productModel.create).toBeCalledWith(newProduct); //컨트롤러안에 함수가 호출될때, 디비에 잇는 모델의 create메서드가 호출되는가 
    })
})