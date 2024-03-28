//Database
require("./DB/db");
const express= require("express");
var cors= require("cors");
var cookieParser = require('cookie-parser')

const PORT=8000;
//Render
const app=express();

app.use(cors());
app.use(express.json());
app.use(cookieParser())

//Available Routes
const auth=require("./Router/auth")
const notes=require("./Router/notes")
app.use('/api/auth',auth);
app.use('/api/notes',notes);

app.listen(PORT,()=>{
    console.log(`Server is Running on Port ${PORT}`);
}) 