import express from 'express';
import {
  authUser,
  deleteUser,
  getUserById,
  getUserProfile,
  getUsers,
  registerUser,
  updateUser,
  updateUserProfile,
  registerAdmin,
  authAdmin,getLectures
} from '../controllers/userController.js';
import { admin, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', registerUser);
router.get('/lectures/:id',getLectures);

router.post('/admin', registerAdmin);

router.route('/').get(protect, admin, getUsers);

router.post('/login', authUser);
router.post('/admin/login', authAdmin);


router
  .route('/:id')
  .delete(deleteUser)
  .get(getUserById);

export default router;
