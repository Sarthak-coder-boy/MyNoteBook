const connectToMongo = require('./db');
const express = require('express');
const app = express();
const cors = require('cors');
const port = 5000

app.use(express.json())
app.use(cors());

connectToMongo();

app.use("/api/auth" , require('./routes/auth'))
app.use("/api/note" , require('./routes/note'))

app.listen(port , ()=>{
    console.log("iNotebook listening in port 3000")
})