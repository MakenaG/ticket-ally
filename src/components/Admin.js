import React, { useState, useEffect } from "react";
import { Box, Typography, Table, TableHead, TableBody, TableRow, TableCell, IconButton, Paper, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Edit, Delete, Add } from "@material-ui/icons";

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
  table: {
    width: "80%",
    marginBottom: theme.spacing(4),
  },
  tableHead: {
    backgroundColor: theme.palette.primary.light,
  },
  tableCell: {
    color: theme.palette.text.primary,
  },
  tableButton: {
    color: theme.palette.secondary.main,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "80%",
    padding: theme.spacing(2),
  },
  formTitle: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(2),
  },
  formInput: {
    marginBottom: theme.spacing(2),
  },
  formButton: {
    color: "white",
    backgroundColor: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}));

function Admin() {
  const classes = useStyles();
  const [events, setEvents] = useState([]); // State to store the events data
  const [editId, setEditId] = useState(null); // State to store the id of the event to be edited
  const [name, setName] = useState(""); // State to store the name of the new or edited event
  const [date, setDate] = useState(""); // State to store the date of the new or edited event
  const [time, setTime] = useState(""); // State to store the time of the new or edited event
  const [venue, setVenue] = useState(""); // State to store the venue of the new or edited event
  const [price, setPrice] = useState(0); // State to store the price of the new or edited event
  const [description, setDescription] = useState(""); // State to store the description of the new or edited event
  const [image, setImage] = useState(""); // State to store the image of the new or edited event
  const [maxAttendees, setMaxAttendees] = useState(0); // State to store the maximum number of attendees of the new or edited event

  useEffect(() => {
    // Fetch the events data from a mock API
    fetch("https://run.mocky.io/v3/f604746d-b06e-4c4e-89df-462a8828957d")
      .then((response) => response.json())
      .then((data) => setEvents(data));
  }, []);

  // Handle the click of the edit button
  const handleEditClick = (event) => {
    // Get the event id from the button data attribute
    const eventId = event.currentTarget.dataset.id;
    // Find the event object from the events array by id
    const eventObj = events.find((event) => event.id === eventId);
    // Set the state variables with the event object properties
    setEditId(eventId);
    setName(eventObj.name);
    setDate(eventObj.date);
    setTime(eventObj.time);
    setVenue(eventObj.venue);
    setPrice(eventObj.price);
    setDescription(eventObj.description);
    setImage(eventObj.image);
    setMaxAttendees(eventObj.maxAttendees);
  };

  // Handle the click of the delete button
  const handleDeleteClick = (event) => {
    // Get the event id from the button data attribute
    const eventId = event.currentTarget.dataset.id;
    // Delete the event from the mock API by id
    fetch(`https://run.mocky.io/v3/f604746d-b06e-4c4e-89df-462a8828957d/${1}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        // Filter out the deleted event from the events array and update the state
        const updatedEvents = events.filter((event) => event.id !== eventId);
        setEvents(updatedEvents);
      });
  };

  // Handle the change of the name text field
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  // Handle the change of the date text field
  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  // Handle the change of the time text field
  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  // Handle the change of the venue text field
  const handleVenueChange = (event) => {
    setVenue(event.target.value);
  };

  // Handle the change of the price text field
  const handlePriceChange = (event) => {
    // Validate the input to be a positive number
    const value = parseFloat(event.target.value);
    if (value > 0) {
      setPrice(value);
    }
  };

  // Handle the change of the description text field
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  // Handle the change of the image text field
  const handleImageChange = (event) => {
    setImage(event.target.value);
  };

  // Handle the change of the max attendees text field
  const handleMaxAttendeesChange = (event) => {
    // Validate the input to be a positive integer
    const value = parseInt(event.target.value);
    if (value > 0) {
      setMaxAttendees(value);
    }
  };

  // Handle the click of the save button
  const handleSaveClick = () => {
    // Validate the input fields
    if (name && date && time && venue && price && description && image && maxAttendees) {
      // Create the event object with the input fields
      const eventObj = {
        name,
        date,
        time,
        venue,
        price,
        description,
        image,
        maxAttendees,
      };
      if (editId) {
        // Update the event in the mock API by id
        fetch(`https://run.mocky.io/v3/f604746d-b06e-4c4e-89df-462a8828957d/${1}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(eventObj),
        })
          .then((response) => response.json())
          .then((data) => {
            // Update the event object in the events array and update the state
            const updatedEvents = events.map((event) =>
              event.id === editId ? data : event
            );
            setEvents(updatedEvents);
          });
      } else {
        // Add the event to the mock API
        fetch("https://run.mocky.io/v3/f604746d-b06e-4c4e-89df-462a8828957d", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(eventObj),
        })
          .then((response) => response.json())
          .then((data) => {
            // Add the event object to the events array and update the state
            const updatedEvents = [...events, data];
            setEvents(updatedEvents);
          });
      }
      // Reset the input fields and the edit id
      setEditId(null);
      setName("");
      setDate("");
      setTime("");
      setVenue("");
      setPrice(0);
      setDescription("");
      setImage("");
      setMaxAttendees(0);
    }
  };

  return (
    <Box className={classes.root}>
      <Typography className={classes.title}>Admin</Typography>
      <Table className={classes.table}>
        <TableHead className={classes.tableHead}>
          <TableRow>
            <TableCell className={classes.tableCell}>Name</TableCell>
            <TableCell className={classes.tableCell}>Date</TableCell>
            <TableCell className={classes.tableCell}>Time</TableCell>
            <TableCell className={classes.tableCell}>Venue</TableCell>
            <TableCell className={classes.tableCell}>Price</TableCell>
            <TableCell className={classes.tableCell}>Max Attendees</TableCell>
            <TableCell className={classes.tableCell}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {events.map((event) => (
            <TableRow key={event.id}>
              <TableCell className={classes.tableCell}>{event.name}</TableCell>
              <TableCell className={classes.tableCell}>
                {new Date(event.date).toLocaleDateString()}
              </TableCell>
              <TableCell className={classes.tableCell}>{event.time}</TableCell>
              <TableCell className={classes.tableCell}>{event.venue}</TableCell>
              <TableCell className={classes.tableCell}>${event.price}</TableCell>
              <TableCell className={classes.tableCell}>
                {event.maxAttendees}
              </TableCell>
              <TableCell className={classes.tableCell}>
                <IconButton
                  className={classes.tableButton}
                  data-id={event.id}
                  onClick={handleEditClick}
                >
                  <Edit />
                </IconButton>
                <IconButton
                  className={classes.tableButton}
                  data-id={event.id}
                  onClick={handleDeleteClick}
                >
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Paper className={classes.form}>
        <Typography className={classes.formTitle}>
          {editId ? "Edit event" : "Add new event"}
        </Typography>
        <TextField
          className={classes.formInput}
          label="Name"
          type="text"
          value={name}
          onChange={handleNameChange}
          variant="outlined"
        />
        <TextField
          className={classes.formInput}
          label="Date"
          type="date"
          value={date}
          onChange={handleDateChange}
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          className={classes.formInput}
          label="Time"
          type="time"
          value={time}
          onChange={handleTimeChange}
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          className={classes.formInput}
          label="Venue"
          type="text"
          value={venue}
          onChange={handleVenueChange}
          variant="outlined"
        />
        <TextField
          className={classes.formInput}
          label="Price"
          type="number"
          value={price}
          onChange={handlePriceChange}
          variant="outlined"
        />
        <TextField
          className={classes.formInput}
          label="Description"
          type="text"
          value={description}
          onChange={handleDescriptionChange}
          variant="outlined"
          multiline
          rows={4}
        />
        <TextField
          className={classes.formInput}
          label="Image"
          type="text"
          value={image}
          onChange={handleImageChange}
          variant="outlined"
          helperText="Enter a valid image URL"
        />
        <TextField
          className={classes.formInput}
          label="Max Attendees"
          type="number"
          value={maxAttendees}
          onChange={handleMaxAttendeesChange}
          variant="outlined"
        />
        <Button
          className={classes.formButton}
          onClick={handleSaveClick}
          startIcon={<Add />}
        >
          Save
        </Button>
      </Paper>
    </Box>
  );
}

export default Admin;