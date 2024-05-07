import { useEffect, useRef, useState } from "react";
import NavBar from "./Navbar";
import useHandleNavigate from "../utils/useHandleNavigate";
import { useQuery } from "@tanstack/react-query";
import Datepicker from "flowbite-datepicker/Datepicker";
import { fetchAttractionsAutocomplete, fetchTripAutoComplete, fetchFlightAutocomplete } from "../api/fetch";
import { useNavigate } from "react-router-dom";
import warningNotify from "../utils/warningNotify";

export default function Header() {
    const [keyword, setKeyword] = useState("");
    const [tab, setTab] = useState("stay");

    const handleNavigate = useHandleNavigate(
        `/quick-search/?keyword=${keyword}`
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        setKeyword(null);
        handleNavigate();
    };

    return (
        <>
            <div className="bg-[#8DD3BB] md:px-10">
                <NavBar />
                <form
                    onSubmit={handleSubmit}
                    className="static mx-auto max-w-7xl px-6 pb-10"
                >
                    <label
                        for="default-search"
                        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                    >
                        Search
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg
                                className="w-4 h-4 text-gray-500 dark:text-gray-400"
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
                            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Search all"
                            onChange={(e) => setKeyword(e.target.value)}
                            value={keyword}
                            required
                        />
                    </div>
                </form>

                <div className="mx-auto max-w-8xl px-6">
                    <div className="">
                        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center">
                            <li className="" role="presentation">
                                <button
                                    className="inline-block p-4 rounded-tl-lg text-dark active:text-white bg-[#231F20] active:bg-opacity-30 dark:text-white"
                                    type="button"
                                    onClick={() => setTab("stay")}
                                >
                                    <i class="fa-solid fa-hotel"></i> Stay
                                </button>
                            </li>
                            <li className="" role="presentation">
                                <button
                                    className="inline-block p-4 text-dark active:text-white bg-[#231F20] active:bg-opacity-30 dark:text-white"
                                    type="button"
                                    onClick={() => setTab("flight")}
                                >
                                    <i class="fa-solid fa-plane"></i> Flight
                                </button>
                            </li>
                            <li className="" role="presentation">
                                <button
                                    className="inline-block p-4 rounded-tr-lg text-dark active:text-dark bg-[#231F20] active:bg-opacity-30 dark:text-white"
                                    type="button"
                                    onClick={() => setTab("experience")}
                                >
                                    <i class="fa-solid fa-umbrella-beach"></i>{" "}
                                    Experience
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="md:px-10 pb-10 bg-[#FAFBFC]">
                <div className="mx-auto max-w-8xl px-6">
                    <div id="default-tab-content">
                        <HandleSelection tab={tab} />
                    </div>
                </div>
            </div>
        </>
    );
}

function HandleSelection({ tab }) {
    switch (tab) {
        case "stay":
            return <AdvancedSearchHotel />;
        case "flight":
            return <AdvancedSearchFlight />;
        case "experience":
            return <AdvancedSearchExperience />;
        default:
            return null;
    }
}

function AdvancedSearchExperience() {
    const [keyword, setKeyword] = useState()
    const [debouncedKeyword, setDebouncedKeyword] = useState(keyword);
    const [autocompletePayload, setAutocompletePayload] = useState();
    const navigate = useNavigate();
    useEffect(() => {
        setAutocompletePayload(null);
    }, [debouncedKeyword]);

    const { data, isFetched } = useQuery({
        queryKey: ["attractions", "autocomplete", debouncedKeyword],
        queryFn: () => fetchAttractionsAutocomplete(debouncedKeyword),
        refetchOnWindowFocus: false,
        enabled: !!debouncedKeyword,
    });

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedKeyword(keyword);
        }, 250); // Delay of 1 second

        return () => {
            clearTimeout(handler);
        };
    }, [keyword]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!autocompletePayload) {
            warningNotify("Please select a location");
            return;
        }
        navigate(`/advanced-experience-search/?districtId=${autocompletePayload.districtId}&districtName=${autocompletePayload.districtName}`);
    };

    return (
        <div
            className="p-4 rounded-r-lg rounded-bl-lg bg-white shadow-lg"
            id="experience"
            role="tabpanel"
            aria-labelledby="experience-tab"
        >
            <div className="flex flex-row">
                <div className="w-full border-gray-300 relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <i className="fa-solid fa-parachute-box text-gray-500"></i>
                    </div>
                    <div>
                        <input
                            className="block rounded-lg  text-gray-900 bg-gray-100 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 w-full ps-10 p-2.5 pt-5 h-[56px] truncate"
                            placeholder="Search for activities in the location"
                            value={autocompletePayload?.districtPathNames}
                            onChange={(e) => setKeyword(e.target.value)}
                        />
                    </div>
                    {isFetched && !autocompletePayload && (
                        <div class="relative z-40">
                            <ul class="absolute menu bg-white w-full rounded-b-lg">
                                {data.length === 0 ? (
                                    <li>No results found</li>
                                ) : (
                                    data.map((item) => (
                                        <li onClick={() => setAutocompletePayload(item)}>
                                            <div>
                                                <i class="fa-solid fa-location-dot"></i>{" "}
                                                {item.districtPathNames}
                                            </div>
                                        </li>
                                    )))}
                            </ul>
                        </div>
                    )}
                </div>
                <div className="ml-2.5" onClick={handleSubmit}>
                    <button className="btn rounded-lg bg-[#FFA732] text-white border-none h-[56px] w-full">
                        Search
                    </button>
                </div>
            </div>
        </div>
    );
}

function AdvancedSearchFlight() {
    const navigate = useNavigate();
    const [openMenu, setOpenMenu] = useState(false);
    const [from, setFrom] = useState({})
    const [to, setTo] = useState({})
    const [seatClass, setSeatClass] = useState("ECONOMY")
    const [numberOfAdult, setNumberOfAdult] = useState(1);
    const [numberOfChild, setNumberOfChild] = useState(0);
    const [numberOfInfant, setNumberOfInfant] = useState(0);
    const [keywordFrom, setKeywordFrom] = useState();
    const [keywordTo, setKeywordTo] = useState();
    const [fromEdit, setFromEdit] = useState(false);
    const [toEdit, setToEdit] = useState(false);
    const [debouncedKeywordFrom, setDebouncedKeywordFrom] = useState(null)
    const [debouncedKeywordTo, setDebouncedKeywordTo] = useState(null)
    const date = useRef();


    useEffect(() => {
        setFromEdit(true)
        const handler = setTimeout(() => {
            setDebouncedKeywordFrom(keywordFrom);
        }, 250); // Delay of 1 second

        return () => {
            clearTimeout(handler);
        };
    }, [keywordFrom]);

    useEffect(() => {
        setToEdit(true)
        const handler = setTimeout(() => {
            setDebouncedKeywordTo(keywordTo);
        }, 250); // Delay of 1 second

        return () => {
            clearTimeout(handler);
        };
    }, [keywordTo]);

    const fromAutocomplete = useQuery({
        queryKey: ['advanced-search', "flight", debouncedKeywordFrom],
        queryFn: () => fetchFlightAutocomplete(debouncedKeywordFrom),
        refetchOnWindowFocus: false,
        enabled: !!keywordFrom,
    })

    const toAutocomplete = useQuery({
        queryKey: ['advanced-search', "flight", debouncedKeywordTo],
        queryFn: () => fetchFlightAutocomplete(debouncedKeywordTo),
        refetchOnWindowFocus: false,
        enabled: !!keywordTo,
    })

    useEffect(() => {
        let datePicker;

        if (date.current) {
            datePicker = new Datepicker(date.current, {
                autohide: true,
                minDate: new Date(),
            });
        }
        // Cleanup function to destroy datepickers when component unmounts or rerenders
        return () => {
            if (datePicker) datePicker.destroy();
        };
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            from: from.airportCode,
            fromCity: from.cityName,
            to: to.airportCode,
            toCity: to.cityName,
            seatClass: seatClass,
            adult: numberOfAdult,
            child: numberOfChild,
            infant: numberOfInfant,
            year: date.current?.value.substring(6, 10),
            month: date.current?.value.substring(0, 2),
            day: date.current?.value.substring(3, 5),
        }

        for (let key in payload) {
            if (payload.hasOwnProperty(key) && payload[key] === null) {
                console.log(key)
                warningNotify("Please provide all information.")
                return;
            }
        }
        
        navigate(
            `advanced-flight-search?ori=${payload.fromCity}&des=${payload.toCity}&from=${payload.from}&to=${payload.to}&adult=${payload.adult}&child=${payload.child}&infant=${payload.infant}&seatClass=${payload.seatClass}&year=${payload.year}&month=${payload.month}&day=${payload.day}`
        );

    }

    return (
        <div
            className="p-6 rounded-r-lg rounded-bl-lg bg-white shadow-lg"
            id="flight"
            role="tabpanel"
            aria-labelledby="flight-tab"
        >
            <div className="my-4 md:my-0">
                <div className="">
                    <div className="flex flex-col md:flex-row items-center md:space-x-4">
                        <div className="relative w-full md:w-1/2 mb-2">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <i className="fa-solid fa-plane-departure text-gray-500"></i>
                            </div>
                            <div>
                                <input
                                    name="origin"
                                    type="text"
                                    className="block rounded-t-lg  text-gray-900 bg-gray-100 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 w-full ps-10 p-2.5 pt-5 h-[56px]"
                                    placeholder="City or airport"
                                    value={fromEdit ? keywordFrom : from.cityName}
                                    onChange={(e) => {
                                        setKeywordFrom(e.target.value)
                                        setFromEdit(true)
                                    }}
                                />
                                <label
                                    for="floating_filled"
                                    className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-5 z-10 origin-[0] start-10 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                                >
                                    Origin
                                </label>
                            </div>
                            {fromAutocomplete.isFetched && fromEdit && (
                                <div className="relative z-40">
                                    <ul className="absolute menu bg-base-200 w-full rounded-b-lg">
                                        {fromAutocomplete?.data?.map(
                                            (item) => {
                                                return (
                                                    <li
                                                        onClick={() => {
                                                            setFrom(item)
                                                            setFromEdit(false)
                                                        }}>
                                                        <a>
                                                            <i class="fa-solid fa-plane"></i> {item.cityName} - {item.airportCode}
                                                        </a>
                                                    </li>
                                                )
                                            }
                                        )}
                                    </ul>
                                </div>
                            )}
                        </div>
                        <div className="relative w-full md:w-1/2 mb-2">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <i className="fa-solid fa-plane-arrival text-gray-500"></i>
                            </div>
                            <div>
                                <input
                                    name="destination"
                                    type="text"
                                    className="block rounded-t-lg  text-gray-900 bg-gray-100 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 w-full ps-10 p-2.5 pt-5 h-[56px]"
                                    placeholder="City or airport"
                                    value={toEdit ? keywordTo : to.cityName}
                                    onChange={(e) => {
                                        setKeywordTo(e.target.value)
                                        setToEdit(true)
                                    }
                                    }
                                />
                                <label
                                    for="floating_filled"
                                    className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-5 z-10 origin-[0] start-10 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                                >
                                    Destination
                                </label>
                            </div>

                            {toAutocomplete.isFetched && toEdit && (
                                <div class="relative z-40">
                                    <ul class="absolute menu bg-base-200 w-full rounded-b-lg overflow-y-hidden scor">
                                        {toAutocomplete?.data?.map(
                                            (item) => {
                                                return (
                                                    <li
                                                        onClick={() => {
                                                            setTo(item);
                                                            setToEdit(false)
                                                        }}>
                                                        <a>
                                                            <i class="fa-solid fa-plane"></i> {item.cityName} - {item.airportCode}
                                                        </a>
                                                    </li>
                                                )
                                            }
                                        )}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row  items-center justify-between	md:space-x-4">
                        <div className="relative w-full md:w-1/3 mb-2">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg
                                    className="w-4 h-4 text-gray-500"
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
                                    ref={date}
                                    datepicker
                                    datepicker-autohide
                                    datepicker-format="dd/mm/yyyy"
                                    name="start"
                                    type="text"
                                    value={date.current?.value}
                                    className="block rounded-t-lg  text-gray-900 bg-gray-100 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 w-full ps-10 p-2.5 pt-5 h-[56px]"
                                    placeholder="dd/mm/yyyy"
                                    id="datepickerId3"
                                />
                                <label
                                    for="floating_filled"
                                    className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-5 z-10 origin-[0] start-10 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                                >
                                    Departing
                                </label>
                            </div>
                        </div>

                        {/* This field appears only when user choose round trip , hidden when one way */}
                        <div className="relative w-full md:w-1/3 mb-2">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg
                                    className="w-4 h-4 text-gray-500"
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
                                    className="block rounded-t-lg  text-gray-900 bg-gray-100 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 w-full ps-10 p-2.5 pt-5 h-[56px]"
                                    placeholder="dd/mm/yyyy"
                                    onSelect={(e) =>
                                        console.log(e.target.value)
                                    }
                                    id="datepickerId4"
                                />
                                <label
                                    for="floating_filled"
                                    className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-5 z-10 origin-[0] start-10 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                                >
                                    Returning
                                </label>
                            </div>
                        </div>

                        {/* Ask for number of passenger */}
                        <div className="relative w-full md:w-1/3 mb-2 grow border-b-2 border-gray-300">
                        <button
                            id="dropdownDefaultButton"
                            data-dropdown-toggle="dropdown"
                            className="text-gray-900 bg-gray-100 focus:ring-4 focus:outline-none font-medium rounded-t-lg  md:border-none text-sm px-5 py-2.5 text-center inline-flex items-center h-[56px] relative p-2.5 pt-5 ps-10 w-full justify-between appearance-none"
                            type="button"
                            onClick={() => setOpenMenu((prev) => !prev)}
                        >
                            <label
                                for="floating_filled"
                                className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-5 z-10 origin-[0] start-10 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto font-medium"
                            >
                                No. of Passengers
                            </label>
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <i className="fa-regular fa-user w-4 h-4 text-gray-500"></i>
                            </div>
                            {numberOfAdult} Adult, {numberOfChild} Child, {numberOfInfant} Infant{" "}
                            <svg
                                className="w-2.5 h-2.5 ms-3"
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
                            className={`z-10 bg-white divide-y divide-gray-100 rounded-lg shadow absolute ${openMenu ? "" : "hidden"
                                }`}
                        >
                            <div
                                className="py-2 text-sm text-gray-700 my-3 mx-5 space-y-4"
                                aria-labelledby="dropdownDefaultButton"
                            >
                                <div className="flex justify-between">
                                    <div className="flex flex-col">
                                        <div>
                                            <i className="fa-solid fa-child"></i>{" "}
                                            Adult
                                        </div>
                                        <div>(age 12 and over)</div>
                                    </div>
                                    <div>
                                        <div className="flex space-x-3 items-center">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke-width="1.5"
                                                stroke="currentColor"
                                                className="w-6 h-6"
                                                onClick={() => {
                                                    setNumberOfAdult(
                                                        (prev) =>
                                                            prev +
                                                                1 +
                                                                numberOfChild +
                                                                numberOfInfant <=
                                                            6
                                                                ? prev + 1
                                                                : prev
                                                    )
                                                    console.log(numberOfAdult)
                                                }
                                                }
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                                />
                                            </svg>

                                            <span className="text-lg"> {numberOfAdult} </span>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke-width="1.5"
                                                stroke="currentColor"
                                                className="w-6 h-6"
                                                onClick={() =>
                                                    setNumberOfAdult(
                                                        (prev) =>
                                                            prev - 1 > 0
                                                                ? prev - 1
                                                                : 1
                                                    )
                                                }
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
                                <div className="flex justify-between">
                                    <div className="flex flex-col">
                                        <div>
                                            <i className="fa-solid fa-child-reaching"></i>{" "}
                                            Child
                                        </div>
                                        <div>(age 2 - 11)</div>
                                    </div>
                                    <div>
                                        <div className="flex space-x-3 items-center">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke-width="1.5"
                                                stroke="currentColor"
                                                className="w-6 h-6"
                                                onClick={() =>
                                                    setNumberOfChild(
                                                        (prev) =>
                                                            prev <
                                                                numberOfAdult *
                                                                    2 &&
                                                            prev +
                                                                1 +
                                                                numberOfAdult +
                                                                numberOfInfant <=
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
                                                />
                                            </svg>

                                            <span className="text-lg"> {numberOfChild} </span>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke-width="1.5"
                                                stroke="currentColor"
                                                className="w-6 h-6"
                                                onClick={() =>
                                                    setNumberOfChild(
                                                        (prev) =>
                                                            prev - 1 >= 0
                                                                ? prev - 1
                                                                : 0
                                                    )
                                                }
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
                                <div className="flex justify-between">
                                    <div className="flex flex-col">
                                        <div>
                                            <i className="fa-solid fa-baby"></i>{" "}
                                            Infant
                                        </div>
                                        <div>(below age 2)</div>
                                    </div>
                                    <div>
                                        <div className="flex space-x-3 items-center">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke-width="1.5"
                                                stroke="currentColor"
                                                className="w-6 h-6"
                                                onClick={() =>
                                                    setNumberOfInfant(
                                                        (prev) =>
                                                            prev + 1 <=
                                                                numberOfAdult &&
                                                            prev +
                                                                1 +
                                                                numberOfChild +
                                                                numberOfAdult <=
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
                                                />
                                            </svg>

                                            <span className="text-lg"> {numberOfInfant} </span>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke-width="1.5"
                                                stroke="currentColor"
                                                className="w-6 h-6"
                                                onClick={() => 
                                                    setNumberOfInfant(
                                                    (prev) =>
                                                        prev - 1 >= 0
                                                            ? prev - 1
                                                            : prev
                                                )
                                            }
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
                    </div>

                    <div className="w-full mt-4">
                        <button
                            onClick={(e) => handleSubmit(e)}
                            className="btn rounded-lg bg-[#FFA732] text-white border-none h-[52px] w-full">
                            Search
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function AdvancedSearchHotel() {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState("");
    const [autocompletePayload, setAutocompletePayload] = useState();
    const [dropdown, setDropdown] = useState(false);
    const [numberOfAdults, setNumberOfAdults] = useState(1);
    const [numberOfChildren, setNumberOfChildren] = useState(0);
    const [numberOfRooms, setNumberOfRooms] = useState(1);
    const [childrenAges, setChildrenAges] = useState([]);
    const [debouncedKeyword, setDebouncedKeyword] = useState(keyword);
    const checkinDate = useRef();
    const checkoutDate = useRef();

    const { data, isFetched } = useQuery({
        queryKey: ["quick-search", "hotels", debouncedKeyword],
        queryFn: () => fetchTripAutoComplete(debouncedKeyword),
        refetchOnWindowFocus: false,
        enabled: !!debouncedKeyword,
    });

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedKeyword(keyword);
        }, 250);

        return () => {
            clearTimeout(handler);
        };
    }, [keyword]);

    useEffect(() => {
        setAutocompletePayload(null);
    }, [debouncedKeyword]);

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

        let payload = {
            checkin: checkinDate.current.value.replace(
                /(\d{2})\/(\d{2})\/(\d{4})/,
                "$3$1$2"
            ),
            checkout: checkoutDate.current.value.replace(
                /(\d{2})\/(\d{2})\/(\d{4})/,
                "$3$1$2"
            ),
            city: autocompletePayload.city.geoCode,

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
            listFilters: "17~1*17*1*2",
        };

        if (payload.resultType === "H") {
            payload = {
                ...payload,
                hotelName: autocompletePayload.resultWord,
                searchValue: `${autocompletePayload.item.data.filterID}_${autocompletePayload.item.data.type}_${autocompletePayload.item.data.value}_${autocompletePayload.item.data.subType}`,
                cityName: autocompletePayload.city.currentLocaleName,
                preHotelIds: autocompletePayload.code
            }
            navigate(
                `/advanced-hotel-search/?resultType=${payload.resultType}&city=${payload.city}&cityName=${payload.cityName}&hotelName=${payload.hotelName}&searchValue=${payload.searchValue}&provinceId=${payload.provinceId}&countryId=${payload.countryId}&districtId=${payload.districtId}&checkin=${payload.checkin}&checkout=${payload.checkout}&barCurr=USD&cityType=${payload.cityType}&latitude=${payload.latitude}&longitude=${payload.longitude}&searchCoordinate=${payload.searchCoordinate}&crn=${payload.crn}&adult=${payload.adult}&children=${payload.children}&preHotelIds=${payload.preHotelIds}&listFilters=${payload.listFilters}&domestic=${payload.domestic}`
            );
        } else {
            payload = {
                ...payload,
                cityName: autocompletePayload.resultWord,
            };
            navigate(
                `/advanced-hotel-search/?resultType=${payload.resultType}&city=${payload.city}&cityName=${payload.cityName}&provinceId=${payload.provinceId}&countryId=${payload.countryId}&districtId=${payload.districtId}&checkin=${payload.checkin}&checkout=${payload.checkout}&barCurr=USD&cityType=${payload.cityType}&latitude=${payload.latitude}&longitude=${payload.longitude}&searchCoordinate=${payload.searchCoordinate}&crn=${payload.crn}&adult=${payload.adult}&children=${payload.children}&listFilters=${payload.listFilters}&domestic=${payload.domestic}`
            );
        }
    };

    return (
        <div
            className="rounded-br-lg  px-5 py-2 rounded-bl-lg bg-white shadow-lg"
            id="stay"
            role="tabpanel"
            aria-labelledby="stay-tab"
        >
            <div className="my-4 md:my-0">
                <div className="flex flex-col md:flex-row w-full space-y-2 md:space-y-0">
                    <div className="relative grow md:border-r border-gray-300">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <i className="fa-solid fa-hotel text-gray-500"></i>
                        </div>
                        <input
                            className="h-[52px] w-full input  bg-white border md:border-none border-gray-300 ps-10 p-2.5"
                            placeholder="Where are you going?"
                            value={autocompletePayload?.resultWord}
                            onChange={(e) => setKeyword(e.target.value)}
                        />
                        <div className="relative z-40 drop-shadow-lg">
                            {isFetched && !autocompletePayload && (
                                <div class="relative z-40 drop-shadow-lg">
                                    <ul class="absolute menu bg-white w-full rounded-b-lg">
                                        {data?.keyWordSearchResults?.map(
                                            (element) => {
                                                switch (element?.resultType) {
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
                                                    case "P":
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
                    <div className="relative grow md:border-r border-gray-300">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg
                                className="w-4 h-4 text-gray-500"
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
                                readOnly
                                className="bg-white text-gray-900 text-sm border md:border-none rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 pt-5 md:rounded-none border-gray-300"
                                placeholder="dd/mm/yyyy"
                            />
                            <label
                                for="floating_filled"
                                className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-5 z-10 origin-[0] start-10 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                            >
                                Check-in
                            </label>
                        </div>
                    </div>
                    <div className="relative grow md:border-r border-gray-300">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg
                                className="w-4 h-4 text-gray-500"
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
                                readOnly
                                className="bg-white text-gray-900 text-sm border md:border-none rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 pt-5 md:rounded-none border-gray-300"
                                placeholder="dd/mm/yyyy"
                            />
                            <label
                                for="floating_filled"
                                className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-5 z-10 origin-[0] start-10 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                            >
                                Check-out
                            </label>
                        </div>
                    </div>

                    <div className="grow border-gray-300 md:border-none rounded-lg">
                        <button
                            id="dropdownDividerButton"
                            data-dropdown-toggle="dropdownDivider"
                            className="text-gray-500 bg-white  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg md:rounded-l-none border border-gray-300 md:border-none text-sm px-5 py-2.5 text-center inline-flex items-center h-[52px] relative p-2.5 pt-5 ps-10 w-full justify-between"
                            type="button"
                            onClick={() => setDropdown((prev) => !prev)}
                        >
                            <label
                                for="floating_filled"
                                className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-5 z-10 origin-[0] start-10 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto font-medium"
                            >
                                Guest(s) and Room(s)
                            </label>
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <i className="fa-regular fa-user w-4 h-4 text-gray-500"></i>
                            </div>
                            {numberOfAdults} adult, {numberOfChildren} child,{" "}
                            {numberOfRooms} room{" "}
                            <svg
                                className="w-2.5 h-2.5 ms-3"
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
                            class={`z-10 bg-white divide-y divide-gray-100 rounded-lg shadow ${dropdown ? "" : "hidden"
                                }`}
                        >
                            {/* Ask user to input room information */}
                            <div
                                className="py-3 text-sm text-gray-700 my-3 mx-5 space-y-4"
                                aria-labelledby="dropdownDividerButton"
                            >
                                <div className="flex justify-between">
                                    <div className="flex flex-col">
                                        <div>
                                            <i className="fa-solid fa-door-open"></i>{" "}
                                            Room(s)
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex space-x-3 items-center">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke-width="1.5"
                                                stroke="currentColor"
                                                className="w-6 h-6"
                                                onClick={() =>
                                                    setNumberOfRooms((prev) =>
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
                                            <span className="text-lg">
                                                {" "}
                                                {numberOfRooms}{" "}
                                            </span>

                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke-width="1.5"
                                                stroke="currentColor"
                                                className="w-6 h-6"
                                                onClick={() => {
                                                    setNumberOfRooms((prev) => {
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
                                                    });
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
                                <div className="flex justify-between">
                                    <div className="flex flex-col">
                                        <div>
                                            <i
                                                className="fa-solid fa-person"
                                                aria-hidden="true"
                                            ></i>{" "}
                                            Adult(s)
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex space-x-3 items-center">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke-width="1.5"
                                                stroke="currentColor"
                                                className="w-6 h-6"
                                                onClick={() =>
                                                    setNumberOfAdults((prev) =>
                                                        prev - 1 > 0 &&
                                                            prev > numberOfRooms
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
                                            <span className="text-lg">
                                                {" "}
                                                {numberOfAdults}{" "}
                                            </span>

                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke-width="1.5"
                                                stroke="currentColor"
                                                className="w-6 h-6"
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
                                <div className="flex justify-between">
                                    <div className="flex flex-col">
                                        <div>
                                            <i
                                                className="fa-solid fa-child-reaching"
                                                aria-hidden="true"
                                            ></i>{" "}
                                            Children
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            maximum 17 years old
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex space-x-3 items-center">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke-width="1.5"
                                                stroke="currentColor"
                                                className="w-6 h-6"
                                                onClick={() =>
                                                    setNumberOfChildren(
                                                        (prev) => {
                                                            if (prev > 0) {
                                                                setChildrenAges(
                                                                    (prev) =>
                                                                        prev.slice(
                                                                            0,
                                                                            prev.length -
                                                                            1
                                                                        )
                                                                );
                                                                return prev - 1;
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
                                            <span className="text-lg">
                                                {" "}
                                                {numberOfChildren}{" "}
                                            </span>

                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke-width="1.5"
                                                stroke="currentColor"
                                                className="w-6 h-6"
                                                onClick={() =>
                                                    setNumberOfChildren(
                                                        (prev) =>
                                                            prev <
                                                                numberOfRooms * 6
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
                            <div className="py-2">
                                <div
                                    href="#"
                                    className="block px-4 pb-2 text-[12px] text-gray-500 md:max-w-72"
                                >
                                    Please enter your children's ages by the
                                    time of check-in
                                </div>
                                <div className="flex flex-wrap items-center mx-auto justify-between md:justify-normal md:max-w-72">
                                    {Array.from(
                                        { length: numberOfChildren },
                                        (_, index) => {
                                            return (
                                                <form className="w-24 md:w-16 mb-3 md:mr-4">
                                                    <label
                                                        for="number-input"
                                                        className="block mb-2 text-xs font-medium text-gray-900"
                                                    >
                                                        Child {index + 1}
                                                    </label>
                                                    <input
                                                        type="number"
                                                        id="number-input"
                                                        aria-describedby="helper-text-explanation"
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                                        placeholder="Age"
                                                        required
                                                        maxLength={2}
                                                        min={0}
                                                        max={17}
                                                        value={
                                                            childrenAges[index]
                                                        }
                                                        onChange={(e) => {
                                                            if (
                                                                e.target
                                                                    .value ===
                                                                ""
                                                            ) {
                                                                setChildrenAges(
                                                                    (prev) => {
                                                                        const temp =
                                                                            [
                                                                                ...prev,
                                                                            ];
                                                                        temp[
                                                                            index
                                                                        ] =
                                                                            null;
                                                                        return temp;
                                                                    }
                                                                );
                                                            }

                                                            const newValue = parseInt(e.target.value, 10);
                                                            if (newValue >= 0 && newValue <= 17) {
                                                                setChildrenAges((prev) => {
                                                                    const temp = [...prev];
                                                                    temp[index] = newValue;
                                                                    return temp;
                                                                });
                                                            }
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

                    <div className="md:ml-1.5">
                        <button
                            onClick={(e) => handleSubmit(e)}
                            className="btn rounded-lg bg-[#FFA732] text-white border-none h-[52px] w-full md:w-fit"
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
