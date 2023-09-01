import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AuthServices } from './auth.services';

const signUp = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.signUp(req.body);

  const resultWithoutPassword = {
    id: result.id,
    name: result.name,
    email: result.email,
    role: result.role,
    contactNo: result.contactNo,
    address: result.address,
    profileImg: result.profileImg,
  };

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created successfully',
    data: resultWithoutPassword,
  });
});

export const AuthControllers = {
  signUp,
};
