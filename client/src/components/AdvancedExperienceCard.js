import React, { useState, useEffect, useRef } from "react";
import AddToFavorite from "./AddToFavorite";

export function AdvancedExperienceCard({ data, payload }) {
    return (
        <>
            <div className="relative group"> 
                <ExperienceCard data={data}/>

                <div className="absolute top-0 right-0">
                    <AddToFavorite payload={payload} hotel={false} experience={data}/>
                </div> 
            </div>
        </>
    );
}

function ExperienceCard({data}){
    const [isIntersecting, setIsIntersecting] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsIntersecting(entry.isIntersecting);
            },
            { rootMargin: "0px" }
        );
        observer.observe(ref.current);
        return () => observer.disconnect();
    }, [isIntersecting]);

    const visibilityClass = isIntersecting
        ? "opacity-100 translate-y-10 transition ease-in-out"
        : "opacity-0 translate-y-10";


    return (
        <>
            <div ref={ref}
                className={`relative border border-[#CDEAE1] rounded-lg hover:transition hover:ease-in-out hover:translate-x-0.5 duration-300 shadow-md ${visibilityClass}`}>
                <div>
                    <img src={data?.content?.images?.[0]?.url}
                        className="w-full h-[245px] object-cover rounded-lg"
                        alt="tourist cover"    
                    />
                </div>

                <div className="px-2 py-4 space-y-4">
                    {/* tours' name can be long (max 2 rows) */}
                    <p className="font-extrabold text-sm md:text-lg lg:text-xl line-clamp-2">{data?.content?.activity?.title}</p>
                    <div className="flex items-center">
                        <div className="pr-1">
                            <svg
                                className="w-[15px] h-[15px]"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 384 512"
                            >
                                <path
                                    fill="gray"
                                    d="M172.3 501.7C27 291 0 269.4 0 192 0 86 86 0 192 0s192 86 192 192c0 77.4-27 99-172.3 309.7-9.5 13.8-29.9 13.8-39.5 0zM192 272c44.2 0 80-35.8 80-80s-35.8-80-80-80-80 35.8-80 80 35.8 80 80 80z"
                                />
                            </svg>
                        </div>
                        
                        <div className="font-light text-sm md:text-md">
                            <span className="font-semibold text-sm md:text-md">{data?.content?.activity?.location?.city?.name}</span> {" | "} {data?.content?.activity?.location?.country?.name}
                        </div>
                    </div>

                    <div className="grid grid-cols-2">
                        <div className="flex items-center space-x-1">
                            <div>
                                <svg
                                    className="w-4 h-4 md:w-5 md:h-5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 576 512"
                                >
                                    <path
                                        fill="#FFA732"
                                        d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                                    />
                                </svg>
                            </div>
                            <div className="border border-[#CDEAE1] px-1 md:px-2 bg-[#CDEAE1]">
                                <p className="font-bold text-sm md:text-md">
                                    {data?.card?.commentInfo?.commentScore || data?.content?.reviewSummary?.averageScore}
                                    <span className="text-sm md:text-md font-light">
                                        /5
                                    </span>
                                </p>
                            </div>
                            <p className="text-xs font-light text-nowrap">{data?.content?.reviewSummary?.totalCount} reviews</p>
                        </div>

                        {data?.content?.badges?.activityHighlights?.length > 0 && (
                            <div className="bg-[#CDEAE1] px-2 mx-auto">
                                {data.content.badges.activityHighlights.map((badge, index) => (
                                    <div key={index} className={badge ? 'visible' : 'hidden'}>
                                        <p className="text-sm font-semibold mx-auto">{badge?.badgeType.split("_").join(" ").toLowerCase()}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex flex-col items-end px-4 pb-4">
                    <div className="flex items-center">
                        <p className="text-sm font-light mr-1 line-through">{Number(data?.activityRepresentativeInfo?.pricingSummary?.pricing?.[0]?.display?.perBook?.total?.allInclusive?.crossedOut).toLocaleString("vi-VN")} VND</p>
                        <p className="font-semibold text-lg text-red-500">
                                {Number(data?.activityRepresentativeInfo?.pricingSummary?.pricing?.[0]?.display?.perBook?.total?.allInclusive?.chargeTotal).toLocaleString("vi-VN")} VND
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}