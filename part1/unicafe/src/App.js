import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
)

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({ good, bad, neutral }) => {
  if (good === 0 && bad === 0 && neutral === 0) {
    return(
      <p>No feedback given</p>
    )
  }
  return (
    <table>
      <tbody>

        <StatisticLine text='good' value={good}/>
        <StatisticLine text='neutral' value={neutral}/>
        <StatisticLine text='bad' value={bad}/>
        <StatisticLine text='all' value={good+neutral+bad}/>
        <StatisticLine text='average' value={((good*1)+(neutral*0)+(bad*-1))/(good+neutral+bad)}/>
        <StatisticLine text='positive' value={`${100*good/(good+neutral+bad)} %`}/>

      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={()=>setGood(good+1)} text='good'/>
      <Button handleClick={()=>setNeutral(neutral+1)} text='neutral'/>
      <Button handleClick={()=>setBad(bad+1)} text='bad'/>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App