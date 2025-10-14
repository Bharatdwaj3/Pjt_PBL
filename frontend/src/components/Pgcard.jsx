import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";

export default function PGCard({ pg }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/pg/${pg._id}`);
  };

  return (
    <Card onClick={handleClick} sx={{ cursor: 'pointer' }}>
      <CardMedia
        component="img"
        height="180"
        image={pg.images?.length ? pg.images[0] : "https://via.placeholder.com/400x220?text=No+Image"}
        alt={pg.name}
      />
      <CardContent>
        <Typography variant="h6">{pg.name}</Typography>
        <Typography variant="subtitle1" color="primary">₹{pg.price}</Typography>
      </CardContent>
    </Card>
  );
}
