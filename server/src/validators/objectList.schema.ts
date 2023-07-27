import * as yup from 'yup';

const createOneObjectListRequestSchema = yup.object().shape({
	name: yup.string().required('name is required'),
	price: yup.number().required('price is required')
});

const updateOneObjectListRequestSchema = yup.object().shape({
	name: yup.string(),
	price: yup.number()
});

export { createOneObjectListRequestSchema, updateOneObjectListRequestSchema };
