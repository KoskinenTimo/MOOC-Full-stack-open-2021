import patients from '../../data/patients';
import { NoSSNPatient, NewPatientEntry, Patient } from '../types';
import { v1 as uuid } from 'uuid';

const getPatients = (): NoSSNPatient [] => {
  return patients.map(({ id,name,dateOfBirth,gender,occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = (patient: NewPatientEntry): Patient => {
  const id = uuid();
  const newPatientEntry = {
    id,
    ...patient
  };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getPatients,
  addPatient
};