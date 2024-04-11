import { AdvancedFlightCard } from "../components/AdvancedFlightCard";
import {SortOption} from "../components/SortOption";

export default function AdvancedSearchFlightPage(){
    return(
        <>
        <div className='bg-[#FAFBFC] md:p-10'>
            <section className="mx-auto max-w-8xl px-6 py-6">
                <div className="grid grid-cols-2 space-x-4">
                    <div className=""></div>
                    <div className="">
                        <div className="flex justify-between">
                            <div>
                                <p>Showing 3 of 25 <span className="font-bold text-[#EF4040]">flights</span></p>
                            </div>
                            <div>
                                <SortOption/>
                            </div>
                        </div>
                        <AdvancedFlightCard/>
                    </div>

                </div>
            </section>
        </div>
        </>
    )
}