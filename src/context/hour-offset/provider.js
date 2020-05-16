import React, {useState} from 'react'
import {HourOffsetContext} from './context'

export const HourOffsetContextProvider = ({children}) => {
  const [activeHours, setActiveHours] = useState()

  return (
    <HourOffsetContext.Provider value={[activeHours, setActiveHours]}>
      {children}
    </HourOffsetContext.Provider>
  )
}
