import React, { useState } from "react";
import { ItineraryCard } from "../components/ItineraryCard";
import { Link, useNavigate } from "react-router-dom";
import ItineraryCardSkeleton from "../components/skeletonLoadings/ItinerarySkeleton";

export default function Itinerary() {
    const [activeTab, setActiveTab] = useState(1); // Default active tab is 1
    const navigate = useNavigate();
    const handleTabClick = (tabNumber) => {
        setActiveTab(tabNumber);
    };
    
    
    return (
        <>
            <div className="md:px-10 bg-[#FAFBFC]">
                <div className="mx-auto max-w-8xl px-6 py-10">
                    <p className="text-3xl font-semibold">My Itinerary</p>
                    <div className="my-6 text-center">
                        <button
                            className="btn w-full border p-4 rounded-md font-semibold border-black bg-white"
                            onClick={() =>
                                document
                                    .getElementById("create_itinerary_modal")
                                    .showModal()
                            }
                        >
                            <i class="fa-solid fa-plus mr-2"></i> Create new
                            itinerary
                        </button>
                        <dialog id="create_itinerary_modal" className="modal">
                            <div className="modal-box px-10">
                                <form method="dialog">
                                    {/* if there is a button in form, it will close the modal */}
                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                        ✕
                                    </button>
                                </form>
                                <h3 className="font-bold text-2xl my-5">
                                    Create new itinerary
                                </h3>
                                <div>
                                    <div className="mb-5 text-start">
                                        <label
                                            for="name"
                                            className="block mb-2 text-base font-medium text-gray-900"
                                        >
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md w-full p-3 focus:ring-black focus:border-black"
                                            placeholder="e.g., Summer vacation in Da Nang"
                                            required
                                        />
                                    </div>
                                    <div className="mb-5 text-start">
                                        <label
                                            for="destination"
                                            className="block mb-2 text-base font-medium text-gray-900"
                                        >
                                            Destination
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                                <svg
                                                    className="w-4 h-4 text-gray-500"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path
                                                        stroke="currentColor"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                                    />
                                                </svg>
                                            </div>
                                            <input
                                                type="search"
                                                id="destination"
                                                className="block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-black focus:border-black"
                                                placeholder="Where to?"
                                                required
                                            />
                                            <div className="relative drop-shadow-md">
                                                <ul className="absolute menu bg-white w-full rounded-lg mt-1">
                                                    <li>
                                                        <div>
                                                            <i
                                                                class="fa-solid fa-location-dot"
                                                                aria-hidden="true"
                                                            ></i>{" "}
                                                            Ho Chi Minh City
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div>
                                                            <i
                                                                class="fa-solid fa-location-dot"
                                                                aria-hidden="true"
                                                            ></i>{" "}
                                                            Ho Chi Minh City
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-5 text-start">
                                        <label
                                            for="description"
                                            className="block mb-2 text-base font-medium text-gray-900"
                                        >
                                            Description
                                        </label>
                                        <textarea
                                            type="text"
                                            id="description"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md w-full p-2.5 focus:ring-black focus:border-black"
                                            required
                                        />
                                    </div>
                                    <div className="mb-5 text-start">
                                        <label
                                            for="date"
                                            className="block mb-2 text-base font-medium text-gray-900"
                                        >
                                            Dates or Length of stay (optional)
                                        </label>

                                        {/*  */}

                                        <div className="max-w-md mx-auto">
                                            <div className="flex border-b border-gray-200 rounded-full bg-gray-300">
                                                <button
                                                    className={`px-4 py-2 text-base focus:outline-none w-1/2 ${
                                                        activeTab === 1
                                                            ? "text-gray-900 font-semibold bg-white m-[3px] rounded-full"
                                                            : "text-black font-thin"
                                                    }`}
                                                    onClick={() =>
                                                        handleTabClick(1)
                                                    }
                                                >
                                                    Dates
                                                </button>
                                                <button
                                                    className={`px-4 py-2 text-base focus:outline-none w-1/2 ${
                                                        activeTab === 2
                                                            ? "text-gray-900 font-semibold bg-white m-[3px] rounded-full"
                                                            : "text-black font-thin"
                                                    }`}
                                                    onClick={() =>
                                                        handleTabClick(2)
                                                    }
                                                >
                                                    Trip length
                                                </button>
                                            </div>
                                            <div className="mt-4">
                                                {activeTab === 1 && (
                                                    <div>
                                                        {/* Datepicker */}
                                                    </div>
                                                )}
                                                {activeTab === 2 && (
                                                    <div className="flex justify-between my-6 mb-10">
                                                        <p className="text-base">
                                                            Number of days
                                                        </p>
                                                        <div className="flex space-x-3 items-center">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                stroke-width="1.5"
                                                                stroke="currentColor"
                                                                className="w-6 h-6"
                                                            >
                                                                <path
                                                                    stroke-linecap="round"
                                                                    stroke-linejoin="round"
                                                                    d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                                                ></path>
                                                            </svg>
                                                            <span className="text-lg">
                                                                1
                                                            </span>

                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                stroke-width="1.5"
                                                                stroke="currentColor"
                                                                className="w-6 h-6"
                                                            >
                                                                <path
                                                                    stroke-linecap="round"
                                                                    stroke-linejoin="round"
                                                                    d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                                                ></path>
                                                            </svg>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/*  */}
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <button className="flex btn btn-outline w-full justify-center">
                                        Create
                                    </button>
                                </div>
                            </div>
                        </dialog>
                    </div>

                    {/* Itinerary Card */}
                    <ItineraryCard />
                    <ItineraryCard />
                    <ItineraryCardSkeleton />
                </div>
            </div>
        </>
    );
}
