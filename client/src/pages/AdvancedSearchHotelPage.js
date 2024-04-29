import { SortOption } from "../components/SortOption";
import { AdvancedHotelFilter } from "../components/AdvancedHotelFilter";
import { Suspense, lazy, useEffect, useRef } from "react";
import ASearchSkeleton from "../components/skeletonLoadings/ASearchSkeleton";
import { useSearchParams } from "react-router-dom";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
    fetchHotelAdvancedSearch,
    fetchHotelPriceComparison,
    getAppConfig,
} from "../api/fetch.js";
import ScrollUpButton from "../components/ScrollUpButton.js";

const AdvancedHotelCardLazy = lazy(() =>
    import("../components/AdvancedHotelCard.js")
);

export default function AdvancedSearchHotelPage() {
    const [searchParams] = useSearchParams();
    const listSort = useRef(searchParams.get("listFilters").split(',')[0])
    const listFilter = useRef(searchParams.get("listFilters").split(',').slice(1))
    const daysBetween = (checkin, checkout) => (new Date(checkout.slice(0,4), checkout.slice(4,6) - 1, checkout.slice(6)) - new Date(checkin.slice(0,4), checkin.slice(4,6) - 1, checkin.slice(6))) / (1000 * 60 * 60 * 24);

    let payload = {
        resultType: searchParams.get("resultType"),
        city: searchParams.get("city"),
        cityName: searchParams.get("cityName"),
        provinceId: searchParams.get("provinceId"),
        countryId: searchParams.get("countryId"),
        districtId: searchParams.get("districtId"),
        checkin: searchParams.get("checkin"),
        checkout: searchParams.get("checkout"),
        barCurr: searchParams.get("barCurr"),
        cityType: searchParams.get("cityType"),
        latitude: searchParams.get("latitude"),
        longitude: searchParams.get("longitude"),
        searchCoordinate: searchParams.get("searchCoordinate"),
        crn: searchParams.get("crn"),
        adult: searchParams.get("adult"),
        children: searchParams.get("children"),
        domestic: searchParams.get("domestic"),
        preHotelIds: searchParams.getAll("preHotelIds"),
        listFilters: `${listSort.current},${listFilter.current}`,
    };

    const filterOptions = useQuery({
        queryKey: ['get-app-config'],
        queryFn:  getAppConfig,
        retry: false,
        refetchOnWindowFocus: false,
    })

    const {
        data: hotelList,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status,
    } = useInfiniteQuery({
        queryKey: ["advanced-search", "hotels", payload],
        queryFn: ({ pageParam = payload }) =>
            fetchHotelAdvancedSearch(pageParam),
        retry: false,
        refetchOnWindowFocus: false,
        getNextPageParam: (lastPage, allPages) => {
            const lastPageIds = lastPage.preHotelIds;
            if (lastPageIds) {
                // Accumulate all preHotelIds from previous pages
                const accumulatedIds = allPages.reduce((acc, page) => {
                    return acc.concat(page.preHotelIds || []);
                }, []);

                return {
                    ...payload,
                    preHotelIds: [
                        ...new Set([...accumulatedIds, ...lastPageIds]),
                    ], // Ensure unique IDs
                };
            }
            return undefined;
        },
    });

    const hotelNames = hotelList?.pages?.[0]?.hotelList
        ? hotelList.pages[0].hotelList.map(
              (hotel) => hotel.hotelBasicInfo.hotelName
          )
        : [];
    
    payload = {...payload, hotelNames}

    const getHotelPriceComparison = useQuery({
        queryKey: ["hotel-price-comparison", hotelNames],
        queryFn: () => fetchHotelPriceComparison(payload),
        retry: false,
        refetchOnWindowFocus: false,
        enabled: !!hotelNames.length > 0,
    });

    return (
        <>
            <div className="bg-[#FAFBFC] md:p-10">
                <section className="mx-auto max-w-8xl px-6 py-6">
                    <div className="grid grid-cols-1  md:grid-cols-3">
                        <div className="relative">
                            <div className="font-bold text-xl mb-4">
                                Filters
                            </div>
                            <AdvancedHotelFilter filterOptions={filterOptions} listFilter={listFilter} payload={payload}/>
                            <div className="absolute inset-y-0 right-0 w-px bg-gray-500 hidden md:block mr-10"></div>
                        </div>

                        <div className="col-span-2">
                            <div className="flex items-center justify-between">
                                <div className="w-1/2 mt-10 md:mt-0">
                                    <p className="text-sm md:text-lg">
                                        Showing properties found in{" "}
                                        <span className="font-bold text-sm md:text-lg text-wrap md:text-nowrap text-[#EF4040]">
                                            {payload.cityName}
                                        </span>
                                    </p>
                                </div>

                                <div>
                                    <SortOption payload={payload} listSort={listSort} listFilter={listFilter}/>
                                </div>
                            </div>

                            {status === "success" &&
                                hotelList.pages.map((page, pageIndex) => {
                                    return page.hotelList.map((hotel, hotelIndex) => {
                                        const priceData = getHotelPriceComparison.isSuccess ? getHotelPriceComparison.data[hotelIndex] : null;
                                        const agodaPrice = priceData?.agodaPrice ? Math.round(priceData.agodaPrice?.[0]?.price?.perRoomPerNight?.exclusive?.display).toLocaleString("vi-VN") : null;
                                        const bookingPrice = priceData?.bookingPrice ? Math.round(priceData.bookingPrice?.price?.reduce((acc, curr) => acc + Number(curr.finalPrice.amount), 0)/(Number(payload.adult) * Number(daysBetween(payload.checkin, payload.checkout)))).toLocaleString("vi-VN") : null
                                        return (
                                            <Suspense fallback={<ASearchSkeleton />}>
                                                <AdvancedHotelCardLazy
                                                    hotel={hotel}
                                                    agodaPrice={agodaPrice}
                                                    bookingPrice={bookingPrice}
                                                    isSuccess={getHotelPriceComparison.isSuccess}
                                                />
                                            </Suspense>
                                        );
                                    });
                                })
                            }
                            
                            {isFetching && <ASearchSkeleton />}
                                <button
                                    onClick={() => fetchNextPage()}
                                    disabled={
                                        !hasNextPage || isFetchingNextPage
                                    }
                                >
                                    {isFetchingNextPage
                                        ? "Loading more..."
                                        : "Load More"}
                                </button>
                        </div>
                    </div>
                </section>
                <ScrollUpButton/>
            </div>
        </>
    );
}
