import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  logo: {
    flexGrow: 1,
    cursor: "pointer",
    color: "#FFF", // White color
  },
  button: {
    color: "#FFF", // White color
    margin: theme.spacing(1),
    borderRadius: 0, // Remove square button appearance
    background: "none", // Set initial background to transparent
    border: "none", // Remove default border
    padding: theme.spacing(1, 2), // Add padding for better touch target
    "&:hover": {
      backgroundColor: "orange", // Change background color on hover
      textDecoration: "none", // Remove underline on hover
    },
  },
}));

function Navbar() {
  const classes = useStyles();
  return (
    <AppBar position="static" style={{ backgroundColor: "#000" }}> {/* Black background */}
      <Toolbar>
        <Typography variant="h4" className={classes.logo}>
          Ticket-Ally
        </Typography>
        <Button
          component={Link}
          to="/"
          className={`${classes.button} ${classes.buttonHover}`}
        >
          Home
        </Button>
        <Button
          component={Link}
          to="/events"
          className={`${classes.button} ${classes.buttonHover}`}
        >
          Events
        </Button>
        <Button
          component={Link}
          to="/admin"
          className={`${classes.button} ${classes.buttonHover}`}
        >
          Admin
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
