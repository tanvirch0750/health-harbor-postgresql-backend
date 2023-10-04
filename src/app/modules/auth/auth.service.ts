/* eslint-disable @typescript-eslint/no-non-null-assertion */
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import prisma from '../../../shared/prisma';
import { ISigninUser, ISigninUserResponse } from './auth.interface';

const loginUser = async (data: ISigninUser): Promise<ISigninUserResponse> => {
  const { email, password } = data;

  let isUserExist;

  const admin = await prisma.admin.findFirst({
    where: { email },
  });

  const doctor = await prisma.doctor.findUnique({
    where: { email },
  });
  const patient = await prisma.patient.findUnique({
    where: { email },
  });

  if (!admin && !patient && !doctor) {
    throw new ApiError('User Doesnot exist', httpStatus.UNAUTHORIZED);
  }

  if (admin || patient || doctor) {
    isUserExist = admin || patient || doctor;
  }

  if (isUserExist && isUserExist.password !== password) {
    throw new ApiError('Password is incorrect', httpStatus.UNAUTHORIZED);
  }

  const payloadData = {
    email: isUserExist!.email,
    role: isUserExist!.role,
    phoneNumber: isUserExist!.phoneNumber,
    fullName: isUserExist!.fullName,
  };

  // create access token
  const { role, email: userEmail, phoneNumber, fullName } = payloadData;

  const token = jwtHelpers.createToken(
    { role, userEmail, phoneNumber, fullName },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    token,
  };
};

const refreshToken = async (token: string) => {
  if (!token) {
    throw new ApiError('Token is required', httpStatus.UNAUTHORIZED);
  }

  const decodedToken = jwtHelpers.verifyToken(
    token,
    config.jwt.secret as Secret
  );

  const { userEmail, role, phoneNumber, fullName } = decodedToken;

  if (!userEmail || !role || !phoneNumber || !fullName) {
    throw new ApiError('Token is invalid', httpStatus.UNAUTHORIZED);
  }

  const admin = await prisma.admin.findFirst({
    where: {
      email: userEmail,
    },
  });

  const doctor = await prisma.doctor.findUnique({
    where: { email: userEmail },
  });
  const patient = await prisma.patient.findUnique({
    where: { email: userEmail },
  });

  if (!admin && !patient && !doctor) {
    throw new ApiError('User Does not exist', httpStatus.UNAUTHORIZED);
  }
  const payloadData = {
    email: userEmail,
    role: role,
    phoneNumber: phoneNumber,
    fullName: fullName,
  };
  const newAccessToken = jwtHelpers.createToken(
    payloadData,
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );
  return {
    accessToken: newAccessToken,
  };
};

export const AuthService = {
  loginUser,
  refreshToken,
};
