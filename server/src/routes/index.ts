import express from 'express';
import formatUptime from '../utils/dates.util';
import { authMiddleware } from '../middlewares/auth.middleware';

// Routes
import authRoutes from './auth.routes';
import employeeRoutes from './employee.routes';
import objectRoutes from './object.routes';
import employeesObjectsRoutes from './employeesObjects.routes';
import flightsNameListRoutes from './flightsNameList.routes';
import objectListRoutes from './objectList.routes';
import objectSizeListRoutes from './objectSizeList.routes';
import flightRoutes from './flight.routes';
import attendanceRoutes from './attendance.routes';

const router = express.Router();

router.get('/', (req, res) => {
	res.status(200).json({ message: `Server Running ${formatUptime(process.uptime())}` });
});
router.use('/auth', authRoutes);
router.use('/object', authMiddleware, objectRoutes);
router.use('/employeesObjects', authMiddleware, employeesObjectsRoutes);

router.use('/employee', authMiddleware, employeeRoutes);
router.use('/flightsNameList', authMiddleware, flightsNameListRoutes);
router.use('/objectList', authMiddleware, objectListRoutes);
router.use('/objectSizeList', authMiddleware, objectSizeListRoutes);
router.use('/flight', authMiddleware, flightRoutes);

router.use('/attendance', authMiddleware, attendanceRoutes);

export default router;
