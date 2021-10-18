import express from 'express';
import patietsService from '../services/patientsService';
import utils from '../utils';

const router = express.Router();

router.get('/', (_req,res) => {
  res.send(patietsService.getPatients());
});

router.post('/', (req,res) => {
  try {
    const newPatient = utils.toNewPatientEntry(req.body);
    const addedPatient = patietsService.addPatient(newPatient);
    res.json(addedPatient);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
   res.status(400).send(error.message);
  }
});

router.get('/:id', (req,res) => {
  try {
    const id: string = req.params.id;
    const foundPatient = patietsService.getOnePatient(id);
    res.send(foundPatient);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    res.status(400) .send(e.message);
  }
});

router.post('/:id/entries', (req,res) => {
  try {
    console.log(req.body);
    
    const id: string = req.params.id;
    const newEntry = utils.toNewEntriesEntry(req.body);
    const addedEntry = patietsService.addEntry(id,newEntry);
    res.json(addedEntry);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(400).send(error.message);
  }
});

export default router;