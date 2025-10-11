import React from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import { Box } from '@mui/material';

function App() {
  return (
    <Box >
      <Navbar />
      <Home />
    </Box>
  );
}

export default App;
