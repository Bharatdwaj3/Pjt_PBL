const express = require('express');
const upload=require('./multer');
const router=express.Router();
const {getPGs, getPG, createPG, updatePG, deletePG} = require('../controllers/pgController');


router.get('/', getPGs);
router.get("/:id", getPG);
router.post("/",upload.single('image'), createPG);
router.put("/",upload.single('image'), updatePG);
router.delete("/:id", deletePG);

module.exports=router;