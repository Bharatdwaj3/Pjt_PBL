import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

const Navbar = () => {
  const [user, setUser] = useState({
    isLoggedIn: false,
    role: "guest", 
  });

  const navLinks = {
    guest: ["Home", "Find PGs", "Post Property", "Contact", "Login"],
    tenant: ["Home", "Find PGs", "Saved Rooms", "My Bookings", "Profile", "Logout"],
    owner: ["Home", "My Listings", "Add PG", "Messages", "Profile", "Logout"],
  };

  const menuItems = user.isLoggedIn ? navLinks[user.role] : navLinks.guest;

  const handleNavClick = (text) => {
    if (text === "Login") {
      setUser({ isLoggedIn: true, role: "tenant" }); 
    } else if (text === "Logout") {
      setUser({ isLoggedIn: false, role: "guest" });
    }
  };


  return (
    <AppBar position="static" color="primary" sx={{ boxShadow: 2 ,m:0,p:0}}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo */}
        <Typography variant="h6" sx={{ fontWeight: "bold", cursor: "pointer" }}>
          PG Finder
        </Typography>

        {/* Menu Items */}
        <Box sx={{ display: "flex", gap: 2 }}>
          {menuItems.map((item) => (
            <Button
              key={item}
              color="inherit"
              onClick={() => handleNavClick(item)}
            >
              {item}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
