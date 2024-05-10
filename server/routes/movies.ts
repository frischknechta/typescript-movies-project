import express from "express";
import { movies } from "../data/movies";

export const moviesRouter = express.Router();

moviesRouter.get("/movies", (req, res) => {
  try {
    const filteredData = movies.map((movie) => ({
      id: movie.id,
      poster: movie.poster,
      title: movie.title,
      description: movie.overview,
    }));
    res.json(filteredData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error !" });
  }
});

moviesRouter.get("/movies/:id", (req, res) => {
  try {
    const movieId = req.params.id;
    const movie = movies.find((movie) => movie.id === movieId);

    if (!movie) {
      return res.status(404).json({ error: "Film non trouvé" });
    }

    res.json(movie);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error !" });
  }
});

moviesRouter.put("/movies/:id", (req, res) => {
  try {
    const movieId = req.params.id;
    const { title } = req.body;

    if (!title) {
      return res.status(404).json({ error: "Missing Title !" });
    }

    const movieIndex = movies.findIndex((movie) => movie.id === movieId);

    if (movieIndex === -1) {
      return res.status(404).json({ error: "Film non trouvé" });
    }

    movies[movieIndex].title = title;

    res.json({
      message: "Détails du film modifiés avec succès",
      movie: movies[movieIndex],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error !" });
  }
});

moviesRouter.delete("/movies/:id", (req, res) => {
  try {
    const movieId = req.params.id;

    const movieIndex = movies.findIndex((movie) => movie.id === movieId);

    if (movieIndex === -1) {
      return res.status(404).json({ error: "Film non trouvé" });
    }

    const deletedMovie = movies.splice(movieIndex, 1)[0];

    res.json({
      message: "Film supprimé avec succès",
      deletedMovie: deletedMovie,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error !" });
  }
});
