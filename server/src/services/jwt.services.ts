import jwt, { JwtPayload } from 'jsonwebtoken';

const jwtConfig = {
	ac_secret: `${process.env.JWT_ACCESS_TOKEN_SECRET}`,
	rf_secret: `${process.env.JWT_REFRESH_TOKEN_SECRET}`,
	ac_expired_millisecond: process.env.JWT_ACCESS_TOKEN_EXPIRED_MILLISECONDS // 1 hour
};

export function createAccessToken(userId: string, role: string) {
	try {
		const payload: JwtPayload = { userId, role };
		console.log('Create Access Token: ', payload);
		return jwt.sign(payload, jwtConfig.ac_secret);
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export function createRefreshToken(userId: string) {
	try {
		const payload: JwtPayload = { userId };
		console.log('Create Refresh Token: ', payload);
		return jwt.sign(payload, jwtConfig.rf_secret);
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export const verifyAccessToken = (token: string): string | JwtPayload => {
	try {
		return jwt.verify(token, jwtConfig.ac_secret);
	} catch (error) {
		console.log(error);
		throw error;
	}
};
