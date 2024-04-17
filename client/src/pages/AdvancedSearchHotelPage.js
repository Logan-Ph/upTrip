import { AdvancedHotelCard } from "../components/AdvancedHotelCard";
import {SortOption} from "../components/SortOption";
import { AdvancedHotelFilter } from "../components/AdvancedHotelFilter";
import { Suspense, lazy } from "react";
import ASearchSkeleton from "../components/skeletonLoadings/ASearchSkeleton";

const AdvancedHotelCardLazy = lazy(()=> delayForDemo(import('../components/AdvancedHotelCard.js')));

function delayForDemo(promise) {
    return new Promise(resolve => {
      setTimeout(resolve, 2000);
    }).then(() => promise);
  }
  

export default function AdvancedSearchHotelPage(){
    return(
    <>
    <div className='bg-[#FAFBFC] md:p-10'>
        <section className="mx-auto max-w-8xl px-6 py-6">
            <div className="grid grid-cols-1  md:grid-cols-3">

                    <div className="relative">
                        <div className="font-bold text-xl mb-4">Filters</div>
                        <AdvancedHotelFilter/>
                        <div className="absolute inset-y-0 right-0 w-px bg-gray-500 hidden md:block mr-10"></div> 
                    </div>

                    <div className="col-span-2">
                        <div className="flex items-center justify-between">
                            <div className="w-1/2 mt-10 md:mt-0">
                                <p className="text-sm md:text-lg">Showing 3 of 3164 properties found in <span className="font-bold text-sm md:text-lg text-wrap md:text-nowrap text-[#EF4040]">Ho Chi Minh City</span></p>
                            </div>

                            <div>
                               <SortOption/>
                            </div>
                        </div>      
                        
                        <Suspense fallback={<ASearchSkeleton/>}>
                            <AdvancedHotelCardLazy/>  
                        </Suspense>             
                    </div>
            </div>
        </section>    
    </div>
    </>
    )
}