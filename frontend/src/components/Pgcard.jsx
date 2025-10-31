import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5001/api";

export default function PGCard({ pg }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/pg/${pg._id}`);
  };

  const coverImage = pg.images?.length
    ? (pg.images[0].startsWith("http")
        ? pg.images[0]
        : `${API_BASE.replace("/api", "")}${pg.images[0]}`)
    : "https://via.placeholder.com/400x225?text=No+Image";

  return (
    <Card onClick={handleClick} sx={{ cursor: 'pointer', height: '100%', display: 'flex', flexDirection: 'column', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-4px)', boxShadow: 4 } }}>
      <CardMedia
        component="img"
        height="200"
        image={coverImage}
        alt={pg.name}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" sx={{
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {pg.name}
        </Typography>
        <Typography variant="subtitle1" color="primary" fontWeight="bold">₹{pg.price}</Typography>
      </CardContent>
    </Card>
  );
}
