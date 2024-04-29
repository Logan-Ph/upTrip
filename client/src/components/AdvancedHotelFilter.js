import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid'
import React, { useState } from 'react';
import Checkbox from '@mui/joy/Checkbox';
import Slider from '@mui/material/Slider';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export function AdvancedHotelFilter({filterOptions, listFilter}){
    return(
        <>
        <div className='flex-col space-y-6'>
            <PriceRange/>
            <hr className='md:w-3/4'/>
            <AmenitiesFilter amenities={filterOptions?.data?.propertyFacilitiesAndServices} listFilter={listFilter}/>
            <hr className='md:w-3/4'/>
            <BedType bedOptions={filterOptions?.data?.bedOptions} listFilter={listFilter}/>
            <hr className='md:w-3/4'/>
            <ProperStyleFilter properties={filterOptions?.data?.roomFacilitiesAndServices} listFilter={listFilter}/>
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

function BedType({bedOptions, listFilter}){
    const [showAmenities, setShowAmenities] = useState(true);
    const [selectedBedType, setSelectedBedType] = useState('');

    // const toggleListFilter = (item) => {
    //     const newListFilter = `${item.filterId.split("|")[0]}~${item.filterId.split("|")[1]}*${item.type}*${item.value}*${item.subType}`;
    //     const filters = String(listFilter.current).split(',');
    //     const index = filters.indexOf(newListFilter);
    //     if (index === -1) {
    //         // Not found, add it
    //         listFilter.current = filters.length > 0 && filters[0] !== "" ? `${listFilter.current},${newListFilter}` : newListFilter;
    //     } else {
    //         // Found, remove it
    //         filters.splice(index, 1);
    //         listFilter.current = filters.join(',');
    //     }
    //     console.log(listFilter.current);
    // }


    
    
    //Testing Radio selection
    const toggleListFilter = (item) => {
        // Check if item and item.filterId are defined
        if (!item || !item.filterId) {
            console.error('Invalid item or filterId missing:', item);
            return;  // Exit the function if item or item.filterId is undefined
        }
        const parts = item.filterId.split("|");
        if (parts.length < 2) {
            console.error('Unexpected filterId format:', item.filterId);
            return;  // Exit the function if filterId does not have at least two parts
        }
        const newListFilter = `${parts[0]}~${parts[1]}*${item.type}*${item.value}*${item.subType}`;
        const filters = String(listFilter.current).split(',');
        const index = filters.indexOf(newListFilter);
        if (index === -1) {
            // Not found, add it
            listFilter.current = filters.length > 0 && filters[0] !== "" ? `${listFilter.current},${newListFilter}` : newListFilter;
        } else {
            // Found, remove it
            filters.splice(index, 1);
            listFilter.current = filters.join(',');
        }
        console.log(listFilter.current);
    };

    const handleChange = (event, item) => {
        setSelectedBedType(event.target.value);
        toggleListFilter(item);
    };
 
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

        {/* Checkbox code  */}
        {/* {showAmenities && (
            <div>
                {bedOptions?.subItems.map((item, index) => (
                <div className="flex items-center space-x-2" key={index}>
                    <Checkbox
                        color='success'
                        variant="outlined"
                        onClick={() => toggleListFilter(item.data)} />
                        
                    <label className="font-medium text-md">{item.title}</label>
                </div>
            ))}
            </div>
        )}      */}


        {/* Radio code */}
        {showAmenities && (
            <div>
              <FormControl>
                  <RadioGroup
                      value={selectedBedType} 
                      onChange={handleChange}
                      >
                          {bedOptions?.subItems.map((item, index) =>
                          <FormControlLabel
                              key={index}
                              value={item.title}
                              control={<Radio color="success" variant='outlined'/>}
                              label={item.title}
                              onClick={() => toggleListFilter(item)} />
                          )}
                  </RadioGroup>
              </FormControl>
            </div>  
        )}       
        </>
    )
}

function AmenitiesFilter({amenities, listFilter}){
    const [showAmenities, setShowAmenities] = useState(true);
    const toggleListFilter = (item) => {
        const newListFilter = `${item.filterId.split("|")[0]}~${item.filterId.split("|")[1]}*${item.type}*${item.value}*${item.subType}`;
        const filters = String(listFilter.current).split(',');
        const index = filters.indexOf(newListFilter);
        if (index === -1) {
            // Not found, add it
            listFilter.current = filters.length > 0 && filters[0] !== "" ? `${listFilter.current},${newListFilter}` : newListFilter;
        } else {
            // Found, remove it
            filters.splice(index, 1);
            listFilter.current = filters.join(',');
        }
        console.log(listFilter.current);
    }
    return(   
    <>
        <div className="md:w-3/4 flex items-center justify-between">
            <div className="font-bold text-md">{amenities?.title}</div>
            {showAmenities ?(
                <ChevronUpIcon onClick={() => setShowAmenities(!showAmenities)} className="h-5 w-5 flex-shrink-0 text-gray-900 group-hover:text-gray-500 cursor-pointer ml-20" aria-hidden="true" />
            ) : (
                <ChevronDownIcon onClick={() => setShowAmenities(!showAmenities)} className="h-5 w-5 flex-shrink-0 text-gray-900 group-hover:text-gray-500 cursor-pointer" aria-hidden="true" />
            )}
        </div>
        {showAmenities && (
            <div>
                {amenities?.list.map((item, index) => (
                <div key={index}>
                    <Checkbox 
                        color='success'
                        onClick={() => toggleListFilter(item)} 
                        label={item.text}
                        />
                    {/* <label className="font-medium text-md">{item.text}</label> */}
                </div>
            ))}
            </div>
        )}        
        </>
    )
}

function ProperStyleFilter({properties, listFilter}){
    const [showAmenities, setShowAmenities] = useState(true);
    const toggleListFilter = (item) => {
        const newListFilter = `${item.filterId.split("|")[0]}~${item.filterId.split("|")[1]}*${item.type}*${item.value}*${item.subType}`;
        const filters = String(listFilter.current).split(',');
        const index = filters.indexOf(newListFilter);
        if (index === -1) {
            // Not found, add it
            listFilter.current = filters.length > 0 && filters[0] !== "" ? `${listFilter.current},${newListFilter}` : newListFilter;
        } else {
            // Found, remove it
            filters.splice(index, 1);
            listFilter.current = filters.join(',');
        }
        console.log(listFilter.current);
    }

    return(   
    <>
        <div className="md:w-3/4 flex items-center justify-between">
            <div className="font-bold text-md">{properties?.title}</div>
            {showAmenities ?(
                <ChevronUpIcon onClick={() => setShowAmenities(!showAmenities)} className="h-5 w-5 flex-shrink-0 text-gray-900 group-hover:text-gray-500 cursor-pointer ml-20" aria-hidden="true" />
            ) : (
                <ChevronDownIcon onClick={() => setShowAmenities(!showAmenities)} className="h-5 w-5 flex-shrink-0 text-gray-900 group-hover:text-gray-500 cursor-pointer" aria-hidden="true" />
            )}
        </div>
        {showAmenities && (
            <div>
                {properties?.list.map((item, index) => (
                <div key={index}>
                    <Checkbox 
                        variant='outlined'
                        color='success'
                        onClick={() => toggleListFilter(item)}
                        label={item.text}/>
                    {/* <label className="font-medium text-md">{item.text}</label> */}
                </div>
            ))}
            </div>
        )}        
        </>
    )
}