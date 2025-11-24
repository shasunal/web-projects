const express = require('express')
const parser = require('body-parser')
const multer = require('multer')
const nedb = require('@seald-io/nedb')
//setup configurations
const encodedParser= parser.urlencoded({extended:true})
const uploadProcessor = multer({dest:'public/upload'})
//added database variable
let database = new nedb({
    filename:'database.txt',
    autoload:true
})

const app=express() 
app.use(express.static('public'))
app.use(encodedParser)
//tell app to get ready to receive json data
app.use(parser.json())
app.use(express.static('public'))
app.get('/', (req,res)=>{
res.sendFile('index.html', {root:"public"})
})

app.post('/upload', uploadProcessor.single('imgUpload'),
(req,res)=>{
    console.log(req.body)

//creates an object that keeps track of the time using Date class from MDM
    const currentTime = new Date(Date.now())
    console.log(currentTime)

    let data={
        postText : req.body.text,
        postTime : currentTime.toDateString(),
        postTimestamp :currentTime
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
//create new req to retrieve info from database
app.get('/populate-posts', (req,res)=>{
    //should retrieve info
    //what are we looking for inside the databasse?
    //{}  empty to retrieve entire dattabase
let query = {}
database.find(query, (err, data)=>{
    // console.log(data)

    //sending back json response so main.js can parse it
    res.json(data)
})
})
//this will take in data from main.js and delete a specific post in the database
app.delete('/delete-post', (req,res)=>{
    // console.log(req.body)
//construct a search that will match the _id property inside of the db to the id that comes in from the client
    let query = {
        _id:req.body.id
    }
})

//find One thing
database.remove(query, {}, (err, numRemoved)=>{

    console.log(numRemoved)
    res.redirect('/')
})



app.listen(6004,()=>{
    console.log('app is listening on port 6004')
})