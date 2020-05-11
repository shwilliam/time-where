import React, {useState} from 'react'
import moment from 'moment-timezone'
import {TimezonesContext} from './context'

export const TimezonesContextProvider = ({children}) => {
  const [timezones, setTimezones] = useState([])
  const addTimezone = timezone => {
    if (!timezone) return

    const time = moment().tz(timezone.value)
    const hour24 = time.format('H')
    const minutes = time.format('mm')

    const existingTimezoneIdx = timezones.findIndex(timezone => {
      const existingTime = moment().tz(timezone.value)
      const existingHour24 = existingTime.format('H')
      const existingMinutes = existingTime.format('mm')

      return existingHour24 === hour24 && existingMinutes === minutes
    })

    setTimezones(s => {
      if (existingTimezoneIdx !== -1) {
        const filteredTimezones = [...timezones]
        filteredTimezones.splice(existingTimezoneIdx, 1)

        return [...filteredTimezones, timezone]
      }
      return [...s, timezone]
    })
  }

  return (
    <TimezonesContext.Provider value={{timezones, addTimezone}}>
      {children}
    </TimezonesContext.Provider>
  )
}
