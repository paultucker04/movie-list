import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Grid,
  TextField,
} from "@material-ui/core";
import Box from "@material-ui/core/Box";

import { makeStyles } from "@material-ui/styles";

import { Link, useHistory } from "react-router-dom";

import React from "react";
import { login } from "../../services/AuthService";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: theme.palette.primary.main,
    color: "#ffffff",
  },
}));

export default function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const classes = useStyles();

  const history = useHistory();

  const handleLogin = () => {
    setLoading(true);
    login(email, password)
      .then((res) => {
        localStorage.setItem("token", res.token);
        setLoading(false);
        console.log(res, "hoopla");
        history.push("/movies");
      })
      .catch((err) => {
        console.log(err, "hoopla");
        setLoading(false);
        toast.error(err.message);
      });
  };

  return (
    <Box mt={4}>
      <Grid container spacing={3} justifyContent="center">
        <Grid item lg={4} xl={2}>
          <Card>
            <CardHeader
              className={classes.header}
              title="Login hello"
              color="primary"
            />
            <CardContent>
              <form className="form">
                <div>
                  <TextField
                    id="email"
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <TextField
                    id="password"
                    type="password"
                    label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Box mt={2}>
                  <Button
                    type="button"
                    variant="contained"
                    color="primary"
                    onClick={handleLogin}
                    loading={loading.toString()}
                  >
                    {loading ? (
                      <CircularProgress size={24} color="secondary" />
                    ) : (
                      "Login"
                    )}
                  </Button>
                  <Button
                    variant="contained"
                    type="button"
                    color="secondary"
                    component={Link}
                    to="/register"
                  >
                    {" "}
                    Register
                  </Button>
                </Box>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
