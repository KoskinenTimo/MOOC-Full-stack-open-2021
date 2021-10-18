import axios from 'axios';
import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { apiBaseUrl } from '../constants';
import { updatePatient, useStateValue } from '../state';
import { HospitalEntryNoId } from '../types';
import EntryErrors from './EntryErrors';


const EntryFormHospital = () => {
  const [ description, setDescription ] = useState<string>('');
  const [ entryDate, setEntryDate ] = useState<string>('');
  const [ specialist, setSpecialist ] = useState<string>('');
  const [ diagnosisCodes, setDiagnosisCodes ] = useState<string>('');
  const [ dischargeDate, setDischargeDate ] = useState<string>('');
  const [ criteria, setCriteria ] = useState<string>('');
  const [ errors, setErrors ] = useState<Array<string>>([]);
  const [ { diagnoses, patients }, dispatch ] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const history = useHistory();

  const validateDate = (date: string): boolean => {
    const regEx = /^\d{4}-\d{2}-\d{2}$/;
    return !regEx.exec(date)?.length;
  };

  const validateDiagnosesCodes = (entryDiagnosisCodes: string[],diagnosesCodes: string[]): boolean => {
    let valid = true;
    entryDiagnosisCodes.forEach(entryCode => {
      const result = diagnosesCodes.find(listCode => listCode === entryCode);
      if (!result) {
        valid = false;
      }
    });    
    return valid;
  };

  const submitForm = (e: React.SyntheticEvent): void => {     
    e.preventDefault();
    let errorList: string[] = [];
    const diagnosesList = diagnoses.map(d => d.code);
    const entryDiagnosisCodes = diagnosisCodes.split(' ');
    
    if (description === "") {
      errorList = errorList.concat("Description cannot be blank");
    }    
    if (!entryDate || validateDate(entryDate)) {
      errorList = errorList.concat("Entry date missing or in wrong format, correct is YYYY-MM-DD");
    }
    if (specialist === "") {
      errorList = errorList.concat("Specialist cannot be blank");
    }
    if (diagnosisCodes && !validateDiagnosesCodes(entryDiagnosisCodes,diagnosesList)) {
      errorList = errorList.concat("Diagnosis code in wrong format, correct is J10.1 S03.5");
    }
    if (!dischargeDate || validateDate(dischargeDate)) {
      errorList = errorList.concat("Discharge date missing or in wrong format, correct is YYYY-MM-DD");
    }
    if (!criteria) {
      errorList = errorList.concat("Criteria cannot be blank");
    }

    if (!errorList.length) {
      const entry: HospitalEntryNoId = {
        date: entryDate,
        type: "Hospital",
        specialist,
        diagnosisCodes: entryDiagnosisCodes,
        description,
        discharge: {
          date: dischargeDate,
          criteria
        }
      };
      const foundPatient = patients[id];
      try {
        axios.post(`${apiBaseUrl}/patients/${id}/entries`, entry)
          .then(res => {
            const newEntries = foundPatient.entries?.concat(res.data);
            foundPatient.entries = newEntries;
            dispatch(updatePatient(foundPatient));
            history.push(`/patients/${id}`);
          })
          .catch(e => console.error(e));
      } catch (error) {
        console.error(error);
      }
    }
    setErrors(errorList);
  };

  return (
      <form className="ui form" onSubmit={submitForm}> 
        {errors.length ? <EntryErrors errors={errors}/> : null}       
        <h1>Hospital entry</h1>        
        <div className="field">
          <label>Description</label>
          <input 
            type="text"
            name="description"
            placeholder="description"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
        </div>
        <div className="field">
          <label>Date</label>
          <input type="text"
          name="entryDate"
          placeholder="YYYY-MM-DD"
          onChange={(e) => setEntryDate(e.target.value)}
          value={entryDate}
        />
        </div>
        <div className="field">
          <label>Specialist</label>
          <input type="text"
          name="specialist"
          placeholder="specialist"
          onChange={(e) => setSpecialist(e.target.value)}
          value={specialist}
        />
        </div>
        <div className="field">
          <label>Diagnosis Codes</label>
          <input
            type="text"
            name="diagnosisCodes"
            placeholder="e.g.  J10.1 S03.5"
            onChange={(e) => setDiagnosisCodes(e.target.value)}
            value={diagnosisCodes}
          />
        </div>
        <h2>Discharge details</h2>
        <div className="field">
          <label>Date</label>
          <input
            type="text"
            name="dischargeDate"
            placeholder="YYYY-MM-DD"
            onChange={(e) => setDischargeDate(e.target.value)}
            value={dischargeDate}
          />
        </div>
        <div className="field">
          <label>Criteria</label>
          <input
          type="text"
          name="criteria"
          placeholder="criteria"
          onChange={(e) => setCriteria(e.target.value)}
          value={criteria}
        />
        </div>
        <button className="ui button" type="submit">Submit</button>
      </form>
  );
};

export default EntryFormHospital;