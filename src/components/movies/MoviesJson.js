import { Box, Fab, Grid } from "@material-ui/core";
import React, { useState } from "react";
// import { useState } from "react";
import { useEffect } from "react";
import { Add } from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../store/index";
import { getAllMovies } from "./../../services/MoviesService";
import AddMovieModal from "./AddMovieModal";

export default function MoviesList() {
  const movies = useSelector((state) => state.movies);
  const dispatch = useDispatch();
  const { setMovies } = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    async function getData() {
      setMovies(await getAllMovies());
    }

    getData();
  }, []);

  return (
    <>
      <Box p={3}>
        <div>
          <pre style={{ textAlign: "left" }}>
            {JSON.stringify(movies, null, 2)}
          </pre>
        </div>
      </Box>
    </>
  );
}
