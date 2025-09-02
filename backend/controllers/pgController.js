const PG = require("../models/pgModel");
const cloudinary = require("../services/cloudinary"); 
const getPGs = async (req, res) => {
  try {
    const PGs = await PG.find({});
    res.status(200).json(PGs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPG = async (req, res) => {
  try {
    const { id } = req.params;
    const PGitem = await PG.findById(id);
    res.status(200).json(PGitem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createPG = async (req, res) => {

  try{
    const PGData=req.body;
    if(req.file){
      PGData.imageUrl=req.file.path;
      PGData.cloudinaryId=req.file.filename;
    }    
    const PG =  await PG.create(PGData);
    res.status(201).json(PG);
  }catch(error){
    console.error("Error creating PG: ".error);
    res.status(500).json({message: error.message});
  }

}
const updatePG = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

   

    if(req.file){
      updateData.imageUrl=req.file.path;
      updateData.cloudinaryId=req.file.filename;
    }

    const PG = await PG.findByIdAndUpdate(id, updateData, {new: true});

    if (!PG) {
      return res.status(404).json({ message: "PG not found" });
    }

    res.status(200).json(PG);
  } catch (error) {
    console.error("Error updating PG: ",error);
    res.status(500).json({ message: error.message });
  }
};

const deletePG = async (req, res) => {
  try {
    const { id } = req.params;

    const PG = await PG.findByIdAndDelete(id);

    if (!PG) {
      return res.status(404).json({ message: "PG not found" });
    }

    if(PG.cloudinaryId){
      await cloudinary.uploader.destroy(PG.cloudinaryId);
    }

    res.status(200).json({ message: "PG deleted successfully" });
  } catch (error) {
    console.error("Error deleting PG: ",error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getPGs,
  getPG,
  createPG,
  updatePG,
  deletePG,
};
