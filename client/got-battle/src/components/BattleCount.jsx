import React, { useEffect, useState } from 'react'
import CountUp from 'react-countup'
import { Row, Col } from 'react-bootstrap'

const BattleCount = () => {
  const [battleCount, setBattleCount] = useState(0)

  useEffect(() => {
    fetch('http://localhost:5000/count')
      .then(res => res.json())
      .then(res => setBattleCount(res.battle_number))
      .catch(err => console.log(err))
  })

  return (
    <Row className='justify-content-center count-container text-center align-items-center'>
      <Col className='text-container py-5'>
        <p>Number of Battles Held - </p>
        <CountUp
          start={0}
          duration={3.75}
          end={battleCount}
          className='count'
        />
      </Col>
    </Row>
  )
}

export default BattleCount
