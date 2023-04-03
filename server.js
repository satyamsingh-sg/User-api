require('dotenv').config()
const express = require('express');
const cors = require("cors");
const app = express();
const bodyParser = require('body-parser') 
var multer = require('multer');
var forms = multer();
app.use(bodyParser.json());
app.use(forms.array()); 
app.use(bodyParser.urlencoded({ extended: false}));
const db = require('./config/mogoose.connection')
db();
const routers = require("./routes/route")

app.use("/v1", routers);

const upload = multer({ dest: 'uploads/' })
app.get('/satyam',upload.single('img'),(req,res)=>{
    console.log(req.file)
    console.log(req.body)
    res.send("hi satyam how are you")
})

app.listen(3001,()=>{
    console.log(`server is running port ${process.env.PORT}` )
})