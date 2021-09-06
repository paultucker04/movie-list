import { Box, Fab, Grid } from "@material-ui/core";
import React, { useState } from "react";
// import { useState } from "react";
import { useEffect } from "react";
import { Add } from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../store/index";
import { getAllMovies } from "./../../services/MoviesService";
import MovieCard from "./MovieCard";
import AddMovieModal from "./AddMovieModal";

export default function MoviesList() {
  const movies = useSelector((state) => state.movies);
  const dispatch = useDispatch();
  const { setMovies } = bindActionCreators(actionCreators, dispatch);
  const [openModal, setOpenModal] = useState(false);

  //   const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    async function getData() {
      setMovies(await getAllMovies());
    }

    getData();
  }, []);

  return (
    <>
      <Box p={3}>
        <Grid container spacing={1} justifyContent="flex-start">
          {movies
            .sort((a, b) => b.year - a.year)
            .map((info) => (
              <Grid key={info.id} item xs={4}>
                <MovieCard info={info} />
              </Grid>
            ))}
        </Grid>
      </Box>
      <Fab onClick={handleOpen} color="primary" aria-label="add">
        <Add />
      </Fab>
      <AddMovieModal open={openModal} onClose={handleClose} />
    </>
  );
}
