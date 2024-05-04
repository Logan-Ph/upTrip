import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";


export default function AdvancedAttractionCard({data}){
    return(
        <>
            <div>
                <AttractionCards data = {data} />
            </div>
        </>
    )
}

// function AttractionCard({data}){
//     const textRef = useRef(null);
//     const [isTruncated, setIsTruncated] = useState(false);

//     useEffect(() => {
//         const calculateRows = () => {
//             if (textRef.current) {
//                 const divElement = textRef.current;
//                 const computedStyle = window.getComputedStyle(divElement);
//                 const lineHeight = parseInt(computedStyle.lineHeight, 10);
//                 const divHeight = divElement.clientHeight;
//                 const lines = divHeight / lineHeight;
//                 setIsTruncated(lines > 3);
//             }
//         };

//         // Calculate rows initially and on every window resize
//         calculateRows();
//         window.addEventListener("resize", calculateRows);

//         // Cleanup listener on component unmount
//         return () => window.removeEventListener("resize", calculateRows);
//     }, []);

//     const websiteLogo = [
//         {
//             imgLogo:
//                 "https://upload.wikimedia.org/wikipedia/commons/c/ce/Agoda_transparent_logo.png",
//         },
//         {
//             imgLogo:
//                 "https://ik.imagekit.io/Uptrip/trip.com?updatedAt=1712830814655",
//         },
//     ];

//     const [hearts, setHearts] = useState(
//         websiteLogo.map((logo) => ({ isFilled: false, imgLogo: logo.imgLogo }))
//     );

//     const toggleHeart = (index) => {
//         const updatedHearts = hearts.map((heart, i) => ({
//             ...heart,
//             isFilled: i === index ? !heart.isFilled : false,
//         }));
//         setHearts(updatedHearts);
//     };

//     const [isIntersecting, setIsIntersecting] = useState(false);
//     const ref = useRef(null);

//     useEffect(() => {
//         const observer = new IntersectionObserver(
//             ([entry]) => {
//                 setIsIntersecting(entry.isIntersecting);
//             },
//             { rootMargin: "0px" }
//         );
//         observer.observe(ref.current);
//         return () => observer.disconnect();
//     }, [isIntersecting]);

//     const visibilityClass = isIntersecting
//         ? "opacity-100 translate-y-10 transition ease-in-out"
//         : "opacity-0 translate-y-10";

//     return (
//         <>
//             <div
//                 ref={ref}
//                 className={`bg-white rounded-md grid grid-cols-3 gap-4 md:gap-8 mb-4 shadow-lg ${visibilityClass}`}
//             >
//                 <div className="">
//                     <img
//                         src={data.card.coverImageUrl}
//                         alt="tourist cover"
//                         className="w-full h-full object-cover"
//                     />
//                 </div>

//                 <div className="col-span-2 space-y-2 py-4 px-1 flex flex-col">
//                     <div
//                         ref={textRef}
//                         className={`text-sm md:text-lg font-bold ${
//                             isTruncated ? "truncate" : ""
//                         }`}
//                     >
//                         {data.card.poiName}
//                     </div>
//                     <div className="flex items-center space-x-2">
//                         <div>
//                             <svg
//                                 className="w-4 h-4 md:w-5 md:h-5"
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 viewBox="0 0 576 512"
//                             >
//                                 <path
//                                     fill="#FFA732"
//                                     d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
//                                 />
//                             </svg>
//                         </div>
//                         <div className="border border-[#CDEAE1] px-1 md:px-2 bg-[#CDEAE1]">
//                             <p className="font-bold text-sm md:text-md">
//                                 {data.card.commentInfo.commentScore}
//                                 <span className="text-sm md:text-md font-light">
//                                     /5
//                                 </span>
//                             </p>
//                         </div>
//                     </div>

//                     {/* cai nay luc rap backend,de no display cai keyword ngta search duoc hong */}
//                     <div className="text-sm md:text-md font-light">
//                         <span className="font-bold text-[#FF8682] text-sm md:text-md">
//                         {data.card.location}
//                         </span>
//                         {" | "} {data.card.distanceStr}
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }

function AttractionCards({data}){
    const textRef = useRef(null);
    const [isTruncated, setIsTruncated] = useState(false);

    useEffect(() => {
        const calculateRows = () => {
            if (textRef.current) {
                const divElement = textRef.current;
                const computedStyle = window.getComputedStyle(divElement);
                const lineHeight = parseInt(computedStyle.lineHeight, 10);
                const divHeight = divElement.clientHeight;
                const lines = divHeight / lineHeight;
                setIsTruncated(lines > 3);
            }
        };

        // Calculate rows initially and on every window resize
        calculateRows();
        window.addEventListener("resize", calculateRows);

        // Cleanup listener on component unmount
        return () => window.removeEventListener("resize", calculateRows);
    }, []);

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
         className={`border border-[#CDEAE1] rounded-lg transition ease-in-out delay-100  hover:translate-y-1 hover:translate-x-1 hover:scale-105 duration-300 shadow-md ${visibilityClass}`}>
                <div>
                    <img src={data.card.coverImageUrl}
                        className="w-full h-[245px] object-cover rounded-lg"/>
                </div>

                <div className="px-4 py-6 space-y-2">
                    <p className="font-extrabold text-xl line-clamp-1">{data.card.poiName}</p>
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

