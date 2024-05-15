import { Link } from "react-router-dom";

export function QuickStayCard({ hotel }) {
    return (
        <>
            <Link>
                <div class="card card-side rounded-sm md:bg-base-100 md:shadow-xl">
                    <figure class="w-1/3 items-start">
                        <img
                            src={hotel.imageUrl}
                            alt="Hotel"
                            className="w-[150px] h-[150px] md:w-[450px] md:h-full object-cover"
                        />
                    </figure>
                    <div class="card-body flex-1 p-0 px-4 md:p-7">
                        <h2 class="card-title text-base md:text-xl">
                            {hotel.word}
                        </h2>
                        <div class="flex space-x-1">
                            {Array.from(
                                { length: Math.ceil(hotel.commentScore) },
                                (_, i) => (
                                    <svg
                                        key={i}
                                        class="w-4 h-4 text-[#ffa732]"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 22 20"
                                    >
                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                    </svg>
                                )
                            )}
                        </div>
                        <p class="text-gray-500 text-sm md:text-base">
                            <i class="fa-solid fa-location-dot"></i>{" "}
                            {hotel.districtName}
                        </p>
                        <div class="card-actions md:justify-between flex-col md:flex-row md:items-end">
                            <button class="btn bg-transparent border-black border-[1.5px]">
                                <i class="fa-solid fa-hotel"></i> Stay
                            </button>
                            {hotel.priceInfo?.price && (
                                <div className="hidden md:block text-xl font-semibold">
                                    from{" "}
                                    {Number(
                                        hotel?.priceInfo?.price
                                    ).toLocaleString("vi-VN")}{" "}
                                    VND
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Link>
        </>
    );
}

export function QuickExperienceCard({ attraction }) {
    return (
        <>
            <div>
                <div class="card card-side rounded-sm md:bg-base-100 md:shadow-xl">
                    <figure class="w-1/3 items-start">
                        <img
                            src={attraction.imageUrl}
                            alt="Experience Pic"
                            className="w-[150px] h-[150px] md:w-[450px] md:h-full object-cover"
                        />
                    </figure>
                    <div class="card-body flex-1 p-0 px-4 md:p-7">
                        <h2 class="card-title text-base md:text-xl">
                            {attraction.word}
                        </h2>
                        <div class="flex space-x-1">
                            <svg
                                class="w-4 h-4 text-[#ffa732]"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 22 20"
                            >
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                            </svg>
                            <svg
                                class="w-4 h-4 text-[#ffa732]"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 22 20"
                            >
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                            </svg>
                        </div>
                        <p class="text-gray-500 text-sm md:text-base">
                            <i class="fa-solid fa-location-dot"></i> Ho Chi Minh
                            City
                        </p>
                        <div class="card-actions md:justify-between flex-col md:flex-row md:items-end">
                            <button class="btn bg-transparent border-black border-[1.5px]">
                                <i class="fa-solid fa-parachute-box"></i>{" "}
                                Experience
                            </button>
                            {attraction?.priceInfo?.price && (
                                <div className="hidden md:block text-xl font-semibold">
                                    from{" "}
                                    {Number(
                                        attraction?.priceInfo?.price
                                    ).toLocaleString("vi-VN")}{" "}
                                    VND
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export function ExperienceCard({item}) {
    return (
        <>
            <div>
                <div class="card flex-col md:flex-row card-side rounded-lg bg-white shadow-xl">
                    <figure class="rounded-t-lg rounded-b-none md:rounded-tr-none md:rounded-l-lg h-full">
                        <img
                            src={item.imgSrc}
                            alt="Experience Pic"
                            className="w-full h-[150px] md:w-[380px] md:h-full object-cover"
                        />
                    </figure>
                    <div class="card-body flex-1 px-5 pt-3 pb-7 md:p-7">
                        <h2 class="card-title text-base md:text-xl">
                            {item.name}
                        </h2>
                        <div class="flex space-x-1">
                            {Array.from({ length: Math.round(item.rating) }, (_, i) => (
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
                        </div>
                        <p class="text-gray-500 text-sm md:text-base"/>
                        <div class="card-actions md:justify-between flex-col md:flex-row md:items-end mt-3 md:mt-0">
                            <button class="btn bg-transparent border-black border-[1.5px]">
                                <i class="fa-solid fa-parachute-box"></i>{" "}
                                Experience
                            </button>
                            <div className="hidden md:block text-xl font-semibold">
                                {item?.price ? (
                                    <>
                                        from {item?.price?.toLocaleString("vi-VN")} VND
                                    </>
                                ) : (
                                    <>
                                        Free
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export function StayCard({item}) {
    return (
        <>
            <div>
                <div class="card flex-col md:flex-row card-side rounded-lg bg-white shadow-xl">
                    <figure class="rounded-t-lg rounded-b-none md:rounded-tr-none md:rounded-l-lg h-full">
                        <img
                            src={item.imgSrc}
                            alt="Hotel"
                            className="w-full h-[150px] md:w-[380px] md:h-full object-cover"
                        />
                    </figure>
                    <div class="card-body flex-1 px-5 pt-3 pb-7 md:p-7">
                        <h2 class="card-title text-base md:text-xl">
                            {item.hotelName}
                        </h2>
                        <div class="flex space-x-1">
                            {Array.from({ length: Math.round(item.rating) }, (_, i) => (
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
                        </div>
                        <p class="text-gray-500 text-sm md:text-base">
                            <i class="fa-solid fa-location-dot"></i> {item.address}
                        </p>
                        <div class="card-actions md:justify-between flex-col md:flex-row md:items-end mt-3 md:mt-0">
                            <button class="btn bg-transparent border-black border-[1.5px]">
                                <i class="fa-solid fa-hotel"></i> Stay
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export function FlightCard({item}) {
    return (
        <>
            <div>
                <div class="card flex-col md:flex-row card-side rounded-lg bg-white shadow-xl">
                    <figure class="rounded-t-lg rounded-b-none md:rounded-tr-none md:rounded-l-lg h-full">
                        <img
                            src="https://static.wixstatic.com/media/9d8ed5_70663b41e71e4453a550be85fbd85b1d~mv2.png/v1/fill/w_980,h_613,al_c,q_90,usm_0.66_1.00_0.01,enc_auto/9d8ed5_70663b41e71e4453a550be85fbd85b1d~mv2.png"
                            alt="Airline"
                            className="w-full h-[150px] md:w-[380px] md:h-full object-cover"
                        />
                    </figure>
                    <div class="card-body flex-1 px-5 pt-3 pb-7 md:p-7 justify-between">
                        <div className="flex justify-between flex-col md:flex-row">
                            <div className="flex flex-col">
                                <div className="font-semibold">
                                    6:00 am - 7:30 pm
                                </div>
                                <div className="text-gray-500">
                                    Vietnam Airlines
                                </div>
                            </div>
                            <div className="text-gray-500 font-semibold">
                                non stop
                            </div>
                            <div className="flex flex-col">
                                <div className="font-semibold">1h30m</div>
                                <div className="text-gray-500">SGN - DAD</div>
                            </div>
                        </div>
                        <div class="card-actions md:justify-between flex-col md:flex-row md:items-end mt-3 md:mt-0">
                            <button class="btn bg-transparent border-black border-[1.5px]">
                                <i class="fa-solid fa-plane"></i> Flight
                            </button>
                            <div className="hidden md:block text-xl font-semibold">
                                from 1.200.000
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
