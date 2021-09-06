export const setMovies = (moviesArray) => {
  return (dispatch) => {
    dispatch({
      type: "SET",
      payload: moviesArray,
    });
  };
};

export const addMovie = (movie) => {
  return (dispatch) => {
    dispatch({
      type: "ADD",
      payload: movie,
    });
  };
};
