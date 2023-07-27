import { Secret } from 'jsonwebtoken';

export interface IDatabaseConfig {
	host: string;
	user: string;
	password: string;
	database: string;
}

// User Model
export enum EUserRoles {
	admin = 'admin',
	user = 'user'
}
export interface IUser {
	id: number;
	first_name: string;
	last_name: string;
	role: EUserRoles;
	email: string;
	username: string;
	password: string;

	// Statistic
	jwt_ac_token?: Secret;
	created_at?: Date | number | string | any;
	updated_at?: Date | number | string | any;

	// Functions
	comparePassword(password: string): boolean;
	setJwtTokens(accessToken: string, refreshToken: string): void;
	deleteAcToken(): void;
}

// Global
declare module 'express' {
	interface Request {
		user?: IUser | string | object | null | undefined | any;
	}
}
