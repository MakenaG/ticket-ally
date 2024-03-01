import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, Select, MenuItem, Card, CardMedia, CardContent, CardActions, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { format } from "date-fns";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(4),
  },
  title: {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#0d0c0d",
    marginBottom: theme.spacing(2),
  },
  filters: {
    display: "flex",
    width: "80%",
    justifyContent: "space-between",
    marginBottom: theme.spacing(4),
  },
  filter: {
    width: "30%",
  },
  events: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gridGap: theme.spacing(4),
    width: "80%",
  },
  event: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  eventImage: {
    height: 200,
    objectFit: "cover",
  },
  eventContent: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  eventTitle: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: "#0d0c0d",
  },
  eventDetails: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: theme.palette.text.secondary,
  },
  eventPrice: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: theme.palette.secondary.main,
  },
  eventButton: {
    color: "white",
    backgroundColor: "#FFA500",
    "&:hover": {
      backgroundColor: "gold",
    },
  },
}));

function Events() {
  const classes = useStyles();
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("price");

  useEffect(() => {
    // Fetch the events data from a mock API
    fetch("https://run.mocky.io/v3/f604746d-b06e-4c4e-89df-462a8828957d")
      .then((response) => response.json())
      .then((data) => setEvents(data));
  }, []);

  // Filter the events by the search term
  const filteredEvents = events.filter((event) =>
    event.name.toLowerCase().includes(search.toLowerCase())
  );

  // Sort the events by the selected criteria
  const sortedEvents = filteredEvents.sort((a, b) => {
    if (sort === "price") {
      return a.price - b.price;
    } else if (sort === "popularity") {
      return b.popularity - a.popularity;
    } else {
      return 0;
    }
  });

  // Handle the change of the search input
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  // Handle the change of the sort select
  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  // Handle the click of the reserve button
  const handleReserveClick = (event) => {
    // Get the event id from the button data attribute
    const eventId = event.currentTarget.dataset.id;
    // Redirect to the event page with the id as a parameter
    window.location.href = `/events/${eventId}`;
  };

  return (
    <Box className={classes.root}>
      <Typography className={classes.title}>Events</Typography>
      <Box className={classes.filters}>
        <TextField
          className={classes.filter}
          label="Search by name"
          variant="outlined"
          value={search}
          onChange={handleSearchChange}
        />
        <Select
          className={classes.filter}
          label="Sort by"
          variant="outlined"
          value={sort}
          onChange={handleSortChange}
        >
          <MenuItem value="price">Price</MenuItem>
          <MenuItem value="popularity">Popularity</MenuItem>
        </Select>
      </Box>
      <Box className={classes.events}>
        {sortedEvents.map((event) => (
          <Card key={event.id} className={classes.event}>
            <CardMedia
              className={classes.eventImage}
              image={event.image}
              title={event.name}
            />
            <CardContent className={classes.eventContent}>
              <Typography className={classes.eventTitle}>{event.name}</Typography>
              <Box className={classes.eventDetails}>
                <Typography>{format(new Date(event.date), "MMM dd, yyyy")}</Typography>
                <Typography>{event.time}</Typography>
                <Typography>{event.venue}</Typography>
              </Box>
              <Typography className={classes.eventPrice}>${event.price}</Typography>
            </CardContent>
            <CardActions>
              <Button
                className={classes.eventButton}
                data-id={event.id}
                onClick={handleReserveClick}
              >
                Reserve
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    </Box>
  );
}

export default Events;