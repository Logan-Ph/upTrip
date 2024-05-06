import { SortOption } from "../components/SortOption";
import { AdvancedExperienceFilter } from "../components/AdvancedExperienceFilter";
import { AdvancedExperienceCard } from "../components/AdvancedExperienceCard";
import SrollUpButton from "../components/ScrollUpButton";
import { useSearchParams } from "react-router-dom";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { fetchAttractions, fetchTourAttractions, fetchTours, fetchToursAutocomplete } from "../api/fetch";
import { Suspense, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import AdvancedAttractionCard from "../components/AdvancedAttractionCard";
import TourAttractionSkeleton from "../components/skeletonLoadings/TourAttractionSkeleton";

export default function AdvancedSearchExperiencePage() {
    const [searchParams] = useSearchParams();
    const { ref: attractionsRef, inView: attractionsInView } = useInView();
    const { ref: toursRef, inView: toursInView } = useInView();
    const districtId = searchParams.get("districtId");
    const districtName = searchParams.get("districtName");
    const payload = {
        districtId: districtId,
        pageIndex: 1,
    };

    const {
        data: attractionsData,
        fetchNextPage: fetchAttractionsNextPage,
        isLoading: isAttractionsLoading,
        isFetchingNextPage: isAttractionsFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ["attractions", payload],
        queryFn: ({ pageParam = 1 }) =>
            fetchAttractions({ ...payload, pageIndex: pageParam }),
        getNextPageParam: (lastPage, pages) => {
            return pages.length + 1;
        },
        retry: 0,
        refetchOnWindowFocus: false,
    });

    const {
        data: toursAutocompleteData,
    } = useQuery({
        queryKey: ["toursAutocomplete", payload],
        queryFn: () => fetchToursAutocomplete(districtName),
        retry: 0,
        refetchOnWindowFocus: false,
    });

    const {
        data: toursData,
        isLoading: isToursLoading,
        fetchNextPage: fetchToursNextPage,
        isFetchingNextPage: isToursFetchingNextPage,
    } = useInfiniteQuery({

        queryKey: ["tours", toursAutocompleteData],
        queryFn: ({ pageParam = 1 }) =>
            fetchTours({ ...toursAutocompleteData, pageIndex: pageParam }),
        getNextPageParam: (lastPage, pages) => {
            return pages.length + 1;
        },
        enabled: !!(toursAutocompleteData?.id),
        retry: 0,
        refetchOnWindowFocus: false,
    });

    useEffect(() => {
        if (attractionsInView && !isAttractionsLoading) {
            fetchAttractionsNextPage();
        }
    }, [attractionsInView, fetchAttractionsNextPage, isAttractionsLoading]);

    useEffect(() => {
        if (toursInView && !isToursLoading) {
            fetchToursNextPage();
        }
    }, [toursInView, fetchToursNextPage, isToursLoading]);

    // Add state to track active tab
    const [activeTab, setActiveTab] = useState("Attractions"); // Default to Attractions

    return (
        <>
            <div className="bg-[#FAFBFC] md:p-10">
                <section className="mx-auto max-w-8xl px-6 py-6">
                    <div className="grid grid-cols-1 md:grid-cols-4">
                        <div className="relative">
                            {/* Menu section: tab between tours and attractions */}
                            <div className="font-bold text-xl mb-4">
                                {" "}
                                <div className="hidden md:block">
                                    <ul className="menu bg-white drop-shadow-md w-3/4">
                                        <p className="my-3 px-4 text-lg font-extrabold">
                                            Menu
                                        </p>

                                        {/* Attractions Tab */}
                                        <li>
                                            <div
                                                className={`${
                                                    activeTab === "Attractions"
                                                        ? "font-extrabold underline"
                                                        : "font-semibold"
                                                }`}
                                                onClick={() =>
                                                    setActiveTab("Attractions")
                                                }
                                            >
                                                Attractions
                                            </div>
                                        </li>

                                        {/* Tours tab */}
                                        <li>
                                            <div
                                                className={`${
                                                    activeTab === "Tours"
                                                        ? "font-extrabold underline"
                                                        : "font-semibold"
                                                }`}
                                                onClick={() =>
                                                    setActiveTab("Tours")
                                                }
                                            >
                                                Tours
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div className="md:hidden flex space-x-2 justify-between">
                                    <div className="px-7 py-2 border rounded shadow-sm bg-gray-200 font-medium text-gray-500">
                                        Tours
                                    </div>
                                    <div className="px-7 py-2 border rounded shadow-sm bg-white font-medium text-gray-500">
                                        Attractions
                                    </div>
                                </div>
                                <div className="divider lg:divider-horizontal"></div>
                            </div>

                            <div className="absolute inset-y-0 right-0 w-px bg-gray-500 hidden md:block mr-10"></div>
                        </div>

                        <div className="col-span-3">
                            {activeTab === "Attractions" && (
                                <>
                                    <Attractions districtName={districtName} />
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        {attractionsData?.pages.map(
                                            (page, index) =>
                                                page.map((item, index) => (
                                                    <Suspense
                                                        fallback={
                                                            <TourAttractionSkeleton />
                                                        }
                                                    >
                                                        <AdvancedAttractionCard
                                                            key={index}
                                                            data={item}
                                                        />
                                                    </Suspense>
                                                ))
                                        )}
                                        {(isAttractionsLoading ||
                                            isAttractionsFetchingNextPage) && (
                                            <>
                                                <TourAttractionSkeleton />
                                            </>
                                        )}
                                    </div>
                                    <div ref={attractionsRef} />
                                </>
                            )}
                            {activeTab === "Tours" && (
                                <>
                                    <Tours districtName={districtName} />
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                        {toursData?.pages.map((page, index) =>
                                            page.map((item, index) => (
                                                <Suspense
                                                    fallback={
                                                        <TourAttractionSkeleton />
                                                    }
                                                >
                                                    <AdvancedExperienceCard
                                                        key={index}
                                                        data={item}
                                                    />
                                                </Suspense>
                                            ))
                                        )}
                                        {(isToursLoading || isToursFetchingNextPage) && (
                                            <>
                                                <TourAttractionSkeleton />
                                            </>
                                        )}
                                        <div ref={toursRef} />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    <SrollUpButton />
                </section>
            </div>
        </>
    );
}

function Tours({ districtName }) {
    return (
        <>
            <div className="flex items-center justify-between mt-10 md:mt-0">
                <div className="w-1/2 ">
                    <p className="text-sm md:text-lg">
                        Tours found in{" "}
                        <span className="font-bold text-sm md:text-lg text-wrap md:text-nowrap text-[#FF8682]">
                            {districtName}
                        </span>
                    </p>
                </div>
            </div>
        </>
    );
}

function Attractions({ districtName }) {
    return (
        <>
            <div className="flex items-center justify-between mt-10 md:mt-0">
                <div className="w-1/2 ">
                    <p className="text-sm md:text-lg text-nowrap">
                        Attractions found in{" "}
                        <span className="font-bold text-sm md:text-lg text-wrap md:text-nowrap text-[#FF8682]">
                            {districtName}
                        </span>
                    </p>
                </div>
            </div>
        </>
    );
}
