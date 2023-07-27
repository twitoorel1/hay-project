import express from 'express';
import catchAsyncError from '../errors/catchAsyncError';
import ObjectListController from '../controllers/objectList.controller';

const router = express.Router();

router.post('/', catchAsyncError(ObjectListController.createOne));
router.get('/all', catchAsyncError(ObjectListController.getAll));
router.get('/:id', catchAsyncError(ObjectListController.getById));
router.put('/:id', catchAsyncError(ObjectListController.updateOneById));
router.delete('/:id', catchAsyncError(ObjectListController.deleteOneById));

export default router;
