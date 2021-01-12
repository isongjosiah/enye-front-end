import './App.css'
import React from 'react'
import {InputWithLabel} from "./components/inputwithlabel"
import {TableGrid} from "./components/table"
import "bootstrap/dist/css/bootstrap.min.css";
import 'open-iconic/font/css/open-iconic-bootstrap.css'
import {Spinner} from "react-bootstrap"
import {API} from "./api"

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

//

const App = () => {
  // state for search term
  const [searchTerm, setSearchTerm] = useSemiPersistentState('search', '')

  // state for filter
  const [filter, setFilter] = React.useState("Name")

  // reducer
  const [profiles, dispatchProfiles] = React.useReducer(profilesReducer, {
    data: [],
    isLoading: false,
    isError: false,
    isName: true,
    isPayment: false
  })

  React.useEffect(() => {
    dispatchProfiles({type: 'profiles_fetch_init'})

    API.request(API_ENDPOINT).then(result => {
      dispatchProfiles({type: 'profiles_fetch_success', payload: result.data.records.profiles})
    }).catch(e => {
      dispatchProfiles({type: 'profiles_fetch_failure'})
    })

  }, [])

  const handleSearch = event => {
    setSearchTerm(event.target.value)
  }

  // filter through the result to select list with the search term before passing to the list component.
  const searchedProfiles = profiles.data.filter(profile =>{
    // check if isPayment filter is on and search by payement, otherwise search through name by default
    if (filter === "Payment") {
      return profile.PaymentMethod.toLowerCase().includes(searchTerm.toLowerCase())
    } else if (filter === "Name") {
      return profile.FirstName.toLowerCase().includes(searchTerm.toLowerCase()) || profile.LastName.toLowerCase().includes(searchTerm.toLowerCase())

    } else {
      return []
    }
  })

  return (<div>
    <h1 className="d-flex justify-content-center align-self-baseline" style={{
        "font-family" : "Yusei Magic"
      }}>
      Enye records</h1>
    <InputWithLabel id="search" label="Search" value={searchTerm} onInputChange={handleSearch} setFilter={setFilter} filter={filter}/>
    <br/> {
      profiles.isError && <p className="d-flex justify-content-center align-self-baseline">
          <span className="oi oi-warning" style={{
              "fill" : "#FF0000"
            }} title="x" aria-hidden="true"></span>
          Error fetching data. Please check you Internet Connection</p>
    }
    {
      profiles.isLoading
        ? (<div className="d-flex justify-content-center align-self-baseline">
          <Spinner animation="grow" role="status" variant="primary">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>)
        : (<TableGrid data={searchedProfiles}/>)
    }
  </div>)
}

export default App;
