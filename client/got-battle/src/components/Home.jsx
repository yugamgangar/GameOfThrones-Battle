import React, { useState } from 'react'
import '../css/style.css'
import { Row, Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Redirect } from 'react-router-dom'

const Home = () => {
  const [redirectToBattleLocations, setRedirectToBattleLocations] = useState(
    false
  )
  const [redirectToBattleCount, setRedirectToBattleCount] = useState(false)
  const [redirectToBattleSearch, setRedirectToBattleSearch] = useState(false)

  const displayBattleLocations = () => {
    setRedirectToBattleLocations(true)
  }
  const displayBattleCount = () => {
    setRedirectToBattleCount(true)
  }
  const displayBattleSearch = () => {
    setRedirectToBattleSearch(true)
  }

  return (
    <Row className='home-section'>
      {redirectToBattleLocations === true && <Redirect to='/locations' />}
      {redirectToBattleCount === true && <Redirect to='/count' />}
      {redirectToBattleSearch === true && <Redirect to='/search' />}
      <Container className='home-container justify-content-center align-items-center'>
        <Row className='list-container justify-content-center align-items-center'>
          <ul>
            <li onClick={displayBattleLocations}>BATTLE LOCATIONS</li>
            <li onClick={displayBattleCount}>TOTAL BATTLES HELD</li>
            <li onClick={displayBattleSearch}>SEARCH</li>
          </ul>
        </Row>
      </Container>
    </Row>
  )
}

export default Home
