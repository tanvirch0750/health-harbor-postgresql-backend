import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/paginationFields';
import ApiError from '../../../errors/ApiError';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { adminFilterableFields } from './admin.constant';
import { AdminServices } from './admin.service';

export const insertIntoDB: RequestHandler = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await AdminServices.insertIntoDB(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    status: 'success',
    message: 'Admin created successfully',
    data: result,
  });
});

export const getAllFromDB: RequestHandler = catchAsync(
  async (req, res, next) => {
    const filters = pick(req.query, adminFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await AdminServices.getAllFromDB(filters, paginationOptions);

    if (result.data.length === 0) {
      return next(new ApiError('No Admin found!', httpStatus.NOT_FOUND));
    }

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      status: 'success',
      message: 'Admin retrived successfully',
      meta: result.meta,
      data: result.data,
    });
  }
);

const getDataById: RequestHandler = catchAsync(async (req, res, next) => {
  const result = await AdminServices.getDataById(req.params.id);

  if (!result) {
    return next(
      new ApiError(`No Admin found with this id`, httpStatus.NOT_FOUND)
    );
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    status: 'success',
    message: 'Admin retrived successfully',
    data: result,
  });
});

const updateDataById: RequestHandler = catchAsync(async (req, res, next) => {
  const payload = req.body;

  const result = await AdminServices.updateDataById(req.params.id, payload);

  if (!result) {
    return next(
      new ApiError(`No Admin found with this id`, httpStatus.NOT_FOUND)
    );
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    status: 'success',
    message: 'Admin updated successfully',
    data: result,
  });
});

const deleteDataById: RequestHandler = catchAsync(async (req, res, next) => {
  const result = await AdminServices.deleteDataById(req.params.id);

  if (!result) {
    return next(
      new ApiError(`No Admin found with this id`, httpStatus.NOT_FOUND)
    );
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    status: 'success',
    message: 'Admin deleted successfully',
    data: result,
  });
});

export const AdminController = {
  insertIntoDB,
  getAllFromDB,
  getDataById,
  updateDataById,
  deleteDataById,
};
