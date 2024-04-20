export function ImageCardCarousel(){
    return<>
        <div className="relative skeleton">
            <div className="h-[300px] w-[200px] border-transparent bg-[#F3F3F3] shadow-md rounded-xl"></div>
            <div className="absolute bottom-0 left-0 p-4">
                <div className="border-[#DDDDDD] px-16 py-4 bg-[#DDDDDD] mb-4 rounded-md"></div>
                <div className="border-[#DDDDDD] px-16 py-2 bg-[#DDDDDD] rounded-md"></div>
            </div>
        </div>
    </>
}

export function PlanYourTripCard(){
    return<>
    <div className="border border-transparent rounded-md shadow-md bg-[#F3F3F3] w-[380px] skeleton">
        <div className="flex items-center space-x-4 md:space-x-6">
            <div className="p-4 md:w-1/3">
                <div className="w-[105px] h-[70px] border-[#DDDDDD] px-12 py-2 bg-[#DDDDDD] rounded-md"></div>
            </div>
            <div className="flex-col space-y-2 justify-between">
                <div className="border-[#DDDDDD] px-6 py-2 bg-[#DDDDDD] rounded-md"></div>
                <div className="grid grid-cols-3 gap-x-2 pr-2 md:pr-0">
                    <div className="border-[#DDDDDD] px-6 py-2 bg-[#DDDDDD] rounded-md"></div>
                    <div className="border-[#DDDDDD] px-6 py-2 bg-[#DDDDDD] rounded-md"></div>
                    <div className="border-[#DDDDDD] px-6 py-2 bg-[#DDDDDD] rounded-md"></div>
                </div>
            </div>
        </div>
    </div>        
    </>
}

export function AdvancedSearchCard(){
    return(
        <>
        <div className= "bg-[#F3F3F3] rounded-md grid grid-cols-3 gap-4 md:gap-8 shadow-md my-8 skeleton">
            <div className="border-[#DDDDDD] bg-[#DDDDDD] h-[252px] skeleton">
            </div>

            <div className="flex-col space-y-2 py-4 col-span-2">
                <div className="border-[#DDDDDD] py-4 w-1/2 bg-[#DDDDDD] rounded-md"></div>

                {/* Star rating */}
                <div class="flex items-center">
                    <div className="border-[#DDDDDD] py-2 w-1/4 bg-[#DDDDDD] rounded-md"></div>
                </div>

                {/* district, city */}
                <div className="flex items-center">
                    <div className="border-[#DDDDDD] py-2 w-1/4 bg-[#DDDDDD] rounded-md"></div>
                </div>
                
                {/* price tracking among three websites */}
                <div>
                    <div className="flex items-center my-2 pr-4 md:pr-0">

                        <div className="border-[#DDDDDD] bg-[#DDDDDD] w-[30px] h-[30px] flex items-center justify-between rounded-md cursor-pointer py-2"></div>

                        {/* Placeholder for the rest of the div content */}
                        <div className="border-[#DDDDDD] bg-[#DDDDDD] rounded-md flex items-center space-y-1 ml-4 w-full md:w-3/4 gap-2 md:gap-8 pr-2 lg:pr-0 ">
                            <div className="mx-auto border-[#F3F3F3] bg-[#F3F3F3] h-[34px]"></div>
                            <div className="mx-auto">
                                <div className="border-[#F3F3F3] bg-[#F3F3F3]"></div>
                            </div>
                        </div>

                    </div>

                    <div className="flex items-center my-2 pr-4 md:pr-0">

<div className="border-[#DDDDDD] bg-[#DDDDDD] w-[30px] h-[30px] flex items-center justify-between rounded-md cursor-pointer py-2 "></div>

{/* Placeholder for the rest of the div content */}
<div className="border-[#DDDDDD] bg-[#DDDDDD] rounded-md flex items-center space-y-1 ml-4 w-full md:w-3/4 gap-2 md:gap-8 pr-2 lg:pr-0 ">
    <div className="mx-auto border-[#F3F3F3] bg-[#F3F3F3] h-[34px]"></div>
    <div className="mx-auto">
        <div className="border-[#F3F3F3] bg-[#F3F3F3]"></div>
    </div>
</div>

                    </div>

                    <div className="flex items-center my-2 pr-4 md:pr-0">

<div className="border-[#DDDDDD] bg-[#DDDDDD] w-[30px] h-[30px] flex items-center justify-between rounded-md cursor-pointer py-2 "></div>

{/* Placeholder for the rest of the div content */}
<div className="border-[#DDDDDD] bg-[#DDDDDD] rounded-md flex items-center space-y-1 ml-4 w-full md:w-3/4 gap-2 md:gap-8 pr-2 lg:pr-0">
    <div className="mx-auto border-[#F3F3F3] bg-[#F3F3F3] h-[34px]"></div>
    <div className="mx-auto">
        <div className="border-[#F3F3F3] bg-[#F3F3F3]"></div>
    </div>
</div>

                    </div>

                </div>

            </div>

        </div>
        </>
    )
}





