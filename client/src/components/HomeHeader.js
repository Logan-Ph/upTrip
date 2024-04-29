import NavBar from "./Navbar";
import { useState, useEffect, useRef } from "react";
import Datepicker from "flowbite-datepicker/Datepicker";
import useHandleNavigate from "../utils/useHandleNavigate";
import { useQuery } from "@tanstack/react-query";
import { fetchTripAutoComplete } from "../api/fetch";
import { Link, useNavigate } from "react-router-dom";
import warningNotify from "../utils/warningNotify";

export default function Header() {
    const [tab, setTab] = useState("All");
    const [keyword, setKeyword] = useState("");

    return (
        <>
            <div class="bg-loginbackground bg-cover bg-center md:px-10">
                <NavBar />
                <div class="mx-auto max-w-8xl px-6 md:py-6 md:mt-32 mb-18">
                    <p class="text-white text-base md:text-lg mb-3 font-thin">
                        LEVEL UP YOUR TRIP
                    </p>
                    <p class="text-white text-3xl md:text-5xl font-semibold">
                        Life is a journey <br></br>Not a destinations.
                    </p>
                </div>

                <div class="pb-10 mx-auto max-w-8xl px-6 py-6">
                    <HandleSelection
                        tab={tab}
                        setTab={setTab}
                        setKeyword={setKeyword}
                        keyword={keyword}
                    />
                </div>
            </div>
        </>
    );
}

function HandleSelection({ tab, setTab, setKeyword, keyword }) {
    switch (tab) {
        case "Stay":
            return (
                <AdvancedSearchStay
                    setTab={setTab}
                    setKeyword={setKeyword}
                    keyword={keyword}
                />
            );
        case "Flight":
            return (
                <QuickSearchFlight
                    setTab={setTab}
                    setKeyword={setKeyword}
                    keyword={keyword}
                />
            );
        case "Experience":
            return (
                <QuickSearchExperience
                    setTab={setTab}
                    setKeyword={setKeyword}
                    keyword={keyword}
                />
            );
        default:
            return (
                <QuickSearchAll
                    setTab={setTab}
                    setKeyword={setKeyword}
                    keyword={keyword}
                />
            );
    }
}

function QuickSearchFlight({ setTab }) {
    const [isOneWay, setIsOneWay] = useState(false);
    const [openMenu, setOpenMenu] = useState(false);
    const [numberOfAdult, setNumberOfAdult] = useState(0);
    const [numberOfChild, setNumberOfChild] = useState(0);
    const [numberOfInfant, setNumberOfInfant] = useState(0);

    return (
        <>
            <div
                id="flight-section"
                class="flex flex-col p-4 mx-auto md:my-8 bg-white rounded-xl bg-opacity-40"
            >
                <div class="w-full mx-auto my-4 bg-white p-4 rounded-lg space-y-2">
                    <div class="flex flex-col md:flex-row space-y-4 md:space-y-0 justify-between w-full mb-4">
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
                        <div class="flex grow-1 space-x-5">
                            <div onClick={() => setIsOneWay(true)}>
                                <input
                                    type="radio"
                                    id="one-way"
                                    name="radio-1"
                                    className="radio"
                                    checked
                                />
                                <label for="one-way">&ensp; One way</label>
                            </div>
                            <div onClick={() => setIsOneWay(false)}>
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
                                    class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-5 z-10 origin-[0] start-10 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                                >
                                    Origin
                                </label>
                            </div>
                            <div class="relative z-40">
                                <ul class="absolute menu bg-base-200 w-full rounded-b-lg">
                                    <li>
                                        <a>
                                            <i class="fa-solid fa-plane"></i> Da
                                            Nang Internation Airport
                                        </a>
                                    </li>
                                    <li>
                                        <a>
                                            {" "}
                                            <i class="fa-solid fa-plane"></i>{" "}
                                            Tan Son Nhat Intercontenial Airport
                                        </a>
                                    </li>
                                    <li>
                                        <a>
                                            {" "}
                                            <i class="fa-solid fa-plane"></i>{" "}
                                            Noi Bai Intercontenial Airport
                                        </a>
                                    </li>
                                </ul>
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
                                    class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-5 z-10 origin-[0] start-10 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                                >
                                    Destination
                                </label>
                            </div>
                            <div class="relative z-40">
                                <ul class="absolute menu bg-base-200 w-full rounded-b-lg">
                                    <li>
                                        <a>
                                            <i class="fa-solid fa-plane"></i> Da
                                            Nang Internation Airport
                                        </a>
                                    </li>
                                    <li>
                                        <a>
                                            {" "}
                                            <i class="fa-solid fa-plane"></i>{" "}
                                            Tan Son Nhat Intercontenial Airport
                                        </a>
                                    </li>
                                    <li>
                                        <a>
                                            {" "}
                                            <i class="fa-solid fa-plane"></i>{" "}
                                            Noi Bai Intercontenial Airport
                                        </a>
                                    </li>
                                </ul>
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
                        <div
                            class={`relative w-full md:w-1/3 ${
                                isOneWay ? "hidden" : ""
                            }`}
                        >
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

                        <div className="relative w-full md:w-1/3 mb-2 grow border-b-2 border-gray-300">
                            {/* Ask for number of passenger */}
                            <button
                                id="dropdownDefaultButton"
                                data-dropdown-toggle="dropdown"
                                class="text-gray-900 bg-gray-100 focus:ring-4 focus:outline-none font-medium rounded-t-lg  md:border-none text-sm px-5 py-2.5 text-center inline-flex items-center h-[56px] relative p-2.5 pt-5 ps-10 w-full justify-between appearance-none"
                                type="button"
                                onClick={() => setOpenMenu((prev) => !prev)}
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
                                {numberOfAdult} Adult, {numberOfChild} Child,{" "}
                                {numberOfInfant} Infant{" "}
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
                                class={`z-10 bg-gray-100 divide-y divide-gray-100 rounded-b-lg shadow w-full absolute mt-[1.5px] ${
                                    openMenu ? "" : "hidden"
                                }`}
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
                                            <div>(age 12 and over)</div>
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
                                                    />
                                                </svg>
                                                <span class="text-lg">
                                                    {" "}
                                                    {numberOfAdult}{" "}
                                                </span>

                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke-width="1.5"
                                                    stroke="currentColor"
                                                    class="w-6 h-6"
                                                    onClick={() =>
                                                        setNumberOfAdult(
                                                            numberOfAdult + 1
                                                        )
                                                    }
                                                >
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
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
                                                        d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                                    />
                                                </svg>
                                                <span class="text-lg">1</span>

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
                                                        d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                                    />
                                                </svg>
                                                <span class="text-lg">1</span>

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
                                            </div>
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

function QuickSearchExperience({ setTab, setKeyword, keyword }) {
    return (
        <>
            <div
                id="experience-section"
                class="grid grid-cols-2 p-4 mx-auto md:my-8 bg-white rounded-xl bg-opacity-40"
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
                                    class="w-full input input-bordered rounded-l-none h-[52px] bg-white"
                                    placeholder="Search for activities in the location"
                                />
                            </div>
                            <div class="relative z-40">
                                <ul class="absolute menu bg-white w-full rounded-b-lg">
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

function AdvancedSearchStay({ setTab, setKeyword, keyword }) {
    const navigate = useNavigate();
    const [debouncedKeyword, setDebouncedKeyword] = useState(keyword);
    const [dropdown, setDropdown] = useState(false);
    const [numberOfAdults, setNumberOfAdults] = useState(1);
    const [numberOfChildren, setNumberOfChildren] = useState(0);
    const [numberOfRooms, setNumberOfRooms] = useState(1);
    const [childrenAges, setChildrenAges] = useState([]);
    const [autocompletePayload, setAutocompletePayload] = useState();
    const checkinDate = useRef();
    const checkoutDate = useRef();

    const { data, isFetched } = useQuery({
        queryKey: ["advanced-search", "hotels", debouncedKeyword],
        queryFn: () => fetchTripAutoComplete(debouncedKeyword),
        refetchOnWindowFocus: false,
        enabled: !!debouncedKeyword,
    });

    useEffect(() => {
        if (numberOfChildren === 0) {
            setChildrenAges(new Array(numberOfChildren).fill(0));
        }
    }, [numberOfChildren]);

    useEffect(() => {
        setAutocompletePayload(null);
    }, [debouncedKeyword]);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedKeyword(keyword);
        }, 250); // Delay of 1 second

        return () => {
            clearTimeout(handler);
        };
    }, [keyword]);

    useEffect(() => {
        let checkinPicker;
        let checkoutPicker;

        if (checkinDate.current && checkoutDate.current) {
            // Initialize the check-in datepicker
            checkinPicker = new Datepicker(checkinDate.current, {
                autohide: true,
                minDate: checkoutDate.current.value
                    ? new Date(checkoutDate.current.value)
                    : new Date(),
            });

            const initialMinDate = new Date();
            initialMinDate.setDate(initialMinDate.getDate() + 1);
            checkoutPicker = new Datepicker(checkoutDate.current, {
                autohide: true,
                minDate: checkinDate.current.value
                    ? new Date(initialMinDate)
                    : new Date(),
            });
        }

        // Cleanup function to destroy datepickers when component unmounts or rerenders
        return () => {
            if (checkinPicker) checkinPicker.destroy();
            if (checkoutPicker) checkoutPicker.destroy();
        };
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!autocompletePayload) {
            warningNotify("Please select a location");
            return;
        }

        const payload = {
            checkin: checkinDate.current.value.replace(
                /(\d{2})\/(\d{2})\/(\d{4})/,
                "$3$1$2"
            ),
            checkout: checkoutDate.current.value.replace(
                /(\d{2})\/(\d{2})\/(\d{4})/,
                "$3$1$2"
            ),
            city: autocompletePayload.city.geoCode,
            cityName: autocompletePayload.resultWord,
            resultType: autocompletePayload.resultType,
            countryId: autocompletePayload.country.geoCode,
            districtId: 0,
            provinceId: autocompletePayload.province.geoCode,
            cityType: autocompletePayload.cityType,
            latitude: autocompletePayload.coordinateInfos[3].latitude,
            longitude: autocompletePayload.coordinateInfos[3].longitude,
            searchCoordinate: autocompletePayload.coordinateInfos
                .map(
                    (info) =>
                        `${info.coordinateType}_${info.latitude}_${info.longitude}_${info.accuracy}`
                )
                .join("|"),
            crn: numberOfRooms,
            adult: numberOfAdults,
            children: numberOfChildren,
            domestic: false,
            listFilters: "17~1*17*1*2"
        };

        navigate(
            `/advanced-hotel-search/?resultType=${payload.resultType}&city=${payload.city}&cityName=${payload.cityName}&provinceId=${payload.provinceId}&countryId=${payload.countryId}&districtId=${payload.districtId}&checkin=${payload.checkin}&checkout=${payload.checkout}&barCurr=USD&cityType=${payload.cityType}&latitude=${payload.latitude}&longitude=${payload.longitude}&searchCoordinate=${payload.searchCoordinate}&crn=${payload.crn}&adult=${payload.adult}&children=${payload.children}&listFilters=${payload.listFilters}&domestic=${payload.domestic}`
        );
    };

    return (
        <>
            <div
                id="stay-section"
                class="grid grid-cols-2 p-4 mx-auto md:my-8 bg-white rounded-xl bg-opacity-40"
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
                                <div class="w-full grow">
                                    <div>
                                        <input
                                            class="h-[52px] w-full input input-bordered join-item bg-white"
                                            placeholder="Where are you going?"
                                            value={
                                                autocompletePayload?.resultWord
                                            }
                                            onChange={(e) =>
                                                setKeyword(e.target.value)
                                            }
                                        />
                                    </div>
                                    {isFetched && !autocompletePayload && (
                                        <div class="relative z-40 drop-shadow-lg">
                                            <ul class="absolute menu bg-white w-full rounded-b-lg">
                                                {data?.keyWordSearchResults?.map(
                                                    (element) => {
                                                        switch (
                                                            element.resultType
                                                        ) {
                                                            case "H":
                                                                return (
                                                                    <>
                                                                        <li>
                                                                            <div
                                                                                onClick={() =>
                                                                                    setAutocompletePayload(
                                                                                        element
                                                                                    )
                                                                                }
                                                                            >
                                                                                <i class="fa-solid fa-hotel"></i>{" "}
                                                                                {
                                                                                    element?.resultWord
                                                                                }
                                                                            </div>
                                                                        </li>
                                                                    </>
                                                                );
                                                            case "CT":
                                                            case "D":
                                                                return (
                                                                    <>
                                                                        <li>
                                                                            <div
                                                                                onClick={() =>
                                                                                    setAutocompletePayload(
                                                                                        element
                                                                                    )
                                                                                }
                                                                            >
                                                                                <i class="fa-solid fa-location-dot"></i>{" "}
                                                                                {
                                                                                    element?.resultWord
                                                                                }
                                                                            </div>
                                                                        </li>
                                                                    </>
                                                                );
                                                            case "LM":
                                                                return (
                                                                    <>
                                                                        <li>
                                                                            <div
                                                                                onClick={() =>
                                                                                    setAutocompletePayload(
                                                                                        element
                                                                                    )
                                                                                }
                                                                            >
                                                                                <i class="fa-solid fa-map-pin"></i>{" "}
                                                                                {
                                                                                    element?.resultWord
                                                                                }
                                                                            </div>
                                                                        </li>
                                                                    </>
                                                                );
                                                            case "A":
                                                                return (
                                                                    <>
                                                                        <li>
                                                                            <div
                                                                                onClick={() =>
                                                                                    setAutocompletePayload(
                                                                                        element
                                                                                    )
                                                                                }
                                                                            >
                                                                                <i class="fa-solid fa-plane-departure"></i>{" "}
                                                                                {
                                                                                    element?.resultWord
                                                                                }
                                                                            </div>
                                                                        </li>
                                                                    </>
                                                                );
                                                            case "Z":
                                                                return (
                                                                    <>
                                                                        <li>
                                                                            <div
                                                                                onClick={() =>
                                                                                    setAutocompletePayload(
                                                                                        element
                                                                                    )
                                                                                }
                                                                            >
                                                                                <i class="fa-solid fa-map-pin"></i>{" "}
                                                                                {
                                                                                    element?.resultWord
                                                                                }
                                                                            </div>
                                                                        </li>
                                                                    </>
                                                                );
                                                            case "T":
                                                                return (
                                                                    <>
                                                                        <li>
                                                                            <div
                                                                                onClick={() =>
                                                                                    setAutocompletePayload(
                                                                                        element
                                                                                    )
                                                                                }
                                                                            >
                                                                                <i class="fa-solid fa-train"></i>{" "}
                                                                                {
                                                                                    element?.resultWord
                                                                                }
                                                                            </div>
                                                                        </li>
                                                                    </>
                                                                );
                                                            default:
                                                                return (
                                                                    <>
                                                                        {
                                                                            element?.resultWord
                                                                        }
                                                                    </>
                                                                );
                                                        }
                                                    }
                                                )}
                                            </ul>
                                        </div>
                                    )}
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
                                            value={checkinDate.current?.value}
                                            onSelect={(e) =>
                                                console.log(e.target.value)
                                            }
                                        />
                                        <label
                                            for="floating_filled"
                                            class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-5 z-10 origin-[0] start-10 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
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
                                            value={checkoutDate.current?.value}
                                            onSelect={(e) =>
                                                console.log(e.target.value)
                                            }
                                        />
                                        <label
                                            for="floating_filled"
                                            class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-5 z-10 origin-[0] start-10 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                                        >
                                            Check-out
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="join-item relative">
                            <button
                                id="dropdownDividerButton"
                                data-dropdown-toggle="dropdownDivider"
                                class="text-gray-500 bg-white  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg md:rounded-l-none border border-gray-300 text-sm px-5 py-2.5 text-center inline-flex items-center h-[52px] relative p-2.5 mr-5 pt-5 ps-10 w-full justify-between"
                                type="button"
                                onClick={() => setDropdown((prev) => !prev)}
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
                                {numberOfAdults} adult, {numberOfChildren}{" "}
                                child, {numberOfRooms} room{" "}
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
                                class={`z-10 bg-white divide-y divide-gray-100 rounded-b-lg shadow absolute mt-[1.5px] ${
                                    dropdown ? "block" : "hidden"
                                }`}
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
                                                    onClick={() =>
                                                        setNumberOfRooms(
                                                            (prev) =>
                                                                prev > 1
                                                                    ? prev - 1
                                                                    : prev
                                                        )
                                                    }
                                                >
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                                    ></path>
                                                </svg>
                                                <span class="text-lg">
                                                    {" "}
                                                    {numberOfRooms}{" "}
                                                </span>

                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke-width="1.5"
                                                    stroke="currentColor"
                                                    class="w-6 h-6"
                                                    onClick={() => {
                                                        setNumberOfRooms(
                                                            (prev) => {
                                                                if (prev >= 10)
                                                                    return prev;

                                                                if (
                                                                    prev ===
                                                                    numberOfAdults
                                                                ) {
                                                                    setNumberOfAdults(
                                                                        prev + 1
                                                                    );
                                                                }
                                                                return prev + 1;
                                                            }
                                                        );
                                                    }}
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
                                                    onClick={() =>
                                                        setNumberOfAdults(
                                                            (prev) =>
                                                                prev - 1 > 0 &&
                                                                prev >
                                                                    numberOfRooms
                                                                    ? prev - 1
                                                                    : prev
                                                        )
                                                    }
                                                >
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                                    ></path>
                                                </svg>
                                                <span class="text-lg">
                                                    {" "}
                                                    {numberOfAdults}{" "}
                                                </span>

                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke-width="1.5"
                                                    stroke="currentColor"
                                                    class="w-6 h-6"
                                                    onClick={() =>
                                                        setNumberOfAdults(
                                                            (prev) => prev + 1
                                                        )
                                                    }
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
                                                    onClick={() =>
                                                        setNumberOfChildren(
                                                            (prev) => {
                                                                if (prev > 0) {
                                                                    setChildrenAges(
                                                                        (
                                                                            prev
                                                                        ) =>
                                                                            prev.slice(
                                                                                0,
                                                                                prev.length -
                                                                                    1
                                                                            )
                                                                    );
                                                                    return (
                                                                        prev - 1
                                                                    );
                                                                } else {
                                                                    return prev;
                                                                }
                                                            }
                                                        )
                                                    }
                                                >
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                                    ></path>
                                                </svg>
                                                <span class="text-lg">
                                                    {" "}
                                                    {numberOfChildren}{" "}
                                                </span>

                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke-width="1.5"
                                                    stroke="currentColor"
                                                    class="w-6 h-6"
                                                    onClick={() =>
                                                        setNumberOfChildren(
                                                            (prev) =>
                                                                prev <
                                                                numberOfRooms *
                                                                    6
                                                                    ? prev + 1
                                                                    : prev
                                                        )
                                                    }
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
                                    <Link
                                        to="#"
                                        class="block px-4 pb-2 text-[12px] text-gray-500 md:max-w-72"
                                    >
                                        Please enter your children's ages by the
                                        time of check-in
                                    </Link>
                                    <div class="overflow-y-scroll flex flex-wrap items-start px-5 mx-auto justify-between md:justify-normal md:max-w-80 md:max-h-[150px]">
                                        {Array.from(
                                            { length: numberOfChildren },
                                            (_, index) => {
                                                return (
                                                    <form class="w-24 md:w-16 mb-3 md:mr-4">
                                                        <label
                                                            for="number-input"
                                                            class="block mb-2 text-xs font-medium text-gray-900"
                                                        >
                                                            Child {index + 1}
                                                        </label>
                                                        <input
                                                            type="number"
                                                            id="number-input"
                                                            aria-describedby="helper-text-explanation"
                                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                                            placeholder="Age"
                                                            required
                                                            onChange={(e) => {
                                                                setChildrenAges(
                                                                    (prev) => {
                                                                        const temp =
                                                                            [
                                                                                ...prev,
                                                                            ];
                                                                        console.log(
                                                                            temp
                                                                        );
                                                                        temp[
                                                                            index
                                                                        ] =
                                                                            e.target.value;
                                                                        return temp;
                                                                    }
                                                                );
                                                            }}
                                                        />
                                                    </form>
                                                );
                                            }
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="md:ml-1.5">
                        <button
                            onClick={(e) => handleSubmit(e)}
                            class="btn rounded-lg bg-[#FFA732] text-white border-none h-[52px] w-full md:w-fit"
                        >
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
                class="grid grid-cols-2 p-4 mx-auto md:my-8 bg-white rounded-xl bg-opacity-40"
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
