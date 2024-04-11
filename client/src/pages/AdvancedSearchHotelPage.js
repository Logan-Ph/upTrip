import { AdvancedHotelCard } from "../components/AdvancedHotelCard";
import {SortOption} from "../components/SortOption";

//Search result page (Hotel Listing)
export default function AdvancedSearchHotelPage(){
    return(
    <>
    <div className='bg-[#FAFBFC] md:p-10'>
        <section className="mx-auto max-w-8xl px-6 py-6">
            <div className="grid grid-cols-2 space-x-4">
                <div className=""></div>
                <div className="">
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