import { SortOption } from "../components/SortOption";
import { AdvancedExperienceFilter } from "../components/AdvancedExperienceFilter";
import { AdvancedExperienceCard } from "../components/AdvancedExperienceCard";
import SrollUpButton from "../components/ScrollUpButton";
import { useSearchParams } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchTourAttractions } from "../api/fetch";
import { Suspense, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import ASearchSkeleton from "../components/skeletonLoadings/ASearchSkeleton";

import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AdvancedAttractionCard from "../components/AdvancedAttractionCard";

export default function AdvancedSearchExperiencePage() {
    const [searchParams] = useSearchParams();
    const { ref, inView } = useInView();
    const districtId = searchParams.get("districtId");
    const districtName = searchParams.get("districtName");
    const payload = {
        districtId: districtId,
        pageIndex: 1,
    };

    const { data, fetchNextPage, isLoading, isFetchingNextPage } = useInfiniteQuery({
        queryKey: ["tour-attractions", payload],
        queryFn: ({ pageParam = 1 }) =>
            fetchTourAttractions({ ...payload, pageIndex: pageParam }),
        getNextPageParam: (lastPage, pages) => {
            return pages.length + 1;
        },
        retry: 0,
        refetchOnWindowFocus: false,
    });

    useEffect(() => {
        if (inView && !isLoading) {
            fetchNextPage();
        }
    }, [inView, fetchNextPage, isLoading]);

    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    
    // Add state to track active tab
    const [activeTab, setActiveTab] = React.useState('Attractions'); // Default to Attractions

    // Function to handle tab changes
    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };
    

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
                                                 className={`${activeTab === "Attractions" ? "font-extrabold underline" : "font-semibold"}`}
                                                 onClick={() => handleTabChange("Attractions")}
                                            >
                                                Attractions
                                            </div>
                                        </li>

                                        {/* Tours tab */}
                                        <li>
                                            <div
                                                 className={`${activeTab === "Tours" ? "font-extrabold underline" : "font-semibold"}`}
                                                 onClick={() => handleTabChange("Tours")}
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
                            {activeTab == "Attractions" ? (
                                <>
                                <Attractions districtName={districtName} />
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {data?.pages.map((page, index) =>
                                        page.map((item, index) => (
                                            <Suspense fallback={<ASearchSkeleton />}>
                                                <AdvancedAttractionCard
                                                    key={index}
                                                    data={item}
                                                />
                                            </Suspense>
                                        ))
                                    )}
                                    {(isLoading || isFetchingNextPage) && (
                                        <>
                                            <ASearchSkeleton/>
                                            <ASearchSkeleton/>
                                            <ASearchSkeleton/>
                                            <ASearchSkeleton/>
                                            <ASearchSkeleton/>
                                        </>
                                    )}      
                                </div>
                                
                                </>
                            ) : (
                                <>
                                <Tours districtName={districtName}/>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    {data?.pages.map((page, index) =>
                                        page.map((item, index) => (
                                            <Suspense fallback={<ASearchSkeleton />}>
                                                <AdvancedExperienceCard
                                                    key={index}
                                                    data={item}
                                                />
                                            </Suspense>
                                        ))
                                    )}
                                    {(isLoading || isFetchingNextPage) && (
                                        <>
                                            <ASearchSkeleton/>
                                            <ASearchSkeleton/>
                                            <ASearchSkeleton/>
                                            <ASearchSkeleton/>
                                            <ASearchSkeleton/>
                                        </>
                                    )}      
                                </div>
                                </>
                            )}
                        </div>


                    </div>
                    <div ref={ref}/>
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
                        Activities found in {" "}
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
                        Attractions found in 
                        {" "}
                        <span className="font-bold text-sm md:text-lg text-wrap md:text-nowrap text-[#FF8682]">
                            {districtName}
                        </span>
                    </p>
                </div>
            </div>
        </>
    );
}
