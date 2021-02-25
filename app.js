const express = require('express');
const app = express();
app.set("view engine","ejs");
const { v4: uuidv4 } = require('uuid');
app.use(express.static('public'));

app.get('/',(req,res)=>{
    //start meeting home route here
    res.status(200).render('home');//looks in view by default
})

app.get('/meetings',(req,res)=>{
    //start meeting home route here
    const roomId = uuidv4();
    res.redirect(`/${roomId}`);
    
})

app.get('/:room',(req,res)=>{
    res.status(200).render('room',{roomId:req.params.room});
})


module.exports = app;