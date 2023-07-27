import { NextFunction } from 'express';
import { RowDataPacket } from 'mysql2/promise';
import bcrypt from 'bcrypt';
import { JwtPayload } from 'jsonwebtoken';
import { UnauthorizeError } from '../errors/Errors';
import queryDatabase from '../database/queryDatabase';
import { EUserRoles, IUser } from '../types/global';
import { createAccessToken, verifyAccessToken } from '../services';
import { SELECTED_USER_FIELDS } from '../constants/models.constant';

const databaseName = 'users';

class User {
	static async findOne(username: string) {
		const query = `SELECT ${SELECTED_USER_FIELDS} FROM ${databaseName} WHERE username = ?`;
		try {
			const results = await queryDatabase(query, [username]);
			const rows = results as RowDataPacket[];
			if (rows.length > 0) {
				return rows[0];
			}
			return null;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	static async findOneById(userId: string) {
		const query = `SELECT ${SELECTED_USER_FIELDS} FROM ${databaseName} WHERE id = ?`;

		try {
			const results = await queryDatabase(query, [userId]);
			const rows = results as RowDataPacket[];
			if (rows.length > 0) {
				return rows[0];
			}
			return null;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	static async login(user: any) {
		const currentDateTime = new Date();
		const query = `UPDATE ${databaseName} SET jwt_ac_token = ?, last_connected = ? WHERE id = ?`;

		try {
			const accessToken = createAccessToken(user.id, user.role);
			await queryDatabase(query, [accessToken, currentDateTime, user.id]);
			return accessToken;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	static async register(body: IUser) {
		const query = `INSERT INTO ${databaseName} (first_name, last_name, role, email, username, password) VALUES (?, ?, ?, ?, ?, ?)`;
		body.role = body.role || 'user';

		if (!Object.values(EUserRoles).includes(body.role)) {
			throw new Error('Invalid role');
		}

		try {
			const hashedPassword = await bcrypt.hash(body.password, 10);
			const results = await queryDatabase(query, [body.first_name, body.last_name, body.role, body.email, body.username, hashedPassword]);

			return results;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	static async logout(user: any, next: NextFunction) {
		const query = `UPDATE ${databaseName} SET jwt_ac_token = NULL WHERE id = ?`;

		try {
			await queryDatabase(query, [user.id]);
			next();
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	static async isLogin(token: string, next: NextFunction) {
		try {
			const { userId } = verifyAccessToken(token) as JwtPayload;
			if (!userId) return next(new UnauthorizeError('Invalid Token'));
			const user = await User.findOneById(userId);
			return user;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}
}

export default User;
