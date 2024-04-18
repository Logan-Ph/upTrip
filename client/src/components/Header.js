import NavBar from "./Navbar";

export default function Header() {
    return (
        <>
            <div class="bg-[#8DD3BB] md:px-10">
                <NavBar />

                <form class="static mx-auto max-w-7xl px-6 pb-10">
                    <label
                        for="default-search"
                        class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                    >
                        Search
                    </label>
                    <div class="relative">
                        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg
                                class="w-4 h-4 text-gray-500 dark:text-gray-400"
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
                            id="default-search"
                            class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Search all"
                            required
                        />
                    </div>
                </form>

                <div class="mx-auto max-w-7xl px-6">
                    <div class="">
                        <ul
                            class="flex flex-wrap -mb-px text-sm font-medium text-center"
                            id="default-tab"
                            data-tabs-toggle="#default-tab-content"
                            role="tablist"
                        >
                            <li class="" role="presentation">
                                <button
                                    class="inline-block p-4 rounded-tl-lg text-white active:text-white bg-[#231F20] active:bg-white dark:text-white"
                                    id="stay-tab"
                                    data-tabs-target="#stay"
                                    type="button"
                                    role="tab"
                                    aria-controls="stay"
                                    aria-selected="false"
                                >
                                    Stay
                                </button>
                            </li>
                            <li class="" role="presentation">
                                <button
                                    class="inline-block p-4
                  text-white bg-[#231F20] dark:text-white"
                                    id="flight-tab"
                                    data-tabs-target="#flight"
                                    type="button"
                                    role="tab"
                                    aria-controls="flight"
                                    aria-selected="false"
                                >
                                    Flight
                                </button>
                            </li>
                            <li class="" role="presentation">
                                <button
                                    class="inline-block p-4 rounded-tr-lg text-white bg-[#231F20] dark:text-white"
                                    id="experience-tab"
                                    data-tabs-target="#experience"
                                    type="button"
                                    role="tab"
                                    aria-controls="experience"
                                    aria-selected="false"
                                >
                                    Experience
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="md:px-10">
                <div class="mx-auto max-w-7xl px-6">
                    <div id="default-tab-content">
                        <div
                            class="hidden rounded-br-lg  px-5 py-2 rounded-bl-lg bg-white shadow-lg"
                            id="stay"
                            role="tabpanel"
                            aria-labelledby="stay-tab"
                        >
                            <div class="my-4 md:my-0">
                                <div class="flex flex-col md:flex-row w-full space-y-2 md:space-y-0">
                                    <div class="relative grow md:border-r border-gray-300">
                                        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                            <i class="fa-solid fa-hotel text-gray-500"></i>
                                        </div>
                                        <input
                                            class="h-[52px] w-full input  bg-white border md:border-none border-gray-300 ps-10 p-2.5"
                                            placeholder="Where are you going?"
                                        />
                                        <div class="relative z-40 drop-shadow-lg">
                                            <ul class="absolute menu bg-white w-full rounded-b-lg mt-1.5 md:mt-3">
                                                <li>
                                                    <a>
                                                        <i class="fa-solid fa-location-dot"></i>{" "}
                                                        Da Nang
                                                    </a>
                                                </li>
                                                <li>
                                                    <a>
                                                        <i class="fa-solid fa-plane"></i>{" "}
                                                        Da Nang Internation
                                                        Airport
                                                    </a>
                                                </li>
                                                <li>
                                                    <a>
                                                        <i class="fa-solid fa-hotel"></i>{" "}
                                                        Intercontenial Da Nang
                                                    </a>
                                                </li>
                                                <li>
                                                    <a>
                                                        {" "}
                                                        <i class="fa-solid fa-hotel"></i>{" "}
                                                        Nikko Hotel
                                                    </a>
                                                </li>
                                                <li>
                                                    <a>
                                                        {" "}
                                                        <i class="fa-solid fa-hotel"></i>{" "}
                                                        Legacy Yen Tu
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="relative grow md:border-r border-gray-300">
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
                                                class="bg-white text-gray-900 text-sm border md:border-none rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 pt-5 md:rounded-none border-gray-300"
                                                placeholder="dd/mm/yyyy"
                                            />
                                            <label
                                                for="floating_filled"
                                                class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-5 z-10 origin-[0] start-10 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                                            >
                                                Check-in
                                            </label>
                                        </div>
                                    </div>
                                    <div class="relative grow md:border-r border-gray-300">
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
                                                class="bg-white text-gray-900 text-sm border md:border-none rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 pt-5 md:rounded-none border-gray-300"
                                                placeholder="dd/mm/yyyy"
                                            />
                                            <label
                                                for="floating_filled"
                                                class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-5 z-10 origin-[0] start-10 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                                            >
                                                Check-out
                                            </label>
                                        </div>
                                    </div>

                                    <div class="grow border-gray-300 md:border-none rounded-lg">
                                        <button
                                            id="dropdownDividerButton"
                                            data-dropdown-toggle="dropdownDivider"
                                            class="text-gray-500 bg-white  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg md:rounded-l-none border border-gray-300 md:border-none text-sm px-5 py-2.5 text-center inline-flex items-center h-[52px] relative p-2.5 pt-5 ps-10 w-full justify-between"
                                            type="button"
                                        >
                                            <label
                                                for="floating_filled"
                                                class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-5 z-10 origin-[0] start-10 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto font-medium"
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
                                            class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow"
                                        >
                                            {/* Ask user to input room information */}
                                            <div
                                                class="py-5 text-sm text-gray-700 my-3 mx-5 space-y-4"
                                                aria-labelledby="dropdownDividerButton"
                                            >
                                                <div class="flex justify-between">
                                                    <div class="flex flex-col">
                                                        <div>
                                                            <i class="fa-solid fa-door-open"></i>{" "}
                                                            Room(s)
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div class="flex space-x-3 items-center">
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
                                                                    d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                                                ></path>
                                                            </svg>
                                                            <span class="text-lg">
                                                                {" "}
                                                                1{" "}
                                                            </span>

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
                                                                    d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                                                ></path>
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="flex justify-between">
                                                    <div class="flex flex-col">
                                                        <div>
                                                            <i
                                                                class="fa-solid fa-person"
                                                                aria-hidden="true"
                                                            ></i>{" "}
                                                            Adult(s)
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div class="flex space-x-3 items-center">
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
                                                                    d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                                                ></path>
                                                            </svg>
                                                            <span class="text-lg">
                                                                {" "}
                                                                1{" "}
                                                            </span>

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
                                                                    d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                                                ></path>
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="flex justify-between">
                                                    <div class="flex flex-col">
                                                        <div>
                                                            <i
                                                                class="fa-solid fa-child-reaching"
                                                                aria-hidden="true"
                                                            ></i>{" "}
                                                            Children
                                                        </div>
                                                        <div class="text-xs text-gray-500">
                                                            maximum 17 years old
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div class="flex space-x-3 items-center">
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
                                                                    d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                                                ></path>
                                                            </svg>
                                                            <span class="text-lg">
                                                                {" "}
                                                                1{" "}
                                                            </span>

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
                                                                    d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                                                ></path>
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="py-2">
                                                <a
                                                    href="#"
                                                    class="block px-4 pb-2 text-[12px] text-gray-500 md:max-w-72"
                                                >
                                                    Please enter your children's
                                                    ages by the time of check-in
                                                </a>
                                                <div class="flex flex-wrap items-start px-5 mx-auto justify-between md:justify-normal md:max-w-72">
                                                    <form class="w-24 md:w-16 mb-3 md:mr-4">
                                                        <label
                                                            for="number-input"
                                                            class="block mb-2 text-xs font-medium text-gray-900"
                                                        >
                                                            Child 1
                                                        </label>
                                                        <input
                                                            type="number"
                                                            id="number-input"
                                                            aria-describedby="helper-text-explanation"
                                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                                            placeholder="Age"
                                                            required
                                                        />
                                                    </form>
                                                    <form class="w-24 md:w-16 mb-3 md:mr-4">
                                                        <label
                                                            for="number-input"
                                                            class="block mb-2 text-xs font-medium text-gray-900"
                                                        >
                                                            Child 1
                                                        </label>
                                                        <input
                                                            type="number"
                                                            id="number-input"
                                                            aria-describedby="helper-text-explanation"
                                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                                            placeholder="Age"
                                                            required
                                                        />
                                                    </form>
                                                    <form class="w-24 md:w-16 mb-3 md:mr-4">
                                                        <label
                                                            for="number-input"
                                                            class="block mb-2 text-xs font-medium text-gray-900"
                                                        >
                                                            Child 1
                                                        </label>
                                                        <input
                                                            type="number"
                                                            id="number-input"
                                                            aria-describedby="helper-text-explanation"
                                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                                            placeholder="Age"
                                                            required
                                                        />
                                                    </form>
                                                    <form class="w-24 md:w-16 mb-3 md:mr-4">
                                                        <label
                                                            for="number-input"
                                                            class="block mb-2 text-xs font-medium text-gray-900"
                                                        >
                                                            Child 1
                                                        </label>
                                                        <input
                                                            type="number"
                                                            id="number-input"
                                                            aria-describedby="helper-text-explanation"
                                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                                            placeholder="Age"
                                                            required
                                                        />
                                                    </form>
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
                        </div>
                        <div
                            class="hidden p-6 rounded-r-lg rounded-bl-lg bg-white shadow-lg"
                            id="flight"
                            role="tabpanel"
                            aria-labelledby="flight-tab"
                        >
                            <div class="my-4 md:my-0">
                                <div class="">
                                    <div class="flex grow-1 space-x-10 mb-4">
                                        <div>
                                            <input
                                                type="radio"
                                                id="one-way"
                                                name="radio-1"
                                                class="radio"
                                                checked
                                            />
                                            <label for="one-way">
                                                &ensp; One way
                                            </label>
                                        </div>
                                        <div>
                                            <input
                                                type="radio"
                                                id="round-trip"
                                                name="radio-1"
                                                class="radio"
                                            />
                                            <label for="round-trip">
                                                &ensp; Round trip
                                            </label>
                                        </div>
                                    </div>
                                    <div class="flex flex-col md:flex-row items-center md:space-x-4">
                                        <div class="relative w-full md:w-1/2 mb-2">
                                            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                                <i class="fa-solid fa-plane-departure text-gray-500"></i>
                                            </div>
                                            <div>
                                                <input
                                                    name="origin"
                                                    type="text"
                                                    class="block rounded-t-lg  text-gray-900 bg-gray-100 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 w-full ps-10 p-2.5 pt-5 h-[56px]"
                                                    placeholder="City or airport"
                                                />
                                                <label
                                                    for="floating_filled"
                                                    class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-5 z-10 origin-[0] start-10 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                                                >
                                                    Origin
                                                </label>
                                            </div>
                                            <div class="relative z-40">
                                                <ul class="absolute menu bg-base-200 w-full rounded-b-lg">
                                                    <li>
                                                        <a>
                                                            <i class="fa-solid fa-plane"></i>{" "}
                                                            Da Nang Internation
                                                            Airport
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a>
                                                            {" "}
                                                            <i class="fa-solid fa-plane"></i>{" "}
                                                            Tan Son Nhat
                                                            Intercontenial
                                                            Airport
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a>
                                                            {" "}
                                                            <i class="fa-solid fa-plane"></i>{" "}
                                                            Noi Bai
                                                            Intercontenial
                                                            Airport
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="relative w-full md:w-1/2 mb-2">
                                            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                                <i class="fa-solid fa-plane-arrival text-gray-500"></i>
                                            </div>
                                            <div>
                                                <input
                                                    name="destination"
                                                    type="text"
                                                    class="block rounded-t-lg  text-gray-900 bg-gray-100 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 w-full ps-10 p-2.5 pt-5 h-[56px]"
                                                    placeholder="City or airport"
                                                />
                                                <label
                                                    for="floating_filled"
                                                    class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-5 z-10 origin-[0] start-10 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                                                >
                                                    Destination
                                                </label>
                                                <div class="relative z-40">
                                                    <ul class="absolute menu bg-base-200 w-full rounded-b-lg">
                                                        <li>
                                                            <a>
                                                                <i class="fa-solid fa-plane"></i>{" "}
                                                                Da Nang
                                                                Internation
                                                                Airport
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a>
                                                                {" "}
                                                                <i class="fa-solid fa-plane"></i>{" "}
                                                                Tan Son Nhat
                                                                Intercontenial
                                                                Airport
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a>
                                                                {" "}
                                                                <i class="fa-solid fa-plane"></i>{" "}
                                                                Noi Bai
                                                                Intercontenial
                                                                Airport
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="flex flex-col md:flex-row  items-center justify-between	md:space-x-4">
                                        <div class="relative w-full md:w-1/3 mb-2">
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
                                                    class="block rounded-t-lg  text-gray-900 bg-gray-100 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 w-full ps-10 p-2.5 pt-5 h-[56px]"
                                                    placeholder="dd/mm/yyyy"
                                                    onSelect={(e) =>
                                                        console.log(
                                                            e.target.value
                                                        )
                                                    }
                                                    // onClick={(e) => dobHandler(e)}
                                                    // onClick={(e) => console.log(e.target.value)}
                                                    // onChange={(e) => console.log(e)}
                                                    id="datepickerId3"
                                                />
                                                <label
                                                    for="floating_filled"
                                                    class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-5 z-10 origin-[0] start-10 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                                                >
                                                    Departing
                                                </label>
                                            </div>
                                        </div>

                                        {/* This field appears only when user choose round trip , hidden when one way */}
                                        <div class="relative w-full md:w-1/3 mb-2">
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
                                                    class="block rounded-t-lg  text-gray-900 bg-gray-100 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 w-full ps-10 p-2.5 pt-5 h-[56px]"
                                                    placeholder="dd/mm/yyyy"
                                                    onSelect={(e) =>
                                                        console.log(
                                                            e.target.value
                                                        )
                                                    }
                                                    // onClick={(e) => dobHandler(e)}
                                                    // onClick={(e) => console.log(e.target.value)}
                                                    // onChange={(e) => console.log(e)}
                                                    id="datepickerId4"
                                                />
                                                <label
                                                    for="floating_filled"
                                                    class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-5 z-10 origin-[0] start-10 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                                                >
                                                    Returning
                                                </label>
                                            </div>
                                        </div>

                                        {/* Ask for number of passenger */}
                                        <button
                                            id="dropdownDefaultButton"
                                            data-dropdown-toggle="dropdown"
                                            class="rounded-t-lg   bg-gray-100 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 text-gray-500 text-sm px-5 py-2.5 text-center inline-flex items-center h-[56px] relative p-2.5 pt-5 ps-10 w-full md:w-1/3 justify-between mb-2"
                                            type="button"
                                        >
                                            <label
                                                for="floating_filled"
                                                class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-5 z-10 origin-[0] start-10 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto font-medium"
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
                                            class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-full"
                                        >
                                            <div
                                                class="py-2 text-sm text-gray-700 my-3 mx-5 space-y-4"
                                                aria-labelledby="dropdownDefaultButton"
                                            >
                                                <div class="flex justify-between">
                                                    <div class="flex flex-col">
                                                        <div>
                                                            <i class="fa-solid fa-child"></i>{" "}
                                                            Adult
                                                        </div>
                                                        <div>
                                                            (age 12 and over)
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div class="flex space-x-3 items-center">
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
                                                                    d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                                                />
                                                            </svg>

                                                            <span class="text-lg">
                                                                {" "}
                                                                1{" "}
                                                            </span>
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
                                                                    d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                                                />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="flex justify-between">
                                                    <div class="flex flex-col">
                                                        <div>
                                                            <i class="fa-solid fa-child-reaching"></i>{" "}
                                                            Child
                                                        </div>
                                                        <div>(age 2 - 11)</div>
                                                    </div>
                                                    <div>
                                                        <div class="flex space-x-3 items-center">
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
                                                                    d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                                                />
                                                            </svg>

                                                            <span class="text-lg">
                                                                {" "}
                                                                1{" "}
                                                            </span>
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
                                                                    d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                                                />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="flex justify-between">
                                                    <div class="flex flex-col">
                                                        <div>
                                                            <i class="fa-solid fa-baby"></i>{" "}
                                                            Infant
                                                        </div>
                                                        <div>(below age 2)</div>
                                                    </div>
                                                    <div>
                                                        <div class="flex space-x-3 items-center">
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
                                                                    d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                                                />
                                                            </svg>

                                                            <span class="text-lg">
                                                                {" "}
                                                                1{" "}
                                                            </span>
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
                                                                    d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                                                />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="w-full mt-4">
                                        <button class="btn rounded-lg bg-[#FFA732] text-white border-none h-[52px] w-full">
                                            Search
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            class="hidden p-4 rounded-r-lg rounded-bl-lg bg-white shadow-lg"
                            id="experience"
                            role="tabpanel"
                            aria-labelledby="experience-tab"
                        >
                            <div class="flex flex-row">
                                <div class="w-full border-gray-300 relative">
                                    <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                        <i class="fa-solid fa-parachute-box text-gray-500"></i>
                                    </div>
                                    <div>
                                        <input
                                            class="block rounded-lg  text-gray-900 bg-gray-100 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 w-full ps-10 p-2.5 pt-5 h-[56px] truncate"
                                            placeholder="Search for activities in the location"
                                        />
                                    </div>
                                    <div class="relative z-40">
                                        <ul class="absolute menu bg-base-200 w-full rounded-lg mt-1.5 drop-shadow-lg">
                                            <li>
                                                <a>
                                                    <i class="fa-solid fa-location-dot"></i>{" "}
                                                    Da Nang
                                                </a>
                                            </li>
                                            <li>
                                                <a>
                                                    {" "}
                                                    <i class="fa-solid fa-location-dot"></i>{" "}
                                                    Ho Chi Minh
                                                </a>
                                            </li>
                                            <li>
                                                <a>
                                                    {" "}
                                                    <i class="fa-solid fa-location-dot"></i>{" "}
                                                    Ha Noi
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="ml-2.5">
                                    <button class="btn rounded-lg bg-[#FFA732] text-white border-none h-[56px] w-full">
                                        Search
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
