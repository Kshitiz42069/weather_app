import React from 'react'
import { UilCloudMoonMeatball } from '@iconscout/react-unicons'

function Header({setQuery}) {
    const cities = [
        {
            id:1,
            title:'Bangalore'
        },
        {
            id:2,
            title:'Las Vegas'
        },
        {
            id:3,
            title:'Los Santos'
        },
        {
            id:4,
            title:'Germany'
        }
        
    ]
  return (
    <div className=' flex items-center justify-around my-6'>
        <div className='flex'>
            <h1 className='text-white text-[2rem] underline cursor-default'>WeatherReact</h1>
            <UilCloudMoonMeatball size={35} className='text-white'/>
            
        </div>
        {cities.map((city) => (
            <button key={city.id} className='hidden lg:block text-white text-lg font-medium hover:underline'
                onClick={()=> setQuery({q: city.title})}
            >
                {city.title}
            </button>
        ))}
        
    </div>
  )
}

export default Header