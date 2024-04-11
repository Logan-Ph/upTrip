import NavBar from "../components/Navbar";
import { useState, useEffect, useRef } from "react";
import Datepicker from "flowbite-datepicker/Datepicker";
import useHandleNavigate from "../utils/useHandleNavigate";

export default function Header() {
    const [tab, setTab] = useState("All");
	

    return (
        <>
            <div class="bg-loginbackground bg-cover bg-center">
                <section className="mx-auto max-w-8xl px-6 py-6">
                    <NavBar />
                    <div class="w-full container mx-auto mt-20 md:mt32 mb-20">
                        <p class="text-white text-lg mb-3 font-thin">
                            LEVEL UP YOUR TRIP
                        </p>
                        <p class="text-white text-5xl font-semibold">
                            Life is a journey <br></br>Not a destinations.
                        </p>
                    </div>

                    <div class="pb-10">
                        <HandleSelection tab={tab} setTab={setTab} />
                    </div>
                </section>
                
            </div>
        </>
    );
}

function HandleSelection({tab, setTab}) {
    switch (tab) {
        case "Stay":
            return <QuickSearchStay setTab={setTab} />;
        case "Flight":
            return <QuickSearchFlight setTab={setTab} />;
        case "Experience":
            return <QuickSearchExperience setTab={setTab} />;
        default:
            return <QuickSearchAll setTab={setTab}/>;
    }
}

function QuickSearchFlight({setTab}) {
    return (
        <>
            <div
                id="flight-section"
                class="flex flex-col w-10/12 p-4 mx-auto my-8 bg-white rounded-xl bg-opacity-40"
            >
                <div class="">
                    <select
                        id="form-selector-2"
                        class="h-[52px] px-2 select select-bordered w-full md:w-[90px] pr-2 pl-3"
						onChange={(e) => setTab(e.target.value)}
                    >
                        <option value="All">All</option>
                        <option value="Stay">Stay</option>
                        <option value="Flight" selected="selected">
                            Flight
                        </option>
                        <option value="Experience">Experience</option>
                    </select>
                </div>
                <div class="w-full mx-auto my-4 bg-white p-4 rounded-lg space-y-2">
                    <div class="flex justify-evenly w-full mb-4">
                        <div>
                            <input
                                type="radio"
                                id="one-way"
                                name="radio-1"
                                class="radio"
                                checked
                            />
                            <label for="one-way">&ensp; One way</label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                id="round-trip"
                                name="radio-1"
                                class="radio"
                            />
                            <label for="round-trip">&ensp; Round trip</label>
                        </div>
                    </div>
                    <div class="flex flex-col md:flex-row space-y-2 md:space-x-4 md:space-y-0 items-center">
                        <div class="relative w-full md:w-1/2">
                            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <i class="fa-solid fa-plane-departure text-gray-500"></i>
                            </div>
                            <div>
                                <input
                                    name="origin"
                                    type="text"
                                    class="block rounded-t-lg  text-gray-900 bg-gray-100 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 w-full ps-10 p-2.5 pt-5 "
                                    placeholder="City or airport"
                                />
                                <label
                                    for="floating_filled"
                                    class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-5 z-10 origin-[0] start-10 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                                >
                                    Origin
                                </label>
                            </div>
                        </div>
                        <div class="relative w-full md:w-1/2">
                            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <i class="fa-solid fa-plane-arrival text-gray-500"></i>
                            </div>
                            <div>
                                <input
                                    name="destination"
                                    type="text"
                                    class="block rounded-t-lg  text-gray-900 bg-gray-100 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 w-full ps-10 p-2.5 pt-5"
                                    placeholder="City or airport"
                                />
                                <label
                                    for="floating_filled"
                                    class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-5 z-10 origin-[0] start-10 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                                >
                                    Destination
                                </label>
                            </div>
                        </div>
                    </div>

                    <div class="flex flex-col md:flex-row space-y-2 md:space-x-4 md:space-y-0 items-center justify-between	">
                        <div class="relative w-full md:w-1/3">
                            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg
                                    class="w-4 h-4 text-gray-500"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                </svg>
                            </div>
                            <div>
                                <input
                                    datepicker
                                    datepicker-autohide
                                    name="start"
                                    type="text"
                                    class="block rounded-t-lg  text-gray-900 bg-gray-100 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 w-full ps-10 p-2.5 pt-5"
                                    placeholder="dd/mm/yyyy"
                                    onSelect={(e) =>
                                        console.log(e.target.value)
                                    }
                                    // onClick={(e) => dobHandler(e)}
                                    // onClick={(e) => console.log(e.target.value)}
                                    // onChange={(e) => console.log(e)}
                                    id="datepickerId3"
                                />
                                <label
                                    for="floating_filled"
                                    class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-5 z-10 origin-[0] start-10 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                                >
                                    Departing
                                </label>
                            </div>
                        </div>

                        {/* This field appears only when user choose round trip , hidden when one way */}
                        <div class="relative w-full md:w-1/3">
                            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg
                                    class="w-4 h-4 text-gray-500"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                </svg>
                            </div>
                            <div>
                                <input
                                    datepicker
                                    datepicker-autohide
                                    name="end"
                                    type="text"
                                    class="block rounded-t-lg  text-gray-900 bg-gray-100 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 w-full ps-10 p-2.5 pt-5"
                                    placeholder="dd/mm/yyyy"
                                    onSelect={(e) =>
                                        console.log(e.target.value)
                                    }
                                    // onClick={(e) => dobHandler(e)}
                                    // onClick={(e) => console.log(e.target.value)}
                                    // onChange={(e) => console.log(e)}
                                    id="datepickerId4"
                                />
                                <label
                                    for="floating_filled"
                                    class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-5 z-10 origin-[0] start-10 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                                >
                                    Returning
                                </label>
                            </div>
                        </div>

                        {/* Ask for number of passenger */}
                        <button
                            id="dropdownDefaultButton"
                            data-dropdown-toggle="dropdown"
                            class="rounded-t-lg   bg-gray-100 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 text-gray-500 text-sm px-5 py-2.5 text-center inline-flex items-center h-[52px] relative p-2.5 pt-5 ps-10 w-full md:w-1/3 justify-between "
                            type="button"
                        >
                            <label
                                for="floating_filled"
                                class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-5 z-10 origin-[0] start-10 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto font-medium"
                            >
                                No. of Passengers
                            </label>
                            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <i class="fa-regular fa-user w-4 h-4 text-gray-500"></i>
                            </div>
                            1 Adult, 1 Child, 0 Infant{" "}
                            <svg
                                class="w-2.5 h-2.5 ms-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 10 6"
                            >
                                <path
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="m1 1 4 4 4-4"
                                />
                            </svg>
                        </button>

                        {/* <!-- Dropdown menu --> */}
                        <div
                            id="dropdown"
                            class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44"
                        >
                            <div
                                class="py-2 text-sm text-gray-700 my-3 mx-5"
                                aria-labelledby="dropdownDefaultButton"
                            >
                                <div class="flex justify-between">
                                    <div>Adult</div>
                                    <div>
                                        <div>
                                            <i class="fa-solid fa-plus p-1 border rounded-full  aspect-square text-[9px]	"></i>{" "}
                                            <span class="text-base">
                                                &nbsp; 1 &nbsp;{" "}
                                            </span>
                                            <i class="fa-solid fa-minus p-1 border rounded-full  aspect-square text-[9px]	"></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="flex justify-between">
                                    <div>Child</div>
                                    <div>
                                        <div>
                                            <i class="fa-solid fa-plus p-1 border rounded-full  aspect-square text-[9px]	"></i>{" "}
                                            <span class="text-base">
                                                &nbsp; 1 &nbsp;{" "}
                                            </span>
                                            <i class="fa-solid fa-minus p-1 border rounded-full  aspect-square text-[9px]	"></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="flex justify-between">
                                    <div>Infant</div>
                                    <div>
                                        <div>
                                            <i class="fa-solid fa-plus p-1 border rounded-full  aspect-square text-[9px]	"></i>{" "}
                                            <span class="text-base">
                                                &nbsp; 1 &nbsp;{" "}
                                            </span>
                                            <i class="fa-solid fa-minus p-1 border rounded-full  aspect-square text-[9px]	"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="md:ml-1.5">
                    <button class="btn rounded-lg bg-[#FFA732] text-white border-none h-[52px] w-full">
                        Search
                    </button>
                </div>
            </div>
        </>
    );
}

function QuickSearchExperience({setTab}) {
    return (
        <>
            <div
                id="experience-section"
                class="grid grid-cols-2 w-10/12 p-4 mx-auto my-8 bg-white rounded-xl bg-opacity-40"
            >
                <div class="col-span-full flex flex-col md:flex-row space-y-2 md:space-y-0">
                    <div class="join w-full">
                        <select
                            id="form-selector-1"
                            class="px-2 select select-bordered join-item w-[125px] pr-2 pl-3 h-[52px]"
                            onchange="toggleSections(this)"
							onChange={(e) => setTab(e.target.value)}
                        >
                            <option value="All">All</option>
                            <option value="Stay">Stay</option>
                            <option value="Flight">Flight</option>
                            <option value="Experience" selected="selected">
                                Experience
                            </option>
                        </select>
                        <div class="w-full">
                            <div>
                                <input
                                    class="w-full input input-bordered join-item h-[52px] bg-white"
                                    placeholder="Search for activities in the location"
                                />
                            </div>
                        </div>
                    </div>
                    <div class="md:ml-1.5">
                        <button class="btn rounded-lg bg-[#FFA732] text-white border-none h-[52px] w-full">
                            Search
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

function QuickSearchStay({setTab}) {
	const checkinDate = useRef(null);
    const checkoutDate = useRef(null);

	useEffect(() => {
        let checkinPicker;
        let checkoutPicker;

        if (checkinDate.current && checkoutDate.current) {
            // Initialize the check-in datepicker
            checkinPicker = new Datepicker(checkinDate.current, {
                autohide: true,
                // When a date is selected, update the checkout datepicker's minDate
                onSelect: (dateText, instance) => {
                    const selectedDate = instance.getDate();
                    if (checkoutPicker) {
                        checkoutPicker.setOptions({ minDate: selectedDate });
                        checkoutPicker.setDate(selectedDate, true); // Optionally set checkout date to match check-in
                    }
                },
            });

            // Initialize the checkout datepicker with a minDate of today by default
            checkoutPicker = new Datepicker(checkoutDate.current, {
                autohide: true,
                minDate: new Date(), // Set initial minDate to today or check-in date if you prefer
            });
        }

        // Cleanup function to destroy datepickers when component unmounts or rerenders
        return () => {
            if (checkinPicker) checkinPicker.destroy();
            if (checkoutPicker) checkoutPicker.destroy();
        };
    }, []);

	return (
        <>
            <div
                id="stay-section"
                class="grid grid-cols-2 w-10/12 p-4 mx-auto my-8 bg-white rounded-xl bg-opacity-40"
            >
                <div class="col-span-full flex flex-col md:flex-row w-full space-y-2 md:space-y-0">
                    <div class="join join-vertical md:join-horizontal space-y-2 md:space-y-0 w-full">
                        <div class="join-item flex-1">
                            <div class="join join-horizontal w-full md:rounded-r-none">
                                <select
                                    id="form-selector-2"
                                    class="h-[52px] px-2 select select-bordered join-item w-[82px] pr-2 pl-3"
									onChange={(e) => setTab(e.target.value)}
                                >
                                    <option value="All">All</option>
                                    <option value="Stay" selected="selected">
                                        Stay
                                    </option>
                                    <option value="Flight">Flight</option>
                                    <option value="Experience">
                                        Experience
                                    </option>
                                </select>
                                <div class="w-full flex-1">
                                    <div>
                                        <input
                                            class="h-[52px] w-full input input-bordered join-item bg-white"
                                            placeholder="Where are you going?"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="join-item">
                            <div class="flex items-center">
                                <div class="relative w-1/2">
                                    <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                        <svg
                                            class="w-4 h-4 text-gray-500"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <input
											ref={checkinDate}
                                            datepicker
                                            datepicker-autohide
                                            name="start"
                                            type="text"
                                            class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 pt-5 rounded-r-none md:rounded-none border-l-"
                                            placeholder="dd/mm/yyyy"
                                            onSelect={(e) =>
                                                console.log(e.target.value)
                                            }
                                        />
                                        <label
                                            for="floating_filled"
                                            class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-5 z-10 origin-[0] start-10 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                                        >
                                            Check-in
                                        </label>
                                    </div>
                                </div>
                                <div class="relative w-1/2">
                                    <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                        <svg
                                            class="w-4 h-4 text-gray-500"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <input
											ref={checkoutDate}
                                            datepicker
                                            datepicker-autohide
                                            name="end"
                                            type="text"
                                            class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 pt-5 rounded-l-none border-l-0 md:rounded-none"
                                            placeholder="dd/mm/yyyy"
                                            onSelect={(e) =>
                                                console.log(e.target.value)
                                            }
                                        />
                                        <label
                                            for="floating_filled"
                                            class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-5 z-10 origin-[0] start-10 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                                        >
                                            Check-out
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="join-item">
                            <button
                                id="dropdownDividerButton"
                                data-dropdown-toggle="dropdownDivider"
                                class="text-gray-500 bg-white  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg md:rounded-l-none border border-gray-300 text-sm px-5 py-2.5 text-center inline-flex items-center h-[52px] relative p-2.5 pt-5 ps-10 w-full justify-between"
                                type="button"
                            >
                                <label
                                    for="floating_filled"
                                    class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-5 z-10 origin-[0] start-10 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto font-medium"
                                >
                                    Guest(s) and Room(s)
                                </label>
                                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <i class="fa-regular fa-user w-4 h-4 text-gray-500"></i>
                                </div>
                                1 adult, 1 child, 1 room{" "}
                                <svg
                                    class="w-2.5 h-2.5 ms-3"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 10 6"
                                >
                                    <path
                                        stroke="currentColor"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="m1 1 4 4 4-4"
                                    />
                                </svg>
                            </button>

                            {/* <!-- Dropdown menu --> */}
                            <div
                                id="dropdownDivider"
                                class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-[200px]"
                            >
                                {/* Ask user to input room information */}
                                <div class="my-3 mx-5">
                                    <div class="flex justify-between">
                                        <div>Room</div>
                                        <div>
                                            <div>
                                                <i class="fa-solid fa-plus p-1 border rounded-full  aspect-square text-[9px]	"></i>{" "}
                                                <span class="text-base">
                                                    &nbsp; 1 &nbsp;{" "}
                                                </span>
                                                <i class="fa-solid fa-minus p-1 border rounded-full  aspect-square text-[9px]	"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="flex justify-between">
                                        <div>Adult(s)</div>
                                        <div>
                                            <div>
                                                <i class="fa-solid fa-plus p-1 border rounded-full  aspect-square text-[9px]	"></i>{" "}
                                                <span class="text-base">
                                                    &nbsp; 1 &nbsp;{" "}
                                                </span>
                                                <i class="fa-solid fa-minus p-1 border rounded-full  aspect-square text-[9px]	"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="flex justify-between">
                                        <div>Children(s)</div>
                                        <div>
                                            <div>
                                                <i class="fa-solid fa-plus p-1 border rounded-full  aspect-square text-[9px]	"></i>{" "}
                                                <span class="text-base">
                                                    &nbsp; 1 &nbsp;{" "}
                                                </span>
                                                <i class="fa-solid fa-minus p-1 border rounded-full  aspect-square text-[9px]	"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="md:ml-1.5">
                        <button class="btn rounded-lg bg-[#FFA732] text-white border-none h-[52px] w-full md:w-fit">
                            Search
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

function QuickSearchAll({setTab}) {
	const [keyword, setKeyword] = useState('')
	const handleNavigate = useHandleNavigate(`/quick-search/?keyword=${keyword}`);

	const handleSubmit = (e) => {
		e.preventDefault()
		handleNavigate()
	}

    return (
        <>
            <div
                id="all-section"
                class="grid grid-cols-2 w-10/12 p-4 mx-auto my-8 bg-white rounded-xl bg-opacity-40"
            >
                <form class="col-span-full flex flex-row">
                    <div class="join w-full">
                        <select
                            id="form-selector-1"
                            class="px-2 select select-bordered join-item w-[70px] pr-2 pl-3 h-[52px]"
							onChange={(e) => setTab(e.target.value)}
                        >
                            <option value="All" selected="selected">
                                All
                            </option>
                            <option value="Stay">Stay</option>
                            <option value="Flight">Flight</option>
                            <option value="Experience">Experience</option>
                        </select>
                        <div class="w-full">
                            <div>
                                <input
                                    class="w-full input input-bordered join-item h-[52px] bg-white"
                                    placeholder="Search for destinations, activities, experiences..."
									onChange={(e) => setKeyword(e.target.value)}
								/>
                            </div>
                        </div>
                    </div>
                    <div class="ml-1.5">
                        <button 
							class="btn rounded-lg bg-[#FFA732] text-white border-none h-[52px]"
							onClick={handleSubmit}
						>
                            Search
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
