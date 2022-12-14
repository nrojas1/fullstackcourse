import { useEffect, useState } from 'react'
import axios from 'axios'

// Sub components
const Filter = ({ handleFilterChange }) => {
  return (
    <p>
    filter shown with <input 
      onChange={handleFilterChange}/>
    </p>
  )
}

const PersonForm = ({addPersons, newName, handleNameChange, newNumber, handleNumberChange}) => {
  return (
    <form onSubmit={addPersons}>
    <div>
      name: <input 
        value={newName}
        required
        onChange={handleNameChange}
      />
    </div>
    <div>
      number: <input 
        value={newNumber}
        type='tel'
        required
        onChange={handleNumberChange}
      />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}

const Persons = ({ persons, filterText}) => {
  return (
    <>
    {
      persons.filter(p => p.name.toLowerCase().includes(filterText))
        .map(person => 
          <p key={person.id}>{person.name} {person.number}</p>
      )
    }
    </>
  )
}
// End sub components
// ------------------
// Main component
const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterText, setFilterText] = useState('')

  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(r => {
        console.log('promise fulfiled')
        setPersons(r.data);
      }
      )
  }

  useEffect(hook, [])
  console.log('render', persons.length, 'persons');

  const handleNameChange = (e) => {
    // this stops <form> default behaviour
    e.preventDefault()
    // update newName state at each keystroke
    setNewName(e.target.value)
  }
  
  const handleNumberChange = (e) => {
    // this stops <form> default behaviour
    e.preventDefault()
    // update newNumber state at each keystroke
    setNewNumber(e.target.value)
  }
  
  const handleFilterChange = (e) => {
    // changes event input to lower case: NoneCaseSensitive search
    const text = e.target.value.toLowerCase()
    // update filterText state at each keystroke
    setFilterText(text)
  }

  const addPersons = (e) => {
    // this stops <form> default behaviour
    e.preventDefault() 

    // checks for newName state already in persons state
    if ( persons.some(p => p.name.includes(newName)) ) {
      alert(`${newName} is already in the phonebook`)
    } else {
      const personObject = {
        name: newName,
        id: persons.length,
        number: newNumber,
      }
      // add new person to persons state
      setPersons(persons.concat(personObject)) 
      // reset the input Name state
      setNewName('') 
      // reset the input Number state
      setNewNumber('') 
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter handleFilterChange={handleFilterChange}/>

      <h3>add a new</h3>

      <PersonForm addPersons={addPersons} newName={newName} handleNameChange={handleNameChange} 
      newNumber={newNumber} handleNumberChange={handleNumberChange}  
      />

      <h3>Numbers</h3>

      <Persons persons={persons} filterText={filterText}/>
    </div>
  )
}

export default App