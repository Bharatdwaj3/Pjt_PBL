const express = require("express");
const cors = require("cors");

require("dotenv").config();

const connectDB=require('./db');
const tenantRoutes =require("./routes/tenantRoutes");
const pgRoutes =require("./routes/pgRoutes");

const app=express();

connectDB();     // database connected

app.use(cors({
    origin:'http://localhost:5173' ,
    credentials:true,
}));
app.use(express.json());

app.get('/',(req,res)=>{
    res.send('Server is ready');
});

app.use('/tenants',tenantRoutes);
app.use('/pg',pgRoutes);


const port = process.env.PORT || 3005;

app.listen(port,()=>{
    console.log(`Serve at http:localhost:${port}`);
});