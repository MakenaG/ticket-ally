import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { format, parseISO } from "date-fns";
import emailjs from "emailjs-com";

// Define Material UI styles
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(3),
  },
  title: {
    fontSize: theme.typography.h5.fontSize,
    fontWeight: theme.typography.fontWeightBold,
    marginBottom: theme.spacing(3),
  },
  reservation: {
    padding: theme.spacing(3),
  },
  reservationTitle: {
    fontSize: theme.typography.h6.fontSize,
    fontWeight: theme.typography.fontWeightBold,
    marginBottom: theme.spacing(2),
  },
  reservationDetails: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
  },
  reservationGroup: {
    display: "flex",
    justifyContent: "space-between",
  },
  reservationLabel: {
    fontWeight: theme.typography.fontWeightBold,
  },
  reservationValue: {},
  form: {
    marginTop: theme.spacing(3),
    width: "100%",
  },
}));

function Reservation() {
  const classes = useStyles();
  const location = useLocation();

  const [event, setEvent] = useState(null);
  const [ticketType, setTicketType] = useState("");
  const [ticketCount, setTicketCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const eventId = params.get("event");
    const type = params.get("type");
    const count = parseInt(params.get("count"));
    const price = parseFloat(params.get("price"));

    fetch(`https://run.mocky.io/v3/f604746d-b06e-4c4e-89df-462a8828957d/${eventId}`)
      .then((response) => response.json())
      .then((data) => setEvent(data))
      .catch((error) => console.error("Error fetching event:", error));

    setTicketType(type);
    setTicketCount(count);
    setTotalPrice(price);
  }, [location]);

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handleUserEmailChange = (event) => {
    setUserEmail(event.target.value);
  };

  const handleSendEmailClick = (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    if (userName && userEmail) {
      if (event && isValidDate(event.date) && isValidDate(event.time)) {
        try {
          const formattedDate = format(parseISO(event.date), "MMM dd, yyyy");
          const formattedTime = format(parseISO(event.time), "hh:mm a");

          const templateParams = {
            to_name: userName,
            to_email: userEmail,
            event_name: event.name,
            event_date: formattedDate,
            event_time: formattedTime,
            event_venue: event.venue,
            ticket_type: ticketType,
            ticket_count: ticketCount,
            total_price: totalPrice,
          };

          emailjs
            .send(
              "service_ns9z1sc", // Replace with your emailjs service ID
              "template_n0hogmv", // Replace with your emailjs template ID
              templateParams,
              "QJFo8rQmsV_-flAVk" // Replace with your emailjs user ID
            )
            .then(
              (result) => {
                setEmailSent(true);
                console.log("Email sent successfully ",);
            },
            (error) => {
              console.error("Error sending email:", error);
            }
          );
      } catch (error) {
        console.error("Error formatting or sending email:", error);
      }
    } else {
      console.log("Event data is not yet available or invalid");
    }
  } else {
    console.log("Please fill out all required fields (name and email)");
  }
};

const isValidDate = (date) => {
  return !Number.isNaN(new Date(date).getTime());
};

return (
  <Box className={classes.root}>
    <Typography className={classes.title}>Reservation</Typography>
    {event && (
      <Paper className={classes.reservation}>
        <Typography className={classes.reservationTitle}>
          Reservation details
        </Typography>
        <Box className={classes.reservationDetails}>
          <Box className={classes.reservationGroup}>
            <Typography className={classes.reservationLabel}>Event name</Typography>
            <Typography className={classes.reservationValue}>{event.name}</Typography>
          </Box>
          {/* Other details for event information */}
        </Box>
      </Paper>
    )}

    {/* Reservation form */}
    <form className={classes.form} onSubmit={handleSendEmailClick}>
      <TextField
        label="User Name"
        value={userName}
        onChange={handleUserNameChange}
        margin="normal"
        fullWidth
        required // Mark the field as required
        error={!userName} // Set error state if user name is empty
        helperText={!userName ? "Please enter your name" : ""} // Display helper text
      />
      <TextField
        label="User Email"
        type="email"
        value={userEmail}
        onChange={handleUserEmailChange}
        margin="normal"
        fullWidth
        required // Mark the field as required
        error={!userEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail)} // Set error state for invalid email format
        helperText={
          !userEmail
            ? "Please enter your email"
            : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail)
              ? "Please enter a valid email address"
              : ""
        } // Display appropriate helper text
      />
      <Button type="submit" variant="contained" color="primary">
        Send Email
      </Button>
    </form>
  </Box>
);
}

export default Reservation;

