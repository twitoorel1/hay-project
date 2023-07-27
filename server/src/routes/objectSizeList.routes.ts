import express from 'express';
import catchAsyncError from '../errors/catchAsyncError';
import ObjectsSizeListController from '../controllers/objectsSizeList.controller';

const router = express.Router();

router.post('/', catchAsyncError(ObjectsSizeListController.createOne));
router.get('/all', catchAsyncError(ObjectsSizeListController.getAll));
router.get('/:id', catchAsyncError(ObjectsSizeListController.getById));
router.put('/:id', catchAsyncError(ObjectsSizeListController.updateOneById));
router.delete('/:id', catchAsyncError(ObjectsSizeListController.deleteOneById));

export default router;
