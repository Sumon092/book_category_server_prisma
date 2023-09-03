/* eslint-disable @typescript-eslint/no-explicit-any */
import { Order } from '@prisma/client';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
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
      user: {
        select: {
          name: true,
          email: true,
          role: true,
          contactNo: true,
          address: true,
          profileImg: true,
        },
      },
    },
  });
  return result;
};

const getOrdersByCustomer = async (userId: string): Promise<Order[] | null> => {
  const orders = await prisma.order.findMany({
    where: {
      userId,
    },
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
  });
  return orders;
};

const getOrderByCustomer = async (
  orderId: string,
  user: JwtPayload
): Promise<Order | null> => {
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

    if (order.userId === user.userId) {
      return order;
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
