const express = require('express');
const upload=require('../services/multer');
const router=express.Router();
const {getPGs, getPG, createPG, updatePG, deletePG} = require('../controllers/pgController');

const checkPermissions=require('../middleware/checkPermission');
const roleMiddleware=require('../middleware/roleMiddleware');
const authUser=require('../middleware/authMiddleware');

router.get('/',
    roleMiddleware(['admin','owner','tenant']),
    checkPermissions('view_rooms'),
    getPGs);
router.get("/:id",
    authUser,
    roleMiddleware(['view_rooms']),
    getPG);
router.post("/",upload.single('image'), createPG);
router.put("/",upload.single('image'), updatePG);
router.delete("/:id", deletePG);

module.exports=router;