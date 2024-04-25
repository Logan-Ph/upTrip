import { SortOption } from "../components/SortOption"
import { AdvancedExperienceFilter } from "../components/AdvancedExperienceFilter"
import {AdvancedExperienceCard} from "../components/AdvancedExperienceCard"
import SrollUpButton from "../components/ScrollUpButton"

export default function AdvancedSearchExperiencePage(){
    return (
        <>
          <div className="bg-[#FAFBFC] md:p-10">
                <section className="mx-auto max-w-7xl px-6 py-6">
                    <div className="grid grid-cols-1  md:grid-cols-3">
                        
                        <div className="relative">
                            {/* Menu section: tab between tours and attractions */}
                            <div className="font-bold text-xl mb-4"> Menu
                                <p className="font-light">Tours</p>
                                <p className="font-light">Attractions</p>
                            </div>


                            
                            {/* Filter section */}
                            <div className="font-bold text-xl mb-4">
                                Filters
                            </div>
                            <AdvancedExperienceFilter />
                            <div className="absolute inset-y-0 right-0 w-px bg-gray-500 hidden md:block mr-10"></div>
                        </div>

                        <div className="col-span-2">
                            {/* <Tours/> */}
                            <Attractions/>
                            <AdvancedExperienceCard/>
                        </div>
                    </div>
                    <SrollUpButton/>

                </section>
        </div>

        </>
)}

function Tours(){
    return(
        <>                            
        <div className="flex items-center justify-between mt-10 md:mt-0">
            <div className="w-1/2 ">
                <p className="text-sm md:text-lg">
                    570 activities found in{" "}
                    <span className="font-bold text-sm md:text-lg text-wrap md:text-nowrap text-[#FF8682]">
                        Ho Chi Minh City
                    </span>
                </p>
            </div>

            <div>
                <SortOption />
            </div>
        </div>
        </>
    )
}

function Attractions(){
    return(
        <>                            
        <div className="flex items-center justify-between mt-10 md:mt-0">
            <div className="w-1/2 ">
                <p className="text-sm md:text-lg text-nowrap">
                    Things to Do in
                    <span className="ml-1 font-bold text-sm md:text-lg text-wrap md:text-nowrap text-[#FF8682]">
                        Ho Chi Minh City: 
                    </span>
                    <span className="text-sm md:text-lg"> Attractions & Tourist Spots</span>
                </p>
                <p></p>
            </div>

            <div>
                <SortOption />
            </div>
        </div>
        </>
    )
}