export default function HPTravelPlannerSkeleton(){
    return <>
    <section className="mx-auto max-w-7xl px-6 py-6 mt-8">
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
        </section>
    </>
}