import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import {
    fetchQuickSearchAttractions,
    fetchQuickSearchHotels,
} from "../api/fetch";
import { QuickSearchSkeletonCard } from "../components/LazyLoadingComponents";
import { QuickStayCard } from "../components/QuickSearchCard";
import { QuickExperienceCard } from "../components/QuickSearchCard";
import { Suspense, useState } from "react";

export default function QuickSearch() {
    const [searchParams] = useSearchParams();
    const keyword = searchParams.get("keyword");
    const [type, setType] = useState("Stays");

    const { data: hotels, isLoading: hotelsLoading } = useQuery({
        queryKey: ["quick-search", "hotels", keyword],
        queryFn: () => fetchQuickSearchHotels(keyword),
        retry: false,
        refetchOnWindowFocus: false,
    });

    const { data: attractions, isLoading: attractionsLoading } = useQuery({
        queryKey: ["quick-search", "attractions", keyword],
        queryFn: () => fetchQuickSearchAttractions(keyword),
        retry: false,
        refetchOnWindowFocus: false,
    });

    return (
        <>
            <div class="md:px-10">
                <div class="flex flex-col md:flex-row mx-auto max-w-8xl px-6 py-6">
                    {/* filter section */}
                    <div class="hidden md:block">
                        <ul class="menu bg-white drop-shadow-lg w-56">
                            <p className="my-3 px-4 text-lg font-extrabold">
                                Filter Results
                            </p>
                            <li>
                                <div
                                    class={`${
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
									class={`${
										type === "Stays"
											? "font-semibold underline"
											: ""
									}`}
									onClick={() => setType("Stays")}>
                                    Stays
                                </div>
                            </li>
                            <li>
                                <div 
									class={`${
										type === "Experiences"
											? "font-semibold underline"
											: ""
									}`}
									onClick={() => setType("Experiences")}>
                                    Experiences
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="md:hidden flex space-x-2 justify-between">
                        <div class="px-7 py-2 border rounded shadow-sm bg-gray-200 font-medium text-gray-500">
                            All
                        </div>
                        <div class="px-7 py-2 border rounded shadow-sm bg-white font-medium text-gray-500">
                            Stays
                        </div>
                        <div class="px-7 py-2 border rounded shadow-sm bg-white font-medium text-gray-500">
                            Experiences
                        </div>
                    </div>
                    <div class="divider lg:divider-horizontal"></div>
                    {/*  result section */}
                    <div class="grow">
                        <div>
                            <p className="text-sm md:text-lg font-medium">
                                Results matching{" "}
                                <span className="font-medium text-sm md:text-lg text-wrap md:text-nowrap text-[#FF8682]">
                                    "{keyword}"
                                </span>
                            </p>
                        </div>

                        <div class="my-3 space-x-3">
                            {type === "All" && (
                                <>
                                    <Suspense
                                        fallback={<QuickSearchSkeletonCard />}
                                    >
                                        {hotels?.map((hotel) => (
                                            <QuickStayCard hotel={hotel} />
                                        ))}
                                    </Suspense>
                                    <Suspense
                                        fallback={<QuickSearchSkeletonCard />}
                                    >
                                        {attractions?.map((attr) => (
                                            <QuickExperienceCard attraction={attr}
                                            />
                                        ))}
                                    </Suspense>
                                </>
                            )}
                            {type === "Stays" && (
                                <Suspense
                                    fallback={<QuickSearchSkeletonCard />}
                                >
                                    {hotels?.map((hotel) => (
                                        <QuickStayCard hotel={hotel} />
                                    ))}
                                </Suspense>
                            )}
                            {type === "Experiences" && (
                                <Suspense
                                    fallback={<QuickSearchSkeletonCard />}
                                >
                                    {attractions?.map((attr) => (
                                        <QuickExperienceCard attraction={attr} />
                                    ))}
                                </Suspense>
                            )}
                            {/* Skeleton */}
                            {hotelsLoading || attractionsLoading ? (
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
            </div>
        </>
    );
}
