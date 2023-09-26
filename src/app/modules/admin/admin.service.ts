import { Admin, Prisma } from '@prisma/client';
import { calculatePagination } from '../../../helpers/paginationHelper';
import { IGenericPaginationResponse } from '../../../interfaces/genericPaginationResponse';
import { IpaginationOptions } from '../../../interfaces/paginationOptions';
import { findFilterConditionsWithoutRelation } from '../../../shared/findFilterConditions';
import { orderByConditions } from '../../../shared/orderCondition';
import prisma from '../../../shared/prisma';
import { adminSearchableFields } from './admin.constant';
import { IAdminFilters } from './admin.interface';

const insertIntoDB = async (data: Admin): Promise<Admin> => {
  const result = await prisma.admin.create({
    data,
  });
  return result;
};

const getAllFromDB = async (
  filters: IAdminFilters,
  options: IpaginationOptions
): Promise<IGenericPaginationResponse<Admin[]>> => {
  const { page, limit, skip } = calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = findFilterConditionsWithoutRelation(
    searchTerm,
    filterData,
    adminSearchableFields
  );

  const whereConditons: Prisma.AdminWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const orderCondition = orderByConditions(options);

  const result = await prisma.admin.findMany({
    where: whereConditons,
    skip,
    take: limit,
    orderBy: orderCondition,
  });

  const total = await prisma.admin.count();

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getDataById = async (id: string): Promise<Admin | null> => {
  const result = await prisma.admin.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateDataById = async (
  id: string,
  payload: Partial<Admin>
): Promise<Admin> => {
  const result = await prisma.admin.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

const deleteDataById = async (id: string): Promise<Admin> => {
  const result = await prisma.admin.delete({
    where: {
      id,
    },
  });

  return result;
};

export const AdminServices = {
  insertIntoDB,
  getAllFromDB,
  getDataById,
  updateDataById,
  deleteDataById,
};
