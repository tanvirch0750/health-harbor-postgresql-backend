export const availableServiceSearchableFields = ['name'];

export const availableServiceFilterableFields = [
  'searchTerm',
  'name',
  'fees',
  'serviceId',
  'slotId',
  'availableDoctorId',
];

export const availableServiceRelationalFields: string[] = [
  'availableDoctorId',
  'slotId',
  'serviceId',
];

export const availableServiceRelationalFieldsMapper: { [key: string]: string } =
  {
    availableDoctorId: 'availableDoctor',
    slotId: 'slot',
    serviceId: 'service',
  };
