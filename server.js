const express = require('express');  //Express모듈 불러오기 
const PORT = 3000; //포트설정 
const app = express(); //새로운 Express어플 생성 
const productRoutes = require('./routes');
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/infnode")
.then(()=> console.log('db연결 '))
.catch(err => console.log(err));
app.use(express.json());// req.body값을 받을 수 있게 해주는 express내장 미들에어


app.get('/', (req, res)=>{
    res.send('hello world')
});
//라우트 미들웨어
app.use('/api/products', productRoutes);

app.listen(PORT); //HTTP 서버시작
console.log('서버런')