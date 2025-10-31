// pages/ManagePGListings.jsx
import React, { useState, useEffect } from "react";
import { Box, Button, Typography, Grid } from "@mui/material";
import PGForm from "../components/Pgform";
import OwnerPgCard from "../components/OwnerPgCard";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || process.env.REACT_APP_API_BASE || "http://localhost:5001/api";

const ManagePGListings = () => {
  const [pgs, setPgs] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [selectedPG, setSelectedPG] = useState(null);

  // Fetch PGs from backend


  
  useEffect(() => {
    const fetchPGs = async () => {
      try {
        const res = await axios.get(`${API_BASE}/pgs`);
        setPgs(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to load PGs");
      }
    };
    fetchPGs();
  }, []);

  const handleAdd = () => {
    setSelectedPG(null);
    setOpenForm(true);
  };



  const handleEdit = (pg) => {
    setSelectedPG(pg);
    setOpenForm(true);
  };



  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE}/pgs/${id}`);
      setPgs(pgs.filter(pg => pg._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete PG");
    }
  };

  const handleSave = (data, type) => {
    if (type === "edit") {
      setPgs(pgs.map(pg => (pg._id === data._id ? data : pg)));
    } else {
      setPgs([...pgs, data]);
    }
    setOpenForm(false);
  };

  return (
    <Box p={3}>
      <Typography variant="h4" fontWeight="bold">Manage PG Listings</Typography>
      <Button variant="contained" sx={{ mt: 2 }} onClick={handleAdd}>+ Add New PG</Button>

      <Grid container spacing={2} mt={2} alignItems="stretch">
        {pgs.map((pg) => (
          <Grid item xs={12} sm={6} md={4} key={pg._id} sx={{ display: 'flex' }}>
            <OwnerPgCard pg={pg} onEdit={() => handleEdit(pg)} onDelete={() => handleDelete(pg._id)} />
          </Grid>
        ))}
      </Grid>



      {openForm && (
        <PGForm
          open={openForm}
          onClose={() => setOpenForm(false)}
          onSaved={handleSave}
          data={selectedPG}
        />
      )}
    </Box>
  );
};

export default ManagePGListings;
