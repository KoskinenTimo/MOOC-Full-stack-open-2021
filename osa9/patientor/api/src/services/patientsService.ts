import patients from '../../data/patients';
import {
  NoSSNPatient,
  NewPatientEntry,
  Patient,
  NewEntry
} from '../types';
import { v1 as uuid } from 'uuid';

const getPatients = (): NoSSNPatient [] => {
  return patients.map(({ id,name,dateOfBirth,gender,occupation,entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
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

const getOnePatient = (id: string): Patient => {
  const foundPatient =  patients.find(patient => patient.id === id);
  if (foundPatient) {
    return foundPatient;  
  } else {
    throw new Error("No patient found with given id");    
  }
};

const addEntry = (id: string,entry: NewEntry) => {
  const patient = patients.find(patient => patient.id === id);  
  const entryId = uuid();
  if (patient) {
    const index = patients.indexOf(patient);
    const newEntry = {
      id: entryId,
      ...entry
    };
    const newEntries = patient.entries.concat(newEntry);
    const updatedPatient = {
      ...patient,
      entries: newEntries
    };
    patients[index] = updatedPatient;
    return newEntry;
  } else {
    throw new Error("No patient found with given id");   
  }
};

export default {
  getPatients,
  addPatient,
  getOnePatient,
  addEntry
};