const express = require("express");
const mongoose = require("mongoose");
const url = "mongodb://localhost/messagingdb";
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

const hostname = 'localhost';
const port = 9000;

app.listen(9000,hostname,() =>{
    console.log("Server started!!!");
});