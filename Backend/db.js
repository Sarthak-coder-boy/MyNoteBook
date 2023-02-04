const mongoose = require('mongoose')

const mongoUrl = "mongodb+srv://admin-sarthak:Sar2002@cluster1.sg9dxj5.mongodb.net/inotebook?retryWrites=true&w=majority"

const connectMongo = ()=>{
    mongoose.connect(mongoUrl,()=>{
        console.log("connected to mongo sucessfully")
    })
}
mongoose.set('strictQuery', false);

module.exports = connectMongo;