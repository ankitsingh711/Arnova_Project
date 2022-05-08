const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://localhost:27017/arnova',{
    useNewUrlParser: true,
    useUnifiedTopology:true,
})

var db = mongoose.connection;

db.on('error',()=>console.log("Error While Connecting to the Database."));
db.once('open',()=>console.log("Connected to the Databse"))

app.post('/login',(req,res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var phone = req.body.phone;

    var data = {
        "Name": name,
        "Email": email,
        "Phone": phone,
    }
    
    db.collection('login users').insertOne(data,(err,collection)=>{
        if(err) throw err;
        console.log('Login Successfully')

    });

    return res.redirect('Home.html')
})


app.get('/login',(req,res)=>{
    res.set({
        "Allow-access-Allow-origin":"*"
    })

    return res.redirect('index.html')
}).listen(7800)

console.log(`Listening on Port 7800 `)

function displayGreeting(event) {
    event.preventDefault();
    let usrname = document.getElementById('typeEmailX').value;
    document.getElementById('outputDiv').innerHTML = 'Hello ' + typeEmailX + ', Welcome to Livewell page' + '<br> ' + 'You are officially a livewell member ' + typeEmailX + '!';
}
