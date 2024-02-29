import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  logo: {
    flexGrow: 1,
    cursor: "pointer",
  },
  button: {
    color: "white",
    margin: theme.spacing(1),
  },
}));

function Navbar() {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h4" className={classes.logo}>
        Ticket-Ally
        </Typography>
        <Button component={Link} to="/" className={classes.button}>
          Home
        </Button>
        <Button component={Link} to="/events" className={classes.button}>
          Events
        </Button>
        <Button component={Link} to="/admin" className={classes.button}>
          Admin
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;