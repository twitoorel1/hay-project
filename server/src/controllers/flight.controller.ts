import { NextFunction, Request, Response } from 'express';
import Flight from '../models/flight.model';
import { createOneFlightRequestSchema, updateOneFlightRequestSchema } from '../validators/flight.schema';
import errorHandlerYup from '../errors/errorHandlerYup';
import errorHandler from '../errors/errorHandler';
import { NotFoundError } from '../errors/Errors';

class FlightController {
	static async createOne(req: Request, res: Response, next: NextFunction) {
		try {
			await createOneFlightRequestSchema.validate(req.body, { abortEarly: false });
			const { flights_name_list_id, number, date_time } = req.body;

			const createOneResponse = await Flight.createOne(flights_name_list_id, number, date_time);
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

	static async getAll(req: Request, res: Response, next: NextFunction) {
		try {
			const getAllResponse = await Flight.getAll();
			if (getAllResponse.length === 0) return next(new NotFoundError('Objects List not found'));
			res.status(200).send({ error: false, data: getAllResponse });
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: 'An error occurred while trying to Get All Objects List' });
		}
	}

	static async getById(req: Request, res: Response, next: NextFunction) {
		try {
			const getByIdResponse = await Flight.getById(+req.params.id);
			if (getByIdResponse.length === 0) return next(new NotFoundError('Object List not found'));
			res.status(200).send({ error: false, data: getByIdResponse });
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: 'An error occurred while trying to Get By Id Object List' });
		}
	}

	static async updateOneById(req: Request, res: Response, next: NextFunction) {
		try {
			await updateOneFlightRequestSchema.validate(req.body, { abortEarly: false });
			const updateById = await Flight.updateOneById(+req.params.id, req.body);
			if (updateById.affectedRows === 0) return next(new NotFoundError('Object List not found'));
			res.status(200).send({ error: false, data: updateById });
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

	static async deleteOneById(req: Request, res: Response, next: NextFunction) {
		try {
			const deleteById = await Flight.deleteOneById(+req.params.id);
			if (deleteById.affectedRows === 0) return next(new NotFoundError('Object List not found'));
			res.status(200).send({ error: false, data: deleteById });
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: 'An error occurred while trying to Delete One By Id Object List' });
		}
	}
}

export default FlightController;
