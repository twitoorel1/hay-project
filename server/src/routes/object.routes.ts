import express from 'express';
import catchAsyncError from '../errors/catchAsyncError';
import ObjectController from '../controllers/object.controller';

const router = express.Router();

router.post('/', catchAsyncError(ObjectController.createOne));
router.get('/:id', catchAsyncError(ObjectController.getOneById));
router.get('/all', catchAsyncError(ObjectController.getAllObjectsByQueryParams));

export default router;
