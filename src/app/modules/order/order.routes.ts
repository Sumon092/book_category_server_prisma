import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middleWares/auth';
import { OrderControllers } from './order.controller';

const router = express.Router();

router.post(
  '/create-order',
  auth(ENUM_USER_ROLE.CUSTOMER),
  OrderControllers.createOrder
);

router.get('/', auth(ENUM_USER_ROLE.ADMIN), OrderControllers.getAllOrder);
router.get(
  '/:userId',
  auth(ENUM_USER_ROLE.CUSTOMER),
  OrderControllers.getOrdersByCustomer
);

export const OrderRoutes = router;
