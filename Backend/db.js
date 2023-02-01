const mongoose = require('mongoose')

const mongoUrl = "mongodb://localhost:27017/inotebook"

const connectMongo = ()=>{
    mongoose.connect(mongoUrl,()=>{
        console.log("connected to mongo sucessfully")
    })
}
mongoose.set('strictQuery', false);

module.exports = connectMongo;