import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  Chip,
  Alert,
  CircularProgress,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5001/api";

const LocationSearch = ({ onSearchResults, onSearchLocationChange }) => {
  const [searchAddress, setSearchAddress] = useState('');
  const [radius, setRadius] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchResults, setSearchResults] = useState(null);

  const handleSearch = async () => {
    if (!searchAddress.trim()) {
      setError('Please enter a location to search');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const response = await axios.get(`${API_BASE}/pgs/search/location`, {
        params: {
          address: searchAddress,
          radius: radius
        }
      });

      const { searchLocation, results, count } = response.data;
      
      setSearchResults({ searchLocation, results, count });
      onSearchResults(results);
      
      if (onSearchLocationChange) {
        onSearchLocationChange(searchLocation);
      }

      if (count === 0) {
        setError(`No PGs found within ${radius} km of "${searchAddress}"`);
      }
    } catch (err) {
      console.error('Location search error:', err);
      setError(err.response?.data?.error || 'Failed to search location');
    } finally {
      setLoading(false);
    }
  };

  const handleClearSearch = () => {
    setSearchAddress('');
    setSearchResults(null);
    setError('');
    onSearchResults([]);
    if (onSearchLocationChange) {
      onSearchLocationChange(null);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom display="flex" alignItems="center">
        <LocationOnIcon sx={{ mr: 1 }} />
        Search PGs by Location
      </Typography>

      <Box display="flex" gap={2} alignItems="center" mb={2}>
        <TextField
          fullWidth
          placeholder="Enter location (e.g., Connaught Place, Delhi)"
          value={searchAddress}
          onChange={(e) => setSearchAddress(e.target.value)}
          onKeyPress={handleKeyPress}
          InputProps={{
            startAdornment: <SearchIcon sx={{ mr: 1, color: 'action.active' }} />,
          }}
        />
        
        <Button
          variant="contained"
          onClick={handleSearch}
          disabled={loading}
          sx={{ minWidth: 120 }}
        >
          {loading ? <CircularProgress size={20} /> : 'Search'}
        </Button>
      </Box>

      <Box mb={2}>
        <Typography variant="subtitle2" gutterBottom>
          Search Radius: {radius} km
        </Typography>
        <Slider
          value={radius}
          onChange={(e, newValue) => setRadius(newValue)}
          min={1}
          max={50}
          step={1}
          marks={[
            { value: 1, label: '1km' },
            { value: 10, label: '10km' },
            { value: 25, label: '25km' },
            { value: 50, label: '50km' }
          ]}
          valueLabelDisplay="auto"
        />
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {searchResults && (
        <Box>
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
            <Typography variant="subtitle1" color="primary">
              Found {searchResults.count} PG{searchResults.count !== 1 ? 's' : ''} near "{searchResults.searchLocation.address}"
            </Typography>
            <Button size="small" onClick={handleClearSearch}>
              Clear Search
            </Button>
          </Box>
          
          {searchResults.results.length > 0 && (
            <Box display="flex" flexWrap="wrap" gap={1}>
              {searchResults.results.slice(0, 5).map((pg) => (
                <Chip
                  key={pg._id}
                  label={`${pg.name} (${pg.distance.toFixed(1)}km)`}
                  variant="outlined"
                  color="primary"
                />
              ))}
              {searchResults.results.length > 5 && (
                <Chip
                  label={`+${searchResults.results.length - 5} more`}
                  variant="outlined"
                />
              )}
            </Box>
          )}
        </Box>
      )}
    </Paper>
  );
};

export default LocationSearch;
