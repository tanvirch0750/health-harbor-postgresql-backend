import { Doctor, Prisma } from '@prisma/client';
import { calculatePagination } from '../../../helpers/paginationHelper';
import { IGenericPaginationResponse } from '../../../interfaces/genericPaginationResponse';
import { IpaginationOptions } from '../../../interfaces/paginationOptions';
import { findFilterConditions } from '../../../shared/findFilterConditions';
import { orderByConditions } from '../../../shared/orderCondition';
import prisma from '../../../shared/prisma';
import {
  doctorRelationalFields,
  doctorRelationalFieldsMapper,
  doctorSearchableFields,
} from './doctor.constant';
import { IDoctorFilters } from './doctor.interface';

const insertIntoDB = async (data: Doctor): Promise<Doctor> => {
  const result = await prisma.doctor.create({
    data,
    include: {
      specialization: true,
    },
  });
  return result;
};

const getAllFromDB = async (
  filters: IDoctorFilters,
  options: IpaginationOptions
): Promise<IGenericPaginationResponse<Doctor[]>> => {
  const { page, limit, skip } = calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = findFilterConditions(
    searchTerm,
    filterData,
    doctorSearchableFields,
    doctorRelationalFields,
    doctorRelationalFieldsMapper
  );

  const whereConditons: Prisma.DoctorWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const orderCondition = orderByConditions(options);

  const result = await prisma.doctor.findMany({
    include: {
      specialization: true,
    },
    where: whereConditons,
    skip,
    take: limit,
    orderBy: orderCondition,
  });

  const total = await prisma.doctor.count();

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getDataById = async (id: string): Promise<Doctor | null> => {
  const result = await prisma.doctor.findUnique({
    where: {
      id,
    },
    include: {
      specialization: true,
    },
  });
  return result;
};

const updateDataById = async (
  id: string,
  payload: Partial<Doctor>
): Promise<Doctor> => {
  const result = await prisma.doctor.update({
    where: {
      id,
    },
    data: payload,
    include: {
      specialization: true,
    },
  });

  return result;
};

const deleteDataById = async (id: string): Promise<Doctor> => {
  const result = await prisma.doctor.delete({
    where: {
      id,
    },
    include: {
      specialization: true,
    },
  });

  return result;
};

export const DoctorServices = {
  insertIntoDB,
  getAllFromDB,
  getDataById,
  updateDataById,
  deleteDataById,
};
