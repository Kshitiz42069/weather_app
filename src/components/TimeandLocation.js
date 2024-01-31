import React from 'react'
import { formatToLocalTime } from '../services/WeatherService'

function TimeandLocation({weather:{dt,timezone,name,country}}) {
  return (
    <div>
        <div className='flex items-center justify-center my-6 '>
            <p className='text-white lg:text-xl font-extralight sm:text-sm'>
                {formatToLocalTime(dt,timezone)}
            </p>
        </div>
        <div className='flex items-center justify-center my-3'>
            <p className='text-white lg:text-3xl sm:text-2xl font-medium'>
                {`${name}, ${country}`}
            </p>
        </div>
    </div>
  )
}

export default TimeandLocation