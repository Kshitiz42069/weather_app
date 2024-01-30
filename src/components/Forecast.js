import React from 'react'
import { iconUrlFromCode } from '../services/WeatherService'

function Forecast({title, items}) {

    console.log(items)
  return (
    <div className='mx-[6rem]'>
        <div className='flex items-center justify-start mt-6'>
            <p className='text-white font-medium uppercase'>
                {title}
            </p>
        </div>
        <hr className='my-2'/>
        <div className='flex flex-row items-center justify-between text-white mx-[2rem]'>

            {items.map(item => (
                <div className='flex flex-col items-center justify-center'>
                    <p className='font-medium text-sm'>
                        {item.title}
                    </p>
                    <img src={iconUrlFromCode(item.icon)} alt="" className='w-12 my-1'/>
                    <p className='font-medium'>
                        {`${item.temp.toFixed()}°`}
                    </p>
                    <p className='font-medium'>
                        {item.weather.main}
                    </p>
                </div>
            ))}
            
        </div>
    </div>
  )
}

export default Forecast