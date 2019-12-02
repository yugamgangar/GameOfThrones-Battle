import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'

const BattleLocations = () => {
  const [battleLocations, setBattleLocations] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000/list')
      .then(res => res.json())
      .then(res => setBattleLocations(res))
      .catch(err => console.log(err))
  })

  return (
    <Row className='location-container'>
      <Col lg={6} className='text-right left-col left-column'>
        <p className='header'>Locations of Battle- </p>
      </Col>
      <Col className='loc-right-column'>
        <div className='ul-container d-flex'>
          <ul>
            {battleLocations.map((loc, index) => {
              if (loc === '') {
                return null
              } else {
                return <li key={index}>{loc}</li>
              }
            })}
          </ul>
        </div>
      </Col>
    </Row>
  )
}

export default BattleLocations
