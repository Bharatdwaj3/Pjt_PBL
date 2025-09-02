const express = require('express');
const upload=require('./multer');
const router=express.Router();
const {getTenants, getTenant, createTenant, updateTenant, deleteTenant} = require('../controllers/tenantController.js');


router.get('/', getTenants);
router.get("/:id", getTenant);
router.post("/",upload.single('image'), createTenant);
router.put("/",upload.single('image'), updateTenant);
router.delete("/:id", deleteTenant);

module.exports=router;