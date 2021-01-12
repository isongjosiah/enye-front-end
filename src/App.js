import './App.css'
import React from 'react'
import axios from 'axios'
import { InputWithLabel } from "./components/inputwithlabel"
import { TableGrid } from "./components/table"

const API_ENDPOINT = "https://api.enye.tech/v1/challenge/records"

const useSemiPersistentState = (key, initialState) => {
  const [value, setValue] = React.useState(localStorage.getItem(key) || initialState)

  React.useEffect(() => {
    localStorage.setItem(key, value)
  }, [value, key])

  return [value, setValue]
}

//reducer function
const profilesReducer = (state, action) => {
  switch (action.type) {
    case 'profiles_fetch_init':
      return {
        ...state,
        isLoading: true,
        isError: false
      }
    case 'profiles_fetch_success':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload
      }
    case 'profiles_fetch_failure':
      return {
        ...state,
        isLoading: false,
        isError: true
      }
    default:
      throw new Error()
  }
}

const App = () => {
  // state for search term
  const [searchTerm, setSearchTerm] = useSemiPersistentState('search', '')


  // reducer
  const [profiles, dispatchProfiles] = React.useReducer(profilesReducer, {
    data: [],
    isLoading: false,
    isError: false
  })

  React.useEffect(() => {
    dispatchProfiles({type: 'profiles_fetch_init'})

    axios.get(API_ENDPOINT).then(result => {
      dispatchProfiles({type: 'profiles_fetch_success', payload: result.data.records.profiles})
    }).catch(e => {
      dispatchProfiles({type: 'profiles_fetch_failure'})
    })

  }, [])

  const handleSearch = event => {
    setSearchTerm(event.target.value)
  }


  // filter through the result to select list with the search term before passing to the list component.
  const searchedProfiles = profiles.data.filter(profile => profile.FirstName.toLowerCase().includes(searchTerm.toLowerCase()) || profile.LastName.toLowerCase().includes(searchTerm.toLowerCase()))

  return (<div>
    <h1>
      Hello! Welcome to Enye records.</h1>
    <InputWithLabel id="search" label="Search" value={searchTerm} onInputChange={handleSearch}/>
    <br />
    {profiles.isError && <p>Something went wrong...</p>}
    {
      profiles.isLoading
        ? (<p>Loading ...</p>)
        : (<TableGrid data={searchedProfiles}/>)
    }
  </div>)
}

export default App;
