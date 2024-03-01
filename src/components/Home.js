import React, { useState, useEffect } from "react";
import { Box, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const backgroundImages = [
  "https://images.pexels.com/photos/8001059/pexels-photo-8001059.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/5475783/pexels-photo-5475783.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/1684187/pexels-photo-1684187.jpeg?auto=compress&cs=tinysrgb&w=600"
];

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    overflow: "hidden", // Hide overflow to prevent scrollbars
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: -1,
    objectFit: "cover",
    opacity: 0, // Start with all images hidden
    transition: "opacity 1s ease-in-out", // Smooth transition between images
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)", // Semi-transparent overlay
    zIndex: 0,
  },
  heroSection: {
    position: "relative", // Set to relative to ensure z-index works
    zIndex: 1, // Set to ensure content appears above overlay
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: theme.spacing(4),
    color: "white", // Text color for better readability
  },
  title: {
    fontSize: "3rem",
    fontWeight: "bold",
    marginBottom: theme.spacing(2),
  },
  subtitle: {
    fontSize: "1.25rem",
    lineHeight: 1.5,
    marginBottom: theme.spacing(4),
  },
  button: {
    padding: theme.spacing(1.5, 5),
    fontSize: "1rem",
    backgroundColor: "#FFA500", // Orange color
    color: "white", // Text color
    borderRadius: "50px", // Make the button round
    "&:hover": {
      backgroundColor: "white", // White background on hover
      color: "#FFA500", // Orange text color on hover
    },
  },
}));

function Home() {
  const classes = useStyles();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // Change background image every 5 seconds
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box className={classes.root}>
      <div className={classes.overlay}></div>
      <div className={classes.heroSection}>
        <Typography className={classes.title}>
          Discover Amazing Events
        </Typography>
        <Typography className={classes.subtitle}>
          Find events near you and reserve your tickets hassle-free.
        </Typography>
        <Button className={classes.button} href="/events">
          Explore Events
        </Button>
      </div>
      {backgroundImages.map((imageUrl, index) => (
        <img
          key={index}
          src={imageUrl}
          alt="Background"
          className={classes.backgroundImage}
          style={{
            opacity: index === currentImageIndex ? 1 : 0, // Show current image, hide others
          }}
        />
      ))}
    </Box>
  );
}

export default Home;
