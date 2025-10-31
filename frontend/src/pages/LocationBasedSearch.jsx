import React, { useState, useEffect } from "react";
import { Box, Typography, Paper, Grid, Alert } from "@mui/material";
import PGMap from "../components/PGMapFixed";
import LocationSearch from "../components/LocationSearch";
import OwnerPgCard from "../components/OwnerPgCard";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5001/api";

const LocationBasedSearch = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchLocation, setSearchLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [viewMode, setViewMode] = useState("map"); // "map" or "list"

  const handleLocationSearchResults = (results) => {
    setSearchResults(results);
    setError("");
  };

  const handleSearchLocationChange = (location) => {
    setSearchLocation(location);
  };

  const handlePGSelect = (pg) => {
    // Scroll to the PG in list view if it exists
    const element = document.getElementById(`pg-${pg._id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box sx={{ p: 3, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Header */}
      <Paper elevation={2} sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Find PGs Near You
        </Typography>
        <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
          Search for PG accommodations by location and discover nearby options
        </Typography>
      </Paper>

      {/* Location Search */}
      <LocationSearch 
        onSearchResults={handleLocationSearchResults}
        onSearchLocationChange={handleSearchLocationChange}
      />

      {/* View Toggle */}
      <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
        <Box display="flex" gap={2} alignItems="center">
          <Typography variant="h6">View Mode:</Typography>
          <Box display="flex" gap={1}>
            <button
              onClick={() => setViewMode("map")}
              style={{
                padding: '8px 16px',
                border: viewMode === "map" ? '2px solid #667eea' : '1px solid #ccc',
                borderRadius: '4px',
                background: viewMode === "map" ? '#667eea' : 'white',
                color: viewMode === "map" ? 'white' : '#333',
                cursor: 'pointer'
              }}
            >
              Map View
            </button>
            <button
              onClick={() => setViewMode("list")}
              style={{
                padding: '8px 16px',
                border: viewMode === "list" ? '2px solid #667eea' : '1px solid #ccc',
                borderRadius: '4px',
                background: viewMode === "list" ? '#667eea' : 'white',
                color: viewMode === "list" ? 'white' : '#333',
                cursor: 'pointer'
              }}
            >
              List View
            </button>
          </Box>
        </Box>
      </Paper>

      {/* Error Display */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Map View */}
      {viewMode === "map" && (
        <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            PG Locations Map
          </Typography>
          <PGMap 
            pgs={searchResults}
            searchLocation={searchLocation}
            onPGSelect={handlePGSelect}
          />
        </Paper>
      )}

      {/* List View */}
      {viewMode === "list" && (
        <Box>
          <Typography variant="h6" gutterBottom>
            Found PGs ({searchResults.length})
          </Typography>
          
          {searchResults.length === 0 ? (
            <Paper elevation={1} sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No PGs found
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Try searching for a different location or increase the search radius
              </Typography>
            </Paper>
          ) : (
            <Grid container spacing={3} alignItems="stretch">
              {searchResults.map((pg) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={pg._id} id={`pg-${pg._id}`} sx={{ display: 'flex' }}>
                  <OwnerPgCard 
                    pg={pg} 
                    onEdit={() => {}} // No edit functionality in search view
                    onDelete={() => {}} // No delete functionality in search view
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      )}

      {/* Instructions */}
      <Paper elevation={1} sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          How to Use Location Search
        </Typography>
        <Box component="ul" sx={{ pl: 2 }}>
          <Typography component="li" variant="body2" gutterBottom>
            Enter a location (city, area, landmark) in the search box
          </Typography>
          <Typography component="li" variant="body2" gutterBottom>
            Adjust the search radius using the slider (1-50 km)
          </Typography>
          <Typography component="li" variant="body2" gutterBottom>
            Click "Search" to find PGs near your location
          </Typography>
          <Typography component="li" variant="body2" gutterBottom>
            Switch between Map View and List View to explore results
          </Typography>
          <Typography component="li" variant="body2" gutterBottom>
            Click on map markers or PG cards to view details
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default LocationBasedSearch;
