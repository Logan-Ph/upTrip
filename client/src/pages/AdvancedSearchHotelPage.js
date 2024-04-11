import { AdvancedHotelCard } from "../components/AdvancedHotelCard";
import {SortOption} from "../components/SortOption";
import { AdvancedHotelFilter } from "../components/AdvancedHotelFilter";

//Search result page (Hotel Listing)
export default function AdvancedSearchHotelPage(){
    return(
    <>
    <div className='bg-[#FAFBFC] md:p-10'>
        <section className="mx-auto max-w-8xl px-6 py-6">
            <div className="grid grid-cols-1 md:grid-cols-3">

                    <div className="relative">
                        <AdvancedHotelFilter/>
                        <div className="absolute inset-y-0 right-0 w-px bg-gray-500 hidden md:block mr-10"></div> 
                    </div>

                    <div className="col-span-2">
                        <div className="flex justify-between">
                            <div>
                                <p>Showing 3 of 3164 properties found in <span className="font-bold text-[#EF4040]">Ho Chi Minh City</span></p>
                            </div>
                            <div>
                                <SortOption/>
                            </div>
                        </div>
                        <AdvancedHotelCard/>
                    </div>

            </div>
        </section>    
    </div>
    </>
    )
}