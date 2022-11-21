import { useState } from 'react'

const Button = ({ event, txt}) => <button onClick={event}>{txt}</button>

const Anecdote = ({anecdotes, which}) => anecdotes[which]

const Title = ({ txt }) => <h1>{txt}</h1>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(7).fill(0))

  const addVote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  const randomInt = () => setSelected(Math.floor(Math.random()*7))

  return (
    <div>
      <Title txt='Anecdote of the day'/>
      <Anecdote anecdotes={anecdotes} which={selected}/>
      <br/>
      {`has ${votes[selected]} votes`}
      <br/>
      <Button event={()=>addVote(votes)} txt='vote'/>
      <Button event={()=>randomInt()} txt='next anecdote'/>
      <br/>
      <Title txt='Anecdote with most votes'/>
      <Anecdote anecdotes={anecdotes} which={votes.indexOf(Math.max(...votes))}/>
      <br/>
      {`has ${votes[votes.indexOf(Math.max(...votes))]} votes`}
    </div>
  )
}

export default App