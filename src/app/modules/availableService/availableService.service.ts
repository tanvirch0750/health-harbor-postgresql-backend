import { AvailableService, Prisma } from '@prisma/client';
import { calculatePagination } from '../../../helpers/paginationHelper';
import { IGenericPaginationResponse } from '../../../interfaces/genericPaginationResponse';
import { IpaginationOptions } from '../../../interfaces/paginationOptions';
import { findFilterConditions } from '../../../shared/findFilterConditions';
import { orderByConditions } from '../../../shared/orderCondition';
import prisma from '../../../shared/prisma';
import {
  availableServiceRelationalFields,
  availableServiceRelationalFieldsMapper,
  availableServiceSearchableFields,
} from './availableService.constant';
import { IAvailableServiceFilters } from './availableService.interface';

const insertIntoDB = async (
  data: AvailableService
): Promise<AvailableService> => {
  const result = await prisma.availableService.create({
    data,
    include: {
      service: true,
      slot: true,
      availableDoctor: true,
    },
  });
  return result;
};

const getAllFromDB = async (
  filters: IAvailableServiceFilters,
  options: IpaginationOptions
): Promise<IGenericPaginationResponse<AvailableService[]>> => {
  const { page, limit, skip } = calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = findFilterConditions(
    searchTerm,
    filterData,
    availableServiceSearchableFields,
    availableServiceRelationalFields,
    availableServiceRelationalFieldsMapper
  );

  const whereConditons: Prisma.AvailableServiceWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const orderCondition = orderByConditions(options);

  const result = await prisma.availableService.findMany({
    include: {
      service: true,
      slot: true,
      availableDoctor: true,
    },
    where: whereConditons,
    skip,
    take: limit,
    orderBy: orderCondition,
  });

  const total = await prisma.availableService.count();

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getDataById = async (id: string): Promise<AvailableService | null> => {
  const result = await prisma.availableService.findUnique({
    where: {
      id,
    },
    include: {
      service: true,
      slot: true,
      availableDoctor: true,
    },
  });
  return result;
};

const updateDataById = async (
  id: string,
  payload: Partial<AvailableService>
): Promise<AvailableService> => {
  const result = await prisma.availableService.update({
    where: {
      id,
    },
    data: payload,
    include: {
      service: true,
      slot: true,
      availableDoctor: true,
    },
  });

  return result;
};

const deleteDataById = async (id: string): Promise<AvailableService> => {
  const result = await prisma.availableService.delete({
    where: {
      id,
    },
    include: {
      service: true,
      slot: true,
      availableDoctor: true,
    },
  });

  return result;
};

export const AvailableServiceServices = {
  insertIntoDB,
  getAllFromDB,
  getDataById,
  updateDataById,
  deleteDataById,
};
