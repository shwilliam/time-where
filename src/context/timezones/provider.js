import React, {useState} from 'react'
import {TimezonesContext} from './context'

export const TimezonesContextProvider = ({children}) => {
  const [timezones, setTimezones] = useState([])
  const addTimezone = timezone => setTimezones(s => [...s, timezone])

  return (
    <TimezonesContext.Provider value={{timezones, addTimezone}}>
      {children}
    </TimezonesContext.Provider>
  )
}
