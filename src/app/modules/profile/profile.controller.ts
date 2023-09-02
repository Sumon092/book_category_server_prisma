import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ProfileService } from './profile.services';

const getProfile = catchAsync(async (req: Request, res: Response) => {
  const reqUserId = req.user?.userId;
  const result = await ProfileService.getProfile(reqUserId);

  const resultWithoutPassword = {
    id: result?.id,
    name: result?.name,
    email: result?.email,
    role: result?.role,
    contactNo: result?.contactNo,
    address: result?.address,
    profileImg: result?.profileImg,
  };
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Profile fetched successful',
    data: resultWithoutPassword,
  });
});

export const ProfileControllers = {
  getProfile,
};
