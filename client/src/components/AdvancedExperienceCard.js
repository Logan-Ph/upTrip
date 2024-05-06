import React, { useState, useEffect, useRef } from "react";
export function AdvancedExperienceCard({ data }) {

    return (
        <>
            <div> 
                <ExperienceCard data={data}/>
            </div>
        </>
    );
}

function ExperienceCard({data}){
    const textRef = useRef(null);

    useEffect(() => {
        const calculateRows = () => {
            if (textRef.current) {
                const divElement = textRef.current;
                const computedStyle = window.getComputedStyle(divElement);
                const lineHeight = parseInt(computedStyle.lineHeight, 10);
                const divHeight = divElement.clientHeight;
                const lines = divHeight / lineHeight;
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

    const [isFilled, setIsFilled] = useState(false);

    const toggleHeart = () => {
        setIsFilled(!isFilled);
    };


    return (
        <>
        <div ref={ref}
         className={`relative border border-[#CDEAE1] rounded-lg transition ease-in-out delay-100  hover:translate-x-1 hover:scale-105 duration-300 shadow-md ${visibilityClass}`}>
                <div>
                    <img src={data?.content?.images?.[0]?.url}
                        className="w-full h-[245px] object-cover rounded-lg"
                        alt="tourist cover"    
                    />
                </div>

                <div className="px-4 py-6 space-y-2">
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
                        {/* cái này m để nó theo cái tên mà ngta search á  */}
                        <div className="font-light text-sm md:text-md">
                            <span className="font-semibold text-sm md:text-md">{data?.content?.activity?.location?.city?.name}</span> {" | "} {data?.content?.activity?.location?.country?.name}
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
                                {data?.card?.commentInfo?.commentScore || data?.content?.reviewSummary?.averageScore}
                                <span className="text-sm md:text-md font-light">
                                    /5
                                </span>
                            </p>
                        </div>
                        <p className="text-sm font-light">{data?.content?.reviewSummary?.totalCount} reviews</p>
                    </div>

                    {/* Only tour hasthis section */}
                    
                        {data?.content?.badges?.activityHighlights?.map((badge, index) => (
                            <>
                            <div className="bg-[#CDEAE1] w-1/2 px-3" style={{ visibility: badge ? 'visible' : 'hidden' }}>
                            <p className="font-semibold mx-auto">{badge?.badgeType.split("_").join(" ").toLowerCase()}</p>
                        )}
                            </div>
                            </>
                           
                    
                </div>
                <div className="flex flex-col items-end px-4 pb-4">
                    <div className="flex items-center">
                        <p className="text-sm font-light mr-1 line-through">{Number(data?.activityRepresentativeInfo?.pricingSummary?.pricing?.[0]?.display?.perBook?.total?.allInclusive?.crossedOut).toLocaleString("vi-VN")} VND</p>
                        <p className="font-semibold text-lg text-red-500">
                                {Number(data?.activityRepresentativeInfo?.pricingSummary?.pricing?.[0]?.display?.perBook?.total?.allInclusive?.chargeTotal).toLocaleString("vi-VN")} VND
                        </p>
                    </div>
                </div>
                <div className="absolute top-0 right-0 border border-transparent w-[40px] h-[40px] flex items-center justify-between rounded-md cursor-pointer py-2 bg-[#8DD3BB]" 
                    onClick={toggleHeart}>
                        {!isFilled ? (
                            <svg className="w-[20px] h-[20px] mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#FFFFFF">
                                <path d="M458.4 64.3C400.6 15.7 311.3 23 256 79.3 200.7 23 111.4 15.6 53.6 64.3-21.6 127.6-10.6 230.8 43 285.5l175.4 178.7c10 10.2 23.4 15.9 37.6 15.9 14.3 0 27.6-5.6 37.6-15.8L469 285.6c53.5-54.7 64.7-157.9-10.6-221.3zm-23.6 187.5L259.4 430.5c-2.4 2.4-4.4 2.4-6.8 0L77.2 251.8c-36.5-37.2-43.9-107.6 7.3-150.7 38.9-32.7 98.9-27.8 136.5 10.5l35 35.7 35-35.7c37.8-38.5 97.8-43.2 136.5-10.6 51.1 43.1 43.5 113.9 7.3 150.8z" />
                            </svg>
                        ) : (
                            <svg className="w-[20px] h-[20px] mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#E61E2A">
                                <path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z" />
                            </svg>
                        )}
                </div>  


            </div>
        </>
    )
}



// function ExperienceCard({ data }) {
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

//                     {/* price tracking among website */}
//                     <div>
//                         {data.card?.priceInfo?.price &&
//                             hearts.map((heart, index) => (
//                                 <div
//                                     key={index}
//                                     className="flex items-center my-2"
//                                 >
//                                     <div
//                                         className="border border-[#8DD3BB] w-[30px] h-[30px] flex items-center justify-between rounded-md cursor-pointer py-2"
//                                         onClick={() => toggleHeart(index)}
//                                     >
//                                         {!heart.isFilled ? (
//                                             <svg
//                                                 className="w-[15px] h-[15px] mx-auto"
//                                                 xmlns="http://www.w3.org/2000/svg"
//                                                 viewBox="0 0 512 512"
//                                                 fill=""
//                                             >
//                                                 <path d="M458.4 64.3C400.6 15.7 311.3 23 256 79.3 200.7 23 111.4 15.6 53.6 64.3-21.6 127.6-10.6 230.8 43 285.5l175.4 178.7c10 10.2 23.4 15.9 37.6 15.9 14.3 0 27.6-5.6 37.6-15.8L469 285.6c53.5-54.7 64.7-157.9-10.6-221.3zm-23.6 187.5L259.4 430.5c-2.4 2.4-4.4 2.4-6.8 0L77.2 251.8c-36.5-37.2-43.9-107.6 7.3-150.7 38.9-32.7 98.9-27.8 136.5 10.5l35 35.7 35-35.7c37.8-38.5 97.8-43.2 136.5-10.6 51.1 43.1 43.5 113.9 7.3 150.8z" />
//                                             </svg>
//                                         ) : (
//                                             <svg
//                                                 className="w-[15px] h-[15px] mx-auto"
//                                                 xmlns="http://www.w3.org/2000/svg"
//                                                 viewBox="0 0 512 512"
//                                                 fill="#EF4040"
//                                             >
//                                                 <path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z" />
//                                             </svg>
//                                         )}
//                                     </div>

//                                     {/* Placeholder for the rest of the div content */}
//                                     <div className="border border-transparent bg-[#CDEAE1] rounded-md flex items-center space-y-1 px-8 ml-4 w-full md:w-3/4 gap-2 md:gap-8 pr-2 lg:pr-0">
//                                         <div className="mx-auto">
//                                             <Link to="">
//                                                 <img
//                                                     src={heart.imgLogo}
//                                                     alt="website logo"
//                                                     className="w-[60px] h-[30px] md:w-[80px] md:h-[40px] object-cover cursor-pointer"
//                                                 />
//                                             </Link>
//                                         </div>
//                                         <div className="mx-auto">
//                                             <p className="text-xs md:text-lg text-[#222160] font-bold">
//                                                 {Number(data.card.priceInfo.price).toLocaleString("vi-VN")} VND
//                                             </p>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))}
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }


