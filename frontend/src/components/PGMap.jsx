import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Box, Typography, Paper, Chip, Button } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import PersonIcon from '@mui/icons-material/Person';

// Fix for default markers in react-leaflet
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5001/api";

// Custom marker icon
const createCustomIcon = (color = '#3388ff') => {
  return L.divIcon({
    className: 'custom-div-icon',
    html: `<div style="
      background-color: ${color};
      width: 30px;
      height: 30px;
      border-radius: 50% 50% 50% 0;
      border: 2px solid white;
      transform: rotate(-45deg);
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
    "></div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
  });
};

// Component to center map on search location
function MapCenter({ center, zoom }) {
  const map = useMap();
  
  useEffect(() => {
    if (center) {
      map.setView(center, zoom || 13);
    }
  }, [center, zoom, map]);
  
  return null;
}

// Ensure map resizes correctly when container changes size
function MapAutoResize() {
  const map = useMap();
  useEffect(() => {
    const invalidate = () => {
      setTimeout(() => map.invalidateSize(), 0);
    };
    invalidate();
    window.addEventListener('resize', invalidate);
    return () => window.removeEventListener('resize', invalidate);
  }, [map]);
  return null;
}

const PGMap = ({ pgs, searchLocation, onPGSelect }) => {
  const [mapCenter, setMapCenter] = useState([28.6139, 77.2090]); // Default to Delhi
  const [mapZoom, setMapZoom] = useState(10);
  const mapKey = useRef(0);

  useEffect(() => {
    if (searchLocation && searchLocation.coordinates) {
      setMapCenter([searchLocation.coordinates.latitude, searchLocation.coordinates.longitude]);
      setMapZoom(13);
    } else if (pgs && pgs.length > 0) {
      // Center on first PG if no search location
      const firstPG = pgs.find(pg => pg.coordinates && pg.coordinates.latitude);
      if (firstPG) {
        setMapCenter([firstPG.coordinates.latitude, firstPG.coordinates.longitude]);
        setMapZoom(12);
      }
    } else if (navigator.geolocation) {
      // Fallback to user's current location
      navigator.geolocation.getCurrentPosition(
        pos => {
          setMapCenter([pos.coords.latitude, pos.coords.longitude]);
          setMapZoom(13);
        },
        () => {}
      );
    }
    
    // Increment mapKey to force re-initialization when props change
    mapKey.current += 1;
  }, [searchLocation, pgs]);

  const handleMarkerClick = (pg) => {
    if (onPGSelect) {
      onPGSelect(pg);
    }
  };

  // Check if there are any PGs with coordinates
  const pgsWithCoords = pgs ? pgs.filter(pg => pg.coordinates && pg.coordinates.latitude && pg.coordinates.longitude) : [];

  return (
    <Box sx={{ height: '500px', width: '100%', borderRadius: 2, overflow: 'hidden' }}>
      {pgsWithCoords.length === 0 && !searchLocation ? (
        <Box 
          sx={{ 
            height: '100%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            backgroundColor: '#f5f5f5',
            borderRadius: 2
          }}
        >
          <Typography variant="h6" color="text.secondary" textAlign="center">
            No PGs with location data found.<br />
            Add PGs with addresses to see them on the map.
          </Typography>
        </Box>
      ) : (
        <MapContainer
          key={`map-${mapKey.current}`}
          center={mapCenter}
          zoom={mapZoom}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={true}
        >
        <MapCenter center={mapCenter} zoom={mapZoom} />
        <MapAutoResize />
        
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Search location marker */}
        {searchLocation && searchLocation.coordinates && (
          <Marker
            position={[searchLocation.coordinates.latitude, searchLocation.coordinates.longitude]}
            icon={createCustomIcon('#ff4444')}
          >
            <Popup>
              <Box>
                <Typography variant="h6" color="primary" gutterBottom>
                  Search Location
                </Typography>
                <Typography variant="body2">
                  {searchLocation.address}
                </Typography>
              </Box>
            </Popup>
          </Marker>
        )}

        {/* PG markers */}
        {pgs && pgs.map((pg) => {
          if (!pg.coordinates || !pg.coordinates.latitude || !pg.coordinates.longitude) {
            return null;
          }

          return (
            <Marker
              key={pg._id}
              position={[pg.coordinates.latitude, pg.coordinates.longitude]}
              icon={createCustomIcon('#3388ff')}
              eventHandlers={{
                click: () => handleMarkerClick(pg),
              }}
            >
              <Popup maxWidth={300}>
                <Box sx={{ p: 1 }}>
                  <Typography variant="h6" gutterBottom fontWeight="bold">
                    {pg.name}
                  </Typography>
                  
                  <Box display="flex" alignItems="center" mb={1}>
                    <Typography variant="h6" color="primary" fontWeight="bold">
                      ₹{pg.price}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" ml={1}>
                      /month
                    </Typography>
                  </Box>

                  <Box display="flex" alignItems="center" mb={1}>
                    <LocationOnIcon fontSize="small" color="action" />
                    <Typography variant="body2" color="text.secondary" ml={0.5} sx={{ fontSize: '0.75rem' }}>
                      {pg.address}
                    </Typography>
                  </Box>

                  <Box display="flex" alignItems="center" mb={1}>
                    <PersonIcon fontSize="small" color="action" />
                    <Typography variant="body2" color="text.secondary" ml={0.5} sx={{ fontSize: '0.75rem' }}>
                      {pg.ownerName}
                    </Typography>
                  </Box>

                  <Box display="flex" alignItems="center" mb={1}>
                    <PhoneIcon fontSize="small" color="action" />
                    <Typography variant="body2" color="text.secondary" ml={0.5} sx={{ fontSize: '0.75rem' }}>
                      {pg.ownerContact}
                    </Typography>
                  </Box>

                  {pg.distance && (
                    <Chip 
                      label={`${pg.distance.toFixed(1)} km away`} 
                      size="small" 
                      color="primary" 
                      variant="outlined"
                      sx={{ mt: 1 }}
                    />
                  )}

                  {pg.roomTypes && pg.roomTypes.length > 0 && (
                    <Box mt={1}>
                      <Typography variant="caption" color="text.secondary" display="block">
                        Room Types:
                      </Typography>
                      <Box display="flex" flexWrap="wrap" gap={0.5}>
                        {pg.roomTypes.slice(0, 2).map((type, index) => (
                          <Chip key={index} label={type} size="small" variant="outlined" />
                        ))}
                        {pg.roomTypes.length > 2 && (
                          <Chip label={`+${pg.roomTypes.length - 2}`} size="small" variant="outlined" />
                        )}
                      </Box>
                    </Box>
                  )}

                  <Button
                    size="small"
                    variant="contained"
                    fullWidth
                    sx={{ mt: 1 }}
                    onClick={() => handleMarkerClick(pg)}
                  >
                    View Details
                  </Button>
                </Box>
              </Popup>
            </Marker>
          );
        })}
        </MapContainer>
      )}
    </Box>
  );
};

export default PGMap;
