import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Chip,
  IconButton
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import PersonIcon from "@mui/icons-material/Person";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5001/api";

export default function OwnerPgCard({ pg, onEdit, onDelete }) {
  const handleEdit = (e) => {
    e.stopPropagation();
    onEdit(pg);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete "${pg.name}"?`)) {
      onDelete(pg._id);
    }
  };

  return (
    <Card
      sx={{
        width: 300, // ✅ Fixed width
        height: 420, // ✅ Fixed height for uniform containers
        display: "flex",
        flexDirection: "column",
        borderRadius: 2,
        overflow: "hidden",
        transition: "transform 0.2s",
        "&:hover": { transform: "translateY(-4px)", boxShadow: 4 },
      }}
    >
      <Box sx={{ width: "100%", height: 180, overflow: "hidden" }}> {/* ✅ Fixed image container */}
        <CardMedia
          component="img"
          image={
            pg.images?.length
              ? pg.images[0].startsWith("http")
                ? pg.images[0]
                : `${API_BASE.replace("/api", "")}${pg.images[0]}`
              : "https://via.placeholder.com/400x200?text=No+Image"
          }
          alt={pg.name}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover", // ✅ Prevent image from stretching or overflowing
          }}
        />
      </Box>

      <CardContent sx={{ flexGrow: 1, p: 2 }}>
        <Typography
          variant="h6"
          component="h2"
          gutterBottom
          fontWeight="bold"
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            mb: 1,
          }}
        >
          {pg.name}
        </Typography>

        <Box display="flex" alignItems="center" mb={1}>
          <Typography variant="h5" color="primary" fontWeight="bold">
            ₹{pg.price}
          </Typography>
          <Typography variant="body2" color="text.secondary" ml={1}>
            /month
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" mb={1}>
          <LocationOnIcon fontSize="small" color="action" />
          <Typography
            variant="body2"
            color="text.secondary"
            ml={0.5}
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {pg.address}
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" mb={1}>
          <PersonIcon fontSize="small" color="action" />
          <Typography variant="body2" color="text.secondary" ml={0.5}>
            {pg.ownerName}
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" mb={2}>
          <PhoneIcon fontSize="small" color="action" />
          <Typography variant="body2" color="text.secondary" ml={0.5}>
            {pg.ownerContact}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: "space-between", px: 2, pb: 2 }}>
        <Button
          size="small"
          startIcon={<EditIcon />}
          onClick={handleEdit}
          variant="outlined"
          color="primary"
        >
          Edit
        </Button>
        <IconButton size="small" onClick={handleDelete} color="error">
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
