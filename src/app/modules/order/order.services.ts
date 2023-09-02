/* eslint-disable @typescript-eslint/no-explicit-any */
import { Order } from '@prisma/client';
import httpStatus from 'http-status';
import prisma from '../../../constants/prisma';
import ApiError from '../../../errors/ApiError';
import { IOrderData } from './order.interface';

const createOrder = async (payload: IOrderData): Promise<Order> => {
  const result = await prisma.order.create({
    data: {
      userId: payload.userId,
      orderedBooks: payload.orderedBooks,
    },
  });
  return result;
};

const getAllOrder = async (): Promise<Order[]> => {
  const result = await prisma.order.findMany({
    include: {
      user: true,
    },
  });
  return result;
};

const getOrdersByCustomer = async (userId: string): Promise<Order[] | null> => {
  const result = await prisma.order.findMany({
    where: {
      userId,
    },
  });
  return result;
};

const getOrderByCustomer = async (
  orderId: string,
  userId: string
): Promise<Order | null> => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'user not found');
  }

  if (user.role === 'admin') {
    return prisma.order.findUnique({
      where: {
        id: orderId,
      },
    });
  } else if (user.role === 'customer') {
    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
    });

    if (!order) {
      throw new ApiError(httpStatus.OK, 'Order not found');
    }

    if (order.userId === userId) {
      return order;
    } else {
      throw new ApiError(httpStatus.BAD_REQUEST, 'User not authorized');
    }
  }
  throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Unexpected condition');
};

export const OrderServices = {
  createOrder,
  getAllOrder,
  getOrdersByCustomer,
  getOrderByCustomer,
};
