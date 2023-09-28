import { MedicalProfile, Prisma } from '@prisma/client';
import { calculatePagination } from '../../../helpers/paginationHelper';
import { IGenericPaginationResponse } from '../../../interfaces/genericPaginationResponse';
import { IpaginationOptions } from '../../../interfaces/paginationOptions';
import { findFilterConditions } from '../../../shared/findFilterConditions';
import { orderByConditions } from '../../../shared/orderCondition';
import prisma from '../../../shared/prisma';
import {
  medicalProfileRelationalFields,
  medicalProfileRelationalFieldsMapper,
  medicalProfileSearchableFields,
} from './medicalProfile.constant';
import { IMedicalProfileFilters } from './medicalProfile.interface';

const getAllFromDB = async (
  filters: IMedicalProfileFilters,
  options: IpaginationOptions
): Promise<IGenericPaginationResponse<MedicalProfile[]>> => {
  const { page, limit, skip } = calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = findFilterConditions(
    searchTerm,
    filterData,
    medicalProfileSearchableFields,
    medicalProfileRelationalFields,
    medicalProfileRelationalFieldsMapper
  );

  const whereConditons: Prisma.MedicalProfileWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const orderCondition = orderByConditions(options);

  const result = await prisma.medicalProfile.findMany({
    include: {
      patient: true,
    },
    where: whereConditons,
    skip,
    take: limit,
    orderBy: orderCondition,
  });

  const total = await prisma.medicalProfile.count();

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getDataById = async (id: string): Promise<MedicalProfile | null> => {
  const result = await prisma.medicalProfile.findUnique({
    where: {
      id,
    },
    include: {
      patient: true,
    },
  });
  return result;
};

const updateDataById = async (
  id: string,
  payload: Partial<MedicalProfile>
): Promise<MedicalProfile> => {
  const result = await prisma.medicalProfile.update({
    where: {
      id,
    },
    data: payload,
    include: {
      patient: true,
    },
  });

  return result;
};

const deleteDataById = async (id: string): Promise<MedicalProfile> => {
  const result = await prisma.medicalProfile.delete({
    where: {
      id,
    },
    include: {
      patient: true,
    },
  });

  return result;
};

export const MedicalProfileServices = {
  getAllFromDB,
  getDataById,
  updateDataById,
  deleteDataById,
};
