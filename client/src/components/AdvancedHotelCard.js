import { useState, useRef, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import AddToFavorite from "./AddToFavorite";

export default function AdvancedHotelCard({ payload, hotel, agodaPrice, bookingPrice, isSuccess, isSpecific }) {
    const navigate = useNavigate()
    return (
        <>
            <div onClick={() => navigate(`/hotel-detailed-page?resultType=H&hotelId=${hotel?.hotelBasicInfo?.hotelId || payload.hotelId}&city=${payload.city}&cityName=${payload.cityName}&hotelName=${hotel?.hotelBasicInfo?.hotelName || payload.hotelName}&searchValue=${payload.searchValue}&provinceId=${payload.provinceId}&countryId=${payload.countryId}&districtId=${payload.districtId}&checkin=${payload.checkin}&checkout=${payload.checkout}&barCurr=USD&cityType=${payload.cityType}&latitude=${payload.latitude}&longitude=${payload.longitude}&searchCoordinate=${payload.searchCoordinate}&crn=${payload.crn}&adult=${payload.adult}&children=${payload.children}&preHotelIds=${payload.preHotelIds}&listFilters=${payload.listFilters}&domestic=${payload.domestic}`)}>

                <HotelCard
                    key={hotel?.hotelBasicInfo?.hotelId || hotel?.name}
                    imgSrc={hotel?.hotelBasicInfo?.hotelImg || hotel?.img}
                    hotelName={hotel?.hotelBasicInfo?.hotelName || hotel?.name}
                    district={hotel?.positionInfo?.positionDesc || hotel?.transportInfo[0]}
                    city={hotel?.positionInfo?.cityName || hotel?.transportInfo[1]}
                    price={hotel?.hotelBasicInfo?.price?.toLocaleString("vi-VN") || hotel?.price?.toLocaleString("vi-VN") || "-"}
                    starRating={hotel?.hotelStarInfo?.star || hotel?.starNum}
                    agodaPrice={agodaPrice}
                    bookingPrice={bookingPrice}
                    isSuccess={isSuccess}
                    isSpecific={isSpecific}
                />
                {isSpecific && (
                <div className="visible text-black">Popular hotels nearby</div>
            )}
            
            </div>
            <AddToFavorite/>
            
        </>
    );
}

export function HotelCard({
    imgSrc,
    hotelName,
    district,
    city,
    price,
    starRating,
    agodaPrice,
    bookingPrice,
    isSuccess,
    isSpecific
}) {
    const websiteLogo = useMemo(() => [
        {
            imgLogo: "https://upload.wikimedia.org/wikipedia/commons/c/ce/Agoda_transparent_logo.png",
            price: agodaPrice,
        },
        {
            imgLogo: "https://ik.imagekit.io/Uptrip/booking.com?updatedAt=1712829810252",
            price: bookingPrice,
        },
        {
            imgLogo: "https://ik.imagekit.io/Uptrip/trip.com?updatedAt=1712830814655",
            price: price,
        },
    ], [agodaPrice, bookingPrice, price]);

    const [hearts, setHearts] = useState(
         websiteLogo.map((logo) => ({
            isFilled: false,
            imgLogo: logo.imgLogo,
            price: logo.price,
        }))
    );

    useEffect(()=> {
        setHearts(websiteLogo.map((logo) => ({
            isFilled: false,
            imgLogo: logo.imgLogo,
            price: logo.price,
        })))
    },[agodaPrice, bookingPrice, price, websiteLogo])

    const toggleHeart = (index) => {
        // Update the state for only the clicked heart, setting it to filled and others to not filled
        const updatedHearts = hearts.map((heart, i) => ({
            ...heart,
            isFilled: i === index ? !heart.isFilled : false, // Toggle only the clicked one, reset others
        }));
        setHearts(updatedHearts);
    };

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
            <div
                ref={ref}
                className={`bg-white rounded-md grid grid-cols-3 gap-4 md:gap-8 mb-4 shadow-md  ${isSpecific ? "border-8 p-2 border-[#8DD3BB]" : ""} ${visibilityClass}`}
            >
                <div className="">
                    <img
                        src={imgSrc}
                        alt="hotel cover"
                        className="w-[450px] h-full object-cover"
                    />
                </div>

                <div className="flex-col space-y-4 py-4 col-span-2">
                    <p className="text-lg md:text-xl font-bold">
                        {hotelName}
                    </p>

                    {/* Star rating */}
                    <div class="flex items-center">
                        <div className="flex items-center space-x-2">
                            <div>
                                <svg className="w-4 h-4 md:w-5 md:h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                <path fill="#FFA732" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"/></svg>
                            </div>
                            <div className="border border-[#CDEAE1] px-1 md:px-2 bg-[#CDEAE1]">
                                <p className="font-bold text-sm md:text-md">{starRating}<span className="text-sm md:text-md font-light">/5</span></p>
                            </div>
                        </div>
                        {/* No rating */}
                    </div>

                    {/* district, city */}
                    <div className="flex items-center">
                        <div className="pr-1">
                            <svg
                                className="w-[15px] h-[15px]"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 384 512"
                            >
                                <path
                                    d="M172.3 501.7C27 291 0 269.4 0 192 0 86 86 0 192 0s192 86 192 192c0 77.4-27 99-172.3 309.7-9.5 13.8-29.9 13.8-39.5 0zM192 272c44.2 0 80-35.8 80-80s-35.8-80-80-80-80 35.8-80 80 35.8 80 80 80z"
                                />
                            </svg>
                        </div>
                        <div className="font-light text-sm md:text-md">
                            <span className="font-bold text-[#FF8682] text-sm md:text-md">{city}</span> - {district}
                        </div>
                    </div>

                    {/* price tracking among three websites */}
                    <div>
                        
                        { !(isSuccess) ? (
                            <div>
                                <div className="flex items-center my-2 pr-4 md:pr-0">
                                    <div className="border-[#DDDDDD] bg-[#DDDDDD] w-[30px] h-[30px] flex items-center justify-between rounded-md cursor-pointer py-2"></div>

                                    {/* Placeholder for the rest of the div content */}
                                    <div className="border-[#DDDDDD] bg-[#DDDDDD] rounded-md flex items-center space-y-1 ml-4 w-full md:w-3/4 gap-2 md:gap-8 pr-2 lg:pr-0 ">
                                        <div className="mx-auto border-[#F3F3F3] bg-[#F3F3F3] h-[34px]"></div>
                                        <div className="mx-auto">
                                            <div className="border-[#F3F3F3] bg-[#F3F3F3]"></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center my-2 pr-4 md:pr-0">
                                    <div className="border-[#DDDDDD] bg-[#DDDDDD] w-[30px] h-[30px] flex items-center justify-between rounded-md cursor-pointer py-2 "></div>

                                    {/* Placeholder for the rest of the div content */}
                                    <div className="border-[#DDDDDD] bg-[#DDDDDD] rounded-md flex items-center space-y-1 ml-4 w-full md:w-3/4 gap-2 md:gap-8 pr-2 lg:pr-0 ">
                                        <div className="mx-auto border-[#F3F3F3] bg-[#F3F3F3] h-[34px]"></div>
                                        <div className="mx-auto">
                                            <div className="border-[#F3F3F3] bg-[#F3F3F3]"></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center my-2 pr-4 md:pr-0">
                                    <div className="border-[#DDDDDD] bg-[#DDDDDD] w-[30px] h-[30px] flex items-center justify-between rounded-md cursor-pointer py-2 "></div>

                                    {/* Placeholder for the rest of the div content */}
                                    <div className="border-[#DDDDDD] bg-[#DDDDDD] rounded-md flex items-center space-y-1 ml-4 w-full md:w-3/4 gap-2 md:gap-8 pr-2 lg:pr-0">
                                        <div className="mx-auto border-[#F3F3F3] bg-[#F3F3F3] h-[34px]"></div>
                                        <div className="mx-auto">
                                            <div className="border-[#F3F3F3] bg-[#F3F3F3]"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <>
                                {hearts.map((heart, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center my-2 pr-4 md:pr-0"
                                    >
                                        <div className="border border-[#8DD3BB] w-[30px] h-[30px] flex items-center justify-between rounded-md cursor-pointer py-2"
                                            onClick={() =>
                                                toggleHeart(index)
                                            }
                                        >
                                             {!heart.isFilled 
                                                ? (
                                                    <svg className="w-[15px] h-[15px] mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                                                        fill="">
                                                        <path d="M458.4 64.3C400.6 15.7 311.3 23 256 79.3 200.7 23 111.4 15.6 53.6 64.3-21.6 127.6-10.6 230.8 43 285.5l175.4 178.7c10 10.2 23.4 15.9 37.6 15.9 14.3 0 27.6-5.6 37.6-15.8L469 285.6c53.5-54.7 64.7-157.9-10.6-221.3zm-23.6 187.5L259.4 430.5c-2.4 2.4-4.4 2.4-6.8 0L77.2 251.8c-36.5-37.2-43.9-107.6 7.3-150.7 38.9-32.7 98.9-27.8 136.5 10.5l35 35.7 35-35.7c37.8-38.5 97.8-43.2 136.5-10.6 51.1 43.1 43.5 113.9 7.3 150.8z"/>
                                                    </svg>
                                                ) : (
                                                    <svg className="w-[15px] h-[15px] mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                                                        fill="#EF4040">
                                                        <path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"/>
                                                    </svg>
                                                )}
                                        </div>

                                        <div className="border border-transparent bg-[#CDEAE1] rounded-md flex items-center space-y-1 ml-4 w-full md:w-3/4 gap-2 md:gap-8 pr-2 lg:pr-0">
                                            <div className="mx-auto">
                                                <img
                                                    src={heart.imgLogo}
                                                    alt="website logo"
                                                    className="w-[60px] h-[30px] md:w-[80px] md:h-[40px] object-cover cursor-pointer"
                                                />
                                            </div>
                                            <div className="mx-auto">
                                                <p className="text-xs md:text-lg text-[#222160] font-medium md:font-bold">
                                                    {heart.price !== null ?  heart.price : "-"} VND
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}


