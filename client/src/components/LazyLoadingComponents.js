function ImageCardCarousel(){
    return<>
        <div className="relative">
            <div className="h-[300px] w-[200px] border-transparent bg-[#F3F3F3] shadow-md rounded-xl"></div>
            <div className="absolute bottom-0 left-0 p-4">
                <div className="border-[#DDDDDD] px-16 py-4 bg-[#DDDDDD] mb-4 rounded-md"></div>
                <div className="border-[#DDDDDD] px-16 py-2 bg-[#DDDDDD] rounded-md"></div>
            </div>
        </div>
    </>
}

function PlanYourTripCard(){
    return<>
    <div className="border border-transparent rounded-md shadow-md bg-[#F3F3F3] w-[380px]">
        <div className="flex items-center space-x-4 md:space-x-6">
            <div className="p-4 md:w-1/3">
                <div className="w-[105px] h-[70px] border-[#DDDDDD] px-12 py-2 bg-[#DDDDDD] rounded-md"></div>
            </div>
            <div className="flex-col space-y-2 justify-between">
                <div className="border-[#DDDDDD] px-10 py-8 bg-[#DDDDDD] rounded-md"></div>
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

function TravelPlannerCompo(){
    return <>
        <div className="py-6 flex flex-col w-1/2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 md:gap-x-8">

                <div className="bg-[#F3F3F3] border border-transparent rounded-xl p-8">
                    <div className="flex flex-col h-full content-center">
                        <div className="border-[#DDDDDD] px-6 py-8 mb-8 bg-[#DDDDDD] rounded-md"></div>
                        <div className="h-[200px] border-[#DDDDDD] bg-[#DDDDDD] rounded-md"></div>
                        <button className="bg-[#DDDDDD] py-4 px-2 mt-5 rounded w-full"></button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 md:gap-x-6">
                    <div className="rounded-xl border-[#F3F3F3] bg-[#F3F3F3] w-full lg::w-[300px] lg:h-[190px]"></div>
                    <div className="rounded-xl border-[#F3F3F3] bg-[#F3F3F3] w-full lg::w-[300px] lg:h-[190px]"></div>
                    <div className="rounded-xl border-[#F3F3F3] bg-[#F3F3F3] w-full lg::w-[300px] lg:h-[190px]"></div>
                    <div className="rounded-xl border-[#F3F3F3] bg-[#F3F3F3] w-full lg::w-[300px] lg:h-[190px]"></div>
                </div>
            </div>

            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div className="border-[#F3F3F3] bg-[#F3F3F3] w-full md:h-[400px] rounded-xl">
                    <div className="flex flex-col md:flex-row w-full h-full mx-auto p-4 rounded-lg shadow-md">
                        <div className="p-4 flex flex-col items-center justify-end mx-auto">
                            <div className="bg-[#DDDDDD] border-[#DDDDDD] py-6 px-16 rounded-md mb-4"></div>
                            <button href="#" className="bg-[#DDDDDD] border-[#DDDDDD] py-4 px-16 rounded "></button>
                        </div>
                    </div>
                </div>

                <div className="border-[#F3F3F3] bg-[#F3F3F3] w-full md:h-[400px] rounded-xl">
                    <div className="flex flex-col md:flex-row w-full h-full mx-auto p-4 rounded-lg shadow-md">
                        <div className="p-4 flex flex-col items-center justify-end mx-auto">
                            <div className="bg-[#DDDDDD] border-[#DDDDDD] py-6 px-16 rounded-md mb-4"></div>
                            <button href="#" className="bg-[#DDDDDD] border-[#DDDDDD] py-4 px-16 rounded "></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}



