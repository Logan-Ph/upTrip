export default function DetailedPageGallerySkeleton(){
    return(
        <>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-y-6 xl:gap-4">
            {/* right image */}
            <div className="relative">
                <div
                    className="skeleton w-full h-[320px] p-10 rounded-lg border-[#DDDDDD] px-6 py-2 bg-[#DDDDDD]">
                </div>
            </div>

            {/* left image */}
            <div className="col-span-2 ">
                <div className="grid grid-cols-3 gap-4">
                    <div className="skeleton border-[#DDDDDD] px-6 py-2 bg-[#DDDDDD] rounded-md h-[150px]"></div>
                    <div className="skeleton border-[#DDDDDD] px-6 py-2 bg-[#DDDDDD] rounded-md h-[150px]"></div>
                    <div className="skeleton border-[#DDDDDD] px-6 py-2 bg-[#DDDDDD] rounded-md h-[150px]"></div>
                    <div className="skeleton border-[#DDDDDD] px-6 py-2 bg-[#DDDDDD] rounded-md h-[150px]"></div>
                    <div className="skeleton border-[#DDDDDD] px-6 py-2 bg-[#DDDDDD] rounded-md h-[150px]"></div>
                    <div className="skeleton border-[#DDDDDD] px-6 py-2 bg-[#DDDDDD] rounded-md h-[150px]"></div>
                </div>
            </div>
        </div>
        </>
    )
}