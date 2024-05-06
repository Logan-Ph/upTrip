import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import {
    fetchQuickSearchAttractions,
    fetchQuickSearchHotels,
} from "../api/fetch";
import { QuickSearchSkeletonCard } from "../components/LazyLoadingComponents";
import { QuickStayCard } from "../components/InfoCard";
import { QuickExperienceCard } from "../components/InfoCard";
import { Suspense, useEffect, useState } from "react";
import ScrollUpButton from "../components/ScrollUpButton";
import { useInView } from "react-intersection-observer";

export default function QuickSearch() {
    const { ref, inView } = useInView();
    const [searchParams] = useSearchParams();
    const keyword = searchParams.get("keyword");
    const [type, setType] = useState("All");

    const {
        data: hotels,
        isLoading: hotelsLoading,
        isSuccess: hotelsSuccess,
        fetchNextPage: fetchHotelsNextPage,
        isFetchingNextPage: hotelsFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ["quick-search", "hotels", keyword],
        queryFn: ({ pageParam = 1 }) =>
            fetchQuickSearchHotels({ keyword: keyword, pageIndex: pageParam }),
        getNextPageParam: (lastPage, pages) => {
            return pages.length + 1;
        },
        retry: false,
        refetchOnWindowFocus: false,
    });

    const {
        data: attractions,
        isLoading: attractionsLoading,
        isSuccess: attractionsSuccess,
        fetchNextPage: fetchAttractionsNextPage,
        isFetchingNextPage: attractionsFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ["quick-search", "attractions", keyword],
        queryFn: ({ pageParam = 1 }) =>
            fetchQuickSearchAttractions({
                keyword: keyword,
                pageIndex: pageParam,
            }),
        getNextPageParam: (lastPage, pages) => {
            return pages.length + 1;
        },
        retry: false,
        refetchOnWindowFocus: false,
    });

    useEffect(() => {
        if (inView || attractionsSuccess || hotelsSuccess) {
            fetchHotelsNextPage();
            fetchAttractionsNextPage();
        }
    }, [
        inView,
        fetchHotelsNextPage,
        fetchAttractionsNextPage,
        attractionsSuccess,
        hotelsSuccess,
    ]);

    return (
        <>
            <div className="md:px-10">
                <div className="flex flex-col md:flex-row mx-auto max-w-8xl px-6 py-6">
                    {/* filter section */}
                    <div className="hidden md:block">
                        <ul className="menu bg-white drop-shadow-lg w-56">
                            <p className="my-3 px-4 text-lg font-extrabold">
                                Filter Results
                            </p>
                            <li>
                                <div
                                    className={`${
                                        type === "All"
                                            ? "font-semibold underline"
                                            : ""
                                    }`}
                                    onClick={() => setType("All")}
                                >
                                    All
                                </div>
                            </li>
                            <li>
                                <div
                                    className={`${
                                        type === "Stays"
                                            ? "font-semibold underline"
                                            : ""
                                    }`}
                                    onClick={() => setType("Stays")}
                                >
                                    Stays
                                </div>
                            </li>
                            <li>
                                <div
                                    className={`${
                                        type === "Experiences"
                                            ? "font-semibold underline"
                                            : ""
                                    }`}
                                    onClick={() => setType("Experiences")}
                                >
                                    Experiences
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="md:hidden flex space-x-2 justify-between">
                        <div className="px-7 py-2 border rounded shadow-sm bg-gray-200 font-medium text-gray-500">
                            All
                        </div>
                        <div className="px-7 py-2 border rounded shadow-sm bg-white font-medium text-gray-500">
                            Stays
                        </div>
                        <div className="px-7 py-2 border rounded shadow-sm bg-white font-medium text-gray-500">
                            Experiences
                        </div>
                    </div>
                    <div className="divider lg:divider-horizontal"></div>

                    {/*  result section */}
                    <div className="grow">
                        <div>
                            <p className="text-sm md:text-lg font-medium">
                                Results matching{" "}
                                <span className="font-medium text-sm md:text-lg text-wrap md:text-nowrap text-[#FF8682]">
                                    "{keyword}"
                                </span>
                            </p>
                        </div>

                        <div className="my-3 space-x-3">
                            {type === "All" &&
                                hotelsSuccess &&
                                attractionsSuccess && (
                                    <>
                                        <Suspense
                                            fallback={
                                                <QuickSearchSkeletonCard />
                                            }
                                        >
                                            {hotels.pages.map((page) =>
                                                page.map((hotel) => (
                                                    <QuickStayCard
                                                        key={hotel.id}
                                                        hotel={hotel}
                                                    />
                                                ))
                                            )}
                                        </Suspense>
                                        <Suspense
                                            fallback={
                                                <QuickSearchSkeletonCard />
                                            }
                                        >
                                            {attractions.pages.map((page) =>
                                                page.map((attr) => (
                                                    <QuickExperienceCard
                                                        key={attr.id}
                                                        attraction={attr}
                                                    />
                                                ))
                                            )}
                                        </Suspense>
                                    </>
                                )}
                            {type === "Stays" && hotelsSuccess && (
                                <Suspense
                                    fallback={<QuickSearchSkeletonCard />}
                                >
                                    {hotels.pages.map((page) =>
                                        page.map((hotel) => (
                                            <QuickStayCard
                                                key={hotel.id}
                                                hotel={hotel}
                                            />
                                        ))
                                    )}
                                </Suspense>
                            )}
                            {type === "Experiences" && attractionsSuccess && (
                                <Suspense
                                    fallback={<QuickSearchSkeletonCard />}
                                >
                                    {attractions.pages.map((page) =>
                                        page.map((attr) => (
                                            <QuickExperienceCard
                                                key={attr.id}
                                                attraction={attr}
                                            />
                                        ))
                                    )}
                                </Suspense>
                            )}
                            <div ref={ref} />
                            {/* Skeleton */}
                            {hotelsLoading ||
                            attractionsLoading ||
                            hotelsFetchingNextPage ||
                            attractionsFetchingNextPage ? (
                                <>
                                    <QuickSearchSkeletonCard />
                                    <QuickSearchSkeletonCard />
                                    <QuickSearchSkeletonCard />
                                    <QuickSearchSkeletonCard />
                                    <QuickSearchSkeletonCard />
                                </>
                            ) : null}
                        </div>
                    </div>
                </div>
                <ScrollUpButton />
            </div>
        </>
    );
}
