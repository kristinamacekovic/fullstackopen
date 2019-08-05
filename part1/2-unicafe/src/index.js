import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = props => {
  const { good, neutral, bad, all } = props.stats

  const getAverage = (good, neutral, bad) =>
    (good * 1 + neutral * 0 + bad * -1) / (good + neutral + bad)

  return (
    <div>
      <h2>statistics</h2>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {all}</p>
      <p>average {getAverage(good, neutral, bad)}</p>
      <p>positive {(good / all) * 100}%</p>
    </div>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const all = good + bad + neutral
  const stats = {
    good,
    neutral,
    bad,
    all
  }

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>
      <Statistics stats={stats} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
