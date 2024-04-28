// import { AdvancedFlightCard } from "../components/AdvancedFlightCard";
import { AdvancedFlightFilter } from "../components/AdvancedFlightFilter";
import { useQueries, useQuery } from "@tanstack/react-query";
import { Suspense, lazy, useEffect, useState } from "react";
import ASearchSkeleton from "../components/skeletonLoadings/ASearchSkeleton";
import { useSearchParams } from "react-router-dom";
import { fetchFlightAdvancedSearch, fetchTripComFlight, fetchBayDepFlight, fetchMyTripFlight } from "../api/fetch.js";
import ScrollUpButton from "../components/ScrollUpButton.js";
import { FlightSortOption } from "../components/FlightSortOption.js";

const AdvancedFlightCard = lazy(() => delayForDemo(import('../components/AdvancedFlightCard.js')));

//testing lazy loading function
function delayForDemo(promise) {
    return new Promise(resolve => {
        setTimeout(resolve, 2000);
    }).then(() => promise);
}

export default function AdvancedSearchFlightPage() {
    const [searchParams] = useSearchParams();
    const [sortField, setSortField] = useState("best");
    const [sortDir, setSortDir] = useState("asc");
    const [prefer, setPrefer] = useState([]);
    const payload = {
        year: searchParams.get("year"),
        month: searchParams.get("month"),
        day: searchParams.get("day"),
        from: searchParams.get("from"),
        to: searchParams.get("to"),
        adult: searchParams.get("adult"),
        child: searchParams.get("child"),
        infant: searchParams.get("infant"),
        seatClass: searchParams.get("seatClass"),
        sortField: sortField,
        sortDir: sortDir,
        prefer: prefer
    }

    const defaultSort = () => {
        setSortField("best");
        setSortDir("asc");
    }

    const priceAscSort = () => {
        setSortField("price");
        setSortDir("asc");
    }

    const priceDescSort = () => {
        setSortField("price");
        setSortDir("desc");
    }
    
    function airlineFilter(arr) {
        setPrefer(arr)
    }
    const agoda = useQuery({
        queryKey: ["advanced-search-flight"],
        queryFn: () => fetchFlightAdvancedSearch(payload),
        retry: false,
        refetchOnWindowFocus: false,
    });

    useEffect(()=>{
        agoda.refetch();
    }, [sortField, sortDir, prefer])


    const tripCom = useQuery({
        queryKey: ["tripcom-flight"],
        queryFn: () => fetchTripComFlight(payload),
        retry: false,
        refetchOnWindowFocus: false,
    });


    const myTrip = useQuery({
        queryKey: ["mytrip-flight"],
        queryFn: () => fetchMyTripFlight(payload),
        retry: false,
        refetchOnWindowFocus: false,
    })

    const bayDep = useQuery({
        queryKey: ["baydep-flight"],
        queryFn: () => fetchBayDepFlight(payload),
        retry: false,
        refetchOnWindowFocus: false,
    })


    return (
        <>
            <div className='bg-[#FAFBFC] md:p-10'>
                <section className="mx-auto max-w-8xl px-6 py-6">
                    <div className="grid grid-cols-1 md:grid-cols-3">

                        <div className="relative">
                            <div className="font-bold text-xl mb-4">Filters</div>
                            <AdvancedFlightFilter setPrefer={setPrefer}/>
                            <div className="absolute inset-y-0 right-0 w-px bg-gray-500 hidden md:block mr-10"></div>
                        </div>

                        <div className="col-span-2">
                            <div className="flex items-center justify-between mt-10 md:mt-0">
                                <div className="w-1/2">
                                    <p className="text-sm md:text-lg">Showing {!agoda.isSuccess ? 0 : agoda.data.length} flights</p>
                                </div>

                                <div>
                                    <FlightSortOption defaultSort={defaultSort} priceAscSort={priceAscSort} priceDescSort={priceDescSort}/>
                                </div>
                            </div>

                            {agoda.isSuccess &&
                                agoda.data.map((flight) => {
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
