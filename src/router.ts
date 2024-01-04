import { Router, Request, Response } from "express";
import { createMovie, deleteMovie, findMovieById, showMovies, updateMovie } from "./controllers/movieController";

// Validations
import { validate } from "./middleware/handleValidation";
import { movieCreateValidation } from "./middleware/movieValidator";

const router = Router();

export default router
	.get("/test", (req: Request, res: Response) => {
		res.status(200).send("API WORKING");
	})
	.post("/movie", movieCreateValidation(), validate, createMovie)
    .get("/movie/id/:id", findMovieById)
    .get("/movie", showMovies)
    .delete("/movie/id/:id", deleteMovie)
    .patch("/movie/id/:id", movieCreateValidation(), validate, updateMovie)
