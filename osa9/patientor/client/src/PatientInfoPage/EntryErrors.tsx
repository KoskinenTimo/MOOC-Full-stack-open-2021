import React from "react";

interface Props {
  errors: string[]
}
const EntryErrors = ({ errors }: Props) => {
  return (
    <div className="ui message">
      <div className="header"> Invalid data</div>
      <ul className="list">
        {errors.map((e,i) => <li key={i}>{e}</li>)}
      </ul>
    </div>
  );
};

export default EntryErrors;