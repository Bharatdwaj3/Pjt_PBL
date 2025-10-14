import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Typography, Chip, Button } from "@mui/material";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5001/api";

export default function PGDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pg, setPG] = useState(null);

  useEffect(() => {
    const fetchPG = async () => {
      try {
        const res = await axios.get(`${API_BASE}/pgs/${id}`);
        setPG(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPG();
  }, [id]);

  if (!pg) return <Typography>Loading...</Typography>;

  return (
    <Box p={3}>
      <Button onClick={() => navigate(-1)}>Back</Button>
      <Typography variant="h4" fontWeight="bold">{pg.name}</Typography>
      <Typography variant="h6">₹{pg.price}</Typography>
      <Typography variant="subtitle1">{pg.address}</Typography>

      <Box mt={2} display="flex" gap={1} flexWrap="wrap">
        {pg.roomTypes?.map((r, i) => <Chip key={i} label={r} size="small" />)}
      </Box>

      <Box mt={2} display="flex" gap={1} flexWrap="wrap">
        {pg.amenities?.map((a, i) => <Chip key={i} label={a} size="small" color="success" />)}
      </Box>

      <Box mt={3} display="flex" gap={2} flexWrap="wrap">
        {pg.images?.map((img, i) => (
          <img
            key={i}
            src={img.startsWith("http") ? img : `${API_BASE.replace("/api", "")}${img}`}
            alt={`img-${i}`}
            style={{ width: 200, height: 150, objectFit: "cover", borderRadius: 6 }}
          />
        ))}
      </Box>
    </Box>
  );
}
