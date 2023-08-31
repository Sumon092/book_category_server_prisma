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

export const UserControllers = {
  getAllUser,
};
