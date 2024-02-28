import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Box, Typography, Paper, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { format } from "date-fns";
import emailjs from "emailjs-com";

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
  reservationDetails: {
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
  reservationValue: {
    fontSize: "1rem",
    color: theme.palette.text.secondary,
  },
  reservationPrice: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: theme.palette.secondary.main,
  },
  reservationForm: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
    marginTop: theme.spacing(4),
  },
  reservationInput: {
    width: "50%",
  },
  reservationButton: {
    color: "white",
    backgroundColor: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}));

function Reservation() {
  const classes = useStyles();
  const location = useLocation(); // Get the location object from React Router
  const [event, setEvent] = useState(null); // State to store the event data
  const [ticketType, setTicketType] = useState(""); // State to store the ticket type
  const [ticketCount, setTicketCount] = useState(0); // State to store the ticket count
  const [totalPrice, setTotalPrice] = useState(0); // State to store the total price
  const [userName, setUserName] = useState(""); // State to store the user name
  const [userEmail, setUserEmail] = useState(""); // State to store the user email
  const [emailSent, setEmailSent] = useState(false); // State to store the email status

  useEffect(() => {
    // Parse the query parameters from the location object
    const params = new URLSearchParams(location.search);
    const eventId = params.get("event");
    const type = params.get("type");
    const count = parseInt(params.get("count"));
    const price = parseFloat(params.get("price"));
    

    // Fetch the event data from a mock API by id
    fetch(`https://run.mocky.io/v3/f604746d-b06e-4c4e-89df-462a8828957d/${2}`)
      .then((response) => response.json())
      .then((data) => setEvent(data));

    // Set the state variables with the query parameters
    setTicketType(type);
    setTicketCount(count);
    setTotalPrice(price);
  }, [location]);

  // Handle the change of the user name text field
  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  // Handle the change of the user email text field
  const handleUserEmailChange = (event) => {
    setUserEmail(event.target.value);
  };

  // Handle the click of the send email button
  const handleSendEmailClick = () => {
    // Validate the user name and email
    if (userName && userEmail) {
         // Check if event, event.date and event.time are defined
    if (event && event.date && event.time) {
        

      // Create the email template parameters
      const templateParams = {
        to_name: userName,
        to_email: userEmail,
        event_name: event.name,
        event_date: format(new Date(event.date), "MMM dd, yyyy"),
          // Check if event.time is a valid date object before formatting
          event_time: event.time instanceof Date ? 
                      format(new Date(event.time), "hh:mm a") : 
                      event.time,
        event_time: event.time,
        event_venue: event.venue,
        ticket_type: ticketType,
        ticket_count: ticketCount,
        total_price: totalPrice,
      };

      // Send the email using emailjs service
      emailjs
        .send(
          "service_id", // Replace with your emailjs service id
          "template_id", // Replace with your emailjs template id
          templateParams,
          "user_id" // Replace with your emailjs user id
        )
        .then(
          (result) => {
            // Set the email status to true
            setEmailSent(true);
          },
          (error) => {
            // Handle the error
            console.error(error);
          }
        );
    } else {
        console.log("Event data is not yet available");
      }
    }
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
              <Typography className={classes.reservationLabel}>
                Event name
              </Typography>
              <Typography className={classes.reservationValue}>
                {event.name}
              </Typography>
            </Box>
            <Box className={classes.reservationGroup}>
              <Typography className={classes.reservationLabel}>
                Event date
              </Typography>
              <Typography className={classes.reservationValue}>
                {format(new Date(event.date), "MMM dd, yyyy")}
              </Typography>
            </Box>
            <Box className={classes.reservationGroup}>
              <Typography className={classes.reservationLabel}>
                Event time
              </Typography>
              <Typography className={classes.reservationValue}>
                {event.time}
              </Typography>
            </Box>
            <Box className={classes.reservationGroup}>
              <Typography className={classes.reservationLabel}>
                Event venue
              </Typography>
              <Typography className={classes.reservationValue}>
                {event.venue}
              </Typography>
            </Box>
            <Box className={classes.reservationGroup}>
              <Typography className={classes.reservationLabel}>
                Ticket type
              </Typography>
              <Typography className={classes.reservationValue}>
                {ticketType}
              </Typography>
            </Box>
            <Box className={classes.reservationGroup}>
              <Typography className={classes.reservationLabel}>
                Number of tickets
              </Typography>
              <Typography className={classes.reservationValue}>
                {ticketCount}
              </Typography>
            </Box>
            <Box className={classes.reservationGroup}>
              <Typography className={classes.reservationLabel}>
                Total amount
              </Typography>
              <Typography className={classes.reservationPrice}>
                ${totalPrice}
              </Typography>
            </Box>
          </Box>
          <Box className={classes.reservationForm}>
            <Box className={classes.reservationGroup}>
              <Typography className={classes.reservationLabel}>
                Your name
              </Typography>
              <TextField
                className={classes.reservationInput}
                type="text"
                value={userName}
                onChange={handleUserNameChange}
                variant="outlined"
              />
            </Box>
            <Box className={classes.reservationGroup}>
              <Typography className={classes.reservationLabel}>
                Your email
              </Typography>
              <TextField
                className={classes.reservationInput}
                type="email"
                value={userEmail}
                onChange={handleUserEmailChange}
                variant="outlined"
              />
            </Box>
            <Button
              className={classes.reservationButton}
              onClick={handleSendEmailClick}
            >
              {emailSent ? "Email sent" : "Send email"}
            </Button>
          </Box>
        </Paper>
      )}
    </Box>
  );
}

export default Reservation;