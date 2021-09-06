import { Box } from "@material-ui/core";
import React from "react";
// import { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../store/index";
import { getAllMovies } from "./../../services/MoviesService";

export default function MoviesList() {
  const movies = useSelector((state) => state.movies);
  const dispatch = useDispatch();
  const { setMovies } = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    async function getData() {
      setMovies(await getAllMovies());
    }

    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
