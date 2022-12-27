const express = require("express");
const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();
const url  = process.env.MONGODB_URL;
const cors = require("cors");

const app = express();
app.use(cors());

mongoose.connect(url);

const con = mongoose.connection;
con.on('open',() =>{
    console.log("Connected to database!!!");
});

app.use(express.json());

const userroute = require("./routes/users");
app.use('/users',userroute);

const port = process.env.PORT || 9000;

// app.get("/",(req,res) =>{
//     res.send("Hello World!!!")
// })

app.listen(port,() =>{
    console.log("Server started!!!");
});