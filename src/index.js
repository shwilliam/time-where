import React from 'react'
import {render} from 'react-dom'
import {App} from './App'
import {TimezonesContextProvider} from './context'

import './css'

render(
  <React.StrictMode>
    <TimezonesContextProvider>
      <App />
    </TimezonesContextProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)
