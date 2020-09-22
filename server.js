const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require('passport');
require("./config/passport")(passport); 
const path = require("path");
const cookieSession = require('cookie-session');

require("dotenv").config(); 

const port = process.env.PORT || 5000;     
const app = express(); 

app.use(cookieSession({
    name: 'session',
    maxAge: 24 * 60 * 60 * 1000,
    keys: ['key1', 'key2']
}));

app.use(cors());
app.use(express.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());      

const uri = process.env.MONGODB_URI; 
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
mongoose.connection.once("open", ()=>{  
    console.log("MongoDB database connection established successfully");
}), ('close', ()=>{    
    console.log("MongoDB database connection failed");  
  }) 
         
const userRouter = require('./routes/user');  
// const managerRouter = require('./routes/manager');
const flightRouter = require('./routes/flight'); 
 
app.use('/user', userRouter); 
// app.use('/manager', managerRouter);  
app.use('/flight', flightRouter);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, 'frontend', 'build')))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html')) 
    })
}

app.listen(port, ()=>{
    console.log(`server running on port ${port}`);
}) 