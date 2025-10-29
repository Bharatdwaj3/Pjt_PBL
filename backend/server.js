<<<<<<< HEAD
// server/server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const pgRoutes = require('./routes/pgRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // for JSON bodies

// Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API routes
app.use('/api/pgs', pgRoutes);

// Environment variables
const PORT = 5001; // Force port 5001
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/pgfinder';
console.log('Using PORT:', PORT);
console.log('Using MONGO_URI:', MONGO_URI);
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('MongoDB connection error:', err));
=======
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser =require("cookie-parser");
const passport=require('passport');
const session=require('express-session');
const MongoStore=require('connect-mongo');
const errorMiddleware=require('./middleware/dbMiddleware');

const ownerRoutes =require("./routes/ownerRoutes");
const tenantRoutes =require("./routes/tenantRoutes");
const pgRoutes =require("./routes/pgRoutes");
const userRoutes=require("./routes/userRoutes");

const { PORT, SESSION_SECRECT, MONGO_URI } = require('./config/env.config');
const connectDB=require('./config/db.config');
const morganConfig = require('./config/morgan.config');
require('./strategy/google.aouth');
require('./strategy/discord.aouth');

const app=express();

connectDB();
app.use(morganConfig);
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin:'http://localhost:5173' ,
    credentials:true,
}));
app.use(cookieParser());
app.use(session({
    secret:SESSION_SECRECT,
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({
        mongoUrl: MONGO_URI,

    }),
    cookie: {maxAge :1000*60*60*24}
}));
app.use(passport.initialize());

app.get('/',(req,res)=>{ res.send('Server is ready'); });
app.use('/api/owner',ownerRoutes);
app.use('/api/tenant',tenantRoutes);
app.use('/api/pg',pgRoutes);
app.use('/api/auth/user',userRoutes);


app.get('/auth/google',
    passport.authenticate('google',{scope: ['email','profile']})
);

app.get('/auth/discord',
    passport.authenticate('discord',{scope: ['identify']})
);

app.get('/auth/google/callback',
        passport.authenticate('google',{
        successRedirect :'/protected',
        failureRedirect: '/auth/failure',
    })
);

app.get('/auth/discord/callback',
        passport.authenticate('discord',{
        successRedirect :'/protected',
        failureRedirect: '/auth/failure',
    })
);

app.use(errorMiddleware);

app.listen(PORT, () => console.log('Server Started at port : ',PORT));
>>>>>>> ba8bd5e3922e82240ef14c79024b1a5216d289fb
