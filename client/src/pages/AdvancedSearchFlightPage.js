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

    const {data: flightData, isLoading: flightLoading, isSuccess: flightSuccess} = useQuery({
        queryKey: ["advanced-search-flight"],
        queryFn: () => fetchFlightAdvancedSearch(payload),
        retry: false,
        refetchOnWindowFocus: false,
    });


    const tripCom = useQuery({
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


    const myTrip = useQuery({
        queryKey: ["mytrip-flight"],
        queryFn: () => fetchMyTripFlight(payload),
        retry: false,
        refetchOnWindowFocus: false,
        //enabled: !!data.length > 0,
    })

    const bayDep = useQuery({
        queryKey: ["baydep-flight"],
        queryFn: () => fetchBayDepFlight(payload),
        retry: false,
        refetchOnWindowFocus: false,
        //enabled: !!data.length > 0,
    })

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
                                    <p className="text-sm md:text-lg">Showing 3 of {!flightSuccess ? 0 : flightData.length} properties found in <span className="font-bold text-sm md:text-lg text-wrap md:text-nowrap text-[#EF4040]">Ho Chi Minh City</span></p>
                                </div>

                                <div>
                                    <SortOption />
                                </div>
                            </div>

                            {flightSuccess && !flightLoading &&
                                flightData.map((flight) => {
                                    // let tripComPrice = null;
                                    // let myTripPrice = null;
                                    // let bayDepPrice = null;
                                    // if (tripCom.isSuccess && !tripCom.isError) {
                                    //     const fl = tripCom.data.find(item => JSON.stringify(item.flightNo) === JSON.stringify(flight.flightNo))
                                    //     tripComPrice = fl ? Math.round(fl.price) : null;
                                    // }
                                    // if (myTrip.isSuccess && !myTrip.isError) {
                                    //     const fl = myTrip.data.find(item => JSON.stringify(item.flightNo) === JSON.stringify(flight.flightNo))
                                    //     myTripPrice = fl ? fl.price : null

                                    // }
                                    // if (bayDep.isSuccess && !bayDep.isError) {
                                    //     const fl = bayDep.data.find(item => JSON.stringify(item.flightNo) === JSON.stringify(flight.flightNo))
                                    //     bayDepPrice = fl ? fl.price : null
                                    // }

                                    const tripComPrice = tripCom.isSuccess && tripCom.data.find(item => JSON.stringify(item.flightNo) === JSON.stringify(flight.flightNo)) ? Math.round(tripCom.data.find(item => JSON.stringify(item.flightNo) === JSON.stringify(flight.flightNo)).price) : null
                                    const myTripPrice = myTrip.isSuccess && myTrip.data.find(item => JSON.stringify(item.flightNo) === JSON.stringify(flight.flightNo)) ? Math.round(myTrip.data.find(item => JSON.stringify(item.flightNo) === JSON.stringify(flight.flightNo)).price) : null
                                    const bayDepPrice = bayDep.isSuccess && bayDep.data.find(item => JSON.stringify(item.flightNo) === JSON.stringify(flight.flightNo)) ? Math.round(bayDep.data.find(item => JSON.stringify(item.flightNo) === JSON.stringify(flight.flightNo)).price) : null
                                    return (
                                    <Suspense fallback={<ASearchSkeleton />}> <AdvancedFlightCard from={searchParams.get("from")} to={searchParams.get("to")} flight={flight} tripComPrice={tripComPrice} myTripPrice={myTripPrice} bayDepPrice={bayDepPrice} tripComSuccess={tripCom.isSuccess} myTripSuccess={myTrip.isSuccess} bayDepSuccess={bayDep.isSuccess}/>
                                    </Suspense>)
                                })}
                        </div>

                    </div>
                </section>
            </div>
        </>
    )
}
