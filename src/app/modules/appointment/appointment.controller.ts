import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { appointmentServices } from './appointment.service';

export const bookAppointment: RequestHandler = catchAsync(async (req, res) => {
  const { patientId, availableServiceId } = req.body;
  const appointment = await appointmentServices.bookAppointment(
    patientId,
    availableServiceId
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    status: 'success',
    message: 'Appointment created successfully',
    data: appointment,
  });
});

export const startAppointment: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const appointment = await appointmentServices.startAppointment(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    status: 'success',
    message: 'Appointment started successfully',
    data: appointment,
  });
});

export const cancelAppointment: RequestHandler = catchAsync(
  async (req, res) => {
    const { id } = req.params;
    const appointment = await appointmentServices.cancelAppointment(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      status: 'success',
      message: 'Appointment canceled successfully',
      data: appointment,
    });
  }
);

export const finishAppointment: RequestHandler = catchAsync(
  async (req, res) => {
    const { id } = req.params;
    const appointment = await appointmentServices.finishAppointment(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      status: 'success',
      message: 'Appointment finished successfully',
      data: appointment,
    });
  }
);

export const getAllAppointment: RequestHandler = catchAsync(
  async (req, res) => {
    const appointments = await appointmentServices.getAllAppointments();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      status: 'success',
      message: 'Appointment fetched successfully',
      data: appointments,
    });
  }
);

export const getSingleAppointment: RequestHandler = catchAsync(
  async (req, res) => {
    const { id } = req.params;
    const appointment = await appointmentServices.getSingleAppointment(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      status: 'success',
      message: 'Appointment finished successfully',
      data: appointment,
    });
  }
);

export const updateAppointment: RequestHandler = catchAsync(
  async (req, res) => {
    const { id } = req.params;
    const { ...appointmentData } = req.body;
    const appointment = await appointmentServices.updateAppointment(
      id,
      appointmentData
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      status: 'success',
      message: 'Appointment update successfully',
      data: appointment,
    });
  }
);

export const deleteAppointment: RequestHandler = catchAsync(
  async (req, res) => {
    const { id } = req.params;
    const appointment = await appointmentServices.deleteAppointment(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      status: 'success',
      message: 'Appointment deleted successfully',
      data: appointment,
    });
  }
);

export const appointmentController = {
  bookAppointment,
  startAppointment,
  cancelAppointment,
  finishAppointment,
  getAllAppointment,
  getSingleAppointment,
  updateAppointment,
  deleteAppointment,
};
