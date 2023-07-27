import { NextFunction, Request, Response } from 'express';
import Attendance from '../models/attendance.model';
import { createOneAttendanceRequestSchema } from '../validators/attendance.schema';
import errorHandlerYup from '../errors/errorHandlerYup';
import errorHandler from '../errors/errorHandler';
// import { NotFoundError } from '../errors/Errors';

class AttendanceController {
	static async createOneById(req: Request, res: Response, next: NextFunction) {
		try {
			await createOneAttendanceRequestSchema.validate(req.body, { abortEarly: false });
			const createOneResponse = await Attendance.createOneById(req.body.employees_id);
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

	static async exitTimeById(req: Request, res: Response, next: NextFunction) {
		try {
			const exitTimeResponse = await Attendance.exitTimeById(req.body.employees_id);
			res.status(200).send({ error: false, data: exitTimeResponse });
		} catch (error: any) {
			console.log(error.message);
			res.status(500).json({ error: 'An error occurred while trying to Update exit Time By Id Attendance' });
		}
	}

	//  מביא את כל שעות העבודה של העבודה לפי אידיי של עובד
	static async getAllListHoursById(req: Request, res: Response, next: NextFunction) {
		try {
			const getAllResponse = await Attendance.getAllListHoursById(+req.params.id);
			res.status(200).send({ error: false, data: getAllResponse });
		} catch (error) {
			console.log(error);
			res.status(500).json({ error: 'An error occurred while trying to Get All List Hours By Id Attendance' });
		}
	}

	// חישוב שעות עבודה לעובד לפי אידי של עובד
	static async getTotalHoursById(req: Request, res: Response, next: NextFunction) {
		try {
			const getResponse = await Attendance.getTotalHoursById(+req.params.id);
			res.status(200).send({ error: false, data: getResponse });
		} catch (error) {
			console.log(error);
			res.status(500).json({ error: 'An error occurred while trying to Get Total Hours By Id Attendance' });
		}
	}

	static async getAllListHours(req: Request, res: Response, next: NextFunction) {
		try {
			const getAllResponse = await Attendance.getAllListHours();
			res.status(200).send({ error: false, data: getAllResponse });
		} catch (error) {
			console.log(error);
			res.status(500).json({ error: 'An error occurred while trying to Get All List Hours Attendance' });
		}
	}

	static async getAllHours(req: Request, res: Response, next: NextFunction) {
		try {
			const getAllResponse = await Attendance.getAllHours();
			res.status(200).send({ error: false, data: getAllResponse });
		} catch (error) {
			console.log(error);
			res.status(500).json({ error: 'An error occurred while trying to Get All Hours Attendance' });
		}
	}
}

export default AttendanceController;
