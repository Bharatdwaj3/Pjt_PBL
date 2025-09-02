const mongoose = require('mongoose');

const tenantSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    age:{
        type:String,
        required:true,
        trim:true
    },
    gender:{
        type:Boolean,
        required:true,
        trim:true
    },
    family:{
        type:Boolean,
        required:true,
        trim:true
    },
    imageUrl:{
        type:String
    },
    cloudinaryId:{
        type:String
    }
});


module.exports = tenantSchema;