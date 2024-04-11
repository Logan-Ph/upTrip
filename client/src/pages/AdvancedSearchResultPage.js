import { AdvancedHotelCard } from "../components/AdvancedHotelCard";

export default function AdvancedSearchResultPage(){
    return(
    <>
    <div className='bg-[#FAFBFC] md:p-10'>
        <section className="mx-auto max-w-8xl px-6 py-6">
            <div className="grid grid-cols-2 space-x-4">
                <div className=""></div>
                <div className="">
                    <AdvancedHotelCard/>
                </div>

            </div>
        </section>
        
    </div>
    
    </>


    )
}