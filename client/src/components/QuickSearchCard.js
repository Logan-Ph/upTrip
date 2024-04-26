import { Link } from "react-router-dom";

export function QuickStayCard({hotel}) {
    return (
        <>
            <Link>
                <div className="card card-side rounded-sm md:bg-base-100 md:shadow-xl">
                    <figure className="w-1/3 items-start">
                        <img
                            src={hotel.imageUrl}
                            alt="Hotel"
                            className="w-[150px] h-[150px] md:w-[450px] md:h-full object-cover"
                        />
                    </figure>
                    <div className="card-body flex-1 p-0 px-4 md:p-7">
                        <h2 className="card-title text-base md:text-xl">
                            {hotel.word}
                        </h2>
                        <div className="flex space-x-1">
                            <svg
                                className="w-4 h-4 text-[#ffa732]"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 22 20"
                            >
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                            </svg>
                            <svg
                                className="w-4 h-4 text-[#ffa732]"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 22 20"
                            >
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                            </svg>
                            <svg
                                className="w-4 h-4 text-[#ffa732]"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 22 20"
                            >
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                            </svg>
                        </div>
                        <p className="text-gray-500 text-sm md:text-base">
                            <i className="fa-solid fa-location-dot"></i> 
                            {" "}{hotel.districtName}
                        </p>
                        <div className="card-actions">
                            <button className="btn bg-transparent border-black border-[1.5px]">
                                <i className="fa-solid fa-hotel"></i> Stay
                            </button>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    );
}

export function QuickExperienceCard({attraction}) {
    return (
        <>
            <Link>
                <div className="card card-side rounded-sm md:bg-base-100 md:shadow-xl">
                    <figure className="w-1/3 items-start">
                        <img
                            src={attraction.imageUrl}
                            alt="Experience Pic"
                            className="w-[150px] h-[150px] md:w-[450px] md:h-full object-cover"
                        />
                    </figure>
                    <div className="card-body flex-1 p-0 px-4 md:p-7">
                        <h2 className="card-title text-base md:text-xl">
                            {attraction.word}
                        </h2>
                        <div className="flex space-x-1">
                            <svg
                                className="w-4 h-4 text-[#ffa732]"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 22 20"
                            >
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                            </svg>
                            <svg
                                className="w-4 h-4 text-[#ffa732]"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 22 20"
                            >
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                            </svg>
                            <svg
                                className="w-4 h-4 text-[#ffa732]"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 22 20"
                            >
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                            </svg>
                        </div>
                        <p className="text-gray-500 text-sm md:text-base">
                            <i className="fa-solid fa-location-dot"></i> Ho Chi Minh
                            City
                        </p>
                        <div className="card-actions">
                            <button className="btn bg-transparent border-black border-[1.5px]">
                                <i className="fa-solid fa-parachute-box"></i>{" "}
                                Experience
                            </button>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    );
}
