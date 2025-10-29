// server/routes/pgRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const PG = require('../models/Pg');
const { getCoordinatesFromAddress, calculateDistance } = require('../utils/geocoding');

// Setup multer storage
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// GET all PGs
router.get('/', async (req, res) => {
  try {
    const pgs = await PG.find().sort({ createdAt: -1 });
    res.json(pgs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// SEARCH PGs BY LOCATION (address-based)
router.get('/search/location', async (req, res) => {
	try {
		const { address, radius = 10 } = req.query; // radius in kilometers
		
		if (!address) {
			return res.status(400).json({ error: 'Address is required' });
		}

		// Get coordinates for the search address
		const searchCoordinates = await getCoordinatesFromAddress(address);
		if (!searchCoordinates) {
			return res.status(400).json({ error: 'Could not find coordinates for the given address' });
		}

		// Get all PGs with coordinates
		const pgs = await PG.find({ 
			'coordinates.latitude': { $exists: true },
			'coordinates.longitude': { $exists: true }
		});

		// Filter PGs within the specified radius
		const nearbyPGs = pgs.filter(pg => {
			const distance = calculateDistance(
				searchCoordinates.latitude,
				searchCoordinates.longitude,
				pg.coordinates.latitude,
				pg.coordinates.longitude
			);
			return distance <= radius;
		}).map(pg => ({
			...pg.toObject(),
			distance: calculateDistance(
				searchCoordinates.latitude,
				searchCoordinates.longitude,
				pg.coordinates.latitude,
				pg.coordinates.longitude
			)
		})).sort((a, b) => a.distance - b.distance); // Sort by distance

		res.json({
			searchLocation: {
				address,
				coordinates: searchCoordinates
			},
			results: nearbyPGs,
			count: nearbyPGs.length
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: err.message });
	}
});

// SEARCH PGs BY NEARBY (lat/lng-based)
router.get('/search/nearby', async (req, res) => {
	try {
		const { lat, lng, radius = 10 } = req.query; // radius in kilometers
		const latitude = parseFloat(lat);
		const longitude = parseFloat(lng);
		if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
			return res.status(400).json({ error: 'lat and lng query params are required' });
		}

		const pgs = await PG.find({ 
			'coordinates.latitude': { $exists: true },
			'coordinates.longitude': { $exists: true }
		});

		const nearbyPGs = pgs.filter(pg => {
			const distance = calculateDistance(
				latitude,
				longitude,
				pg.coordinates.latitude,
				pg.coordinates.longitude
			);
			return distance <= radius;
		}).map(pg => ({
			...pg.toObject(),
			distance: calculateDistance(
				latitude,
				longitude,
				pg.coordinates.latitude,
				pg.coordinates.longitude
			)
		})).sort((a, b) => a.distance - b.distance);

		res.json({
			searchLocation: {
				coordinates: { latitude, longitude }
			},
			results: nearbyPGs,
			count: nearbyPGs.length
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: err.message });
	}
});

// GET single
router.get('/:id', async (req, res) => {
  try {
    const pg = await PG.findById(req.params.id);
    if (!pg) return res.status(404).json({ error: 'PG not found' });
    res.json(pg);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE PG (multipart) - images field (multiple)
router.post('/', upload.array('images', 6), async (req, res) => {
  try {
		const {
			name,
			pgname,
			address,
			price,
			rent,
			roomTypes,
			roomType,
			amenities,
			ownerContact,
			ownerName,
			ownername,
			location,
			lat,
			lng
		} = req.body;

		const resolvedName = name || pgname;
		const resolvedPrice = price ?? rent;
		const resolvedOwnerName = ownerName || ownername;
		const latitude = lat !== undefined ? parseFloat(lat) : undefined;
		const longitude = lng !== undefined ? parseFloat(lng) : undefined;
    // roomTypes and amenities may come as comma-separated strings
		const providedRoomTypes = roomTypes || roomType;
		const rt = typeof providedRoomTypes === 'string' ? providedRoomTypes.split(',').map(s => s.trim()).filter(Boolean) : providedRoomTypes || [];
    const am = typeof amenities === 'string' ? amenities.split(',').map(s => s.trim()).filter(Boolean) : amenities || [];

    const imagePaths = (req.files || []).map(f => '/uploads/' + f.filename);

		// Resolve coordinates from provided lat/lng or from address
		let coordinates = undefined;
		if (Number.isFinite(latitude) && Number.isFinite(longitude)) {
			coordinates = { latitude, longitude };
		} else if (address) {
			coordinates = await getCoordinatesFromAddress(address);
		}

		if (!resolvedName) {
			return res.status(400).json({ error: 'name/pgname is required' });
		}
		if (!address && !(Number.isFinite(latitude) && Number.isFinite(longitude))) {
			return res.status(400).json({ error: 'Either address or lat/lng is required' });
		}

    const pg = new PG({
			name: resolvedName,
      address,
			price: resolvedPrice,
      roomTypes: rt,
      amenities: am,
      images: imagePaths,
      ownerContact,
			ownerName: resolvedOwnerName,
			location,
      coordinates
    });
    await pg.save();
    res.status(201).json(pg);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// UPDATE PG (multipart optional)
router.put('/:id', upload.array('images', 6), async (req, res) => {
  try {
		const {
			name,
			pgname,
			address,
			price,
			rent,
			roomTypes,
			roomType,
			amenities,
			keepImages,
			ownerContact,
			ownerName,
			ownername,
			location,
			lat,
			lng
		} = req.body;
    const pg = await PG.findById(req.params.id);
    if (!pg) return res.status(404).json({ error: 'PG not found' });

		const resolvedName = name || pgname;
		const resolvedPrice = (price !== undefined ? price : undefined) ?? (rent !== undefined ? rent : undefined);
		const providedRoomTypes = roomTypes || roomType;

		pg.name = resolvedName ?? pg.name;
		pg.price = resolvedPrice ?? pg.price;
		pg.roomTypes = typeof providedRoomTypes === 'string' ? providedRoomTypes.split(',').map(s => s.trim()).filter(Boolean) : (providedRoomTypes || pg.roomTypes);
    pg.amenities = typeof amenities === 'string' ? amenities.split(',').map(s => s.trim()).filter(Boolean) : (amenities || pg.amenities);
    pg.ownerContact = ownerContact ?? pg.ownerContact;
		pg.ownerName = (ownerName || ownername) ?? pg.ownerName;
		pg.location = location ?? pg.location;

    // Update coordinates if address changed
    if (address && address !== pg.address) {
      pg.address = address;
      const coordinates = await getCoordinatesFromAddress(address);
      if (coordinates) {
        pg.coordinates = coordinates;
      }
    }

		// Or update coordinates from lat/lng
		const latitude = lat !== undefined ? parseFloat(lat) : undefined;
		const longitude = lng !== undefined ? parseFloat(lng) : undefined;
		if (Number.isFinite(latitude) && Number.isFinite(longitude)) {
			pg.coordinates = { latitude, longitude };
		}

    // keepImages may be comma-separated list of existing image URLs the client wants to keep
    let kept = [];
    if (keepImages) {
      kept = typeof keepImages === 'string' ? keepImages.split(',').map(s => s.trim()).filter(Boolean) : keepImages;
    }

    // new uploaded files
    const newImagePaths = (req.files || []).map(f => '/uploads/' + f.filename);

    pg.images = [...kept, ...newImagePaths];

    await pg.save();
    res.json(pg);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE PG (and optionally remove images from disk)
router.delete('/:id', async (req, res) => {
  try {
    const pg = await PG.findByIdAndDelete(req.params.id);
    if (!pg) return res.status(404).json({ error: 'PG not found' });

    // Remove image files from uploads folder
    if (pg.images && pg.images.length) {
      pg.images.forEach(imgPath => {
        const filePath = path.join(__dirname, '..', imgPath); // imgPath like /uploads/xxx.jpg
        if (fs.existsSync(filePath)) {
          fs.unlink(filePath, err => { if (err) console.error(err); });
        }
      });
    }

    res.json({ message: 'PG deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
