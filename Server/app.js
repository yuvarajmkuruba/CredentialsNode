const moogoose = require('mongoose');
const dotenv = require('dotenv');

const express= require('express');
const app = express();


dotenv.config({path : './config.env'});

const PORTS = process.env.PORT;


app.use(express.json())


app.use(require('./Router/router.js'))
require('./DB/db.js')

middleware=(req,res,next)=>{
    console.log("Hello  i am Middle Ware");
   next();
}

app.get('/about',middleware,(req,res)=>{
    console.log("u r in about page")
    res.send(`You are in About Folder `);
});

app.get('/SignUp',(req,res)=>{
    res.send(`You are in SignUp Folder `);
});

app.get('/Contact',(req,res)=>{
   
    res.send(`You are in Contact Folder `);
});

app.listen(PORTS,()=>{
    console.log(`you are in  ${PORTS}`)
});