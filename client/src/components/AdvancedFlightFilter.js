import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid'
import React, { useState } from 'react';
import Checkbox from '@mui/joy/Checkbox';
import Slider from '@mui/material/Slider';

export function AdvancedFlightFilter({setPrefer, priceMax}) {
    return (
        <>
            <div className='flex-col space-y-6'>
                <PriceRange />
                <hr className='w-full md:w-3/4' />
                <DepartureTime />
                <hr className='w-full md:w-3/4' />
                <Airlines setPrefer={setPrefer} />
            </div>

        </>
    )
}

function valuetext(value) {
    return `${value}$`;
}

function PriceRange() {
    const [showPriceRange, setPriceRange] = useState(true);
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

             {showPriceRange ? (
                <ChevronUpIcon onClick={() => setPriceRange(!showPriceRange)} className="h-5 w-5 flex-shrink-0 text-gray-900 group-hover:text-gray-500 cursor-pointer ml-20" aria-hidden="true"/>
            ) : (
                <ChevronDownIcon onClick={() => setPriceRange(!showPriceRange)} className="h-5 w-5 flex-shrink-0 text-gray-900 group-hover:text-gray-500 cursor-pointer ml-20" aria-hidden="true"/>
            )}
        </div>
        
        {showPriceRange && (
            <div className='md:w-3/4'>
            <Slider
              getAriaLabel={() => 'Price range'}
              value={value}
              onChange={handleChange}
              valueLabelDisplay="auto"
              valueLabelFormat={valueLabelFormat}
              min={0}
              max={1200}
              step={25}
              color = "dark"
            />
          </div>
        )}
    </>
    );
}

function DepartureTime(){
    const [showPriceRang, setPriceRange] = useState(true);
    const [value, setValue] = useState([0, 12]);
  
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
      // Function to format the value for display
    const valueLabelFormat = (value) => {
        const hour = Math.floor(value);
        const amPm = hour >= 12 ? 'PM' : 'AM';
        const formattedHour = hour % 12 === 0 ? 12 : hour % 12; // Convert 24h to 12h format
        return `${formattedHour} ${amPm}`;
    };
    
  
    return (
        <>
        <div className='md:w-3/4 flex items-center justify-between'>
            <div className="font-bold text-md">Departure Time</div>

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
              min={50}
              max={1200}
              step={25}
            />
          </div>
        )}
    </>
    );
}



function Airlines({setPrefer}) {
    const [showAmenities, setShowAmenities] = useState(true);

    const amenityCat = [
        { type: "Vietnam Airlines" }, { type: "Vietjet Air" }, { type: "Bamboo Airlines" }, { type: "Vietravel Airlines" }
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
                    <Checkbox
                        variant='outlined'
                        color='success'
                    />
                    <label className="font-medium text-md">{item.type}</label>
                </div>
            ))}
            </div>
        )}        
        </>
    )
}