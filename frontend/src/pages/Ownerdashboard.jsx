import React, { useState, useEffect } from "react";
import { 
  Box, 
  Button, 
  Typography, 
  Grid, 
  TextField, 
  Card, 
  CardContent, 
  InputAdornment,
  Alert,
  Snackbar,
  Chip,
  Paper,
  Divider
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import FilterListIcon from "@mui/icons-material/FilterList";
import MapIcon from "@mui/icons-material/Map";
import ViewListIcon from "@mui/icons-material/ViewList";
import PGForm from "../components/Pgform";
import OwnerPgCard from "../components/OwnerPgCard";
import PGMap from "../components/PGMapFixed";
import LocationSearch from "../components/LocationSearch";
import axios from "axios";

// API Base
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5001/api";

export default function OwnerDashboard() {
  const [openForm, setOpenForm] = useState(false);
  const [pgs, setPgs] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedPG, setSelectedPG] = useState(null);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [filterPriceRange, setFilterPriceRange] = useState({ min: "", max: "" });
  const [filterRoomType, setFilterRoomType] = useState("");
  const [stats, setStats] = useState({ total: 0, avgPrice: 0, totalValue: 0 });
  const [mapView, setMapView] = useState(false);
  const [searchLocation, setSearchLocation] = useState(null);
  const [mapPGs, setMapPGs] = useState([]);

  const fetchPGs = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/pgs`);
      setPgs(res.data);
      calculateStats(res.data);
      
      // Debug: Log PGs with coordinates
      const pgsWithCoords = res.data.filter(pg => pg.coordinates && pg.coordinates.latitude);
      console.log('Total PGs:', res.data.length);
      console.log('PGs with coordinates:', pgsWithCoords.length);
      console.log('Sample PG with coordinates:', pgsWithCoords[0]);
    } catch (err) {
      console.error(err);
      showSnackbar("Failed to load PGs", "error");
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (pgData) => {
    const total = pgData.length;
    const avgPrice = total > 0 ? Math.round(pgData.reduce((sum, pg) => sum + pg.price, 0) / total) : 0;
    const totalValue = pgData.reduce((sum, pg) => sum + pg.price, 0);
    setStats({ total, avgPrice, totalValue });
  };

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  useEffect(() => {
    fetchPGs();
  }, []);

  const handleAddPG = () => {
    setSelectedPG(null);
    setOpenForm(true);
  };

  const handleEditPG = (pg) => {
    setSelectedPG(pg);
    setOpenForm(true);
  };

  const handleDeletePG = async (id) => {
    try {
      await axios.delete(`${API_BASE}/pgs/${id}`);
      setPgs(pgs.filter(pg => pg._id !== id));
      showSnackbar("PG deleted successfully", "success");
    } catch (err) {
      console.error(err);
      showSnackbar("Failed to delete PG", "error");
    }
  };

  const handlePGSaved = (newPG, type) => {
    if (type === "create") {
      setPgs([...pgs, newPG]);
      showSnackbar("PG added successfully", "success");
    } else {
      setPgs(pgs.map(p => (p._id === newPG._id ? newPG : p)));
      showSnackbar("PG updated successfully", "success");
    }
    setOpenForm(false);
  };

  const filteredPGs = pgs.filter(pg => {
    const matchesSearch = pg.name.toLowerCase().includes(search.toLowerCase()) ||
                         pg.address.toLowerCase().includes(search.toLowerCase()) ||
                         pg.ownerName.toLowerCase().includes(search.toLowerCase());
    
    const matchesPrice = (!filterPriceRange.min || pg.price >= parseInt(filterPriceRange.min)) &&
                        (!filterPriceRange.max || pg.price <= parseInt(filterPriceRange.max));
    
    const matchesRoomType = !filterRoomType || 
                           (pg.roomTypes && pg.roomTypes.some(type => 
                             type.toLowerCase().includes(filterRoomType.toLowerCase())
                           ));
    
    return matchesSearch && matchesPrice && matchesRoomType;
  });

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleLocationSearchResults = (results) => {
    setMapPGs(results);
  };

  const handleSearchLocationChange = (location) => {
    setSearchLocation(location);
  };

  const handlePGSelect = (pg) => {
    // You can implement additional functionality here, like showing PG details
    console.log('Selected PG:', pg);
  };

  const toggleMapView = () => {
    const newMapView = !mapView;
    setMapView(newMapView);
    
    if (newMapView) {
      // When switching to map view, show all PGs with coordinates
      const pgsWithCoords = pgs.filter(pg => pg.coordinates && pg.coordinates.latitude && pg.coordinates.longitude);
      setMapPGs(pgsWithCoords);
      console.log('Map view enabled, PGs with coordinates:', pgsWithCoords.length);
    }
  };

  return (
    <Box sx={{ p: 3, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Header */}
      <Paper elevation={2} sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Owner Dashboard
        </Typography>
        <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
          Manage your PG listings and track your business
        </Typography>
      </Paper>

      {/* Stats Cards */}
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', color: 'white' }}>
            <CardContent>
              <Typography variant="h4" fontWeight="bold">{stats.total}</Typography>
              <Typography variant="subtitle1">Total PGs</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', color: 'white' }}>
            <CardContent>
              <Typography variant="h4" fontWeight="bold">₹{stats.avgPrice}</Typography>
              <Typography variant="subtitle1">Average Rent</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', color: 'white' }}>
            <CardContent>
              <Typography variant="h4" fontWeight="bold">₹{stats.totalValue.toLocaleString()}</Typography>
              <Typography variant="subtitle1">Total Value</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Action Bar */}
      <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
        <Box display="flex" flexWrap="wrap" gap={2} alignItems="center" justifyContent="space-between">
          <Box display="flex" gap={2}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddPG}
              sx={{ 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                '&:hover': { background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)' }
              }}
            >
              Add New PG
            </Button>
            
            <Button
              variant={mapView ? "contained" : "outlined"}
              startIcon={mapView ? <ViewListIcon /> : <MapIcon />}
              onClick={toggleMapView}
              sx={{ 
                background: mapView ? 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' : 'transparent',
                '&:hover': { 
                  background: mapView ? 'linear-gradient(135deg, #3dd16b 0%, #32e1c7 100%)' : 'rgba(67, 233, 123, 0.1)' 
                }
              }}
            >
              {mapView ? 'List View' : 'Map View'}
            </Button>
          </Box>

          <Box display="flex" gap={2} flexWrap="wrap" alignItems="center">
        <TextField
              placeholder="Search PGs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ minWidth: 200 }}
            />
            
            <TextField
              placeholder="Min Price"
              value={filterPriceRange.min}
              onChange={(e) => setFilterPriceRange({...filterPriceRange, min: e.target.value})}
              size="small"
              type="number"
              sx={{ width: 100 }}
            />
            
            <TextField
              placeholder="Max Price"
              value={filterPriceRange.max}
              onChange={(e) => setFilterPriceRange({...filterPriceRange, max: e.target.value})}
              size="small"
              type="number"
              sx={{ width: 100 }}
            />
            
            <TextField
              placeholder="Room Type"
              value={filterRoomType}
              onChange={(e) => setFilterRoomType(e.target.value)}
              size="small"
              sx={{ width: 120 }}
            />
          </Box>
        </Box>
      </Paper>

      {/* Map View */}
      {mapView && (
        <Box mb={3}>
          <LocationSearch 
            onSearchResults={handleLocationSearchResults}
            onSearchLocationChange={handleSearchLocationChange}
          />
          
          <Paper elevation={1} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              PG Locations Map ({mapPGs.length} PGs with coordinates)
            </Typography>
            <PGMap 
              pgs={mapPGs}
              searchLocation={searchLocation}
              onPGSelect={handlePGSelect}
            />
          </Paper>
        </Box>
      )}

      {/* Results Summary */}
      <Box mb={2}>
        <Typography variant="subtitle1" color="text.secondary">
          Showing {filteredPGs.length} of {pgs.length} PGs
          {search && (
            <Chip 
              label={`Search: "${search}"`} 
              size="small" 
              sx={{ ml: 1 }} 
              onDelete={() => setSearch("")}
            />
          )}
        </Typography>
      </Box>

      {/* PG Grid - Only show in list view */}
      {!mapView && (
        <>
          {loading ? (
            <Box display="flex" justifyContent="center" p={4}>
              <Typography>Loading...</Typography>
              </Box>
          ) : filteredPGs.length === 0 ? (
            <Paper elevation={1} sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                {pgs.length === 0 ? "No PGs found" : "No PGs match your search criteria"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {pgs.length === 0 ? "Add your first PG to get started!" : "Try adjusting your search or filters"}
              </Typography>
            </Paper>
          ) : (
            <Grid container spacing={3}>
              {filteredPGs.map((pg) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={pg._id}>
                  <OwnerPgCard 
                    pg={pg} 
                    onEdit={handleEditPG} 
                    onDelete={handleDeletePG} 
                  />
            </Grid>
          ))}
        </Grid>
          )}
        </>
      )}

      {/* PG Form Modal */}
      {openForm && (
        <PGForm
          open={openForm}
          onClose={() => setOpenForm(false)}
          onSaved={handlePGSaved}
          data={selectedPG}
        />
      )}

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
