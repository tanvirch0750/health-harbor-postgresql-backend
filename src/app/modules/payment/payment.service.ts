import { Payment, Prisma } from '@prisma/client';
import { calculatePagination } from '../../../helpers/paginationHelper';
import { IGenericPaginationResponse } from '../../../interfaces/genericPaginationResponse';
import { IpaginationOptions } from '../../../interfaces/paginationOptions';
import { findFilterConditions } from '../../../shared/findFilterConditions';
import { orderByConditions } from '../../../shared/orderCondition';
import prisma from '../../../shared/prisma';
import {
  paymentRelationalFields,
  paymentRelationalFieldsMapper,
  paymentSearchableFields,
} from './payment.constant';
import { IPaymentFilters } from './payment.interface';

const insertIntoDB = async (data: Payment): Promise<Payment> => {
  const result = await prisma.payment.create({
    data,
    include: {
      appointment: true,
    },
  });
  return result;
};

const getAllFromDB = async (
  filters: IPaymentFilters,
  options: IpaginationOptions
): Promise<IGenericPaginationResponse<Payment[]>> => {
  const { page, limit, skip } = calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = findFilterConditions(
    searchTerm,
    filterData,
    paymentSearchableFields,
    paymentRelationalFields,
    paymentRelationalFieldsMapper
  );

  const whereConditons: Prisma.PaymentWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const orderCondition = orderByConditions(options);

  const result = await prisma.payment.findMany({
    include: {
      appointment: true,
    },
    where: whereConditons,
    skip,
    take: limit,
    orderBy: orderCondition,
  });

  const total = await prisma.payment.count();

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getDataById = async (id: string): Promise<Payment | null> => {
  const result = await prisma.payment.findUnique({
    where: {
      id,
    },
    include: {
      appointment: true,
    },
  });
  return result;
};

const updateDataById = async (
  id: string,
  payload: Partial<Payment>
): Promise<Payment> => {
  const result = await prisma.payment.update({
    where: {
      id,
    },
    data: payload,
    include: {
      appointment: true,
    },
  });

  return result;
};

const deleteDataById = async (id: string): Promise<Payment> => {
  const result = await prisma.payment.delete({
    where: {
      id,
    },
    include: {
      appointment: true,
    },
  });

  return result;
};

export const PaymentServices = {
  insertIntoDB,
  getAllFromDB,
  getDataById,
  updateDataById,
  deleteDataById,
};
