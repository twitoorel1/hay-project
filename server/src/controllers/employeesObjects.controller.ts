import { NextFunction, Request, Response } from 'express';
import EmployeesObjects from '../models/employeesObjects.model';
// import errorHandlerYup from '../errors/errorHandlerYup';
// import errorHandler from '../errors/errorHandler';

class EmployeesObjectsController {
	static async getAllByQueryParams(req: Request, res: Response, next: NextFunction) {
		try {
			const { firstName, lastName } = req.query;

			const getAllResponse = await EmployeesObjects.getAllByQueryParams(firstName?.toString()!, lastName?.toString()!);
			res.status(201).send({ error: false, data: getAllResponse });
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: 'An error occurred while trying to get All By Query Params' });
		}
	}

	static async getOneById(req: Request, res: Response, next: NextFunction) {
		try {
			const getOneById = await EmployeesObjects.getOneById(+req.params.id);
			res.status(200).send({ error: false, data: getOneById });
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: 'An error occurred while trying to get One By Id' });
		}
	}
}

export default EmployeesObjectsController;
