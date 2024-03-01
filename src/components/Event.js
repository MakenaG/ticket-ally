import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Grid, Paper, Radio, RadioGroup, FormControlLabel, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(2),
  },
  event: {
    display: "flex",
    flexDirection: "column",
    width: "80%",
    marginBottom: theme.spacing(4),
  },
  eventImage: {
    height: 400,
    objectFit: "cover",
  },
  eventContent: {
    padding: theme.spacing(2),
  },
  eventTitle: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: theme.palette.text.primary,
  },
  eventDetails: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: theme.palette.text.secondary,
  },
  eventDescription: {
    marginTop: theme.spacing(2),
    color: theme.palette.text.primary,
  },
  reservation: {
    display: "flex",
    flexDirection: "column",
    width: "80%",
    padding: theme.spacing(2),
  },
  reservationTitle: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(2),
  },
  reservationForm: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
  },
  reservationGroup: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  reservationLabel: {
    fontSize: "1rem",
    fontWeight: "bold",
    color: theme.palette.text.primary,
  },
  reservationInput: {
    width: "20%",
  },
  reservationPrice: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: theme.palette.secondary.main,
  },
  reservationButton: {
    color: "white",
    backgroundColor: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}));

function Event() {
  const classes = useStyles();
  const { id } = useParams(); // Get the event id from the URL parameter
  const [event, setEvent] = useState(null); // State to store the event data
  const [ticketType, setTicketType] = useState("regular"); // State to store the selected ticket type
  const [ticketCount, setTicketCount] = useState(1); // State to store the selected ticket count
  const [totalPrice, setTotalPrice] = useState(0); // State to store the total price to be paid

  useEffect(() => {
    // Fetch the event data from a mock API by id
    fetch(`https://run.mocky.io/v3/f604746d-b06e-4c4e-89df-462a8828957d/${3}`)
      .then((response) => response.json())
      .then((data) => setEvent(data));
  }, [id]);

  // Handle the change of the ticket type radio buttons
  const handleTicketTypeChange = (event) => {
    setTicketType(event.target.value);
  };

  // Handle the change of the ticket count text field
  const handleTicketCountChange = (event) => {
    // Validate the input to be a positive integer
    const value = parseInt(event.target.value);
    if (value > 0 && value <= 5) {
      setTicketCount(value);
    }
  };

  // Handle the click of the confirm button
  const handleConfirmClick = () => {
    // Redirect to the reservation page with the event id, ticket type, ticket count, and total price as query parameters
    window.location.href = `/reservation?event=${id}&type=${ticketType}&count=${ticketCount}&price=${totalPrice}`;
  };

  // Calculate the total price based on the ticket type and count
  useEffect(() => {
    if (event) {
      if (ticketType === "regular") {
        setTotalPrice(event.price * ticketCount);
      } else if (ticketType === "VIP") {
        setTotalPrice(event.price * 1.5 * ticketCount);
      }
    }
  }, [event, ticketType, ticketCount]);

  return (
    <Box className={classes.root}>
      <Typography className={classes.title}>Event</Typography>
      {event && (
        <>
          <Paper className={classes.event}>
            <img
              className={classes.eventImage}
              src={event.image}
              alt={event.name}
            />
            <Box className={classes.eventContent}>
              <Typography className={classes.eventTitle}>{event.name}</Typography>
              <Box className={classes.eventDetails}>
                <Typography>{new Date(event.date).toLocaleDateString()}</Typography>
                <Typography>{event.time}</Typography>
                <Typography>{event.venue}</Typography>
              </Box>
              <Typography className={classes.eventDescription}>
                {event.description}
              </Typography>
            </Box>
          </Paper>
          <Paper className={classes.reservation}>
            <Typography className={classes.reservationTitle}>
              Reserve your tickets
            </Typography>
            <Box className={classes.reservationForm}>
              <Box className={classes.reservationGroup}>
                <Typography className={classes.reservationLabel}>
                  Ticket type
                </Typography>
                <RadioGroup
                  value={ticketType}
                  onChange={handleTicketTypeChange}
                  row
                >
                  <FormControlLabel
                    value="regular"
                    control={<Radio />}
                    label="Regular"
                  />
                  <FormControlLabel value="VIP" control={<Radio />} label="VIP" />
                </RadioGroup>
              </Box>
              <Box className={classes.reservationGroup}>
                <Typography className={classes.reservationLabel}>
                  Number of tickets
                </Typography>
                <TextField
                  className={classes.reservationInput}
                  type="number"
                  value={ticketCount}
                  onChange={handleTicketCountChange}
                  variant="outlined"
                />
              </Box>
              <Box className={classes.reservationGroup}>
                <Typography className={classes.reservationLabel}>
                  Total amount
                </Typography>
                <Typography className={classes.reservationPrice}>
                  ${totalPrice}
                </Typography>
              </Box>
              <Button
                className={classes.reservationButton}
                onClick={handleConfirmClick}
              >
                Confirm
              </Button>
            </Box>
          </Paper>
        </>
      )}
    </Box>
  );
}

export default Event;