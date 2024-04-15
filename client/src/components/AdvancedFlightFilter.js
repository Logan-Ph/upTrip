import { ChevronDownIcon, ChevronUpDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid'
import { useState } from 'react';

export function AdvancedFlightFilter(){
    return(
        <>
        <div className='flex-col space-y-6'>
            <PriceRange/>
            <hr className='w-full md:w-3/4'/>
            <DepartureTime/>
            <hr className='w-full md:w-3/4'/>
            <Airlines/>
        </div>

        </>
    )
}

function PriceRange(){
    const [showPriceRang, setPriceRange] = useState(true);

    return(
        <>
        <div className='md:w-3/4 flex items-center justify-between'>
            <div className="font-bold text-md">Price</div>

            {showPriceRang ? (
                <ChevronUpIcon onClick={() => setPriceRange(!showPriceRang)} className="h-5 w-5 flex-shrink-0 text-gray-900 group-hover:text-gray-500 cursor-pointer ml-20" aria-hidden="true"/>
            ) : (
                <ChevronDownIcon onClick={() => setPriceRange(!showPriceRang)} className="h-5 w-5 flex-shrink-0 text-gray-900 group-hover:text-gray-500 cursor-pointer ml-20" aria-hidden="true"/>
            )}
        </div>
        
        {showPriceRang && (
            <div className='flex-col'>
                <div>
                    <input type="range" min={50} max="1200" step="25" className="range-secondary w-full md:w-3/4"  />
                </div>
                <div className="md:w-3/4 flex justify-between">
                    <span>$50</span>
                    <span>$1200</span>
                </div>
            </div>
        )}

        </>
    )
}

function DepartureTime(){
    const [showDepartureTime, setDepartureTime] = useState(true);
    return(
        <>
        <div className="md:w-3/4 flex items-center justify-between">
            <div className="font-bold text-md">Departure Time</div>
            {showDepartureTime ? (
                <ChevronUpIcon onClick={() => setDepartureTime(!showDepartureTime)} className="h-5 w-5 flex-shrink-0 text-gray-900 group-hover:text-gray-500 cursor-pointer ml-20" aria-hidden="true" />
            ) : (
                <ChevronDownIcon onClick={() => setDepartureTime(!showDepartureTime)} className="h-5 w-5 flex-shrink-0 text-gray-900 group-hover:text-gray-500 cursor-pointer ml-20" aria-hidden="true" />
            )}
        </div>
        
        {showDepartureTime && (
            <div className='flex-col'>
                <div>
                    <input type="range" min={50} max="1200" step="25" className="range-secondary w-full md:w-3/4"  />
                </div>
                <div className="md:w-3/4 flex justify-between">
                    <span>12:01 AM</span>
                    <span>11:59 PM</span>
                </div>
            </div>
        )}
        

        </>
    )
}


function Airlines(){
    const [showAmenities, setShowAmenities] = useState(true);

    const amenityCat = [
        {type: "Vietnam Airlines"},{type: "Vietjet Air"},{type: "Bamboo Airlines"},{type: "Vietravel Airlines"}
    ]
    return(   
    <>
        <div className="md:w-3/4 flex items-center justify-between">
            <div className="font-bold text-md">Property Sytle</div>
            {showAmenities ?(
                <ChevronUpIcon onClick={() => setShowAmenities(!showAmenities)} className="h-5 w-5 flex-shrink-0 text-gray-900 group-hover:text-gray-500 cursor-pointer ml-20" aria-hidden="true" />
            ) : (
                <ChevronDownIcon onClick={() => setShowAmenities(!showAmenities)} className="h-5 w-5 flex-shrink-0 text-gray-900 group-hover:text-gray-500 cursor-pointer" aria-hidden="true" />
            )}
        </div>
        {showAmenities && (
            <div>
                {amenityCat.map((item, index) => (
                <div className="flex items-center space-x-2" key={index}>
                    <input type="checkbox" className="border-gray-900 rounded-sm valid:border-gray-900 " />
                    <label className="font-medium text-md">{item.type}</label>
                </div>
            ))}
            </div>
        )}        
        </>
    )
}