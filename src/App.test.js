import { render, screen } from "@testing-library/react";
import MovieCard from "./components/movies/MovieCard";

test("Render movie card", () => {
  const info = {
    name: "test Movie",
    year: 1,
  };

  render(<MovieCard info={info} />);
  const title = screen.getByText(/test Movie/i);
  expect(title).toBeInTheDocument();

  const yearsAgo = screen.getByText(/2020 years ago/i);
  expect(yearsAgo).toBeInTheDocument();
});

test("Render movie card current", () => {
  const info = {
    name: "test Movie",
    year: 2021,
  };

  render(<MovieCard info={info} />);
  const yearsAgo = screen.getByText(/Released this year/i);
  expect(yearsAgo).toBeInTheDocument();
});
