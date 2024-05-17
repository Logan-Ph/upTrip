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
            navigate("/login");
        }
    }, [auth, navigate]);

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
    const formattedDate = (date) => date.replace(/-/g, '');


    const getItinerary = useQuery({
        queryKey: ["fetch-itinerary"],
        queryFn: () => fetchItinerary(),
        retry: false,
        refetchOnWindowFocus: false,
    });

    const createItinerary = useMutation({
        mutationFn: () =>
            addNewItinerary({
                name,
                destination,
                description,
                startDate: formattedDate(startDate),
                endDate: formattedDate(endDate),
                tripLength,
            }),
        onSuccess: (data) => {
            successNotify(data.data);
            getItinerary.refetch();
        },
        onError: (error) => {
            warningNotify(error.response.data);
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!destination || !name || !((startDate && endDate) || tripLength)) {
            warningNotify("Please fill in all the fields");
            return;
        }

        createItinerary.mutate();
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
                            <div className="modal-box px-10" style={{ zIndex: 100 }}>
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
                                            onChange={(e) =>
                                                setName(e.target.value)
                                            }
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
                                                onChange={(e) =>
                                                    setDestination(
                                                        e.target.value
                                                    )
                                                }
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
                                            onChange={(e) =>
                                                setDescription(e.target.value)
                                            }
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

                                                        <div className="flex flex-col md:flex-row my-2 justify-center">
                                                            <div class="relative w-full md:w-1/2 h-[60px]">
                                                                <div class="flex items-center">
                                                                    <span class="custom-datepicker-toggle">
                                                                        <span class="custom-datepicker-toggle-button">
                                                                            <i class="fa-regular fa-calendar"></i>
                                                                        </span>
                                                                        <input
                                                                            id="from-date"
                                                                            type="date"
                                                                            className="custom-datepicker-input p-2.5 pt-5 rounded-lg w-[260px] md:w-[210px]"
                                                                            min={new Date().toISOString().split('T')[0]} // Set min date to today
                                                                            max={endDate || ''} // Set max date to endDate if it exists
                                                                            onChange={(e) => {
                                                                                const newStartDate = e.target.value;
                                                                                setStartDate(newStartDate);
                                                                            }}
                                                                        />
                                                                    </span>
                                                                </div>
                                                                <div>
                                                                    <label
                                                                        for="from-date"
                                                                        class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-5 z-10 origin-[0] start-[11px] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                                                                    >
                                                                        From
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <div class="relative w-full md:w-1/2 h-[60px] justify-end">
                                                                <div class="flex items-center">
                                                                    <span class="datepicker-toggle">
                                                                        <span class="datepicker-toggle-button">
                                                                        </span>
                                                                        <input
                                                                            id="to-date"
                                                                            type="date"
                                                                            className="datepicker-input p-2.5 pt-5 rounded-lg w-[260px] md:w-[210px]"
                                                                            min={startDate || new Date().toISOString().split('T')[0]} // Ensure end date is not before start date
                                                                            onChange={(e) => {
                                                                                const newEndDate = e.target.value;
                                                                                if (newEndDate < startDate) {
                                                                                    setStartDate(newEndDate);
                                                                                }
                                                                                setEndDate(newEndDate);
                                                                            }}
                                                                        />
                                                                    </span>
                                                                </div>
                                                                <div>
                                                                    <label
                                                                        for="to-date"
                                                                        class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-5 z-10 origin-[0] start-[11px] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                                                                    >
                                                                        To
                                                                    </label>
                                                                </div>
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
                                                                    setTripLength(
                                                                        (
                                                                            prev
                                                                        ) =>
                                                                            prev ===
                                                                                1
                                                                                ? prev
                                                                                : prev -
                                                                                1
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
                                                                    setTripLength(
                                                                        (
                                                                            prev
                                                                        ) =>
                                                                            prev +
                                                                            1
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
                                                )}
                                            </div>
                                        </div>
                                        {/*  */}
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        onClick={handleSubmit}
                                        className="flex btn btn-outline w-full justify-center"
                                    >
                                        Create
                                    </button>
                                </div>
                            </div>
                        </dialog>
                    </div>
                    {getItinerary.isSuccess ? (
                        getItinerary.data.data.map((item) => {
                            return (
                                <Suspense fallback={<ItineraryCardSkeleton />}>
                                    {" "}
                                    <ItineraryCard
                                        itinerary={item}
                                        getItinerary={getItinerary}
                                    />
                                </Suspense>
                            );
                        })
                    ) : (
                        <CollectionCardSkeleton />
                    )}
                </div>
            </div>
        </>
    );
}
