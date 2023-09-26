import { AvailableDoctor, Prisma } from '@prisma/client';
import { calculatePagination } from '../../../helpers/paginationHelper';
import { IGenericPaginationResponse } from '../../../interfaces/genericPaginationResponse';
import { IpaginationOptions } from '../../../interfaces/paginationOptions';
import { findFilterConditions } from '../../../shared/findFilterConditions';
import { orderByConditions } from '../../../shared/orderCondition';
import prisma from '../../../shared/prisma';
import {
  availableDoctorRelationalFields,
  availableDoctorRelationalFieldsMapper,
  availableDoctorSearchableFields,
} from './availableDoctor.constant';
import { IAvailableDoctorFilters } from './availableDoctor.interface';

const insertIntoDB = async (
  data: AvailableDoctor
): Promise<AvailableDoctor> => {
  const result = await prisma.availableDoctor.create({
    data,
    include: {
      slot: true,
      doctor: true,
    },
  });
  return result;
};

const getAllFromDB = async (
  filters: IAvailableDoctorFilters,
  options: IpaginationOptions
): Promise<IGenericPaginationResponse<AvailableDoctor[]>> => {
  const { page, limit, skip } = calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = findFilterConditions(
    searchTerm,
    filterData,
    availableDoctorSearchableFields,
    availableDoctorRelationalFields,
    availableDoctorRelationalFieldsMapper
  );

  const whereConditons: Prisma.AvailableDoctorWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const orderCondition = orderByConditions(options);

  const result = await prisma.availableDoctor.findMany({
    include: {
      slot: true,
      doctor: true,
    },
    where: whereConditons,
    skip,
    take: limit,
    orderBy: orderCondition,
  });

  const total = await prisma.availableDoctor.count();

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getDataById = async (id: string): Promise<AvailableDoctor | null> => {
  const result = await prisma.availableDoctor.findUnique({
    where: {
      id,
    },
    include: {
      slot: true,
      doctor: true,
    },
  });
  return result;
};

const updateDataById = async (
  id: string,
  payload: Partial<AvailableDoctor>
): Promise<AvailableDoctor> => {
  const result = await prisma.availableDoctor.update({
    where: {
      id,
    },
    data: payload,
    include: {
      slot: true,
      doctor: true,
    },
  });

  return result;
};

const deleteDataById = async (id: string): Promise<AvailableDoctor> => {
  const result = await prisma.availableDoctor.delete({
    where: {
      id,
    },
    include: {
      slot: true,
      doctor: true,
    },
  });

  return result;
};

export const AvailableDoctorServices = {
  insertIntoDB,
  getAllFromDB,
  getDataById,
  updateDataById,
  deleteDataById,
};
