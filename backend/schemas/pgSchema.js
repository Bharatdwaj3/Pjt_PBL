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
        type:Boolean,
        required:true,
        trim:true
    },
    city:{
        type:Boolean,
        required:true,
        trim:true
    },
    area:{
        type:Boolean,
        required:true,
        trim:true
    },
    rooms:{
        bedrooms:{
            type:Number,
            requird:true,
            min:0
        },
        washroom:{
            type:Number,
            requird:true,
            min:0
        }
    },
    available: {
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