import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  SvgIcon,
} from "@material-ui/core";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { httpResponseStatusHandler } from "../../services/Helper";
import CircularProgressWithLabel from "../helper/CircularProgressWithLabel";
import SVG from "./../../tomatometer.svg";
import AddMovieModal from "./AddMovieModal";

export default function MovieCard({ info }) {
  const [image, setImage] = useState("");
  const [yearDiff] = useState(moment().diff(moment([info.year]), "years"));
  const [genres, setGenre] = useState([]);
  const [votePercentage, setVotePercentage] = useState(0);
  const [imdbLink, setImdbLink] = useState("");
  const [rottenTomatoesLink] = useState(
    "https://www.rottentomatoes.com/m/" + info.rotten_tomatoes_stub
  );
  const [youtubeLink, setYoutubeLink] = useState("");

  const moviedbLink = `https://api.themoviedb.org/3/movie/${info.the_movie_db_id}?api_key=fa7b627d2a9894f1f8d131a5f4ef4a14`;
  const moviedbVideoLink = `https://api.themoviedb.org/3/movie/${info.the_movie_db_id}/videos?api_key=fa7b627d2a9894f1f8d131a5f4ef4a14`;
  useEffect(() => {
    fetch(moviedbLink)
      .then(httpResponseStatusHandler)
      .then((res) => {
        setImage("https://image.tmdb.org/t/p/w92" + res.poster_path);
        setGenre(res.genres);
        setVotePercentage(res.vote_average * 10);
        setImdbLink("https://www.imdb.com/title/" + res.imdb_id);
        console.log(res);
      });

    fetch(moviedbVideoLink)
      .then(httpResponseStatusHandler)
      .then((res) => {
        const filtered = res.results.find((e) =>
          /(?=.*official)(?=.*trailer)/gi.test(e.name)
        );

        let key = res.results[0].key;
        if (filtered) {
          key = filtered.key;
        }

        setYoutubeLink("https://www.youtube.com/watch?v=" + key);
      });
  }, []);

  return (
    <>
      <Card>
        <Grid container>
          <Grid item xs={3}>
            <CardMedia
              image={image}
              style={{ width: 92 }}
              component="img"
              alt="Image not found"
            />
          </Grid>
          <Grid item xs={9}>
            <CardContent style={{ padding: "4px" }}>
              <Grid container>
                <Grid
                  item
                  xs={12}
                  // style={{ display: "flex", justifyContent: "left" }}
                >
                  <Typography
                    variant="body2"
                    color="textPrimary"
                    component="span"
                    style={{ paddingTop: "5px", fontWeight: "bold" }}
                  >
                    {info.name} ({info.year})
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" color="textPrimary" component="p">
                    {yearDiff === 0
                      ? "Released this year"
                      : "Released " + yearDiff + " years ago"}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    variant="caption"
                    color="textPrimary"
                    component="p"
                  >
                    {genres.map((g) => g.name).join("/")}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <CircularProgressWithLabel value={votePercentage} />
              <Button onClick={() => window.open(imdbLink, "_blank")}>
                IMDB
              </Button>
              <Button onClick={() => window.open(rottenTomatoesLink, "_blank")}>
                <img src={SVG} alt="RT" />
              </Button>
              <Button onClick={() => window.open(youtubeLink, "_blank")}>
                <img
                  src="https://img.icons8.com/material/24/000000/youtube-play--v1.png"
                  alt="Trailer"
                />
              </Button>
            </CardActions>
          </Grid>
        </Grid>
      </Card>
    </>
  );
}
