const mongoose =  require('mongoose')

const connectDb = async()=>{
    mongoose
    .connect(process.env.DB_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(()=>console.log("connection Successfully ... ")) 
    .catch((err)=>console.log(err));
}
module.exports = connectDb