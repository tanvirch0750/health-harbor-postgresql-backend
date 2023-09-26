export const paymentSearchableFields = [''];

export const paymentFilterableFields = [
  'searchTerm',
  'paymentStatus',
  'appointmentId',
];

export const paymentRelationalFields: string[] = ['appointmentId'];
export const paymentRelationalFieldsMapper: { [key: string]: string } = {
  appointmentId: 'appointment',
};
