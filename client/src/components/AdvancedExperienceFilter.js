import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid'
import React, { useState } from 'react';
import Checkbox from '@mui/joy/Checkbox';
import Slider from '@mui/material/Slider';


export  function AdvancedExperienceFilter(){
    return(
        <>
        <div className='flex-col space-y-6'>
            <PriceRange/>
            <hr className='w-full md:w-3/4'/>
            <StarRating/>
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
  
function StarRating(){
    const [showAmenities, setShowAmenities] = useState(true);

    return(   
    <>
        <div className="md:w-3/4 flex items-center justify-between">
            <div className="font-bold text-md">Star Rating</div>
            {showAmenities ?(
                <ChevronUpIcon onClick={() => setShowAmenities(!showAmenities)} className="h-5 w-5 flex-shrink-0 text-gray-900 group-hover:text-gray-500 cursor-pointer ml-20" aria-hidden="true" />
            ) : (
                <ChevronDownIcon onClick={() => setShowAmenities(!showAmenities)} className="h-5 w-5 flex-shrink-0 text-gray-900 group-hover:text-gray-500 cursor-pointer" aria-hidden="true" />
            )}
        </div>
            {showAmenities && (
                <div className='space-y-2'>
                  <div className="flex items-center space-x-4">
                      <input type="checkbox" className="border-gray-900 rounded-sm valid:border-gray-900 w-[20px] h-[20px]" />
  
                      <div className='flex'>
                          <svg className="w-[25px] h-[25px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                              <path fill="#FFA732" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"/></svg>
  
                          <svg className="w-[25px] h-[25px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                          <path fill="#FFA732" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"/></svg>  
  
                          <svg className="w-[25px] h-[25px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                          <path fill="#FFA732" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"/></svg>    
  
                          <svg className="w-[25px] h-[25px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                          <path fill="#FFA732" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"/></svg>  
  
                          <svg className="w-[25px] h-[25px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                          <path fill="#FFA732" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"/></svg>    
                      </div>
                      
                  </div>
                  <div className="flex items-center space-x-4">
                      <input type="checkbox" className="border-gray-900 rounded-sm valid:border-gray-900 w-[20px] h-[20px]" />
  
                      <div className='flex'>
                          <svg className="w-[25px] h-[25px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                              <path fill="#FFA732" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"/></svg>
  
                          <svg className="w-[25px] h-[25px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                          <path fill="#FFA732" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"/></svg>  
  
                          <svg className="w-[25px] h-[25px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                          <path fill="#FFA732" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"/></svg>    
  
                          <svg className="w-[25px] h-[25px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                          <path fill="#FFA732" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"/></svg>    
                      </div>
                      
                  </div>
                  <div className="flex items-center space-x-4">
                      <input type="checkbox" className="border-gray-900 rounded-sm valid:border-gray-900 w-[20px] h-[20px]" />
  
                      <div className='flex'>
                          <svg className="w-[25px] h-[25px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                              <path fill="#FFA732" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"/></svg>
  
                          <svg className="w-[25px] h-[25px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                          <path fill="#FFA732" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"/></svg>  
  
                          <svg className="w-[25px] h-[25px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                          <path fill="#FFA732" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"/></svg>    
                      </div>
                      
                  </div>
                  <div className="flex items-center space-x-4">
                      <input type="checkbox" className="border-gray-900 rounded-sm valid:border-gray-900 w-[20px] h-[20px]" />
  
                      <div className='flex'>
                          <svg className="w-[25px] h-[25px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                              <path fill="#FFA732" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"/></svg>
  
                          <svg className="w-[25px] h-[25px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                          <path fill="#FFA732" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"/></svg>    
                      </div>
                      
                  </div>
                  <div className="flex items-center space-x-4">
                      <input type="checkbox" className="border-gray-900 rounded-sm valid:border-gray-900 w-[20px] h-[20px]" />

                      <svg className="w-[25px] h-[25px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                          <path fill="#FFA732" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"/></svg>
                  </div>
                </div>
            )}
          
               
        </>
    )
}
