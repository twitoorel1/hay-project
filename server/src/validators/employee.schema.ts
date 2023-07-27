import * as yup from 'yup';

const createOneEmployeeRequestSchema = yup.object().shape({
	id_number: yup.string().required('first name is required').min(9),
	first_name: yup.string().required('first name is required'),
	last_name: yup.string().required('last name is required')
});

const updateOneEmployeeRequestSchema = yup.object().shape({
	id_number: yup.string().min(9),
	first_name: yup.string(),
	last_name: yup.string()
});

export { createOneEmployeeRequestSchema, updateOneEmployeeRequestSchema };
