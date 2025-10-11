import React, { useState, useEffect } from "react";
import { Box, IconButton, Typography, Button } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

import heroimg1 from "../assets/images/heroimg1.jpg";
import heroimg2 from "../assets/images/heroimg2.jpg";
import heroimg3 from "../assets/images/heroimg3.jpeg";
import homeimg1 from "../assets/images/homeimg1.jpeg";
import homeimg2 from "../assets/images/homeimg2.jpeg";

const images = [heroimg1, heroimg2, heroimg3];

const Home = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () =>
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  const prevSlide = () =>
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {/* Hero Slider */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "80vh",
          overflow: "hidden",
            marginTop:"10px"
        }}
      >
        <Box
          component="img"
          src={images[current]}
          alt={`hero-${current}`}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "all 0.6s ease-in-out",
          }}
        />

        <IconButton
          onClick={prevSlide}
          sx={{
            position: "absolute",
            top: "50%",
            left: "20px",
            transform: "translateY(-50%)",
            color: "white",
            backgroundColor: "rgba(0,0,0,0.4)",
            "&:hover": { backgroundColor: "rgba(0,0,0,0.7)" },
          }}
        >
          <ArrowBackIos />
        </IconButton>

        <IconButton
          onClick={nextSlide}
          sx={{
            position: "absolute",
            top: "50%",
            right: "20px",
            transform: "translateY(-50%)",
            color: "white",
            backgroundColor: "rgba(0,0,0,0.4)",
            "&:hover": { backgroundColor: "rgba(0,0,0,0.7)" },
          }}
        >
          <ArrowForwardIos />
        </IconButton>
      </Box>

      {/* First Info Section (image left, text right) */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          px: 4,
          py: 6,
          gap: 4,
          backgroundColor: "#e0f2f1",
        }}
      >
        <Box
          component="img"
          src={homeimg2}
          alt="Info Image"
          sx={{
            width: { xs: "100%", md: "45%" },
            borderRadius: 2,
            objectFit: "cover",
            maxHeight: 400,
          }}
        />
        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
            Near Campus
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Our PGs are conveniently located close to your college, making daily
            commute easy and stress-free. Enjoy access to nearby transport,
            cafes, and essential amenities while living in a safe and
            comfortable environment. Ideal for students, these PGs provide
            modern facilities and a vibrant community.
          </Typography>
        </Box>
      </Box>

      {/* Second Info Section (image right, text left) */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: { xs: "column", md: "row-reverse" }, // reverse layout on desktop
          alignItems: "center",
          justifyContent: "space-between",
          px: 4,
          py: 6,
          gap: 4,
          backgroundColor: "#e0f2f1", // different background for contrast
        }}
      >
        <Box
          component="img"
          src={homeimg1}
          alt="Info Image"
          sx={{
            width: { xs: "100%", md: "45%" },
            borderRadius: 2,
            objectFit: "cover",
            maxHeight: 400,
          }}
        />
        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
            Corporate Hub
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Stay close to your workplace with PGs conveniently located near
            corporate hubs and business districts. Enjoy easy access to
            transport, cafeterias, and essential amenities while living in a
            secure and comfortable environment. Perfect for working
            professionals seeking a hassle-free and convenient stay.
          </Typography>
        </Box>
      </Box>
    </div>
  );
};

export default Home;
