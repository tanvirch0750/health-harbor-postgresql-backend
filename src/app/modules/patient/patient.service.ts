/* eslint-disable @typescript-eslint/no-explicit-any */
import { MedicalProfile, Patient, Prisma } from '@prisma/client';
import { calculatePagination } from '../../../helpers/paginationHelper';
import { IGenericPaginationResponse } from '../../../interfaces/genericPaginationResponse';
import { IpaginationOptions } from '../../../interfaces/paginationOptions';
import { findFilterConditionsWithoutRelation } from '../../../shared/findFilterConditions';
import { orderByConditions } from '../../../shared/orderCondition';
import prisma from '../../../shared/prisma';
import { patientSearchableFields } from './patient.constant';
import { IPatientFilters } from './patient.interface';

const insertIntoDB = async (
  data: Patient,
  medicalProfile: MedicalProfile
): Promise<any> => {
  const result = await prisma.$transaction(async transactionCLient => {
    const createPatient = await transactionCLient.patient.create({
      data,
    });
    const createMedicalProfile = await transactionCLient.medicalProfile.create({
      data: {
        ...medicalProfile,
        patientId: createPatient.id,
        profileStatus: 'active',
      },
    });
    return {
      patient: createPatient,
      medicalProfile: createMedicalProfile,
    };
  });
  return result;
};

const getAllFromDB = async (
  filters: IPatientFilters,
  options: IpaginationOptions
): Promise<IGenericPaginationResponse<Patient[]>> => {
  const { page, limit, skip } = calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = findFilterConditionsWithoutRelation(
    searchTerm,
    filterData,
    patientSearchableFields
  );

  const whereConditons: Prisma.PatientWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const orderCondition = orderByConditions(options);

  const result = await prisma.patient.findMany({
    where: whereConditons,
    skip,
    take: limit,
    orderBy: orderCondition,
  });

  const total = await prisma.patient.count();

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getDataById = async (id: string): Promise<Patient | null> => {
  const result = await prisma.patient.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateDataById = async (
  id: string,
  payload: Partial<Patient>
): Promise<Patient> => {
  const result = await prisma.patient.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

const deleteDataById = async (id: string): Promise<Patient> => {
  const result = await prisma.patient.delete({
    where: {
      id,
    },
  });

  return result;
};

export const PatientServices = {
  insertIntoDB,
  getAllFromDB,
  getDataById,
  updateDataById,
  deleteDataById,
};
