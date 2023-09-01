import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { BookServices } from './book.services';

const createBook = catchAsync(async (req: Request, res: Response) => {
  const result = await BookServices.createBook(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book Info created successfully',
    data: result,
  });
});

export const BookControllers = {
  createBook,
};
