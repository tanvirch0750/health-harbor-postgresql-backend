import { Prisma, TimeSlots } from '@prisma/client';
import { calculatePagination } from '../../../helpers/paginationHelper';
import { IGenericPaginationResponse } from '../../../interfaces/genericPaginationResponse';
import { IpaginationOptions } from '../../../interfaces/paginationOptions';
import { findFilterConditionsWithoutRelation } from '../../../shared/findFilterConditions';
import { orderByConditions } from '../../../shared/orderCondition';
import prisma from '../../../shared/prisma';
import { timeSlotsSearchableFields } from './timeSlots.constant';
import { ItimeSlotsFilters } from './timeSlots.interface';

const insertIntoDB = async (data: TimeSlots): Promise<TimeSlots> => {
  const result = await prisma.timeSlots.create({
    data,
  });
  return result;
};

const getAllFromDB = async (
  filters: ItimeSlotsFilters,
  options: IpaginationOptions
): Promise<IGenericPaginationResponse<TimeSlots[]>> => {
  const { page, limit, skip } = calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = findFilterConditionsWithoutRelation(
    searchTerm,
    filterData,
    timeSlotsSearchableFields
  );

  const whereConditons: Prisma.TimeSlotsWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const orderCondition = orderByConditions(options);

  const result = await prisma.timeSlots.findMany({
    where: whereConditons,
    skip,
    take: limit,
    orderBy: orderCondition,
  });

  const total = await prisma.timeSlots.count();

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getDataById = async (id: string): Promise<TimeSlots | null> => {
  const result = await prisma.timeSlots.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateDataById = async (
  id: string,
  payload: Partial<TimeSlots>
): Promise<TimeSlots> => {
  const result = await prisma.timeSlots.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

const deleteDataById = async (id: string): Promise<TimeSlots> => {
  const result = await prisma.timeSlots.delete({
    where: {
      id,
    },
  });

  return result;
};

export const TimeSlotsServices = {
  insertIntoDB,
  getAllFromDB,
  getDataById,
  updateDataById,
  deleteDataById,
};
