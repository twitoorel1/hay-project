import express from 'express';
import catchAsyncError from '../errors/catchAsyncError';
import AttendanceController from '../controllers/attendance.controller';

const router = express.Router();

router.post('/', catchAsyncError(AttendanceController.createOneById));
router.patch('/exit_time', catchAsyncError(AttendanceController.exitTimeById));
router.get('/:id', catchAsyncError(AttendanceController.getAllListHoursById));
router.get('/total/:id', catchAsyncError(AttendanceController.getTotalHoursById));

router.get('/all/list', catchAsyncError(AttendanceController.getAllListHours));
router.get('/all/hours', catchAsyncError(AttendanceController.getAllHours));

export default router;
