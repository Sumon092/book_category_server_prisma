import { Request, Response } from 'express';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { OrderServices } from './order.services';

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const payload = {
    userId: user?.userId,
    orderedBooks: req.body.orderedBooks,
  };
  const result = await OrderServices.createOrder(payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order created successfully',
    data: result,
  });
});

const getAllOrder = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderServices.getAllOrder();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Orders fetched successfully',
    data: result,
  });
});

const getOrdersByCustomer = catchAsync(async (req: Request, res: Response) => {
  const id = req.user?.userId;

  const result = await OrderServices.getOrdersByCustomer(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Orders by customer fetched successfully',
    data: result,
  });
});

const getOrderByCustomer = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const { orderId } = req.params;
  if (!user) {
    throw new ApiError(404, 'User not found');
  }
  const result = await OrderServices.getOrderByCustomer(orderId, user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order by customer fetched successfully',
    data: result,
  });
});

export const OrderControllers = {
  createOrder,
  getAllOrder,
  getOrdersByCustomer,
  getOrderByCustomer,
};
