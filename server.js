const express=require('express');
const app= express();
const fetch = require('cross-fetch');
app.use(express.static('public'));
app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}));
app.use(express.json());
const mongoose = require("mongoose");
const dbURI="mongodb+srv://aalhad:aalhad123@aalhad123.2dfdc.mongodb.net/Assignment?retryWrites=true&w=majority"
const https =require('https');
const Data=require('./models/modal');





mongoose.connect(dbURI,{useNewUrlParser: true, useUnifiedTopology: true})
    .then((result)=>{

        console.log('connected to mongodb');
       app.listen(3000, () => {
            console.log('listening on :3000');
        });

    })
    .catch((error)=>{
        console.log(error)
    })


app.get('/project',async (req,res)=>{

    const url='https://api.wazirx.com/api/v2/tickers';

    const response=await fetch(url);
    const data=await response.json();
    const data1=Object.values(data).slice(0,10);
    const data2=[];

    for (let key of Object.keys(data1)) {
        let ob={
            name:data1[key].name,
            last:data1[key].last,
            buy:data1[key].buy,
            sell:data1[key].sell,
            volume:data1[key].volume,
            base_unit:data1[key].base_unit
        }
        data2.push(ob)

    }
    console.log(data2);

     Data.deleteMany({},()=>{
          Data.insertMany(data2,()=>{
             Data.find({},(err,data)=>{
                 res.render('index',{data:data});
             })
         })
     })







})