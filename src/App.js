import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import {
  Route,
  Switch,
  useHistory,
  matchPath,
  useLocation,
} from "react-router";
import Header from "./components/header/Header";
import PrivateRoute from "./components/helper/PrivateRoute";
import Login from "./components/login/Login";
import Register from "./components/login/Register";
import { ToastContainer } from "react-toastify";
import MoviesList from "./components/movies/MoviesList";
import MoviesJson from "./components/movies/MoviesJson";

// Theres a bug with reacts material-ui library that has issues with strict mode. This
// is so we dont have to disable the entire apps strict mode
import { ThemeProvider } from "@material-ui/styles";
import { unstable_createMuiStrictModeTheme as createTheme } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { isLoggedIn } from "./services/AuthService";

function App() {
  const history = useHistory();
  const location = useLocation();

  if (matchPath(location.pathname, { path: "/", exact: true })) {
    // isLoggedIn().then((res) => {
    //   console.log(res);
    //   if (res) {
    //     history.push("/movies");
    //   } else {
    //     history.push("/login");
    //   }
    // });

    if (
      !matchPath(location.pathname, { path: "/movies", exact: true }) &&
      isLoggedIn()
    ) {
      history.push("/movies");
    } else {
      history.push("/login");
    }
  }

  return (
    <div className="App" style={{ height: "100%", overflow: "auto" }}>
      <ThemeProvider theme={createTheme()}>
        <Grid
          container
          justifyContent="center"
          style={{ backgroundColor: "rgb(228, 236, 240)", height: "100%" }}
        >
          <Grid
            item
            xs={12}
            style={{ backgroundColor: "white", height: "100%" }}
          >
            <ToastContainer position="top-center" theme="colored" />
            <Header></Header>
            <Switch>
              <Route path="/register" component={Register}></Route>
              <Route path="/login" component={Login}></Route>
              <PrivateRoute
                path="/movies"
                component={MoviesList}
              ></PrivateRoute>
              <PrivateRoute path="/json" component={MoviesJson}></PrivateRoute>
            </Switch>
          </Grid>
        </Grid>
      </ThemeProvider>
    </div>
  );
}

export default App;
