import { NextFunction, Request, Response } from 'express';
import Employee from '../models/employee.model';
import { createOneEmployeeRequestSchema, updateOneEmployeeRequestSchema } from '../validators/employee.schema';
import errorHandlerYup from '../errors/errorHandlerYup';
import errorHandler from '../errors/errorHandler';
import { NotFoundError } from '../errors/Errors';

class EmployeeController {
	static async createOne(req: Request, res: Response, next: NextFunction) {
		try {
			await createOneEmployeeRequestSchema.validate(req.body, { abortEarly: false });
			const { id_number, first_name, last_name } = req.body;

			const createEmployee = await Employee.createOne(id_number, first_name, last_name);
			res.status(201).send({ error: false, data: createEmployee });
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
			const employees = await Employee.getAll();
			if (employees.length === 0) return next(new NotFoundError('Employees not found'));
			res.status(200).send({ error: false, data: employees });
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: 'An error occurred while trying to Get All Employees' });
		}
	}

	static async getById(req: Request, res: Response, next: NextFunction) {
		try {
			const employee = await Employee.getById(+req.params.id);
			if (employee.length === 0) return next(new NotFoundError('Employee not found'));
			res.status(200).send({ error: false, data: employee });
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: 'An error occurred while trying to Get By Id Employee' });
		}
	}

	static async updateOneById(req: Request, res: Response, next: NextFunction) {
		try {
			await updateOneEmployeeRequestSchema.validate(req.body, { abortEarly: false });
			const updateEmployee = await Employee.updateOneById(+req.params.id, req.body);
			if (updateEmployee.affectedRows === 0) return next(new NotFoundError('Employee not found'));
			res.status(200).send({ error: false, data: updateEmployee });
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
			const deleteEmployee = await Employee.deleteOneById(+req.params.id);
			if (deleteEmployee.affectedRows === 0) return next(new NotFoundError('Employee not found'));
			res.status(200).send({ error: false, data: deleteEmployee });
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: 'An error occurred while trying to Delete One By Id Employee' });
		}
	}
}

export default EmployeeController;
