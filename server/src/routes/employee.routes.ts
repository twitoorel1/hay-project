import express from 'express';
import catchAsyncError from '../errors/catchAsyncError';
import EmployeeController from '../controllers/employee.controller';

const router = express.Router();

router.post('/', catchAsyncError(EmployeeController.createOne));
router.get('/all', catchAsyncError(EmployeeController.getAll));
router.get('/:id', catchAsyncError(EmployeeController.getById));
router.put('/:id', catchAsyncError(EmployeeController.updateOneById));
router.delete('/:id', catchAsyncError(EmployeeController.deleteOneById));

export default router;
