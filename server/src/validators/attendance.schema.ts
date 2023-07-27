import * as yup from 'yup';

const createOneAttendanceRequestSchema = yup.object().shape({
	employees_id: yup.number().required('employee id is required')
});

export { createOneAttendanceRequestSchema };
