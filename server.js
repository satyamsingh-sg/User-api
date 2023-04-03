require('dotenv').config()
const express = require('express');
const cors = require("cors");
const app = express();
const bodyParser = require('body-parser') 
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
const db = require('./config/mogoose.connection')
db();
const routers = require("./routes/route")

app.use("/v1", routers);


app.get('/satyam',upload.single('img'),(req,res)=>{
    console.log(req.file)
    res.send(req.file)
})

app.listen(3001,()=>{
    console.log(`server is running port ${process.env.PORT}` )
})