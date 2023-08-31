export const doctorSearchableFields = ['fullName'];

export const doctorFilterableFields = [
  'searchTerm',
  'fullName',
  'qualification',
  'phoneNumber',
  'specializationId',
  'gender',
];

export const doctorRelationalFields: string[] = ['specializationId'];
export const doctorRelationalFieldsMapper: { [key: string]: string } = {
  specializationId: 'specialization',
};
