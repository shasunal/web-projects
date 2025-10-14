// import express library, all libraries first

const express = require('express');
//2. initialize exprress
const app = express();

//3. middleware between initialization and app listen
app.use(express.static('assets'));

//global variables for global storage
let allNotes =[]
//4. routing 
//determines what responses server gives based on requests in
app.get('/',(request,response)=>{
response.send('server is running')
})

app.get('/guestbook', (req,res)=>{
    res.sendFile(Path2D.join__dirname, 'assets/guestbook.html')
})

app.get('/submit', (req, res)=>{
console.log(req.query)

//local variables
let user = req.query.guest
let message = req.query.note
let time = Date(Date.now()).toLocaleString()

console.log(time)

const messageData ={
    username: user,
    message: message, 
    date: time
}

allNotes.push(messageData)

// res.send('thank you for submitting,' + ' ' + user )
res.redirect('/')
})

app.get('/all-messages', (req, res)=>{
    let messageString = '' //creates local variable string to send to client
   
    //use loop to go through all notes array
    for (let n of allNotes){
        messageString += '<h3>' + n.username + '<h3>' + ' says ' + n.message + '<br />'
    }
    //now using json, string is too annoying
   res.json({notes: allNotes})
    // res.send(messageString)
})

//5. listen
app.listen(3001,()=>{
    console.log('server running on http://127.0.0.1:3001/')
})

//pm2 for digital ocean, nodemon for development