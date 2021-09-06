const { httpResponseStatusHandler } = require("./Helper");

const getAllMovies = async () => {
  return await fetch("http://localhost:8000/api/movies", {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  })
    .then(httpResponseStatusHandler)
    .then((data) => {
      console.log(data);
      return data;
    });
};

const createMovie = async (body) => {
  return await fetch("http://localhost:8000/api/movies", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
    body: JSON.stringify(body),
  })
    .then(httpResponseStatusHandler)
    .then((data) => {
      console.log(data);
      return data;
    });
};

export { getAllMovies, createMovie };
