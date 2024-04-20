// import { AdvancedFlightCard } from "../components/AdvancedFlightCard";
import { AdvancedFlightFilter } from "../components/AdvancedFlightFilter";
import {SortOption} from "../components/SortOption";

import { Suspense, lazy } from "react";
import ASearchSkeleton from "../components/skeletonLoadings/ASearchSkeleton";
import ScrollUpButton from "../components/ScrollUpButton.js";

const AdvancedFlightCard = lazy(()=> delayForDemo(import('../components/AdvancedFlightCard.js')));

//testing lazy loading function
function delayForDemo(promise) {
    return new Promise(resolve => {
      setTimeout(resolve, 2000);
    }).then(() => promise);
  }

export default function AdvancedSearchFlightPage(){
    return(
        <>
        <div className='bg-[#FAFBFC] md:p-10 md:overflow-y-auto'>
            <section className="mx-auto max-w-8xl px-6 py-6">
                <div className="grid grid-cols-1 md:grid-cols-3">

                        <div className="relative">
                            <div className="font-bold text-xl mb-4">Filters</div>
                            <AdvancedFlightFilter/>
                            <div className="absolute inset-y-0 right-0 w-px bg-gray-500 hidden md:block mr-10"></div> 
                        </div>

                        <div className="col-span-2">
                            <div className="flex items-center justify-between mt-10 md:mt-0">
                                <div className="w-1/2">
                                    <p className="text-sm md:text-lg">Showing 3 of 3164 properties found in <span className="font-bold text-sm md:text-lg text-wrap md:text-nowrap text-[#EF4040]">Ho Chi Minh City</span></p>
                                </div>

                                <div>
                                <SortOption/>
                                </div>
                            </div>
                            <Suspense fallback={<ASearchSkeleton/>}> <AdvancedFlightCard/>
                            </Suspense>      
                        </div>
                </div>
            </section>
            <ScrollUpButton/>
        </div>
        </>
    )
}