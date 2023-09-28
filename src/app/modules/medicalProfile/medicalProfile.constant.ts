export const medicalProfileSearchableFields = ['address'];

export const medicalProfileFilterableFields = ['searchTerm', 'gender'];

export const medicalProfileRelationalFields: string[] = ['patientId'];
export const medicalProfileRelationalFieldsMapper: { [key: string]: string } = {
  patientId: 'patient',
};
