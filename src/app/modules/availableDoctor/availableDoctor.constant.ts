export const availableDoctorSearchableFields = [''];

export const availableDoctorFilterableFields = [
  'searchTerm',
  'doctorId',
  'slotId',
];

export const availableDoctorRelationalFields: string[] = ['doctorId', 'slotId'];

export const availableDoctorRelationalFieldsMapper: { [key: string]: string } =
  {
    doctorId: 'doctor',
    slotId: 'slot',
  };
