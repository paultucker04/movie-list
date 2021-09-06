import React from "react";
import { AppBar, Button, Grid } from "@material-ui/core";
// import Grid from "@material-ui/core/Grid";
import { logout } from "./../../services/AuthService";
import { useHistory } from "react-router";

export default function NavHeader() {
  const history = useHistory();

  const logoutHandler = () => {
    logout()
      .then((res) => {
        localStorage.removeItem("token");
        history.push("/login");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <AppBar position="static">
      <Grid container>
        <Grid item xs={10}></Grid>
        <Grid item xs={2}>
          <Button
            variant="contained"
            type="button"
            color="secondary"
            onClick={logoutHandler}
          >
            Logout
          </Button>
        </Grid>
      </Grid>
    </AppBar>
  );
}
