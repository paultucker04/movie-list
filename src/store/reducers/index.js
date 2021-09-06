import { combineReducers } from "redux";
import MoviesReducer from "./MoviesReducer";

const reducers = combineReducers({
  movies: MoviesReducer,
});

export default reducers;
