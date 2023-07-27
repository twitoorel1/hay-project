import * as yup from 'yup';

const createOneFlightsNameListRequestSchema = yup.object().shape({
	full_name: yup.string().required('full name is required'),
	short_name: yup.string().required('short name is required')
});

const updateOneFlightsNameListRequestSchema = yup.object().shape({
	full_name: yup.string(),
	short_name: yup.string()
});

export { createOneFlightsNameListRequestSchema, updateOneFlightsNameListRequestSchema };
