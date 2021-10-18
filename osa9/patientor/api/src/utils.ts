import {
  Gender,
  NewPatientEntry,
  DischargeEntry,
  NewHospitalEntry,
  NewEntry,
  NewOccupationalHealthcareEntry,
  NewHealthCheckEntry,
  HealthCheckRating
} from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');    
  }
  return name;
};

const parseDateOfBirth = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date of birth');    
  }
  return date;
};

const parseSSN = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn');    
  }
  return ssn;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (gender: any): gender is Gender => {
  return Object.values(Gender).includes(gender);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender');    
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation');    
  }
  return occupation;
};

type Fields = { 
  name: unknown,
  dateOfBirth: unknown,
  ssn: unknown,
  gender: unknown,
  occupation: unknown
};

const toNewPatientEntry = ({
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation
}: Fields): NewPatientEntry => {
  const newEntry: NewPatientEntry = {
    name: parseName(name),
    dateOfBirth: parseDateOfBirth(dateOfBirth),
    ssn: parseSSN(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    entries: []
  };
  return newEntry;
};

const parseType = (type:unknown): string => {
  if (!type || !isString(type)) {
    throw new Error('Incorrect or missing type');    
  }
  return type;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isDischarge = (discharge: any): discharge is DischargeEntry => {
  if (!discharge.date || !isDate(discharge.date) || !discharge.criteria || !isString(discharge.criteria)) {
    return false;    
  } else {
    return true;
  }
};

const parseDischarge = (discharge:unknown): DischargeEntry => {
  if (!discharge || !isDischarge(discharge)) {
    throw new Error('Incorrect or missing discharge');  
  }
  return discharge;
};

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error('Incorrect or missing description');    
  }
  return description;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date');    
  }
  return date;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error('Incorrect or missing specialist');    
  }
  return specialist;
};

const parseEmployerName = (employerName: unknown): string => {
  if (!employerName || !isString(employerName)) {
    throw new Error('Incorrect or missing employerName');    
  }
  return employerName;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (healthCheckRating: any): healthCheckRating is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(healthCheckRating);
};
const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
  if (!healthCheckRating || !isHealthCheckRating(healthCheckRating)) {
    throw new Error('Incorrect or missing healthCheckRating'); 
  }
  return healthCheckRating;
};

type EntryFields = {
  type: unknown,
  discharge: unknown,
  sickLeave: unknown,
  employerName: unknown,
  healthCheckRating: unknown,
  diagnosisCodes: unknown,
  specialist: unknown,
  date: unknown,
  description: unknown
};

const toNewEntriesEntry = ({
  type,
  discharge,
  employerName,
  healthCheckRating,
  specialist,
  date,
  description
}: EntryFields): NewEntry => {
  const parsedType:string = parseType(type);
  switch (parsedType) {
    case "Hospital":
      const newHospitalEntry: NewHospitalEntry = {
        type:parsedType,
        discharge: parseDischarge(discharge),
        description: parseDescription(description),
        date: parseDate(date),
        specialist: parseSpecialist(specialist)
      };
      return newHospitalEntry;
    case "OccupationalHealthcare":
      const newOccupationalHealthcareEntry: NewOccupationalHealthcareEntry = {
        type:parsedType,
        description: parseDescription(description),
        date: parseDate(date),
        specialist: parseSpecialist(specialist),
        employerName: parseEmployerName(employerName)
      };
      return newOccupationalHealthcareEntry;
    case "HealthCheck":
      const newHealthCheckEntry: NewHealthCheckEntry = {
        type:parsedType,
        description: parseDescription(description),
        date: parseDate(date),
        specialist: parseSpecialist(specialist),
        healthCheckRating: parseHealthCheckRating(healthCheckRating)
      };
      return newHealthCheckEntry;
    default:
      throw new Error("Type not found");
  }
};

export default {
  toNewPatientEntry,
  toNewEntriesEntry
};