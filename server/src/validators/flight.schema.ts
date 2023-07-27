import * as yup from 'yup';

const createOneFlightRequestSchema = yup.object().shape({
	flights_name_list_id: yup.number().required('flights name list id is required'),
	number: yup.number().required('number is required'),
	date_time: yup.date().required('date time is required')
});

const updateOneFlightRequestSchema = yup.object().shape({
	flights_name_list_id: yup.number().required('flights name list id is required'),
	number: yup.number().required('number is required'),
	date_time: yup.date().required('date time is required')
});

export { createOneFlightRequestSchema, updateOneFlightRequestSchema };
