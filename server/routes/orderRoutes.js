import express from 'express';
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  getOrders,
  updateOrderToDelivered,
  updateOrderToPaid,
} from '../controllers/orderController.js';
import { admin, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders);
router.route('/').post(addOrderItems);
router.route('/myorders').get( getMyOrders);
router.route('/:id').get(getOrderById);
router.route('/:id/pay').put( updateOrderToPaid);
router.route('/:id/pay').put( updateOrderToPaid);
// router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered);

export default router;
