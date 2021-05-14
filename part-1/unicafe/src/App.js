import React, { useState } from "react";
import Heading from "./Heading";

const Statistics = ({ good, neutral, bad }) => {
  if (!(good || neutral || bad)) {
    return (
      <>
        <h1>Statistics</h1>
        <p>No feedback given</p>
      </>
    );
  }
  return (
    <>
      <h1>statistics</h1>
      <table>
        <Statistic label="Good" data={good} />
        <Statistic label="Neutral" data={neutral} />
        <Statistic label="Bad" data={bad} />
        <Statistic label="All" data={good + neutral + bad} />
        <Statistic
          label="Average"
          data={(good - bad) / (good + neutral + bad)}
        />
        <Statistic
          label="Positive Percentage"
          data={(good * 100) / (good + neutral + bad)}
        />
      </table>
    </>
  );
};

const Button = ({ state, setState, label }) => {
  return <button onClick={() => setState(state + 1)}>{label}</button>;
};

const Statistic = ({ label, data }) => {
  if (Number.isInteger(data)) {
    return (
      <tr>
        <td>{label}:</td> <td>{data}</td>
      </tr>
    );
  }
  return (
    <tr>
      <td>{label}:</td> <td>{data.toFixed(2)}</td>
    </tr>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <>
      <Heading />
      <Button state={good} setState={setGood} label="Good" />
      <Button state={neutral} setState={setNeutral} label="Neutral" />
      <Button state={bad} setState={setBad} label="Bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  );
};

export default App;
