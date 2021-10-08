import express from 'express';
import patietsService from '../services/patientsService';
import toNewPatientEntry from '../utils';

const router = express.Router();

router.get('/', (_req,res) => {
  res.send(patietsService.getPatients());
});

router.post('/', (req,res) => {
  try {
    const newPatient = toNewPatientEntry(req.body);
    const addedPatient = patietsService.addPatient(newPatient);
    res.json(addedPatient);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
   res.status(400) .send(error.message);
  }
});

export default router;