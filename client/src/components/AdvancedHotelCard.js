import { useState, useRef, useEffect } from "react";

export default function AdvancedHotelCard({ hotel }) {
    return (
        <>
            <div className="mt-0">
                <HotelCard
                    key={hotel.hotelBasicInfo.hotelId}
                    imgSrc={hotel.hotelBasicInfo.hotelImg}
                    hotelName={hotel.hotelBasicInfo.hotelName}
                    district={hotel.positionInfo.positionDesc}
                    city={hotel.positionInfo.cityName}
                    price={hotel.hotelBasicInfo.price.toLocaleString("vi-VN")}
                    starRating={hotel.hotelStarInfo.star}
                />
            </div>
        </>
    );
}

export function HotelCard({ imgSrc, hotelName, district, city, price, starRating }) {
    const websiteLogo = [
        {
            imgLogo:
                "https://ik.imagekit.io/Uptrip/traveloka?updatedAt=1712828670481",
        },
        {
            imgLogo:
                "https://ik.imagekit.io/Uptrip/booking.com?updatedAt=1712829810252",
        },
        {
            imgLogo:
                "https://ik.imagekit.io/Uptrip/trip.com?updatedAt=1712830814655",
        },
    ];

    const [hearts, setHearts] = useState(
        websiteLogo.map((logo) => ({ isFilled: false, imgLogo: logo.imgLogo }))
    );

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
                className={`bg-white rounded-md grid grid-cols-3 gap-4 md:gap-8 mb-4 shadow-md ${visibilityClass}`}
            >
                <div className="">
                    <img
                        src={imgSrc}
                        alt="hotel cover"
                        className="w-[450px] h-[252px] object-cover"
                    />
                </div>

                <div className="flex-col space-y-2 py-4 col-span-2">
                    <p className="text-lg md:text-xl font-extrabold">
                        {hotelName}
                    </p>

                    {/* Star rating */}
                    <div class="flex items-center">
                        {Array.from({ length: starRating }, (e, i) => (
                            <svg
                                class="w-4 h-4 text-[#ffa732]"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 22 20"
                            >
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                            </svg>
                        ))}
                        {/* No rating */}
                        {/* <svg class="w-4 h-4 ms-1 text-gray-100 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                    </svg> */}
                    </div>

                    {/* district, city */}
                    <div className="flex items-center">
                        <div className="pr-1">
                            <svg
                                className="w-[10px] h-[10px]"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 384 512"
                            >
                                <path
                                    fill="#9A9A9A"
                                    d="M172.3 501.7C27 291 0 269.4 0 192 0 86 86 0 192 0s192 86 192 192c0 77.4-27 99-172.3 309.7-9.5 13.8-29.9 13.8-39.5 0zM192 272c44.2 0 80-35.8 80-80s-35.8-80-80-80-80 35.8-80 80 35.8 80 80 80z"
                                />
                            </svg>
                        </div>
                        <div className="font-light text-sm text-[#9A9A9A]">
                            {district}, {city} city
                        </div>
                    </div>

                    {/* price tracking among three websites */}
                    <div>
                        {hearts.map((heart, index) => (
                            <div
                                key={index}
                                className="flex items-center my-2 pr-4 md:pr-0"
                            >
                                <div className="border border-[#8DD3BB] w-[30px] h-[30px] flex items-center justify-between rounded-md cursor-pointer py-2">
                                    <svg
                                        className="w-[15px] h-[15px] mx-auto"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 512 512"
                                        onClick={() => toggleHeart(index)}
                                        fill={
                                            heart.isFilled
                                                ? <svg
                                                className="w-[15px] h-[15px]"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 512 512"
                                                fill="#EF4040"
                                            >
                                                <path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"/>
                                            </svg>
                                                : "#000000"
                                        }
                                    >
                                        <path d="M458.4 64.3C400.6 15.7 311.3 23 256 79.3 200.7 23 111.4 15.6 53.6 64.3-21.6 127.6-10.6 230.8 43 285.5l175.4 178.7c10 10.2 23.4 15.9 37.6 15.9 14.3 0 27.6-5.6 37.6-15.8L469 285.6c53.5-54.7 64.7-157.9-10.6-221.3zm-23.6 187.5L259.4 430.5c-2.4 2.4-4.4 2.4-6.8 0L77.2 251.8c-36.5-37.2-43.9-107.6 7.3-150.7 38.9-32.7 98.9-27.8 136.5 10.5l35 35.7 35-35.7c37.8-38.5 97.8-43.2 136.5-10.6 51.1 43.1 43.5 113.9 7.3 150.8z" />
                                    </svg>
                                </div>

                                {/* Placeholder for the rest of the div content */}
                                <div className="border border-transparent bg-[#CDEAE1] rounded-md flex items-center space-y-1 ml-4 w-full md:w-3/4 gap-2 md:gap-8 pr-2 lg:pr-0">
                                    <div className="mx-auto">
                                        <img
                                            src={heart.imgLogo}
                                            alt="website logo"
                                            className="w-[80px] md:w-[120px] h-[34px] object-cover"
                                        />
                                    </div>
                                    <div className="mx-auto">
                                        <p className="text-xs md:text-lg text-[#222160] font-medium md:font-bold">
                                            {price} VND
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
