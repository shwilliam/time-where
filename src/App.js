import React, {useContext} from 'react'
import {motion} from 'framer-motion'
import moment from 'moment-timezone'
import {TimezonesCombobox} from './components'
import {TimezonesContext} from './context'

const TIMELINE_STEP_HEIGHT = 40

const TimelineHourMarkers = () =>
  Array.from({length: 25}, (_, i) => (
    <div
      className="timeline__track-division"
      data-time={i > 12 ? 'night' : 'day'}
      key={i}
    />
  ))

const TimelineHourMarkersLabels = () => (
  <div className="timeline__track-hour-container">
    {Array.from({length: 25}, (_, i) => (
      <div className="timeline__track-division" key={i}>
        {i !== 0 && <p className="timeline__track-hour-label">{i}</p>}
      </div>
    ))}
  </div>
)

const Timeline = () => {
  const {timezones} = useContext(TimezonesContext)

  return (
    <div className="timeline">
      {timezones.map(({name, value}) => {
        const time = moment().tz(value)
        const hour24 = time.format('H')
        const hour12 = time.format('h')
        const minutes = time.format('mm')
        const period = time.format('a')

        return (
          <motion.div
            className="timeline__track-marker"
            drag="x"
            dragConstraints={{left: -(window.innerWidth / 2), right: 0}}
            dragElastic={0}
            dragMomentum={false}
            style={{
              top:
                (Number(hour24) + Number(minutes) / 60) * TIMELINE_STEP_HEIGHT,
            }}
            key={value}
          >
            <p className="timeline__track-marker-time">
              {hour12}:{minutes}
              <span className="timeline__track-marker-period">{period}</span>
            </p>
            <p className="timeline__track-marker-label">{name}</p>
          </motion.div>
        )
      })}

      <div className="timeline__track">
        <TimelineHourMarkers />
        <TimelineHourMarkersLabels />
      </div>
    </div>
  )
}

export const App = () => (
  <>
    <header className="header">
      <h1 className="sr-only">Time? Where?</h1>
      <TimezonesCombobox />
    </header>
    <main className="main">
      <Timeline />
    </main>
  </>
)
