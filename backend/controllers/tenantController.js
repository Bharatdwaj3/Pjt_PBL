const Tenant = require("../models/tenantModel");
const cloudinary = require("../services/cloudinary"); 
const getTenants = async (req, res) => {
  try {
    const Tenants = await Tenant.find({});
    res.status(200).json(Tenants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTenant = async (req, res) => {
  try {
    const { id } = req.params;
    const Tenantitem = await Tenant.findById(id);
    res.status(200).json(Tenantitem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createTenant = async (req, res) => {

  try{
    const TenantData=req.body;
    if(req.file){
      TenantData.imageUrl=req.file.path;
      TenantData.cloudinaryId=req.file.filename;
    }    
    const Tenant =  await Tenant.create(TenantData);
    res.status(201).json(Tenant);
  }catch(error){
    console.error("Error creating Tenant: ".error);
    res.status(500).json({message: error.message});
  }

}
const updateTenant = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

   

    if(req.file){
      updateData.imageUrl=req.file.path;
      updateData.cloudinaryId=req.file.filename;
    }

    const Tenant = await Tenant.findByIdAndUpdate(id, updateData, {new: true});

    if (!Tenant) {
      return res.status(404).json({ message: "Tenant not found" });
    }

    res.status(200).json(Tenant);
  } catch (error) {
    console.error("Error updating Tenant: ",error);
    res.status(500).json({ message: error.message });
  }
};

const deleteTenant = async (req, res) => {
  try {
    const { id } = req.params;

    const Tenant = await Tenant.findByIdAndDelete(id);

    if (!Tenant) {
      return res.status(404).json({ message: "Tenant not found" });
    }

    if(Tenant.cloudinaryId){
      await cloudinary.uploader.destroy(Tenant.cloudinaryId);
    }

    res.status(200).json({ message: "Tenant deleted successfully" });
  } catch (error) {
    console.error("Error deleting Tenant: ",error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTenants,
  getTenant,
  createTenant,
  updateTenant,
  deleteTenant,
};
