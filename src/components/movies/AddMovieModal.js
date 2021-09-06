import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  makeStyles,
  Modal,
  Paper,
  TextField,
  Typography,
  withStyles,
} from "@material-ui/core";

import MuiDialogTitle from "@material-ui/core/DialogTitle";

import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createMovie } from "../../services/MoviesService";
import { addMovie } from "../../store/action-creators";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../store/index";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: theme.palette.primary.main,
    color: "#ffffff",
  },
  container: {
    marginTop: theme.spacing(4),
  },
  formField: {
    marginBottom: theme.spacing(2),
  },
}));

export default function AddMovieModal({ open, onClose }) {
  const dispatch = useDispatch();
  const { addMovie } = bindActionCreators(actionCreators, dispatch);

  const [formInput, setFormInput] = useState({
    name: "",
    year: "",
    the_movie_db_id: "",
    rotten_tomatoes_stub: "",
  });

  const handleSubmit = () => {
    console.log(formInput);
    createMovie(formInput).then((data) => {
      addMovie(data);
    });
    onClose();
  };

  const classes = useStyles();

  const dialogStyles = (theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(2),
      backgroundColor: theme.palette.primary.main,
      color: "white",
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

  // Custom dialog title bar that includes close button
  const DialogTitle = withStyles(dialogStyles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  });

  return (
    <Dialog
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle id="customized-dialog-title" onClose={onClose}>
        Add new movie
      </DialogTitle>
      <DialogContent dividers>
        <form>
          <TextField
            className={classes.formField}
            variant="filled"
            fullWidth
            label="Name"
            value={formInput.name}
            onChange={(e) =>
              setFormInput({ ...formInput, name: e.target.value })
            }
          ></TextField>
          <TextField
            className={classes.formField}
            variant="filled"
            type="number"
            fullWidth
            label="Year"
            value={formInput.year}
            onChange={(e) =>
              setFormInput({ ...formInput, year: e.target.value })
            }
          ></TextField>
          <TextField
            className={classes.formField}
            variant="filled"
            fullWidth
            label="The MovieDB Id"
            type="number"
            value={formInput.the_movie_db_id}
            onChange={(e) => {
              setFormInput({
                ...formInput,
                the_movie_db_id: e.target.value,
              });
            }}
          ></TextField>
          <TextField
            className={classes.formField}
            variant="filled"
            fullWidth
            label="Rotten Tomatoes Stub"
            value={formInput.rotten_tomatoes_stub}
            onChange={(e) =>
              setFormInput({
                ...formInput,
                rotten_tomatoes_stub: e.target.value,
              })
            }
          ></TextField>
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          onClick={handleSubmit}
          color="primary"
          variant="contained"
        >
          Save changes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
