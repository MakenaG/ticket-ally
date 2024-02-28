import React from "react";
import { Box, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: theme.palette.background.default,
  },
  title: {
    fontSize: "4rem",
    fontWeight: "bold",
    color: theme.palette.primary.main,
  },
  subtitle: {
    fontSize: "2rem",
    color: theme.palette.text.secondary,
  },
  button: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(2, 4),
    fontSize: "1.5rem",
    color: "white",
    backgroundColor: theme.palette.secondary.main,
    "&:hover": {
      backgroundColor: theme.palette.secondary.dark,
    },
  },
}));

function Home() {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Typography className={classes.title}>Welcome to Ticket Booking System</Typography>
      <Typography className={classes.subtitle}>
        The best place to find and reserve tickets for your favorite events
      </Typography>
      <Button className={classes.button} href="/events">
        Explore Events
      </Button>
    </Box>
  );
}

export default Home;