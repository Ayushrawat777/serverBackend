const express= require("express");
//Database
require("dotenv").config();
const mongoose = require("mongoose");
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected Successfully to MongoDB'))
  .catch((error) => console.error('Failed to connect to MongoDB!', error));

var cors= require("cors");
var cookieParser = require('cookie-parser')

const PORT= process.env.PORT || 8000;
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