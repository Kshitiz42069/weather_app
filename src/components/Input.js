import React, { useState } from 'react'
import { UilSearch, UilLocationPinAlt } from '@iconscout/react-unicons'
import { toast } from 'react-toastify';

function Input({setQuery,units,setUnits}) {

  const [city,setCity] = useState('');

  const handleSearch = () => {
    if(city !== '') setQuery({q: city});
  }

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      toast.info('Fetching Users location')
      navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
        toast.success('Location Fetched')
        setQuery({ latitude, longitude });
      });
    }
  }

  const handleUnitsChange = (e) => {
    const selectedUnit = e.currentTarget.name;

    if(units !== selectedUnit) setUnits(selectedUnit);
  }

  return (
    <div className='flex flex-row justify-center my-6 '>
        <div className='flex flex-row w-3/4 items-center justify-center space-x-4 ml-[6rem]'>
            <input 
              value={city}
              onChange={(e)=>setCity(e.currentTarget.value)}
              type="text" 
              className='text-xl font-light p-2 focus:outline-none w-full shadow-xl capitalize placeholder:lowercase'
              placeholder='search for city...'
            />

            <UilSearch 
              size={25} 
              className='text-white cursor-pointer transition ease-out hover:scale-125'
              onClick={handleSearch}
            />
            <UilLocationPinAlt 
              size={25} 
              className='text-white cursor-pointer transition ease-out hover:scale-125'
              onClick={handleLocationClick}
            />
        </div>
        <div className='flex flex-row w-1/4 items-center justify-center'>
            <button 
              name='metric' 
              className='text-xl text-white font-light transition ease-out hover:scale-125'
              onClick={handleUnitsChange}
            >
              °C
            </button>
            <p className='text-white text-xl mx-1 cursor-default'>|</p>
            <button 
              name='imperial' 
              className='text-xl text-white font-light transition ease-out hover:scale-125'
              onClick={handleUnitsChange}
            >
              °F
            </button>
        </div>
    </div>
  )
}

export default Input