import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid'
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

export function AdvancedHotelFilter({filterOptions}){
    return(
        <>
        <div className='flex-col space-y-6'>
            <PriceRange/>
            <hr className='md:w-3/4'/>
            <BedType amenityCat={filterOptions?.bedOptions}/>
            <hr className='md:w-3/4'/>
            <AmenitiesFilter/>
            <hr className='md:w-3/4'/>
            <ProperStyleFilter/>
        </div>
        </>
    )
}

function valuetext(value) {
    return `${value}$`;
}

function PriceRange() {
    const [showPriceRang, setPriceRange] = useState(true);
    const [value, setValue] = useState([50, 1200]);
  
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const valueLabelFormat = (value) => {
        return `$${value}`;
    };
  
    return (
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
            <div className='md:w-3/4'>
                <Slider
                getAriaLabel={() => 'Price range'}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto" // Display the label on the slider thumb
                valueLabelFormat={valueLabelFormat} // Format the label to show a dollar sign
                getAriaValueText={valuetext}
                min={50}
                max={1200}
                step={25}
                color = "dark"
                />
          </div>
        )}
    </>
    );
}

function BedType({bedOptions}){
    console.log(bedOptions)
    const [showAmenities, setShowAmenities] = useState(true);

    return(   
    <>
        <div className="md:w-3/4 flex items-center justify-between">
            <div className="font-bold text-md">{bedOptions?.title}</div>
            {showAmenities ?(
                <ChevronUpIcon onClick={() => setShowAmenities(!showAmenities)} className="h-5 w-5 flex-shrink-0 text-gray-900 group-hover:text-gray-500 cursor-pointer ml-20" aria-hidden="true" />
            ) : (
                <ChevronDownIcon onClick={() => setShowAmenities(!showAmenities)} className="h-5 w-5 flex-shrink-0 text-gray-900 group-hover:text-gray-500 cursor-pointer" aria-hidden="true" />
            )}
        </div>
        {showAmenities && (
            <div>
                {bedOptions?.subItems.map((item, index) => (
                <div className="flex items-center space-x-2" key={index}>
                    <input type="checkbox" className="border-gray-900 rounded-sm valid:border-gray-900 " />
                    <label className="font-medium text-md">{item.title}</label>
                </div>
            ))}
            </div>
        )}        
        </>
    )
}

function AmenitiesFilter(){
    const [showAmenities, setShowAmenities] = useState(true);

    const amenityCat = [
        {type: "Wifi"},{type: "Swimming Pool"},{type: "Parking"},{type: "Elevator"},
        {type: "Meeting Room"}, {type: "Airport Pick-up Service"}, {type: "Barbecue"}, {type: "Smoking Area"},
        {type: "Airport Transfer"}
    ]
    return(   
    <>
        <div className="md:w-3/4 flex items-center justify-between">
            <div className="font-bold text-md">Property Facilities & Services</div>
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

function ProperStyleFilter(){
    const [showAmenities, setShowAmenities] = useState(true);

    const amenityCat = [
        {type: "Balcony"},{type: "Bathtub"},{type: "TV"},{type: "Air conditioner"},{type: "Extra Beds Available"},
        {type: "Washing Machine"},{type: "Electric Kettle"},{type: "Garden/Yard"}
    ]

    return(   
    <>
        <div className="md:w-3/4 flex items-center justify-between">
            <div className="font-bold text-md">Room Facilities & Services</div>
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