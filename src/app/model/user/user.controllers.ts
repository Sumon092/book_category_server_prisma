import { User } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserServices } from './user.services';

const getAllUser = catchAsync(async (req: Request, res: Response) => {
  const results = await UserServices.getAllUser();

  sendResponse<User[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All user fetched successfully',
    data: results,
  });
});
const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const results = await UserServices.getSingleUser(id);

  sendResponse<User | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User fetched successfully',
    data: results,
  });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const results = await UserServices.updateUser(id, payload);

  sendResponse<User | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated successfully',
    data: results,
  });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const results = await UserServices.deleteUser(id);

  sendResponse<User | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User deleted successfully',
    data: results,
  });
});

export const UserControllers = {
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
};
