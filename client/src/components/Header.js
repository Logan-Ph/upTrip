import NavBar from "../components/Navbar";
import { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import useHandleNavigate from "../utils/useHandleNavigate";
import "react-datepicker/dist/react-datepicker.css";

export default function Header() {
    const [tab, setTab] = useState("All");

    return (
        <>
            <div class="bg-[#8DD3BB] md:px-10">
                <NavBar />
                <section>
                    <div class="pb-10">
                        <HandleSelection tab={tab} setTab={setTab} />
                    </div>
                </section>
            </div>
        </>
    );
}

function HandleSelection({ tab, setTab }) {
    switch (tab) {
        case "Stay":
            return <QuickSearchStay setTab={setTab} />;
        case "Flight":
            return <QuickSearchFlight setTab={setTab} />;
        case "Experience":
            return <QuickSearchExperience setTab={setTab} />;
        default:
            return <QuickSearchAll setTab={setTab} />;
    }
}

function QuickSearchFlight({ setTab }) {
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    useEffect(() => {
        if (endDate < startDate) {
            setStartDate(endDate);
            setEndDate(startDate);
        }
    }, [startDate, endDate]);

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
                            {/* <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg
                                    class="w-4 h-4 text-gray-500"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                </svg>
                            </div> */}
                            {/* <div> 
                               <input
                                    id="datepicker1"
                                    datepicker
                                    datepicker-autohide
                                    name="start"
                                    type="text"
                                    class="block rounded-t-lg  text-gray-900 bg-gray-100 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 w-full ps-10 p-2.5 pt-5"
                                    placeholder="dd/mm/yyyy"
                                   
                                   
                               /> 
                               <label
                                    for="floating_filled"
                                    class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-5 z-10 origin-[0] start-10 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                                >
                                    Departing
                                </label>
                            </div> */}
                            <div className="bg-gray-100 border-b-grey-200 h-[52px] w-full flex items-center rounded-t-lg relative border-0 border-b-2 border-gray-300 appearance-none focus:outline-none">
                                <div className="absolute left-0 ml-2 mt-0 z-10">
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
                                <p className="text-xs text-gray-500 absolute top-1 left-10 ml-2 mt-0 z-10 scale-90">
                                    Departure
                                </p>
                                <div className="ml-2">
                                    <DatePicker
                                        placeholderText="dd/mm/yyyy"
                                        className="bg-gray-100 input border-transparent ps-10 pt-4  rounded-none"
                                        selected={startDate}
                                        onChange={(date) => setStartDate(date)}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* This field appears only when user choose round trip , hidden when one way */}
                        <div class="relative w-full md:w-1/3">
                            {/* <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg
                                    class="w-4 h-4 text-gray-500"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                </svg>
                            </div> */}
                            {/* <div>
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
                                    onClick={(e) => dobHandler(e)}
                                    onClick={(e) => console.log(e.target.value)}
                                    onChange={(e) => console.log(e)}
                                    id="datepickerId4"
                                />
                                <label
                                    for="floating_filled"
                                    class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-5 z-10 origin-[0] start-10 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                                >
                                    Returning
                                </label>
                            </div> */}

                            <div className="bg-gray-100 border-b-grey-200 h-[52px] w-full flex items-center rounded-t-lg relative border-0 border-b-2 border-gray-300 appearance-none focus:outline-none">
                                <div className="absolute left-0 ml-2 mt-0 z-10">
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
                                <p className="text-xs text-gray-500 absolute top-1 left-10 ml-2 mt-0 z-10 scale-90">
                                    Returning
                                </p>
                                <div className="ml-2">
                                    <DatePicker
                                        placeholderText="dd/mm/yyyy"
                                        className="bg-gray-100 input border-transparent ps-10 pt-4  rounded-none"
                                        selected={startDate}
                                        onChange={(date) => setStartDate(date)}
                                    />
                                </div>
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
                        </button>
                    </div>
                </div>
            </div>
            <div class="md:ml-1.5">
                <button class="btn rounded-lg bg-[#FFA732] text-white border-none h-[52px] w-full">
                    Search
                </button>
            </div>
        </>
    );
}

function QuickSearchExperience({ setTab }) {
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

function QuickSearchStay({ setTab }) {
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    useEffect(() => {
        if (endDate < startDate) {
            setStartDate(endDate);
            setEndDate(startDate);
        }
    }, [startDate, endDate]);

    return (
        <>
            <div
                id="stay-section"
                class="grid grid-cols-2 w-10/12 p-4 mx-auto my-8 bg-white rounded-xl bg-opacity-40 "
            >
                <div class="col-span-full flex flex-col md:flex-row w-full space-y-2 md:space-y-0 ">
                    <div class="join join-vertical md:join-horizontal space-y-2 md:space-y-0 w-full">
                        <div class="join-item flex-1 mr-[1px]">
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
                        <div className="joint-item flex-1 md:flex">
                            <div className="bg-white border border-grey-200 h-[52px]  join join-horizontal w-full flex items-center rounded-md md:rounded-none relative">
                                <div className="px-2 absolute left-0 ml-2 mt-0 z-10">
                                    <svg
                                        className="w-[18px] h-[18px]"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 448 512"
                                    >
                                        <path
                                            fill="grey"
                                            d="M12 192h424c6.6 0 12 5.4 12 12v260c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V204c0-6.6 5.4-12 12-12zm436-44v-36c0-26.5-21.5-48-48-48h-48V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H160V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H48C21.5 64 0 85.5 0 112v36c0 6.6 5.4 12 12 12h424c6.6 0 12-5.4 12-12z"
                                        />
                                    </svg>
                                </div>
                                <p className="text-xs font-medium text-gray-500 absolute top-0 left-12 ml-2 mt-0 z-10 scale-90">
                                    Check-in
                                </p>
                                <div>
                                    <DatePicker
                                        placeholderText="dd/mm/yyyy"
                                        className="input input-bordered rounded-none pl-12"
                                        selected={startDate}
                                        onChange={(date) => setStartDate(date)}
                                    />
                                </div>
                            </div>

                            <div className="bg-white border border-grey-200 h-[52px] w-full join join-horizontal rounded-md md:rounded-none md:rounded-r-md flex items-center relative">
                                <div className="px-2 absolute left-0 ml-2 mt-0 z-10">
                                    <svg
                                        className="w-[18px] h-[18px]"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 448 512"
                                    >
                                        <path
                                            fill="grey"
                                            d="M12 192h424c6.6 0 12 5.4 12 12v260c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V204c0-6.6 5.4-12 12-12zm436-44v-36c0-26.5-21.5-48-48-48h-48V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H160V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H48C21.5 64 0 85.5 0 112v36c0 6.6 5.4 12 12 12h424c6.6 0 12-5.4 12-12z"
                                        />
                                    </svg>
                                </div>
                                <p className="text-xs font-medium text-gray-500 absolute top-0 left-12 ml-2 mt-0 z-10 scale-90">
                                    Check-out
                                </p>
                                <DatePicker
                                    placeholderText="dd/mm/yyyy"
                                    className="input input-bordered rounded-none w-full pl-12"
                                    selected={endDate}
                                    onChange={(date) => setEndDate(date)}
                                />
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

function QuickSearchAll({ setTab }) {
    const [keyword, setKeyword] = useState("");
    const handleNavigate = useHandleNavigate(
        `/quick-search/?keyword=${keyword}`
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        handleNavigate();
    };

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
                                    class="inline-block p-4 rounded-tl-lg text-white bg-[#231F20]"
                                    id="profile-tab"
                                    data-tabs-target="#profile"
                                    type="button"
                                    role="tab"
                                    aria-controls="profile"
                                    aria-selected="false"
                                >
                                    Stay
                                </button>
                            </li>
                            <li class="" role="presentation">
                                <button
                                    class="inline-block p-4
                  text-white bg-[#231F20]"
                                    id="dashboard-tab"
                                    data-tabs-target="#dashboard"
                                    type="button"
                                    role="tab"
                                    aria-controls="dashboard"
                                    aria-selected="false"
                                >
                                    Flight
                                </button>
                            </li>
                            <li class="" role="presentation">
                                <button
                                    class="inline-block p-4 rounded-tr-lg text-white bg-[#231F20] ${options}"
                                    id="settings-tab"
                                    data-tabs-target="#settings"
                                    type="button"
                                    role="tab"
                                    aria-controls="settings"
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
                            class="hidden p-4 rounded-r-lg rounded-bl-lg bg-gray-50 dark:bg-gray-800"
                            id="profile"
                            role="tabpanel"
                            aria-labelledby="profile-tab"
                        >
                            <p class="text-sm text-gray-500 dark:text-gray-400">
                                This is some placeholder content the{" "}
                                <strong class="font-medium text-gray-800 dark:text-white">
                                    Profile tab's associated content
                                </strong>
                                . Clicking another tab will toggle the
                                visibility of this one for the next. The tab
                                JavaScript swaps classes to control the content
                                visibility and styling.
                            </p>
                        </div>
                        <div
                            class="hidden p-4 rounded-r-lg rounded-bl-lg bg-gray-50 dark:bg-gray-800"
                            id="dashboard"
                            role="tabpanel"
                            aria-labelledby="dashboard-tab"
                        >
                            <p class="text-sm text-gray-500 dark:text-gray-400">
                                This is some placeholder content the{" "}
                                <strong class="font-medium text-gray-800 dark:text-white">
                                    Dashboard tab's associated content
                                </strong>
                                . Clicking another tab will toggle the
                                visibility of this one for the next. The tab
                                JavaScript swaps classes to control the content
                                visibility and styling.
                            </p>
                        </div>
                        <div
                            class="hidden p-4 rounded-r-lg rounded-bl-lg bg-gray-50 dark:bg-gray-800"
                            id="settings"
                            role="tabpanel"
                            aria-labelledby="settings-tab"
                        >
                            <p class="text-sm text-gray-500 dark:text-gray-400">
                                This is some placeholder content the{" "}
                                <strong class="font-medium text-gray-800 dark:text-white">
                                    Settings tab's associated content
                                </strong>
                                . Clicking another tab will toggle the
                                visibility of this one for the next. The tab
                                JavaScript swaps classes to control the content
                                visibility and styling.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

const options = {
    defaultTabId: "settings-tab",
    activeClasses:
        "text-white hover:text-blue-600 dark:text-blue-500 dark:hover:text-blue-400 border-blue-600 dark:border-blue-500",
    inactiveClasses: "text-gray-500 hover:text-gray-600 border-gray-100",
    onShow: () => {
        console.log("tab is shown");
    },
};
