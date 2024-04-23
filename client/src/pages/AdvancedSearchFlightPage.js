// import { AdvancedFlightCard } from "../components/AdvancedFlightCard";
import { AdvancedFlightFilter } from "../components/AdvancedFlightFilter";
import { SortOption } from "../components/SortOption";
import { useQueries, useQuery } from "@tanstack/react-query";
import { Suspense, lazy } from "react";
import ASearchSkeleton from "../components/skeletonLoadings/ASearchSkeleton";
import { useSearchParams } from "react-router-dom";
import { fetchFlightAdvancedSearch, fetchTripComFlight, fetchBayDepFlight, fetchMyTripFlight } from "../api/fetch.js";

const AdvancedFlightCard = lazy(() => delayForDemo(import('../components/AdvancedFlightCard.js')));

//testing lazy loading function
function delayForDemo(promise) {
    return new Promise(resolve => {
        setTimeout(resolve, 2000);
    }).then(() => promise);
}

export default function AdvancedSearchFlightPage() {
    const [searchParams] = useSearchParams();
    const payload = {
        year: searchParams.get("year"),
        month: searchParams.get("month"),
        day: searchParams.get("day"),
        from: searchParams.get("from"),
        to: searchParams.get("to"),
        adult: searchParams.get("adult"),
        child: searchParams.get("child"),
        infant: searchParams.get("infant"),
        seatClass: searchParams.get("seatClass")
    }

    const {data: flightData, isLoading: flightLoading, status} = useQuery({
        queryKey: ["advanced-search-flight"],
        queryFn: () => fetchFlightAdvancedSearch(payload),
        retry: false,
        refetchOnWindowFocus: false,
    });


    const {data: tripComData, isLoading: tripComLoading} = useQuery({
        queryKey: ["tripcom-flight"],
        queryFn: () => fetchTripComFlight(payload),
        retry: false,
        refetchOnWindowFocus: false,
        // enabled: !!flightData,
        // onSuccess: (tripComData) => {
        //     flightData.forEach((flight) => {
        //         const updatedData = tripComData.find((item) => item.flightNo === flight.flightNo);
        //         if (updatedData) {flight.tripComPrice = updatedData.tripComPrice;}
        //     });
        // },
    });


    // const myTripData = useQuery({
    //     queryKey: ["mytrip-flight"],
    //     queryFn: () => fetchMyTripFlight(payload),
    //     retry: false,
    //     refetchOnWindowFocus: false,
    //     enabled: !!data.length > 0,
    // })

    // const bayDepData = useQuery({
    //     queryKey: ["baydep-flight"],
    //     queryFn: () => fetchBayDepFlight(payload),
    //     retry: false,
    //     refetchOnWindowFocus: false,
    //     enabled: !!data.length > 0,
    // })

    return (
        <>
            <div className='bg-[#FAFBFC] md:p-10'>
                <section className="mx-auto max-w-8xl px-6 py-6">
                    <div className="grid grid-cols-1 md:grid-cols-3">

                        <div className="relative">
                            <div className="font-bold text-xl mb-4">Filters</div>
                            <AdvancedFlightFilter />
                            <div className="absolute inset-y-0 right-0 w-px bg-gray-500 hidden md:block mr-10"></div>
                        </div>

                        <div className="col-span-2">
                            <div className="flex items-center justify-between mt-10 md:mt-0">
                                <div className="w-1/2">
                                    <p className="text-sm md:text-lg">Showing 3 of {flightLoading ? 0 : flightData.length} properties found in <span className="font-bold text-sm md:text-lg text-wrap md:text-nowrap text-[#EF4040]">Ho Chi Minh City</span></p>
                                </div>

                                <div>
                                    <SortOption />
                                </div>
                            </div>

                            {status === "success" && !flightLoading && !tripComLoading &&
                                flightData.map((flight) => {
                                    return (
                                    <Suspense fallback={<ASearchSkeleton />}> <AdvancedFlightCard flight={flight}/>
                                    </Suspense>)
                                })}
                        </div>

                    </div>
                </section>
            </div>
        </>
    )
}
