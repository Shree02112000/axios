const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser')
const { default: axios } = require("axios");
const { response } = require('express');
const e = require('express');
const app = express();
app.use(bodyParser.json());
let url ="https://api.publicapis.org/entries";
//const express = require("express");

console.log("test")
app.get('/test',async(req,res,next)=>{
        try {
           
            let final = await axios.get(url)
            
            console.log(final.data)
           return res.json(final.data)
        } 
        catch (error) {
            res.status(400).json({
                message:error
            })
        }
    } 
)

let couponurl = "http://localhost:5001/api/create";
app.post('/createcoupon',async (req,res,next)=>{
    try {
        let value = req.body
        let newcoupon = await axios.post(couponurl,value)
        res.json({message:"coupon created successfully",data: newcoupon.data.data})
    } catch (error) {
        console.log(error)
        res.json({error:error})
    }
})


let producturl="http://localhost:5000/api/add";
app.post('/productcreate',async(req,res,next)=>{
    try {
        let value = req.body
        let newproduct = await axios.post(producturl,value)
        res.json({message:"product created successfully",data: newproduct.data.data})
    } catch (error) {
        console.log(error)
        res.json({error:error})
    }
})



app.put('/couponupdate/:id',async(req,res,next)=>{
    let couponupdate = `http://localhost:5001/api/update/${req.params.id}`;
    console.log(couponupdate)
   
    try {
        let value = req.body
        let updatecoupon = await axios.put(couponupdate,value)
        res.json({message:"coupon updated successfully",data: updatecoupon.data.data})
        
    } catch (error) {
        console.log(error)
        res.json({error:error})
    }
})

app.delete('/deletecoupon/:id',async(req,res,next)=>{
    let coupondelete = `http://localhost:5001/api/delete/${req.params.id}`;
    try {
        
        let deletecoupon = await axios.delete(coupondelete,value)
        res.json({message:"coupondeleted" ,data :deletecoupon.data})
    } catch (error) {
        console.log(error)
        res.json({error:error})
        
    }
})

mongoose.connect('mongodb://localhost:27017/axiosdb')
const db = mongoose.connection

db.on('error',(err)=>{
    console.log(err)
})
db.once('open',()=>{
    console.log('database is established')
})



app.use(morgan('dev'))
//app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

const PORT =3007
app.listen(PORT,()=>{
    console.log(`server is running ${PORT}`)
})

