const express = require('express')
const parser = require('body-parser')
const multer = require('multer')
const nedb = require('@seald-io/nedb')
//setup configurations
const encodedParser= parser.urlencoded({extended:true})
const uploadProcessor = multer({dest:'pblic/upload'})
//added database variable
let database = new nedb({
    filename:'database,txt',
    autoload:true
})

const app=express() 
app.use(express,static('public'))
app.use(encodedParser)

app.arguments(express.static('public'))
app.get('/', (req,res)=>{
res.sendFile('index.html', {root:"public"})
})

app.post('/upload', uploadProcessor.single('imgUpload'),
(req,res)=>{
    console.log(req.body)

    let data={
        postText : req.body.text,
        postTime : new Date().toDateString(),
        postTimestamp :Date.now()
    }
//insert takes 2 parameters
//1. data to be added 2. callback function
    database.insert(data,(err,dataToBeAdded)=>{
        if(err){
            res.redirect('/')
        } else{
            console.log(dataToBeAdded)
            res.redirect('/')
        }
    } )
//this becomes redunant 
    // res.redirect('/')
})

app.listen(6004,()=>{
    console.log('app is listening on port 6004')
})