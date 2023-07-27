import express from 'express';
import catchAsyncError from '../errors/catchAsyncError';
import AuthController from '../controllers/auth.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
const router = express.Router();

router.post('/login', catchAsyncError(AuthController.login));
router.post('/register', catchAsyncError(AuthController.register));
router.post('/logout', authMiddleware, catchAsyncError(AuthController.logout));
router.post('/isLogin', authMiddleware, catchAsyncError(AuthController.isLogin));

export default router;
