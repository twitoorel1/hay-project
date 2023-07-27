import express from 'express';
import catchAsyncError from '../errors/catchAsyncError';
import FlightsNameListController from '../controllers/flightsNameList.controller';

const router = express.Router();

router.post('/', catchAsyncError(FlightsNameListController.createOne));
router.get('/all', catchAsyncError(FlightsNameListController.getAll));
router.get('/:id', catchAsyncError(FlightsNameListController.getById));
router.put('/:id', catchAsyncError(FlightsNameListController.updateOneById));
router.delete('/:id', catchAsyncError(FlightsNameListController.deleteOneById));

export default router;
