import { Link } from "react-router-dom";

export default function Itinerary() {
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
                            <div className="modal-box">
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
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md w-full p-2.5"
                                            required
                                        />
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

                    <div class="card card-side rounded-sm md:bg-base-100 md:shadow-xl">
                        <Link>
                            <figure class="">
                                <img
                                    src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/228033379.jpg?k=5559966043302855e467dfa2c28ad78034f95b8ffaec437ca19004ba936c7b49&o=&hp=1"
                                    alt="Itinerary Cover Pic"
                                    className="w-[150px] h-[150px] md:w-[380px] md:h-full object-cover"
                                />
                            </figure>
                        </Link>

                        <div class="card-body flex-1 p-0 px-4 md:p-7">
                            <Link>
                                <h2 class="card-title text-base md:text-2xl hover:underline underline-offset-4">
                                    Summer Trip
                                </h2>
                            </Link>
                            <div>
                                <p class="text-gray-500 text-sm md:text-lg mt-4 mb-2">
                                    <i class="fa-regular fa-calendar"></i>&ensp;
                                    Mar 6{" "}
                                    <i class="fa-solid fa-arrow-right"></i> Mar
                                    20, 2024
                                </p>
                                <p class="text-gray-500 text-sm md:text-lg">
                                    <i class="fa-solid fa-location-dot"></i>
                                    &ensp; Ho Chi Minh City
                                </p>
                            </div>
                            <div class="card-actions md:justify-between flex-col md:flex-row md:items-end flex-1">
                                <button
                                    className="btn bg-transparent border-[1.5px] text-red-400 hover:text-red-500"
                                    onClick={() =>
                                        document
                                            .getElementById("delete_modal")
                                            .showModal()
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
                                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                        />
                                    </svg>
                                </button>
                                <dialog
                                    id="delete_modal"
                                    className="modal modal-bottom sm:modal-middle"
                                >
                                    <div className="modal-box">
                                        <h3 className="font-bold text-lg text-center">
                                            Are you sure you want to delete
                                        </h3>
                                        <p className="py-4 text-center">
                                            "Summer Trip" itinerary
                                        </p>
                                        <div className="modal-action">
                                            <form method="dialog">
                                                {/* if there is a button in form, it will close the modal */}
                                                <button className="btn">
                                                    Close
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </dialog>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
