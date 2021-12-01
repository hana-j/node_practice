const request = require('supertest');
const app= require('../../server');
const newProduct = require('../data/new-product.json');
let firstProduct;

it("Post /api/products", async ()=>{
    const response = await request(app)
        .post("/api/products")
        .send(newProduct);
        expect(response.statusCode).toBe(201)
        expect(response.body.name).toBe(newProduct.name)
        expect(response.body.description).toBe(newProduct.description);
})

it("should return 500 on POST /api/products", async () =>{
    const response = await request(app)
     .post('/api/products')
     .send({name: "phone"})

     expect(response.statusCode).toBe(500);
     console.log(response.body)
     expect(response.body).toStrictEqual({message:"Product validation failed: description: Path `description` is required." });
})

it("Get /api/products", async ()=>{
    const response = await request(app).get('/api/products')
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body[0].name).toBeDefined();
    expect(response.body[0].description).toBeDefined();
    firstProduct = response.body[0];
})

it("GET /api/product/:productId", async()=>{
    const response = await request(app).get('/api/products/'+firstProduct._id);
    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe(firstProduct.name);
    expect(response.body.description).toBe(firstProduct.description);
})

it("Get id doesnt exits /api/productId", async()=>{
    const response = await request(app).get('/api/products/61a6dba527c5c4e68dacd7d3')
    expect(response.statusCode).toBe(404);
})