import { NextFunction, Request, Response } from 'express';
import ObjectsSizeList from '../models/objectsSizeList.model';
import { createOneObjectsSizeListRequestSchema, updateOneObjectsSizeListRequestSchema } from '../validators/objectsSizeList.schema';
import errorHandlerYup from '../errors/errorHandlerYup';
import errorHandler from '../errors/errorHandler';
import { NotFoundError } from '../errors/Errors';

class ObjectsSizeListController {
	static async createOne(req: Request, res: Response, next: NextFunction) {
		try {
			await createOneObjectsSizeListRequestSchema.validate(req.body, { abortEarly: false });
			const { name, objects_list_id } = req.body;

			const createOneResponse = await ObjectsSizeList.createOne(name, objects_list_id);
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
			const getAllResponse = await ObjectsSizeList.getAll();
			if (getAllResponse.length === 0) return next(new NotFoundError('Objects Size List not found'));
			res.status(200).send({ error: false, data: getAllResponse });
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: 'An error occurred while trying to Get All Objects Size List' });
		}
	}

	static async getById(req: Request, res: Response, next: NextFunction) {
		try {
			const getByIdResponse = await ObjectsSizeList.getById(+req.params.id);
			if (getByIdResponse.length === 0) return next(new NotFoundError('Object Size List not found'));
			res.status(200).send({ error: false, data: getByIdResponse });
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: 'An error occurred while trying to Get By Id Object Size List' });
		}
	}

	static async updateOneById(req: Request, res: Response, next: NextFunction) {
		try {
			await updateOneObjectsSizeListRequestSchema.validate(req.body, { abortEarly: false });
			const updateById = await ObjectsSizeList.updateOneById(+req.params.id, req.body);
			if (updateById.affectedRows === 0) return next(new NotFoundError('Object Size List not found'));
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
			const deleteById = await ObjectsSizeList.deleteOneById(+req.params.id);
			if (deleteById.affectedRows === 0) return next(new NotFoundError('Object Size List not found'));
			res.status(200).send({ error: false, data: deleteById });
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: 'An error occurred while trying to Delete One By Id Object Size List' });
		}
	}
}

export default ObjectsSizeListController;
