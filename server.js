require('dotenv').config()
const express = require('express');
const cors = require("cors");
const app = express();
const bodyParser = require('body-parser') 
const multer  = require('multer')
const cookieparser = require("cookie-parser");

app.use(cookieparser());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
const db = require('./config/mogoose.connection')
db();


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});


const routers = require("./routes/route")
app.use("/v1", routers);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads'); // Set the upload folder
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); // Set the file name
    }
  });
  
  // Multer middleware
  const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
      // Only allow certain file types
      if (file.mimetype.startsWith('image/')) {
        cb(null, true);
      } else {
        cb(new Error('Invalid file type'));
      }
    },
    limits: {
      fileSize: 1024 * 1024
    }
  }).single('img'); 

app.get('/satyam',upload,(req,res)=>{
   
    res.send({img: req.file, name: req.body})
})

// app.get('/log',async(req,res)=>{
//   await midjourney('mdjrny-v4 style a painting of a ginger cat.', { width: 1024 })
//   .then(response => {
//    console.log("mid jounery successful " , response.json())
//  })
//  .catch(e =>{
//     console.log("mid jounery error", e)
//  })
// })

app.listen(3001,()=>{
  
    console.log(`server is running port ${process.env.PORT}` )
})