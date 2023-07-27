import * as yup from 'yup';

const createOneObjectsSizeListRequestSchema = yup.object().shape({
	name: yup.string().required('name is required'),
	objects_list_id: yup.number().required('object list id is required')
});

const updateOneObjectsSizeListRequestSchema = yup.object().shape({
	name: yup.string(),
	objects_list_id: yup.number()
});

export { createOneObjectsSizeListRequestSchema, updateOneObjectsSizeListRequestSchema };
