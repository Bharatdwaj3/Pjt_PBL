const express = require("express");
const cors = require("cors");

require("dotenv").config();

const connectDB=require('./db');
const gadgetRoutes =require("./routes/gadgetRoutes");

const app=express();

connectDB();

app.use(cors({
    origin:'http://localhost:5173' ,
    credentials:true,
}));
app.use(express.json());

app.get('/',(req,res)=>{
    res.send('Server is ready');
});

app.use('/product/gadgets',gadgetRoutes);


const port = process.env.PORT || 3005;

app.listen(port,()=>{
    console.log(`Serve at http:localhost:${port}`);
});