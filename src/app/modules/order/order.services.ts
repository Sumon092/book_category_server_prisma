/* eslint-disable @typescript-eslint/no-explicit-any */
import { Order } from '@prisma/client';
import prisma from '../../../constants/prisma';
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

export const OrderServices = {
  createOrder,
  getAllOrder,
  getOrdersByCustomer,
};
