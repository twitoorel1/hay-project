import * as yup from 'yup';
import { passwordRegex } from '../constants/regex.constant';
import { EUserRoles } from '../types/global';

const loginRequestSchema = yup.object().shape({
	username: yup.string().required('username is required'),
	password: yup.string().required('password is required').matches(passwordRegex)
});

const registerRequestSchema = yup.object().shape({
	first_name: yup.string().required('firstName is required'),
	last_name: yup.string().required('lastName is required'),
	role: yup.string().oneOf(Object.values(EUserRoles), 'role is invalid'),
	email: yup.string().email().required('Email is required'),
	username: yup.string().required('username is required'),
	password: yup.string().required('password is required').matches(passwordRegex, 'Password not valid'),
	confirmPassword: yup
		.string()
		.required('Confirm Password is required')
		.oneOf([yup.ref('password')], 'Passwords must match')
});

export { registerRequestSchema, loginRequestSchema };
