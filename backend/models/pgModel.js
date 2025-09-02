const express = require('express')
const mongoose = require('mongoose');
const pgSchema = require('../schemas/pgSchema');

const pgModel = mongoose.model('pgModel', pgSchema,'pg');
module.exports=pgModel;