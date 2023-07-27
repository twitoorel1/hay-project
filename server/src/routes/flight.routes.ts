import express from 'express';
import catchAsyncError from '../errors/catchAsyncError';
import FlightController from '../controllers/flight.controller';

const router = express.Router();

router.post('/', catchAsyncError(FlightController.createOne));
router.get('/all', catchAsyncError(FlightController.getAll));
router.get('/:id', catchAsyncError(FlightController.getById));
router.put('/:id', catchAsyncError(FlightController.updateOneById));
router.delete('/:id', catchAsyncError(FlightController.deleteOneById));

export default router;
