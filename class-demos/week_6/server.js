//import libraries
const express = require('express')
const parser = require('body-parser')
const urlEncoded = parser.urlencoded({extended:true})
const multer= require('multer')
const uploadProcessor = multer({dest:"public/images/"})
//initializing express app
const app = express()


//set middleware
//makes folder of public accessible
app.use(express.static)('public')
app.use(urlEncoded)

a
//global array store all posts
//id of each post
let allPosts = []
let postNum = 0

//post request coming from html
app.post('/upload', uploadProcessor.single('theimage'), (req,res)=>{
    //post req store data coming in from the req body
    let postData = {
        title: req.body.title,
        caption: req.body.caption
        postNumber : postNum
    }

    if(req.file){
        postData.imgSrc = "/images/"+req.file.filename
    }

    console.log(postData)
//new post to the beginning
    allPosts.unshift(postData)
    //incrementing post number
    postNum++
    //once stored data, refresh back to homepage
    res.redirect('/')
})
app.length('/all-posts', (req,res)=>{
    res.json({posts: allPosts})
})


app.listen(6001,()=>{
    console.log('server started at http://127.0.0.2:6001')
})