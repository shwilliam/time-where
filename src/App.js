import React from 'react'

const TIMELINE_STEP_HEIGHT = 40

const TimelineHourMarkers = ({days = 1}) =>
  Array.from({length: days}, () =>
    Array.from({length: 25}, (_, i) => (
      <div
        className="timeline__track-division"
        data-time={i > 12 ? 'night' : 'day'}
        key={i}
      >
        {i !== 0 && <p className="timeline__track-hour-label">{i}</p>}
      </div>
    )),
  )

const Timeline = () => {
  const TEMP_TIMES = [
    {label: 'San Fransisco', hour: 10, minutes: 23},
    {label: 'Stockholm', hour: 21, minutes: 23},
  ]

  return (
    <div className="timeline">
      {TEMP_TIMES.map(({label, hour, minutes}) => (
        <div
          className="timeline__track-marker"
          style={{top: (hour + minutes / 60) * TIMELINE_STEP_HEIGHT}}
          key={label}
        >
          <p className="timeline__track-marker-time">
            {hour}:{minutes}
          </p>
          <p className="timeline__track-marker-label">{label}</p>
        </div>
      ))}

      <div className="timeline__track">
        <TimelineHourMarkers />
      </div>
    </div>
  )
}

export const App = () => (
  <main className="main">
    <Timeline />
  </main>
)
