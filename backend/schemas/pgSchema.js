const mongoose = require('mongoose');

const pgSchema=new mongoose.Schema({
    h_no:{
        type:String,
        required:true,
        trim:true
    },
    landmark:{
        type:String,
        required:true,
        trim:true
    },
    type:{
        type:String,
        required:true,
        trim:true
    },
    city:{
        type:String,
        required:true,
        trim:true
    },
    area:{
        type:String,
        required:true,
        trim:true
    },
    rooms:{
        bedrooms:{
            type:Number,
            required:true,
            min:0
        },
        washroom:{
            type:Number,
            required:true,
            min:0
        }
    },
    avaliable: {
        type: Boolean,
        default: true
    },
    imageUrl:{
        type:String
    },
    cloudinaryId:{
        type:String
    }
},{timestamps:true});


module.exports = pgSchema;