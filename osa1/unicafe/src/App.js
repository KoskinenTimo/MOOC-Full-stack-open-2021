import React, { useState } from 'react'

const Button = ({ setRating, text }) => {
  return (
    <>
      <button onClick={setRating}>{text}</button>
    </>
  )
}

const StatisticLine = ({ value,text }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
}

const Statistics = ({ ratings }) => {
  const [{good},{neutral},{bad}] = [...ratings];  
  const total = good+neutral+bad;
  const average = (good + bad * -1) / total;
  const positive = good / total * 100;
  
  if (!total) {
    return (
      <div>
      <h3>No feedback given!</h3>
      </div>
    )
  } else {
    return (
      <table>
        <tbody>
          <StatisticLine text="good" value={good}/>
          <StatisticLine text="neutral" value={neutral}/>
          <StatisticLine text="bad" value={bad}/>
          <StatisticLine text="all" value={total}/>
          <StatisticLine text="average" value={average}/>
          <StatisticLine text="positive" value={positive + "%"}/>
        </tbody>
      </table>
    )
  }
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const ratings = [
    {good: good},
    {neutral: neutral},
    {bad: bad}
  ]

  const onClickSetGood = () => {
    setGood(good + 1);
  }

  const onClickSetNeutral = () => {
    setNeutral(neutral + 1);
  }

  const onClickSetBad = () => {
    setBad(bad + 1);
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button setRating={onClickSetGood} text="good" />
      <Button setRating={onClickSetNeutral} text="neutral" />
      <Button setRating={onClickSetBad} text="bad" />
      <h1>statistics</h1>
      <Statistics ratings={ratings} />
    </div>
  )
}

export default App