import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  footer: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(2),
    backgroundColor: "white", // White color
    color: "black", // Text color
  },
  link: {
    color: "black",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));

function Footer() {
  const classes = useStyles();

  return (
    <Box className={classes.footer}>
      <Typography variant="body2">
        © {new Date().getFullYear()} Ticket-Ally
      </Typography>
      <Typography variant="body2">
        <a href="/privacy" className={classes.link}>
          Privacy Policy
        </a>{" "}
        |{" "}
        <a href="/terms" className={classes.link}>
          Terms of Service
        </a>
      </Typography>
    </Box>
  );
}

export default Footer;
