import express from "express";
import {
  placeOrder,
  placeOrderRazorpay,
  placeOrderStripe,
  allOrders,
  userOrders,
  updateStatus,
  verifyStripe,
} from "../controllers/orderController.js";
import adminAuth from '../middlewares/adminAuth.js'
import authUser from '../middlewares/auth.js'

const orderRouter = express.Router();

// Admin Panel Features
orderRouter.post('/list', adminAuth, allOrders)
orderRouter.post('/status', adminAuth, updateStatus)

// Payment Features
orderRouter.post('/place', authUser, placeOrder)
orderRouter.post('/stripe', authUser, placeOrderStripe)
orderRouter.post('/razorpay', authUser, placeOrderRazorpay)

// Verify Stripe
orderRouter.post('/verify', authUser, verifyStripe)

// User Features 
orderRouter.post('/userorders', authUser, userOrders)

export default orderRouter;
