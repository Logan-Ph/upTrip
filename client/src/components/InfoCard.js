import { useMutation } from "@tanstack/react-query";
import { Link, useSearchParams } from "react-router-dom";
import { deleteExperienceFromCollection, deleteHotelFromCollection } from "../api/fetch";
import successNotify from "../utils/successNotify";

export function QuickStayCard({ hotel }) {
    return (
        <>
            <Link>
                <div class="card card-side rounded-sm md:bg-base-100 md:shadow-xl items-start md:items-stretch">
                    <figure class="items-start">
                        <img
                            src={hotel.imageUrl}
                            alt="Hotel"
                            className="w-[150px] h-[150px] md:w-[250px] md:h-full object-cover"
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
                            <button class="btn btn-sm bg-transparent border-black border-[1.5px]">
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
                    <figure class="items-start">
                        <img
                            src={attraction.imageUrl}
                            alt="Experience Pic"
                            className="w-[150px] h-[150px] md:w-[250px] md:h-full object-cover"
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
                            <button class="btn btn-sm bg-transparent border-black border-[1.5px]">
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

export function ExperienceCard({item, refetchFavorite}) {
    const modalId = `delete_experience_item_card_modal_${item._id}`; 
    const [searchParams] = useSearchParams()

    const deleteExperience = useMutation({
        mutationFn: () => deleteExperienceFromCollection({collectionId: searchParams.get("collectionId"), experienceId: item._id}),
        onSuccess: () => {
            successNotify("Experience deleted from collection")
            document.getElementById(modalId).close(); 
            refetchFavorite()
        },
        onError: (e) => {
            console.log(e)
        }
    })

    const handleDelete = (e) => {
        e.preventDefault()
        deleteExperience.mutate()
    }

    return (
        <>
            <div>
                <div class="card flex-col md:flex-row card-side rounded-lg bg-white shadow-xl">
                    <figure class="rounded-t-lg rounded-b-none md:rounded-tr-none md:rounded-l-lg h-full items-start">
                        <img
                            src={item.imgSrc}
                            alt="Experience Pic"
                            className="w-full h-[150px] md:w-[380px] md:h-full object-cover"
                        />
                    </figure>
                    <div class="card-body flex-1 px-5 pt-3 pb-7 md:p-7">
                        <div className="flex justify-between">
                            <h2 class="card-title text-base md:text-xl">
                                {item.name}
                            </h2>
                            <div>
                                <div className="dropdown dropdown-end">
                                    <div>
                                        <button
                                            className="bg-transparent text-lg border-n"
                                            tabIndex={0}
                                        >
                                            <i class="fa-solid fa-ellipsis-vertical"></i>
                                        </button>
                                    </div>
                                    <ul
                                        tabIndex={0}
                                        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box"
                                    >
                                        <li>
                                            <div
                                                className="text-red-600"
                                                onClick={() =>
                                                    document
                                                        .getElementById(
                                                            modalId
                                                        )
                                                        .showModal()
                                                }
                                            >
                                                <i class="fa-solid fa-trash"></i>
                                                Delete
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <dialog
                                    id={modalId}
                                    className="modal modal-bottom sm:modal-middle"
                                >
                                    <div className="modal-box">
                                        <h3 className="font-bold text-lg text-center pt-4 pb-1">
                                            Are you sure you want to delete this
                                            item?
                                        </h3>
                                        <div className="modal-action">
                                            <form method="dialog">
                                                <button className="btn rounded-lg mx-2">
                                                    Cancel
                                                </button>
                                                <button 
                                                    onClick={handleDelete}
                                                    className="btn bg-black text-white rounded-lg"
                                                >
                                                    Delete
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </dialog>
                            </div>
                        </div>
                        <div class="flex space-x-1">
                            {Array.from(
                                { length: Math.round(item.rating) },
                                (_, i) => (
                                    <svg
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
                        <p class="text-gray-500 text-sm md:text-base" />
                        <div class="card-actions md:justify-between flex-col md:flex-row md:items-end mt-3 md:mt-0">
                            <button class="btn bg-transparent border-black border-[1.5px]">
                                <i class="fa-solid fa-parachute-box"></i>{" "}
                                Experience
                            </button>
                            <div className="hidden md:block text-xl font-semibold">
                                {item?.price ? (
                                    <>
                                        from{" "}
                                        {item?.price?.toLocaleString("vi-VN")}{" "}
                                        VND
                                    </>
                                ) : (
                                    <>Free</>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export function StayCard({item, refetchFavorite}) {
    const modalId = `delete_stay_item_card_modal_${item._id}`; 

    const [searchParams] = useSearchParams()

    const deleteStay = useMutation({
        mutationFn: () => deleteHotelFromCollection({collectionId: searchParams.get("collectionId"), hotelId: item._id}),
        onSuccess: () => {
            successNotify("Hotel deleted from collection")
            document.getElementById(modalId).close(); 
            refetchFavorite()
        },
        onError: (e) => {
            console.log(e)
        }
    })

    const handleDelete = (e) => {
        e.preventDefault()
        deleteStay.mutate()
    }

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
                    <div class="card-body flex px-5 pt-3 pb-7 md:p-7">
                        <h2 class="card-title text-base md:text-xl">
                            {item.hotelName}
                        </h2>
                            <div>
                                <div className="dropdown dropdown-end">
                                    <div>
                                        <button
                                            className="bg-transparent text-lg border-n"
                                            tabIndex={0}
                                        >
                                            <i class="fa-solid fa-ellipsis-vertical"></i>
                                        </button>
                                    </div>
                                    <ul
                                        tabIndex={0}
                                        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box"
                                    >
                                        <li>
                                            <div
                                                className="text-red-600"
                                                onClick={() =>
                                                    document
                                                        .getElementById(
                                                            modalId
                                                        )
                                                        .showModal()
                                                }
                                            >
                                                <i class="fa-solid fa-trash"></i>
                                                Delete
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <dialog
                                    id={modalId}
                                    className="modal modal-bottom sm:modal-middle"
                                >
                                    <div className="modal-box">
                                        <h3 className="font-bold text-lg text-center pt-4 pb-1">
                                            Are you sure you want to delete this
                                            item?
                                        </h3>
                                        <div className="modal-action">
                                            <form method="dialog">
                                                <button className="btn rounded-lg mx-2">
                                                    Cancel
                                                </button>
                                                <button 
                                                    onClick={handleDelete}
                                                    className="btn bg-black text-white rounded-lg"
                                                >
                                                    Delete
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </dialog>
                            </div>
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
                            src={item.imgSrc}
                            alt="Airline"
                            className="w-full h-[150px] md:w-[380px] md:h-full object-cover"
                        />
                    </figure>
                    <div class="card-body flex-1 px-5 pt-3 pb-7 md:p-7 justify-between">
                        <div className="flex justify-between flex-col md:flex-row">
                            <div className="flex flex-col">
                                <div className="font-semibold">
                                {item.departureTime.substring(11, 16)} - {item.arrivalTime.substring(11, 16)}
                                </div>
                                <div className="text-gray-500">
                                    {item.carrier}
                                </div>
                            </div>
                            <div className="text-gray-500 font-semibold">
                                {item.flightNo.length === 1 ? "non-stop" : item.flightNo.length + 1 + "stop(s)"}
                            </div>
                            <div className="flex flex-col">
                                <div className="font-semibold">{item.duration}</div>
                                <div className="text-gray-500">{item.from} - {item.to}</div>
                            </div>
                        </div>
                        <div class="card-actions md:justify-between flex-col md:flex-row md:items-end mt-3 md:mt-0">
                            <button class="btn bg-transparent border-black border-[1.5px]">
                                <i class="fa-solid fa-plane"></i> Flight
                            </button>
                            {/* <div className="hidden md:block text-xl font-semibold">
                                from 1.200.000
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
