import { NextFunction, Request, Response } from 'express';
import Object from '../models/object.model';
import errorHandlerYup from '../errors/errorHandlerYup';
import errorHandler from '../errors/errorHandler';

class ObjectController {
	static async createOne(req: Request, res: Response, next: NextFunction) {
		try {
			const createOneResponse = await Object.createOne(req.body);
			res.status(201).send({ error: false, data: createOneResponse });
		} catch (error: any) {
			if (error.name === 'ValidationError') {
				return errorHandlerYup(error, req, res, next);
			}
			if (error.name) {
				return errorHandler(error, req, res, next);
			}
			console.log(error.message);
		}
	}

	static async getAllObjectsByQueryParams(req: Request, res: Response, next: NextFunction) {
		try {
			const { flight_number, flight_dateTime } = req.query;
			const getAll = await Object.getAllObjectsByQueryParams(+flight_number!, flight_dateTime?.toString()!);
			res.status(200).send({ error: false, data: getAll });
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: 'An error occurred while trying to Get All Objects By Query Params' });
		}
	}

	static async getOneById(req: Request, res: Response, next: NextFunction) {
		try {
			const getOneById = await Object.getOneById(+req.params.id);
			res.status(200).send({ error: false, data: getOneById });
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: 'An error occurred while trying to get One By Id' });
		}
	}
}

export default ObjectController;
