import { Request, Response } from "express";
import { Types } from "mongoose";

// Model
import { MovieModel } from "../models/Movie";

// Logger
import Logger from "../../config/logger";
import { error } from "console";

export async function createMovie(req: Request, res: Response) {
	try {
		const data = req.body;
		const movie = await MovieModel.create(data);
		return res.status(201).json(movie);
	} catch (error: any) {
		Logger.error(`${error.message}`);
		return res.status(500).json({ error: "Tente mais tarde!" });
	}
}

export async function findMovieById(req: Request, res: Response) {
	try {
		const id = req.params.id;

		if (!Types.ObjectId.isValid(id)) {
			return res.status(404).json({ error: "Id inválido." });
		}

		const movie = await MovieModel.findById(id);

		if (!movie) {
			return res.status(404).json({ error: "ID não encontrado!" });
		}

		return res.status(200).json(movie);
	} catch (error: any) {
		Logger.error(`${error.message}`);
		return res.status(500).json({ error: "Tente mais tarde!" });
	}
}

export async function showMovies(req: Request, res: Response) {
	try {
		const movies = await MovieModel.find();

		if (!movies) {
			return res
				.status(404)
				.json({ error: "Não existem filmes cadastrados!" });
		}

		return res.status(200).json(movies);
	} catch (error: any) {
		Logger.error(`${error.message}`);
		return res.status(500).json({ error: "Tente mais tarde!" });
	}
}

export async function deleteMovie(req: Request, res: Response) {
	try {
		const id = req.params.id;

		if (!Types.ObjectId.isValid(id)) {
			return res.status(404).json({ error: "Id inválido." });
		}

		const movie = await MovieModel.findById(id);

		if (!movie) {
			return res.status(404).json({ error: "ID não encontrado!" });
		}

		await movie.deleteOne();

		return res.status(200).json({ msg: "Filme removido com sucesso!" });
	} catch (error: any) {
		Logger.error(`${error.message}`);
		return res.status(500).json({ error: "Tente mais tarde!" });
	}
}

export async function updateMovie(req: Request, res: Response) {
	try {
		const id = req.params.id;
        const data = req.body

		if (!Types.ObjectId.isValid(id)) {
			return res.status(404).json({ error: "Id inválido." });
		}

		const movie = await MovieModel.findById(id);

		if (!movie) {
			return res.status(404).json({ error: "ID não encontrado!" });
		}

        await MovieModel.updateOne({ _id: id}, data)

        return res.status(200).json(data);


	} catch (error: any) {
		Logger.error(`${error.message}`);
		return res.status(500).json({ error: "Tente mais tarde!" });
	}
}
