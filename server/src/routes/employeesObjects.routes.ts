import express from 'express';
import catchAsyncError from '../errors/catchAsyncError';
import EmployeesObjectsController from '../controllers/employeesObjects.controller';
const router = express.Router();

router.get('/all', catchAsyncError(EmployeesObjectsController.getAllByQueryParams));
router.get('/:id', catchAsyncError(EmployeesObjectsController.getOneById));

export default router;
