import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid'
import { useState } from 'react';

export function AdvancedHotelFilter(){
    return(
        <>
        <PriceRange/>
        <hr className='w-3/4'/>
        
        <AmenitiesFilter/>
        </>
    )
}

function PriceRange(){
    return(
        <>

        </>
    )
}

function AmenitiesFilter(){
    const [showAmenities, setShowAmenities] = useState(true);

    const amenityCat = [
        {type: "Wifi"},{type: "Swimming Pool"},{type: "Car Parking"},{type: "Elevator"},{type: "Meeting Facilities"}, {type: "Airport Transfer"}
    ]
    return(   
    <>
        <div className="flex items-center">
            <div className="py-4 font-bold text-md">Amenities</div>
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