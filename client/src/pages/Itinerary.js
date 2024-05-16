
import CollectionCardSkeleton from "../components/skeletonLoadings/CollectionCardSkeleton";
import { Suspense, useState, useContext, useEffect, useRef } from "react";
import AuthContext from "../context/AuthProvider";
import Datepicker from "flowbite-datepicker/Datepicker";
import { ItineraryCard } from "../components/ItineraryCard";
import { useNavigate } from "react-router-dom";
import ItineraryCardSkeleton from "../components/skeletonLoadings/ItinerarySkeleton";
import { useMutation, useQuery } from "@tanstack/react-query";
import warningNotify from "../utils/warningNotify";
import successNotify from "../utils/successNotify";
import { addNewItinerary, fetchItinerary } from "../api/fetch";

export default function Itinerary() {
    const { auth } = useContext(AuthContext);
    const checkinDate = useRef();
    const checkoutDate = useRef();
    const [activeTab, setActiveTab] = useState(1); // Default active tab is 1
    const navigate = useNavigate();
    const handleTabClick = (tabNumber) => {
        setActiveTab(tabNumber);
    };

    useEffect(() => {
        if (!auth?.accessToken) {
            navigate('/login')
        }
    }, [auth, navigate])

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

    const [name, setName] = useState();
    const [destination, setDestination] = useState();
    const [description, setDescription] = useState();
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [tripLength, setTripLength] = useState(1);

    const getItinerary = useQuery({
        queryKey: ["fetch-itinerary"],
        queryFn: () => fetchItinerary(),
        retry: false,
        refetchOnWindowFocus: false,
    })

    const createItinerary = useMutation({
        mutationFn: () => addNewItinerary({ name, destination, description, startDate, endDate, tripLength }),
        onSuccess: (data) => {
            successNotify(data.data)
            getItinerary.refetch()
        },
        onError: (error) => {
            warningNotify(error.response.data);
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!destination || !description) {
            warningNotify("Please fill in all the fields")
            return
        }

        createItinerary.mutate();
    }

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
                                            onChange={e => setName(e.target.value)}
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
                                            <input
                                                onChange={e => setDestination(e.target.value)}
                                                type="text"
                                                id="destination"
                                                className="block w-full p-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-black focus:border-black"
                                                placeholder="Where to?"
                                                required
                                            />
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
                                            onChange={e => setDescription(e.target.value)}
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
                                                    className={`px-4 py-2 text-base focus:outline-none w-1/2 ${activeTab === 1
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
                                                    className={`px-4 py-2 text-base focus:outline-none w-1/2 ${activeTab === 2
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
                                                    <div className="my-6 mb-10">
                                                        {/* Datepicker */}
                                                        <div
                                                            date-rangepicker
                                                            class="flex items-center"
                                                        >
                                                            <div class="relative">
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
                                                                <input
                                                                    ref={checkinDate}
                                                                    datepicker
                                                                    datepicker-format="dd/mm/yyyy"
                                                                    name="start"
                                                                    type="text"
                                                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-full ps-10 p-2.5 "
                                                                    placeholder="Select date start"
                                                                    value={checkinDate.current?.value}
                                                                />
                                                            </div>
                                                            <span class="mx-4 text-gray-500">
                                                                to
                                                            </span>
                                                            <div class="relative">
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
                                                                <input
                                                                    ref={checkoutDate}
                                                                    datepicker
                                                                    datepicker-format="dd/mm/yyyy"
                                                                    name="end"
                                                                    type="text"
                                                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-full ps-10 p-2.5"
                                                                    placeholder="Select date end"
                                                                    value={checkoutDate.current?.value}
                                                                />
                                                            </div>
                                                        </div>
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
                                                                onClick={() =>
                                                                    setTripLength((prev) =>
                                                                        prev === 1
                                                                            ? prev
                                                                            : prev - 1
                                                                    )}
                                                            >
                                                                <path
                                                                    stroke-linecap="round"
                                                                    stroke-linejoin="round"
                                                                    d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                                                ></path>
                                                            </svg>
                                                            <span className="text-lg">
                                                                {tripLength}
                                                            </span>

                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                stroke-width="1.5"
                                                                stroke="currentColor"
                                                                className="w-6 h-6"
                                                                onClick={() =>
                                                                    setTripLength((prev) =>
                                                                        prev + 1
                                                                    )}
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
                                    <button
                                        onClick={handleSubmit}
                                        className="flex btn btn-outline w-full justify-center">
                                        Create
                                    </button>
                                </div>
                            </div>
                        </dialog>
                    </div>
                    {getItinerary.isSuccess ?
                        getItinerary.data.data.map((item) => {
                            return (
                                <Suspense fallback={<ItineraryCardSkeleton />}> <ItineraryCard itinerary={item} getItinerary={getItinerary} />
                                </Suspense>)
                        }) : <CollectionCardSkeleton />}
                </div>
            </div>
        </>
    );
}
