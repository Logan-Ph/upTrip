import React, { useState, useEffect, useRef } from "react";
import AddToFavorite from "./AddToFavorite";

export default function AdvancedAttractionCard({data, payload}){
    return(
        <>
            <div className="relative group">
                <AttractionCards data={data} />
                
                <div className="absolute top-0 right-0">
                <AddToFavorite payload={payload} hotel={false} experience={data}/>
                </div> 
            </div> 
        </>
    )
}

function AttractionCards({data}){
    const [isIntersecting, setIsIntersecting] = useState(false);
    const url = data?.card?.detailUrl
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
            className={`border border-[#CDEAE1] rounded-lg hover:transition hover:ease-in-out hover:translate-x-0.5 duration-300 shadow-md   ${visibilityClass}`}>
                <div>
                    <img
                        src={data.card.coverImageUrl}
                        className="w-full h-[245px] object-cover rounded-lg"
                        alt="attraction"
                    />
                </div>

                <div className="px-4 py-6 space-y-2">
                    <p 
                        onClick={() => window.open(url, "_blank")}
                        className="font-extrabold text-sm md:text-lg lg:text-xl line-clamp-1 hover:underline"
                    >{data.card.poiName}</p>
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
                        {/* cái này m để nó theo cái tên mà ngta search á  */}
                        <div className="font-light text-sm md:text-md">
                            <span className="font-semibold text-sm md:text-md">{data.card.location}</span> {" | "} {data.card.distanceStr}
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
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
                                {data.card.commentInfo.commentScore}
                                <span className="text-sm md:text-md font-light">
                                    /5
                                </span>
                            </p>
                        </div>
                        <p className="text-sm font-light">86 reviews</p>
                    </div>
                </div>
                <div className="flex justify-end items-center px-4 pb-4">
                    {data.card.priceInfo.price ? (
                        // Render price if it exists
                        <>
                            <p className="text-sm font-light mr-1 line-through">1.500.000 VND</p>
                            <p className="font-semibold text-lg text-red-500">
                                {Number(data.card.priceInfo.price).toLocaleString("vi-VN")} VND
                            </p>
                        </>
                    ) : (
                        // Render "Free" if price doesn't exist
                        <p className="font-semibold text-xl">Free</p>
                    )}
                </div>
            </div>
    </>
    )
}

