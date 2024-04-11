export function ImageCardCarousel(){
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

export function PlanYourTripCard(){
    return<>
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
}





