import React from 'react'
import {render} from 'react-dom'
import {App} from './App'
import {HourOffsetContextProvider, TimezonesContextProvider} from './context'

import './css'

render(
  <React.StrictMode>
    <TimezonesContextProvider>
      <HourOffsetContextProvider>
        <App />
      </HourOffsetContextProvider>
    </TimezonesContextProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)
