import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export function CollectionCard({collection}) {
    const navigate = useNavigate();
    return (
        <>
            <div className="card card-compact w-94 md:w-auto bg-white shadow-xl rounded-md">
                <figure>
                    <img
                        src="https://tourism.danang.vn/wp-content/uploads/2023/02/cau-rong-da-nang.jpeg"
                        alt="Cover"
                        className="w-full h-72"
                    />
                </figure>
                <div className="card-body my-2">
                    <div className="flex flex-row justify-between">
                        <h2 
                            className="card-title text-3xl ml-2 pr-3"
                            onClick={() => {
                                navigate(`/favorite-items/?collectionId=${collection._id}`)
                            }}
                        >
                            {collection.name}
                        </h2>
                        <div className="card-actions justify-end">
                            <button
                                className="btn"
                                onClick={() =>
                                    {   document
                                            .getElementById("my_modal_1")
                                            .showModal()
                                    }
                                }
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="w-6 h-6"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                                    />
                                </svg>
                            </button>
                            <dialog id="my_modal_1" className="modal">
                                <div className="modal-box">
                                    <h3 className="font-bold text-lg my-4">
                                        Edit collection
                                    </h3>
                                    <div>
                                        <div className="mb-5 text-start">
                                            <label
                                                for="name"
                                                className="block mb-2 text-sm font-medium text-gray-900"
                                            >
                                                Name
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl w-full p-2.5"
                                                required
                                            />
                                        </div>
                                        <div className="mb-5 text-start">
                                            <label
                                                for="description"
                                                className="block mb-2 text-sm font-medium text-gray-900"
                                            >
                                                Description
                                            </label>
                                            <textarea
                                                type="text"
                                                id="description"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="modal-action">
                                        <div method="dialog flex flex-row">
                                            {/* if there is a button in form, it will close the modal */}
                                            <div className="flex flex-row space-x-2">
                                                <button 
                                                    className="btn"
                                                    onClick={() => document.getElementById("my_modal_1").close()}
                                                >
                                                    Close
                                                </button>
                                                <button 
                                                    className="flex btn btn-outline btn-success justify-end"
                                                    onClick={() => document.getElementById("my_modal_1").close()}
                                                >
                                                    Save
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </dialog>
                        </div>
                    </div>

                    <p className="ml-2 text-gray-500 text-lg overflow-hidden line-clamp-3">
                        {collection.description}
                    </p>
                    <p className="ml-2 text-gray-500 text-lg">{collection.hotels.length + collection.experience.length + collection.flights.length} items</p>
                </div>
            </div>
        </>
    );
}

export function SavedCollectionCard({collection}) {
    const [isSelected, setIsSelected] = useState(false);
    const cardRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (cardRef.current && !cardRef.current.contains(event.target)) {
                setIsSelected(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [cardRef]);

    const handleCardClick = () => {
        setIsSelected((prev) => !prev);
    };

    return (
        <>
            <div
                ref={cardRef}
                className={`card card-side bg-white p-3 border-[2px] ${
                    isSelected
                        ? "border-black"
                        : "border-gray-300 hover:border-black duration-300"
                } rounded-md items-start my-4`}
                onClick={handleCardClick}
            >
                <figure className="w-1/3">
                    <img
                        src="https://tourism.danang.vn/wp-content/uploads/2023/02/cau-rong-da-nang.jpeg"
                        className="w-full h-20 rounded-md"
                        alt="Collection Cover"
                    />
                </figure>
                <div className="flex flex-col items-start px-2 md:px-4 w-full">
                    <h2 className="text-lg md:text-xl font-semibold text-start">
                        {collection.name}
                    </h2>
                    <p className="text-gray-500 overflow-hidden line-clamp-3 text-sm md:text-base text-start">
                        {collection.description}
                    </p>
                    <p className="text-gray-500 text-sm md:text-base text-start">
                        {collection.hotels.length + collection.experience.length + collection.flights.length} items
                    </p>
                </div>
            </div>
        </>
    );
}
