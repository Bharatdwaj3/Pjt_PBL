import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

// ✅ Unified API Base for Vite & Fallback
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5001/api";

export default function PGForm({ open, onClose, onSaved, data }) {
  const isEdit = Boolean(data);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [locationName, setLocationName] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [price, setPrice] = useState("");
  const [roomTypesText, setRoomTypesText] = useState("");
  const [amenitiesText, setAmenitiesText] = useState("");
  const [ownerContact, setOwnerContact] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [existingImages, setExistingImages] = useState([]);
  const [imagesFiles, setImagesFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  useEffect(() => {
    if (data) {
      setName(data.name || "");
      setAddress(data.address || "");
      setLocationName(data.location || "");
      setLatitude(data.coordinates?.latitude ?? "");
      setLongitude(data.coordinates?.longitude ?? "");
      setPrice(data.price || "");
      setRoomTypesText((data.roomTypes || []).join(", "));
      setAmenitiesText((data.amenities || []).join(", "));
      setOwnerContact(data.ownerContact || "");
      setOwnerName(data.ownerName || "");
      setExistingImages(data.images || []);
    } else {
      setName("");
      setAddress("");
      setLocationName("");
      setLatitude("");
      setLongitude("");
      setPrice("");
      setRoomTypesText("");
      setAmenitiesText("");
      setOwnerContact("");
      setOwnerName("");
      setExistingImages([]);
    }
    setImagesFiles([]);
    setPreviews([]);
  }, [data]);

  // Generate previews
  useEffect(() => {
    if (imagesFiles.length === 0) return setPreviews([]);
    const p = [];
    imagesFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        p.push(e.target.result);
        if (p.length === imagesFiles.length) setPreviews(p);
      };
      reader.readAsDataURL(file);
    });
  }, [imagesFiles]);

  const handleChooseImages = (e) => {
    const files = Array.from(e.target.files);
    setImagesFiles((prev) => [...prev, ...files].slice(0, 6));
  };

  const handleRemoveExistingImage = (url) => {
    setExistingImages((prev) => prev.filter((u) => u !== url));
  };

  const handleRemoveNewImage = (index) => {
    setImagesFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    const hasCoords = latitude !== "" && longitude !== "";
    if (!name || (!address && !hasCoords) || !price || !ownerContact || !ownerName)
      return alert("Please fill required fields: name, price, owner, and either address or lat/lng");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("address", address);
    if (locationName) formData.append("location", locationName);
    if (latitude !== "") formData.append("lat", latitude);
    if (longitude !== "") formData.append("lng", longitude);
    formData.append("price", price);
    formData.append("roomTypes", roomTypesText);
    formData.append("amenities", amenitiesText);
    formData.append("ownerContact", ownerContact);
    formData.append("ownerName", ownerName);

    if (isEdit) {
      formData.append("keepImages", existingImages.join(","));
    }

    imagesFiles.forEach((f) => formData.append("images", f));

    // Inside handleSubmit
    try {
      let res;
      if (isEdit) {
        res = await axios.put(`${API_BASE}/pgs/${data._id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        onSaved(res.data, "edit");
      } else {
        res = await axios.post(`${API_BASE}/pgs`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        onSaved(res.data, "create");
      }
    } catch (err) {
      console.error(err);
      alert("Save failed");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {isEdit ? "Edit PG" : "Add New PG"}
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
          <TextField
            label="PG Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            required
          />
          <TextField
            label="Monthly Rent (₹)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            fullWidth
            required
            type="number"
          />
          <TextField
            label="Owner Name"
            value={ownerName}
            onChange={(e) => setOwnerName(e.target.value)}
            fullWidth
            required
          />
          <TextField
            label="Owner Contact Number"
            value={ownerContact}
            onChange={(e) => setOwnerContact(e.target.value)}
            fullWidth
            required
            type="tel"
          />
          <TextField
            label="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            fullWidth
            multiline
            sx={{ gridColumn: "1 / -1" }}
            helperText="Provide address or latitude/longitude below"
          />
          <TextField
            label="Location name (optional)"
            value={locationName}
            onChange={(e) => setLocationName(e.target.value)}
            fullWidth
          />
          <TextField
            label="Latitude (optional)"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            fullWidth
            placeholder="e.g., 28.6139"
          />
          <TextField
            label="Longitude (optional)"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            fullWidth
            placeholder="e.g., 77.2090"
          />
          <TextField
            label="Room Types (comma separated)"
            value={roomTypesText}
            onChange={(e) => setRoomTypesText(e.target.value)}
            fullWidth
            placeholder="e.g., Single, Double, Triple"
          />
          <TextField
            label="Amenities (comma separated)"
            value={amenitiesText}
            onChange={(e) => setAmenitiesText(e.target.value)}
            fullWidth
            placeholder="e.g., WiFi, AC, Parking, Laundry"
          />
        </Box>

        <Box mt={3}>
          <Typography variant="subtitle1">Existing Images</Typography>
          <Box display="flex" gap={1} mt={1} flexWrap="wrap">
            {existingImages.length === 0 && (
              <Typography color="textSecondary">No existing images</Typography>
            )}
            {existingImages.map((url, i) => (
              <Box key={i} position="relative">
                <img
                  src={
                    url.startsWith("http")
                      ? url
                      : `${API_BASE.replace("/api", "")}${url}`
                  }
                  alt={`img-${i}`}
                  style={{
                    width: 120,
                    height: 80,
                    objectFit: "cover",
                    borderRadius: 6,
                  }}
                />
                <Button
                  size="small"
                  onClick={() => handleRemoveExistingImage(url)}
                >
                  Remove
                </Button>
              </Box>
            ))}
          </Box>
        </Box>

        <Box mt={3}>
          <Typography variant="subtitle1">Upload New Images (max 6)</Typography>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleChooseImages}
            style={{ marginTop: 8 }}
          />
          <Box display="flex" gap={1} mt={1} flexWrap="wrap">
            {previews.map((p, idx) => (
              <Box key={idx} position="relative">
                <img
                  src={p}
                  alt={`preview-${idx}`}
                  style={{
                    width: 120,
                    height: 80,
                    objectFit: "cover",
                    borderRadius: 6,
                  }}
                />
                <Button size="small" onClick={() => handleRemoveNewImage(idx)}>
                  Remove
                </Button>
              </Box>
            ))}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          {isEdit ? "Save Changes" : "Create PG"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
