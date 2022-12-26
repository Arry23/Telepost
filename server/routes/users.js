const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const userdb = require("../model/userdb");
const friends = require("../model/user");
const getModel = require("../model/usermsg");
const { default: mongoose } = require("mongoose");

router.get('/',async(req,res) =>{
    try{
        const user = await friends.find();
        // console.log(user);
        res.send(user);
    }catch(err){
        res.send(err);
    }
});

router.post('/message',async(req,res) =>{
    try{
        const msgdb = mongoose.connection.db.collection(req.body.modelname);
        msgdb.find({}).toArray(function(err, data){
            let arr=data;
            let n=data.length;
            for(let i=0 ; i<n/2 ; i++){
                let temp=arr[i];
                arr[i]=arr[n-i-1];
                arr[n-i-1]=temp;
            }
            res.send(data);
        });
    }catch(err){
        res.send(err);
    }
});

router.post('/message/append',async(req,res) =>{
    try{
        const messagedb = mongoose.connection.db.collection(req.body.modelname);
        messagedb.insertOne({
            sender:req.body.sender,
            reciever:req.body.reciever,
            message:req.body.msg,
            time:req.body.time
        }).then(res.send(messagedb));
    }catch(err){
        res.send(err);
    }
});

router.post('/login',async(req,res) =>{
    // console.log(req.body);
    const user = await userdb.findOne({userid:req.body.username});
    if(user === null){
        res.send({status:false});
        return;
    }

    try{
        if(await bcrypt.compare(req.body.password,user.password)){
            res.send({status:true});
        }
        else{
            res.send({status:false});
        }
    }catch(err){
        res.send(err);
    }
});

router.post('/',async(req,res) =>{
    const user = await friends.findOne({username:req.body.username});
    if(user !== null){
        res.send({status:false});
        return;
    }

    try{
        const user = await friends.find();
        let user1 = req.body.username;
        for(let i=0 ; i<user.length ; i++){
            let user2 = user[i].username;
            let str = "";
            if(user1>user2){
                str = user1+"and"+user2;
            }
            else{
                str = user2+"and"+user1; 
            }
            mongoose.model(str,{
                sender:{
                    type:String,
                    required:true
                },
                reciever:{
                    type:String,
                    required:true
                },
                messsage:{
                    type:String,
                    required:true
                },
                time:{
                    type:String,
                    required:true
                }
            });
        }
        // console.log(user.length);

        const hashedpassword = await bcrypt.hash(req.body.password,10);
        const newuser = new userdb({
            userid: req.body.username,
            password: hashedpassword
        });
        const newfriend = new friends({
            username:req.body.username
        })
        const a1 = await newuser.save();
        const a2 = await newfriend.save();
        res.send({status:true});
    }catch(err){
        res.send(err);
    }
});

module.exports = router;