import { Link } from "react-router-dom";
import React, { useState } from "react";


export function ItineraryCard() {
    return (
        <>
            <div class="card card-side rounded-md md:bg-base-100 md:shadow-xl my-4">
                <Link>
                    <figure class="rounded-l-md">
                        <img
                            src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/228033379.jpg?k=5559966043302855e467dfa2c28ad78034f95b8ffaec437ca19004ba936c7b49&o=&hp=1"
                            alt="Itinerary Cover Pic"
                            className="w-[150px] h-[150px] md:w-[380px] md:h-full object-cover"
                        />
                    </figure>
                </Link>

                <div class="card-body flex-1 p-0 px-5 md:p-7">
                    <Link>
                        <h2 class="card-title text-base md:text-2xl hover:underline underline-offset-4">
                            Summer Trip
                        </h2>
                    </Link>
                    <div>
                        <p class="text-gray-500 text-sm md:text-lg mt-4 mb-2">
                            <i class="fa-regular fa-calendar"></i>&ensp; Mar 6{" "}
                            <i class="fa-solid fa-arrow-right"></i> Mar 20, 2024
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
                            <div className="modal-box w-11/12 max-w-5xl px-10">
                                <h3 className="font-bold text-2xl mt-4">
                                    Delete itinerary?
                                </h3>
                                <p className="pt-4 text-lg">
                                    Are you sure you want to delete
                                    Summer Trip?
                                </p>
                                <div className="modal-action mt-3">
                                    <form method="dialog">
                                        {/* if there is a button in form, it will close the modal */}
                                        <button className="btn rounded-3xl mx-2">Cancel</button>
                                        <button className="btn bg-black text-white rounded-3xl">Delete</button>
                                    </form>
                                </div>
                            </div>
                        </dialog>
                    </div>
                </div>
            </div>
        </>
    );
}

export function AddItemButton() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDrawer = () => {
        setIsOpen(!isOpen);
    };
    return (
        <>
            {/* Button */}
            <div className="flex justify-center my-4">
                <div
                    className="btn bg-[#9A9A9A] rounded-3xl text-white"
                    onClick={toggleDrawer}
                >
                    Add Items
                </div>
            </div>

            <div className="relative">
                {/* Drawer */}
                <div
                    className={`fixed top-0 right-0 h-full w-4/12 bg-white shadow-lg transition-all duration-300 ease-in-out z-50 p-8 ${
                        isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
                >
                    {/* Content inside the drawer */}
                    <div className="p-4">
                        <h1 className="text-2xl font-semibold mb-2">
                            Choose a collection
                        </h1>
                        <p className="text-gray-600">
                            Select your favorite collection to choose items
                            from.
                        </p>
                    </div>
                </div>

                {/* Overlay to close the drawer */}
                {isOpen && (
                    <div
                        onClick={toggleDrawer}
                        className="fixed top-0 left-0 h-full w-full bg-gray-800 opacity-50 transition-opacity duration-300 ease-in-out z-10"
                    ></div>
                )}
            </div>
        </>
    );
}

export function EmptySection() {
    return (
        <>
            <div className="shadow-lg rounded-lg border-gray-400 text-center p-8 pt-12">
                <p className="text-lg font-semibold">
                    Build your plan by adding items from your favorites or
                    customizing your trip day
                </p>
                <AddItemButton />
            </div>
        </>
    );
}

export function StayCard() {
    return (
        <>
            <div class="card card-side flex-col md:flex-row rounded-lg bg-base-100 shadow-xl my-4">
                <Link>
                    <figure className="rounded-t-lg md:rounded-tr-none md:rounded-l-lg h-full">
                        <img
                            src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/228033379.jpg?k=5559966043302855e467dfa2c28ad78034f95b8ffaec437ca19004ba936c7b49&o=&hp=1"
                            alt="Itinerary Cover Pic"
                            className="w-full h-[150px] md:w-[380px] md:h-full object-cover"
                        />
                    </figure>
                </Link>

                <div class="card-body flex-1 px-5 p-7">
                    <div className="flex justify-between items-center mb-2">
                        <div>
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Booking.com_logo.svg/1280px-Booking.com_logo.svg.png"
                                alt="Logo of platform"
                                className="w-[120px]"
                            />
                        </div>
                        <div>
                            <div className="dropdown dropdown-end">
                                <div>
                                    <button
                                        className="bg-transparent text-lg border-n"
                                        tabIndex={0}
                                        role="button"
                                    >
                                        <i class="fa-solid fa-ellipsis-vertical"></i>
                                    </button>
                                </div>
                                <ul
                                    tabIndex={0}
                                    className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box"
                                >
                                    <li>
                                        <a>
                                            <i class="fa-solid fa-gear"></i>{" "}
                                            Edit
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            className="text-red-600"
                                            onClick={() =>
                                                document
                                                    .getElementById(
                                                        "delete_itinerary_item_card_modal"
                                                    )
                                                    .showModal()
                                            }
                                        >
                                            <i class="fa-solid fa-trash"></i>
                                            Delete
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <dialog
                                id="delete_itinerary_item_card_modal"
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
                                            <button className="btn bg-black text-white rounded-lg">
                                                Delete
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </dialog>
                        </div>
                    </div>
                    <Link>
                        <h2 class="card-title text-base md:text-2xl hover:underline underline-offset-4 mb-4">
                            InterContinental Da Nang Sun Peninsula Resort
                        </h2>
                    </Link>
                    <div className="md:flex md:space-x-20 mb-4">
                        <div className="flex items-center space-x-4 mb-4 md:mb-0">
                            <div className="text-xl text-gray-600">
                                <i class="fa-regular fa-calendar"></i>
                            </div>
                            <div>
                                <p className="text-gray-600">Check-out</p>
                                <p className="font-semibold">24.03.20024</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="text-xl text-gray-600">
                                <i class="fa-regular fa-calendar"></i>
                            </div>
                            <div>
                                <p className="text-gray-600">Check-in</p>
                                <p className="font-semibold">18.03.20024</p>
                            </div>
                        </div>
                    </div>
                    <div className="md:flex justify-between md:items-end">
                        <div className="flex items-center space-x-4 mb-4 md:mb-0">
                            <div className="text-xl text-gray-600">
                                <i class="fa-regular fa-user"></i>
                            </div>
                            <div>
                                <p className="text-gray-600">
                                    Guest(s) and Room(s)
                                </p>
                                <p className="font-semibold">
                                    2 adult(s), 1 child, 1 room
                                </p>
                            </div>
                        </div>
                        <div className="font-bold text-2xl text-end">
                            1.200.000
                        </div>
                    </div>
                    <div class="card-actions md:justify-between flex-col md:flex-row md:items-end flex-1"></div>
                </div>
            </div>
        </>
    );
}

export function FlightCard() {
    return (
        <>
            <div class="card card-side rounded-lg py-4 md:py-0 bg-base-100 shadow-xl my-4">
                <div class="card-body flex-1 p-0 px-5 md:p-7">
                    <div className="flex justify-between items-center mb-2">
                        <div className="font-thin text-xl">
                            <p>Tue, Mar 18</p>
                        </div>
                        <div>
                            <div className="dropdown dropdown-end">
                                <div>
                                    <button
                                        className="bg-transparent text-lg border-n"
                                        tabIndex={0}
                                        role="button"
                                    >
                                        <i class="fa-solid fa-ellipsis-vertical"></i>
                                    </button>
                                </div>
                                <ul
                                    tabIndex={0}
                                    className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box"
                                >
                                    <li>
                                        <a>
                                            <i class="fa-solid fa-gear"></i>{" "}
                                            Edit
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            className="text-red-600"
                                            onClick={() =>
                                                document
                                                    .getElementById(
                                                        "delete_itinerary_item_card_modal"
                                                    )
                                                    .showModal()
                                            }
                                        >
                                            <i class="fa-solid fa-trash"></i>
                                            Delete
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <dialog
                                id="delete_itinerary_item_card_modal"
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
                                            <button className="btn bg-black text-white rounded-lg">
                                                Delete
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </dialog>
                        </div>
                    </div>
                    <Link>
                        <img
                            src="https://www.vietnamairlines.com/~/media/Images/VNANew/Home/Logo%20Header/logo_vna-mobile.png"
                            alt="Logo of platform"
                            className="w-[200px]"
                        />
                    </Link>
                    <div className="flex flex-col md:flex-row items-start mb-4 md:items-center justify-around md:px-10">
                        <p className="font-semibold text-lg flex justify-end">
                            12:00 pm
                        </p>
                        <p className="font-thin text-lg flex justify-end">
                            Ho Chi Minh City (SGN)
                        </p>
                        <div className="mx-4">
                            <i class="fa-solid fa-plane"></i>
                        </div>
                        <p className="font-thin text-lg">Ha Noi (HAN)</p>
                        <p className="font-semibold text-lg">14:00 pm</p>
                    </div>
                    <div className="flex justify-end">
                        <div className="font-bold text-2xl">1.200.000</div>
                    </div>
                    <div class="card-actions md:justify-between flex-col md:flex-row md:items-end flex-1"></div>
                </div>
            </div>
        </>
    );
}

export function ActivityCard() {
    return (
        <>
            <div class="flex-1 card card-side flex-col md:flex-row rounded-lg bg-base-100 shadow-md my-4">
                <Link>
                    <figure className="rounded-t-lg md:rounded-tr-none md:rounded-l-lg h-full">
                        <img
                            src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/228033379.jpg?k=5559966043302855e467dfa2c28ad78034f95b8ffaec437ca19004ba936c7b49&o=&hp=1"
                            alt="Itinerary Cover Pic"
                            className="w-full h-[150px] md:w-[380px] md:h-full object-cover"
                        />
                    </figure>
                </Link>

                <div class="card-body flex-1 px-5 p-7">
                    <div className="flex justify-between items-center mb-2">
                        <div>
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Booking.com_logo.svg/1280px-Booking.com_logo.svg.png"
                                alt="Logo of platform"
                                className="w-[120px]"
                            />
                        </div>
                        <div>
                            <div className="dropdown dropdown-end">
                                <div>
                                    <button
                                        className="bg-transparent text-lg border-n"
                                        tabIndex={0}
                                        role="button"
                                    >
                                        <i class="fa-solid fa-ellipsis-vertical"></i>
                                    </button>
                                </div>
                                <ul
                                    tabIndex={0}
                                    className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box"
                                >
                                    <li>
                                        <a>
                                            <i class="fa-solid fa-gear"></i>{" "}
                                            Edit
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            className="text-red-600"
                                            onClick={() =>
                                                document
                                                    .getElementById(
                                                        "delete_itinerary_item_card_modal"
                                                    )
                                                    .showModal()
                                            }
                                        >
                                            <i class="fa-solid fa-trash"></i>
                                            Delete
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <dialog
                                id="delete_itinerary_item_card_modal"
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
                                            <button className="btn bg-black text-white rounded-lg">
                                                Delete
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </dialog>
                        </div>
                    </div>
                    <Link>
                        <h2 class="card-title text-base md:text-2xl hover:underline underline-offset-4 mb-4">
                            InterContinental Da Nang Sun Peninsula Resort
                        </h2>
                    </Link>
                    <div className="mb-2">
                        <p className="text-gray-600">
                            The theme park is a popular day trip from the
                            coastal city of Da Nang, about a 45-minute drive.
                            Have fantastic cable car ride, Golden Bridge. The
                            theme park is a popular day trip from the coastal
                            city of Da Nang, about a 45-minute drive. Have
                            fantastic cable car ride, Golden Bridge
                        </p>
                    </div>

                    <div className="md:flex justify-between items-center">
                        <div className="flex flex-col md:flex-row md:space-x-20 mb-4">
                            <div className="flex items-center space-x-4">
                                <div className="text-xl text-gray-600">
                                    <i class="fa-regular fa-calendar"></i>
                                </div>
                                <div>
                                    <p className="text-gray-600">
                                        Estimated Time
                                    </p>
                                    <p className="font-semibold">
                                        8:30 - 10:30
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="font-bold text-2xl text-end">
                            1.200.000
                        </div>
                    </div>
                    <div class="card-actions md:justify-between flex-col md:flex-row md:items-end flex-1"></div>
                </div>
            </div>
        </>
    );
}

export function BudgetCard() {
    return (
        <>
            <div className="py-8 px-2 shadow-md border rounded-lg md:ml-4 drop-shadow-xl">
                <div className="px-3 md:px-8 font-semibold text-xl">
                    Estimated Total Spent
                </div>
                <div className="divider px-3 md:px-8"></div>
                <div className="flex justify-between px-3 md:px-8 my-2 text-xl space-x-16">
                    <div>Accomodation</div>
                    <div>12.000.000</div>
                </div>
                <div className="flex justify-between px-3 md:px-8 my-2 text-xl">
                    <div>Transport</div>
                    <div>12.000.000</div>
                </div>
                <div className="flex justify-between px-3 md:px-8 my-2 text-xl">
                    <div>Activities</div>
                    <div>12.000.000</div>
                </div>
                <div className="divider px-3 md:px-8"></div>
                <div className="flex justify-between px-3 md:px-8 my-2 text-xl font-semibold">
                    <div>Subtotal</div>
                    <div>30.000.000</div>
                </div>
            </div>
        </>
    );
}