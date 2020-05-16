import React, {useState} from 'react'
import moment from 'moment-timezone'
import {TimezonesContext} from './context'

export const TimezonesContextProvider = ({children}) => {
  const [timezones, setTimezones] = useState([])
  const addTimezone = timezone => {
    if (!timezone) return

    const time = moment().tz(timezone.value)
    const timeOffset = time.format('ZZ')

    const existingTimezoneIdx = timezones.findIndex(
      timezone => timezone.offset === timeOffset,
    )

    setTimezones(s => {
      if (existingTimezoneIdx !== -1) {
        const filteredTimezones = [...timezones]
        filteredTimezones.splice(existingTimezoneIdx, 1)

        return [...filteredTimezones, {...timezone, offset: timeOffset}]
      }
      return [...s, {...timezone, offset: timeOffset}]
    })
  }

  return (
    <TimezonesContext.Provider value={{timezones, addTimezone}}>
      {children}
    </TimezonesContext.Provider>
  )
}
