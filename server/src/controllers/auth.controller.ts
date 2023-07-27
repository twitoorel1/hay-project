import { NextFunction, Request, Response } from 'express';
import User from '../models/user.model';
import bcrypt from 'bcrypt';
import { NotFoundError, UnauthorizeError } from '../errors/Errors';
import { loginRequestSchema, registerRequestSchema } from '../validators/authRequests.schema';
import _ from 'lodash';
import errorHandlerYup from '../errors/errorHandlerYup';
import errorHandler from '../errors/errorHandler';

class AuthController {
	static async login(req: Request, res: Response, next: NextFunction) {
		try {
			await loginRequestSchema.validate(req.body, { abortEarly: false });
			const { username, password } = req.body;

			const user = await User.findOne(username);
			if (!user) return next(new NotFoundError('User not found'));

			const isMatch = await bcrypt.compare(password, user.password);
			if (!isMatch) return next(new UnauthorizeError('Invalid Username or password'));

			const accessToken = await User.login(user);

			res.status(200).send({ error: false, data: user, token: accessToken });
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

	static async register(req: Request, res: Response, next: NextFunction) {
		try {
			await registerRequestSchema.validate(req.body, { abortEarly: false });
			const { username } = req.body;

			const findUser = await User.findOne(username);
			if (findUser) return next(new UnauthorizeError('Username Or Email Already Exists'));

			const newUser = await User.register(req.body);
			res.status(201).send({ error: false, data: newUser });
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

	static async logout(req: Request, res: Response, next: NextFunction) {
		try {
			const { userId } = req.user;
			const authHeader = req.headers['authorization'];
			const token = authHeader?.split(' ')[1];
			if (!token && !userId) return next(new UnauthorizeError('Token And UserID not provided'));

			const user = await User.findOneById(userId);
			if (!user) return next(new NotFoundError('User not found'));
			await User.logout(user, next);
			res.status(200).send({ error: false, message: 'Logout Successful', userId, token });
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: 'An error occurred while trying to login' });
		}
	}

	static async isLogin(req: Request, res: Response, next: NextFunction) {
		try {
			const authHeader = req.headers['authorization'];
			const token = authHeader?.split(' ')[1];
			if (!token) return next(new UnauthorizeError('Token not provided'));
			const user = await User.isLogin(token, next);
			res.status(200).send({ isAuthenticated: true, user: user });
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: 'An error occurred while trying to login' });
		}
	}
}

export default AuthController;
