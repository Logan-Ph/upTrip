import { SortOption } from "../components/SortOption";
import { AdvancedHotelFilter } from "../components/AdvancedHotelFilter";
import { Suspense, lazy } from "react";
import ASearchSkeleton from "../components/skeletonLoadings/ASearchSkeleton";
import { useSearchParams } from "react-router-dom";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
    fetchHotelAdvancedSearch,
    fetchHotelPriceComparison,
} from "../api/fetch.js";
import ScrollUpButton from "../components/ScrollUpButton.js";

const AdvancedHotelCardLazy = lazy(() =>
    import("../components/AdvancedHotelCard.js")
);

export default function AdvancedSearchHotelPage() {
    const [searchParams] = useSearchParams();
    let payload = {
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
    };

    const {
        data: hotelList,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status,
    } = useInfiniteQuery({
        queryKey: ["advanced-search", "hotels"],
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
                            <AdvancedHotelFilter />
                            <div className="absolute inset-y-0 right-0 w-px bg-gray-500 hidden md:block mr-10"></div>
                        </div>

                        <div className="col-span-2">
                            <div className="flex items-center justify-between">
                                <div className="w-1/2 mt-10 md:mt-0">
                                    <p className="text-sm md:text-lg">
                                        Showing 3 of 3164 properties found in{" "}
                                        <span className="font-bold text-sm md:text-lg text-wrap md:text-nowrap text-[#EF4040]">
                                            Ho Chi Minh City
                                        </span>
                                    </p>
                                </div>

                                <div>
                                    <SortOption />
                                </div>
                            </div>

                            {status === "success" &&
                                hotelList.pages.map((page, pageIndex) => {
                                    return page.hotelList.map((hotel, hotelIndex) => {
                                        const priceData = getHotelPriceComparison.isSuccess ? getHotelPriceComparison.data[hotelIndex] : null;
                                        const agodaPrice = priceData?.agodaPrice ? Math.round(priceData.agodaPrice?.[0]?.price?.perNight?.exclusive?.display).toLocaleString("vi-VN") : null;
                                        const bookingPrice = priceData?.bookingPrice ? Math.round(priceData.bookingPrice?.price?.[0]?.finalPrice?.amount).toLocaleString("vi-VN") : null;
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
