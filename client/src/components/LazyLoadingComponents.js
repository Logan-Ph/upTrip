import { Link } from "react-router-dom";

export function ImageCardCarousel() {
    return (
        <>
            <div className="relative">
                <div className="h-[300px] w-[200px] border-transparent bg-[#F3F3F3] shadow-md rounded-xl"></div>
                <div className="absolute bottom-0 left-0 p-4">
                    <div className="border-[#DDDDDD] px-16 py-4 bg-[#DDDDDD] mb-4 rounded-md"></div>
                    <div className="border-[#DDDDDD] px-16 py-2 bg-[#DDDDDD] rounded-md"></div>
                </div>
            </div>
        </>
    );
}

export function PlanYourTripCard() {
    return (
        <>
            <div className="border border-transparent rounded-md shadow-md bg-[#F3F3F3] w-[380px]">
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
    );
}

export function AdvancedSearchCard() {
    return (
        <>
            <div className="skeleton bg-[#F3F3F3] rounded-md grid grid-cols-3 gap-4 md:gap-8 shadow-md ">
                <div className="border-[#DDDDDD] bg-[#DDDDDD] h-[252px]"></div>

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
                    <div className="flex items-center pr-6 my-2">
                        {/* Placeholder for the rest of the div content */}
                        <div className="border-[#DDDDDD] bg-[#DDDDDD] rounded-md flex items-center space-y-1  w-full">
                            <div className="mx-auto border-[#F3F3F3] bg-[#F3F3F3] h-[34px]"></div>
                            <div className="mx-auto">
                                <div className="border-[#F3F3F3] bg-[#F3F3F3]"></div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center pr-6 my-2">
                        {/* Placeholder for the rest of the div content */}
                        <div className="border-[#DDDDDD] bg-[#DDDDDD] rounded-md flex items-center space-y-1  w-full">
                            <div className="mx-auto border-[#F3F3F3] bg-[#F3F3F3] h-[34px]"></div>
                            <div className="mx-auto">
                                <div className="border-[#F3F3F3] bg-[#F3F3F3]"></div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center pr-6 my-2">
                        {/* Placeholder for the rest of the div content */}
                        <div className="border-[#DDDDDD] bg-[#DDDDDD] rounded-md flex items-center space-y-1  w-full">
                            <div className="mx-auto border-[#F3F3F3] bg-[#F3F3F3] h-[34px]"></div>
                            <div className="mx-auto">
                                <div className="border-[#F3F3F3] bg-[#F3F3F3]"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export function QuickSearchSkeletonCard() {
    return (
        <>
            <Link href="">
                <div class="card card-side rounded-sm bg-base-100 shadow-xl">
                    <figure className="w-1/3 h-[252px]object-cover skeleton rounded-none"></figure>
                    <div class="card-body">
                        <div className="card-title skeleton h-4 w-30"/>
                        <p class="text-gray-500 skeleton h-4 w-30 mb-4"/>
                        <div class="card-actions gap-0">
                            <button class="btn skeleton rounded-lg w-28"></button>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    );
}

export function TourAndAttractionCard(){
    return(
        <>
            <div className="border border-transparent rounded-md shadow-md bg-[#F3F3F3] pb-10">
                <div className="space-y-4 md:space-y-6">
                    <div className="p-4">
                        <div className="h-[220px] border-[#DDDDDD] px-12 py-2 bg-[#DDDDDD] rounded-md"></div>
                    </div>
                    <div className="w-3/4 space-y-4 p-4">
                        <div className="border-[#DDDDDD] px-6 py-2 bg-[#DDDDDD] rounded-md"></div>
                        <div className="border-[#DDDDDD] px-6 py-2 bg-[#DDDDDD] rounded-md"></div>
                        <div className="border-[#DDDDDD] px-6 py-2 bg-[#DDDDDD] rounded-md"></div>
                    </div>
         
                </div>
            </div>
        </>
    )
}


