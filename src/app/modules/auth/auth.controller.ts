/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AuthService } from './auth.service';

const signinUser: RequestHandler = catchAsync(async (req, res) => {
  const result = await AuthService.loginUser(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    status: 'success',
    message: 'User signin successfully!',
    data: result,
  });
});

const refreshToken: RequestHandler = catchAsync(async (req, res) => {
  const token = req.headers.authorization;

  const result = await AuthService.refreshToken(token!);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    status: 'success',
    message: 'Token refresh successfully',
    data: result,
  });
});

export const AuthController = {
  signinUser,
  refreshToken,
};
