import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import './css/style.css'
import { Route, BrowserRouter as Router, Redirect } from 'react-router-dom'
import Home from './components/Home'
import BattleLocations from './components/BattleLocations'
import BattleCount from './components/BattleCount'
import BattleSearch from './components/BattleSearch'

const App = () => {
  const [redirect, setRedirect] = useState(false)
  return (
    <React.Fragment>
      <video autoPlay loop muted className='video'>
        <source src={require('./assets/got_bg.mp4')} />
      </video>
      <img
        src={require('./assets/got-logo.png')}
        alt='GOT'
        className='img-fluid'
        onClick={() => setRedirect(true)}
      />
      {redirect === true && <Redirect to='/' />}
      <Router>
        <Route path='/' exact component={Home} />
        <Route path='/locations' exact component={BattleLocations} />
        <Route path='/count' exact component={BattleCount} />
        <Route path='/search' exact component={BattleSearch} />
      </Router>
    </React.Fragment>
  )
}

serviceWorker.unregister()

ReactDOM.render(<App />, document.getElementById('root'))
