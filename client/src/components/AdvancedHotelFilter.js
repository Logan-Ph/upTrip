import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid'
import { useState } from 'react';

export function AdvancedHotelFilter({filterOptions, listFilter}){
    return(
        <>
        <div className='flex-col space-y-6'>
            <PriceRange/>
            <hr className='md:w-3/4'/>
            <BedType bedOptions={filterOptions?.data?.bedOptions} listFilter={listFilter}/>
            <hr className='md:w-3/4'/>
            <AmenitiesFilter amenities={filterOptions?.data?.propertyFacilitiesAndServices} listFilter={listFilter}/>
            <hr className='md:w-3/4'/>
            <ProperStyleFilter properties={filterOptions?.data?.roomFacilitiesAndServices} listFilter={listFilter}/>
        </div>
        </>
    )
}

function PriceRange(){
    const [showPriceRang, setPriceRange] = useState(false);
    return(
        <>
        <div className='md:w-3/4 flex items-center justify-between'>
            <div className="font-bold text-md">PriceRange</div>
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

function BedType({bedOptions, listFilter}){
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
                    <input type="radio" name="radio-1" className="radio border-gray-900 rounded-sm valid:border-gray-900"  onClick={() => toggleListFilter(item.data)} />
                    <label className="font-medium text-md">{item.title}</label>
                </div>
            ))}
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
                <div className="flex items-center space-x-2" key={index}>
                    <input type="checkbox" className="border-gray-900 rounded-sm valid:border-gray-900" onClick={() => toggleListFilter(item)} />
                    <label className="font-medium text-md">{item.text}</label>
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
                <div className="flex items-center space-x-2" key={index}>
                    <input type="checkbox" className="border-gray-900 rounded-sm valid:border-gray-900 " onClick={() => toggleListFilter(item)}/>
                    <label className="font-medium text-md">{item.text}</label>
                </div>
            ))}
            </div>
        )}        
        </>
    )
}