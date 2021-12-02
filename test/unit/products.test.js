const productController = require('../../controller/products');
const productModel = require('../../models/Product');
const httpMocks = require('node-mocks-http');
const newProduct = require('../data/new-product.json');
const Product = require('../../models/Product');
const allProducts = require('../data/all-products.json');

productModel.create = jest.fn();
productModel.find =jest.fn();
productModel.findById = jest.fn();
productModel.findByIdAndUpdate = jest.fn();

const productId = "dgaeg9dgagdaaaa"
let req, res, next; //전역공간에 할당 
beforeEach(()=>{
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next ;
});

describe("Product Controller Create",()=>{
    beforeEach(()=>{
        req.body = newProduct;      //임의로 만들어둔 data파일에 값을 body에 넣어준다. 
    })
    it("should have a createProduct function",()=>{
        expect(typeof productController.createProduct).toBe("function");// 프로덕트함수 생성을 해서 테스트
    })
    it("should call ProductModel.create",async()=>{
        await productController.createProduct(req, res, next);
        expect(productModel.create).toBeCalledWith(newProduct); //컨트롤러안에 함수가 호출될때, 디비에 잇는 모델의 create메서드가 호출되는가 
    })

    it("should return 201 response code", async()=>{
        await productController.createProduct(req, res,next);
        expect(res.statusCode).toBe(201);   //상태값 전달
        expect(res._isEndCalled()).toBeTruthy(); //controller에서 보내준 .send() 상태전달 

    })
    it("should return json body in response", async()=>{
        productModel.create.mockReturnValue(newProduct)
        await productController.createProduct(req, res, next);
        expect(res._getJSONData()).toStrictEqual(newProduct);
    })
    it("should handle errors", async () =>{
        const errorMessage = {message: "description property missing"};
        const rejectedPromise = Promise.reject(errorMessage); //비동기 요청 실패
        productModel.create.mockReturnValue(rejectedPromise);  //에러를 만드는 경우 
        await productController.createProduct(req, res, next);
        expect(next).toBeCalledWith(errorMessage);
    })
})

describe("Product Controller Get", ()=>{
    it("should have a getProducts function",()=>{
        expect(typeof productController.getPoducts).toBe("function");
    })
    it("should call ProductModel.find({})", async ()=>{
        await productController.getPoducts(req, res, next);
        expect(productModel.find).toHaveBeenCalledWith({});
    })
    it("should return 200 response", async()=>{
        await productController.getPoducts(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled).toBeTruthy();
    })
    it("should return json body in response", async()=>{
        productModel.find.mockReturnValue(allProducts)
        await productController.getPoducts(req, res, next);
        expect(res._getJSONData()).toStrictEqual(allProducts)
    })
    it("should handle errors", async()=>{
        const errorMessage = {message : "Error finding product data"}
        const rejectedPromise = Promise.reject(errorMessage);
        productModel.find.mockReturnValue(rejectedPromise);
        await productController.getPoducts(req, res, next);
        expect(next).toHaveBeenCalledWith(errorMessage);
    })
})

describe("Product Controller GetById", ()=>{
    it("should have a getProductById", async()=>{
        expect(typeof productController.getProductById ).toBe("function");
    })
    it("should call productModel.findById", async ()=>{
        req.params.productId = productId
        await productController.getProductById(req, res, next);
        expect(productModel.findById).toBeCalledWith(productId);

    })
    it("should return json body and response code 200", async()=>{
        productModel.findById.mockReturnValue(newProduct);
        await productController.getProductById(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toStrictEqual(newProduct);
        expect(res._isEndCalled()).toBeTruthy();
    })
    it("should return 404 when item doesnt exist", async()=>{
        productModel.findById.mockReturnValue(null);
        await productController.getProductById(req, res, next);
        expect(res.statusCode).toBe(404);
        expect(res._isEndCalled()).toBeTruthy();
    })
    it("should handle errors", async()=>{
        const errorMessage = {message:"error"};
        const rejectedPromise = Promise.reject(errorMessage);
        productModel.findById.mockReturnValue(rejectedPromise);
        await productController.getProductById(req, res, next);
        expect(next).toHaveBeenCalledWith(errorMessage);
    })
})
describe("Product Contorller Update", ()=>{
    it("should have an updateProduct function", ()=>{
        expect(typeof productController.updateProduct).toBe("function");
    })
    it("should call productModel.findByIdAdnUpdate", async()=>{
        req.params.productId = productId
        req.body = {name:"update name", description:"update description"}
        await productController.updateProduct(req, res, next);
        expect(productModel.findByIdAndUpdate).toHaveBeenCalledWith(
            productId,{name:"update name", description:"update description"},  //productModel.findByIdAndUpdate 이 실행될때 불러지는 데이터 3개 
            {new:true});
    })
    it("should return json body and response code 200", async()=>{
        req.params.productId = productId;
        req.body = {name:"update name", description:"update description"}  // products.js의 updatedProduct 값
        productModel.findByIdAndUpdate.mockReturnValue({name:"update name", description:"update description"});
        await productController.updateProduct(req, res, next)
        expect(res._isEndCalled()).toBeTruthy();
        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toStrictEqual({name:"update name", description:"update description"});
    })
    it("should handle 404 when item dosent exist", async()=>{
        productModel.findByIdAndUpdate.mockReturnValue(null);
        await productController.updateProduct(req, res, next);
        expect(res.statusCode).toBe(404);
        expect(res._isEndCalled()).toBeTruthy(); //product.js에서 .send()해서 값을 보내줄경우에 true로 테스트 통과 it s
    })
})