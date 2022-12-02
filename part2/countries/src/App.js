import { useState, useEffect } from "react"
import axios from 'axios'
import Country from "./components/Country"

const Filter = ({ handleInputChange }) => {
  return(
    <div>
      find countries <input onChange={handleInputChange}/>
    </div>
  )
}

const Display = ( { c }) => {
  console.log(c);
  c = c[0]
  const lang = Object.values(c.languages)
  return(
    <div>
      <h2>{c.name.common}</h2>
      <p>capital {c.capital}</p>
      <p>area {c.area}</p>
      <h4>languages :</h4>
      <ul>
        {lang.map(l=> <li key={l}>{l}</li>)}
      </ul>
      <img src={c.coatOfArms.png} width='10%' alt='arms'/>
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filterText, setFilterText] = useState('')
  const [lenFilter, setLenFilter] = useState(0)

  const hook = () => {
    // console.log('effect')
    axios
      .get("https://restcountries.com/v3.1/all")
      .then(r=>{
        // console.log('promise fulfilled')
        setCountries(r.data)
        setLenFilter(r.data.length)
      })
  }

  useEffect(hook, [])
  // console.log('recieved', countries.length, 'countries')

  const handleInputChange = (e) => {
    const text = e.target.value.toLowerCase()
    setFilterText(text)
    const fcList = countries.filter(c => c.name.common.toLowerCase().includes(text)).length
    setLenFilter(fcList)
  }

  const handleShowCountry = (e) => {
    e.preventDefault()
    let countryName = e.target.parentElement.children[0].innerHTML
    countryName = countryName.slice(0,5)
    setFilterText(countryName)
    setLenFilter(1)
  }

  const countriesToShow = lenFilter < 10
    ? countries
        .filter(country => country.name.common.toLowerCase().includes(filterText))
        .map(c => (
          <form key={c.cca2}>
            <Country country={c} handleShowCountry={handleShowCountry}></Country> <button onClick={handleShowCountry}>show</button>
          </form>
      ))
    : <p>Too many matches, specify another filter</p>

  const countryDisplay = <Display c={countries.filter(country => country.name.common.toLowerCase().includes(filterText))}/>
  // console.log(lenFilter);

  return (
    <div>
      <Filter handleInputChange={handleInputChange}/>
      {lenFilter !== 1 ? countriesToShow : countryDisplay}
    </div>
  )
}

export default App;
