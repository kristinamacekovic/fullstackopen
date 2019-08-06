import React, { useState } from "react";
import ReactDOM from "react-dom";

const Statistic = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Button = props => <button onClick={props.onClick}>{props.text}</button>;

const Statistics = props => {
  const { good, neutral, bad, all } = props.stats;

  const getAverage = (good, neutral, bad) =>
    (good * 1 + neutral * 0 + bad * -1) / (good + neutral + bad);

  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <Statistic text="good" value={good} />
          <Statistic text="neutral" value={neutral} />
          <Statistic text="bad" value={bad} />
          <Statistic text="all" value={all} />
          <Statistic text="average" value={getAverage(good, neutral, bad)} />
          <Statistic text="positive" value={good / all} />
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const all = good + bad + neutral;
  const stats = {
    good,
    neutral,
    bad,
    all,
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text="good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setBad(bad + 1)} text="bad" />
      {good || neutral || bad ? (
        <Statistics stats={stats} />
      ) : (
        <p>no feedback given</p>
      )}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
