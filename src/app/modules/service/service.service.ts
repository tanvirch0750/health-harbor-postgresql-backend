import { Prisma, Service } from '@prisma/client';
import { calculatePagination } from '../../../helpers/paginationHelper';
import { IGenericPaginationResponse } from '../../../interfaces/genericPaginationResponse';
import { IpaginationOptions } from '../../../interfaces/paginationOptions';
import { findFilterConditionsWithoutRelation } from '../../../shared/findFilterConditions';
import { orderByConditions } from '../../../shared/orderCondition';
import prisma from '../../../shared/prisma';
import { serviceSearchableFields } from './service.constant';
import { IServiceFilters } from './service.interface';

const insertIntoDB = async (data: Service): Promise<Service> => {
  const result = await prisma.service.create({
    data,
  });
  return result;
};

const getAllFromDB = async (
  filters: IServiceFilters,
  options: IpaginationOptions
): Promise<IGenericPaginationResponse<Service[]>> => {
  const { page, limit, skip } = calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = findFilterConditionsWithoutRelation(
    searchTerm,
    filterData,
    serviceSearchableFields
  );

  const whereConditons: Prisma.ServiceWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const orderCondition = orderByConditions(options);

  const result = await prisma.service.findMany({
    where: whereConditons,
    skip,
    take: limit,
    orderBy: orderCondition,
  });

  const total = await prisma.service.count();

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getDataById = async (id: string): Promise<Service | null> => {
  const result = await prisma.service.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateDataById = async (
  id: string,
  payload: Partial<Service>
): Promise<Service> => {
  const result = await prisma.service.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

const deleteDataById = async (id: string): Promise<Service> => {
  const result = await prisma.service.delete({
    where: {
      id,
    },
  });

  return result;
};

export const ServiceServices = {
  insertIntoDB,
  getAllFromDB,
  getDataById,
  updateDataById,
  deleteDataById,
};
