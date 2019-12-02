import React, { useEffect, useState, useRef } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'

const BattleSearch = () => {
  const [kingValue, setKingValue] = useState('')
  const [locationValue, setLocationValue] = useState('')
  const [typeValue, setTypeValue] = useState('')

  const king = useRef(null)
  const location = useRef(null)
  const battleType = useRef(null)

  useEffect(() => {
    fetchData()
  }, [])

  const [battleData, setBattleData] = useState([])
  const [kingNames, setKingNames] = useState([])
  const [battleLocations, setBattleLocations] = useState([])
  const [battleTypes, setBattleTypes] = useState([])

  const fetchData = async () => {
    await fetch(`http://localhost:5000/search`)
      .then(res => res.json())
      .then(res => setBattleData(res))
      .catch(err => console.log(err))

    await fetch(`http://localhost:5000/king`)
      .then(res => res.json())
      .then(res => setKingNames(res))
      .catch(err => console.log(err))

    await fetch(`http://localhost:5000/list`)
      .then(res => res.json())
      .then(res => setBattleLocations(res))
      .catch(err => console.log(err))

    await fetch(`http://localhost:5000/battletype`)
      .then(res => res.json())
      .then(res => setBattleTypes(res))
      .catch(err => console.log(err))
  }

  const searchBattle = async (event, king, location, type) => {
    event.preventDefault()
    await fetch(
      `http://localhost:5000/search?king=${king}&location=${location}&type=${type}`
    )
      .then(res => res.json())
      .then(res => setBattleData(res))
      .catch(err => console.log(err))
  }

  const renderObj = obj => {
    let temp = ``
    for (let key in obj) {
      // eslint-disable-next-line
      if (obj[key] === '') temp = temp
      else temp = temp + `<p>          ${key} - ${obj[key]}        </p>`
    }
    return (
      <span
        dangerouslySetInnerHTML={{ __html: temp }}
        id='dynamic-table'></span>
    )
  }

  const [suggestions, setSuggestions] = useState([])
  const [suggestionType, setSuggestionType] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)

  const handleSearchInput = async e => {
    const temp = e.target.id
    let suggestions = [],
      value = ''

    if (temp === 'king') setKingValue(e.target.value)
    else if (temp === 'location') setLocationValue(e.target.value)
    else if (temp === 'type') setTypeValue(e.target.value)

    if (e.target.value.length > 0) {
      value = e.target.value
      const regex = new RegExp(`^${value}`, `i`)

      if (temp === 'king') {
        suggestions = kingNames.sort().filter(v => regex.test(v))
        setSuggestionType('king')
      } else if (temp === 'location') {
        suggestions = battleLocations.sort().filter(v => regex.test(v))
        setSuggestionType('location')
      } else if (temp === 'type') {
        suggestions = battleTypes.sort().filter(v => regex.test(v))
        setSuggestionType('type')
      }
    }

    setSuggestions(suggestions)
    setShowSuggestions(true)
  }

  const renderSuggestions = () => {
    if (suggestions.length === 0) return null
    return (
      <ul
        className={
          suggestionType === 'king'
            ? 'search-ul king'
            : suggestionType === 'location'
            ? 'search-ul location'
            : 'search-ul type'
        }>
        {suggestions.map((item, index) => (
          <li
            onClick={() => suggestionSelected(item)}
            key={index}
            className='search-li'>
            {item}
          </li>
        ))}
      </ul>
    )
  }

  const suggestionSelected = value => {
    suggestionType === 'king'
      ? setKingValue(value)
      : suggestionType === 'location'
      ? setLocationValue(value)
      : setTypeValue(value)

    setSuggestions([])
  }

  return (
    <Row className='search-container'>
      <Col lg={5} className='text-left left-column'>
        <div className='left-container d-flex flex-column justify-content-center h-100 p-5'>
          <p className='header'>Search Battles- </p>
          <Form>
            {showSuggestions === true && renderSuggestions()}
            <Form.Control
              placeholder='King'
              ref={king}
              className='input-element'
              value={kingValue}
              onChange={e => handleSearchInput(e)}
              id='king'
            />
            <Form.Control
              placeholder='Location'
              ref={location}
              className='input-element'
              value={locationValue}
              onChange={e => handleSearchInput(e)}
              id='location'
            />
            <Form.Control
              placeholder='Battle type'
              ref={battleType}
              className='input-element'
              value={typeValue}
              onChange={e => handleSearchInput(e)}
              id='type'
            />
            <Button
              variant='primary'
              type='submit'
              onClick={event =>
                searchBattle(
                  event,
                  king.current.value,
                  location.current.value,
                  battleType.current.value
                )
              }>
              Search
            </Button>
          </Form>
        </div>
      </Col>
      <Col className='right-column'>
        <div className='ul-container d-flex'>
          <ul>
            {battleData.map((data, index) => {
              return <li key={index}>{renderObj(data)}</li>
            })}
          </ul>
        </div>
      </Col>
    </Row>
  )
}

export default BattleSearch
