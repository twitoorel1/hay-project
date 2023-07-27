import { NextFunction, Request, Response } from 'express';
import FlightsNameList from '../models/flightsNameList.model';
import { createOneFlightsNameListRequestSchema, updateOneFlightsNameListRequestSchema } from '../validators/flightsNameList.schema';
import errorHandlerYup from '../errors/errorHandlerYup';
import errorHandler from '../errors/errorHandler';
import { NotFoundError } from '../errors/Errors';

class FlightsNameListController {
	static async createOne(req: Request, res: Response, next: NextFunction) {
		try {
			await createOneFlightsNameListRequestSchema.validate(req.body, { abortEarly: false });
			const { full_name, short_name } = req.body;

			const createOneResponse = await FlightsNameList.createOne(full_name, short_name);
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
			const getAllResponse = await FlightsNameList.getAll();
			if (getAllResponse.length === 0) return next(new NotFoundError('Flights Name List not found'));
			res.status(200).send({ error: false, data: getAllResponse });
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: 'An error occurred while trying to Get All Flights Name List' });
		}
	}

	static async getById(req: Request, res: Response, next: NextFunction) {
		try {
			const getByIdResponse = await FlightsNameList.getById(+req.params.id);
			if (getByIdResponse.length === 0) return next(new NotFoundError('Flight Name List not found'));
			res.status(200).send({ error: false, data: getByIdResponse });
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: 'An error occurred while trying to Get By Id Flight Name List' });
		}
	}

	static async updateOneById(req: Request, res: Response, next: NextFunction) {
		try {
			await updateOneFlightsNameListRequestSchema.validate(req.body, { abortEarly: false });
			const updateById = await FlightsNameList.updateOneById(+req.params.id, req.body);
			if (updateById.affectedRows === 0) return next(new NotFoundError('Flight Name List not found'));
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
			const deleteById = await FlightsNameList.deleteOneById(+req.params.id);
			if (deleteById.affectedRows === 0) return next(new NotFoundError('Flight Name List not found'));
			res.status(200).send({ error: false, data: deleteById });
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: 'An error occurred while trying to Delete One By Id Flight Name List' });
		}
	}
}

export default FlightsNameListController;
