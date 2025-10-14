const express = require("express");
const cors = require("cors");
const cookieParser =require("cookie-parser");


require("dotenv").config();

const connectDB=require('./db');
const tenantRoutes =require("./routes/tenantRoutes");
const pgRoutes =require("./routes/pgRoutes");
const authRoutes=require("./routes/authRoutes");

const app=express();

connectDB();

app.use(cors({
    origin:'http://localhost:5173' ,
    credentials:true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/',(req,res)=>{
    res.send('Server is ready');
});

app.use('/tenants',tenantRoutes);
app.use('/pg',pgRoutes);
app.use('/api/auth',authRoutes);


const port = process.env.PORT || 3005;

app.listen(port,()=>{
    console.log(`Serve at http:localhost:${port}`);
});