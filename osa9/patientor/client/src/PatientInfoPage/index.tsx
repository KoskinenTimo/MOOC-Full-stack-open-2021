import React, { useEffect, useState } from "react";
import { Button, List } from "semantic-ui-react";
import { useParams,useHistory } from "react-router-dom";
import { PatientWithDetails, Entry } from "../types";
import { updatePatient, useStateValue } from "../state";
import axios from "axios";
import { apiBaseUrl } from "../constants";

const PatientInfoPage = () => {

  // for detailed view control
  const { id } = useParams<{ id: string }>();
  const [ data, setData ] = useState<PatientWithDetails | undefined>();
  const [ { patients }, dispatch ] = useStateValue();
  const history = useHistory();

  useEffect(() => {
    const foundPatient = patients[id];    
    if (!foundPatient || !foundPatient.entries || !foundPatient.ssn) {
        axios.get<PatientWithDetails>(`${apiBaseUrl}/patients/${id}`)
          .then(res => {            
            dispatch(updatePatient(res.data));
            const patient = res.data;
            setData(patient);            
          })
          .catch(e => {
            console.error(e.response?.data || 'Unknown Error');
          });
    } else {
      setData(foundPatient as PatientWithDetails);
    }    
  }, []);



  const setGendervalue = () => {
    if (data?.gender === "male") {
      return 'mars';
    } else if (data?.gender === "female") {
      return 'venus';
    } else {
      return 'genderless';
    }
  };
 
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const createEntrySegment = (entry:Entry) => {
    switch (entry.type) {
      case 'Hospital':        
        return (          
          <div className="ui segment">
            <p>{entry.date} <i className="ambulance icon"></i></p>
            <p>{entry.description}</p>
          </div>          
        );
      
      case 'HealthCheck':
        return (          
          <div className="ui segment">
            <p>{entry.date} <i className="weight icon"></i></p>
            <p>{entry.description}</p>
          </div>          
        );
      case 'OccupationalHealthcare':
        return (          
          <div className="ui segment">
            <p>{entry.date} <i className="user md icon"></i></p>
            <p>{entry.description}</p>
          </div>          
        );
      default:
        return assertNever(entry);
    }
  };

  if (data === undefined) {
    return <h1>Loading data...</h1>;
  } else {
    return (
      <div>
        <List>
          <List.Item content={<h2>{data?.name}</h2>} icon={setGendervalue()} />
          <List.Item content={`ssn: ${data?.ssn}`}/>
          <List.Item content={`occupation: ${data?.occupation}`}/>
        </List>
        <Button onClick={() => history.push(`/patients/${id}/hospital`)}>Hospital Entry</Button>
        <h3>Entries</h3>
        <div className="ui segments">
          {data.entries.map(entry => createEntrySegment(entry))}
        </div>
      </div>
    );
  }
};

export default PatientInfoPage;