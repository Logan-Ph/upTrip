import React, { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { StayCard } from "../components/ItineraryCard";
import { AddItemButton } from "../components/ItineraryCard";
import { FlightCard } from "../components/ItineraryCard";
import { EmptySection } from "../components/ItineraryCard";
import { ActivityCard } from "../components/ItineraryCard";
import { BudgetCard } from "../components/ItineraryCard";
import AuthContext from "../context/AuthProvider";
import { useMutation, useQuery } from "@tanstack/react-query";
import { editItinerary, fetchDetailItinerary, deleteItinerary } from "../api/fetch";
import warningNotify from "../utils/warningNotify";
import successNotify from "../utils/successNotify";
import useHandleNavigate from "../utils/useHandleNavigate";

export default function DetailedItinerary() {
    const handleNavigate = useHandleNavigate();
    const [searchParams] = useSearchParams();
    const [activeTab, setActiveTab] = useState(1); // Default active tab is 1
    const { auth } = useContext(AuthContext);
    const [name, setName] = useState()
    const [description, setDescription] = useState()
    const [destination, setDestination] = useState()
    const [tripLength, setTripLength] = useState(1)
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const formattedDate  = (date) => date.replace(/-/g, '');
    const convertDate = (date) => `${date.substring(6, 8)}-${date.substring(4, 6)}-${date.substring(0, 4)}`

    const handleTabClick = (tabNumber) => {
        setActiveTab(tabNumber);
    };

    const {
        data: itinerary,
        isLoading: itineraryLoading,
        refetch: refetchItinerary,
        isError: isErrorItinerary,
        isSuccess: isSuccessItinerary
    } = useQuery({
        queryKey: ['itinerary'],
        queryFn: () => fetchDetailItinerary({ itineraryId: searchParams.get('itineraryId') }),
        retry: 0,
        refetchOnWindowFocus: false,
    })

    
    useEffect(() => {
        if (!auth?.accessToken) {
            handleNavigate('/login')
        }

        if (isErrorItinerary) {
            handleNavigate('/itinerary')
        }

    }, [auth, handleNavigate, isErrorItinerary])

    useEffect(() => {
        if (!itineraryLoading) {
            setName(itinerary?.name)
            setDescription(itinerary?.description)
            setDestination(itinerary?.destination)
            setTripLength(itinerary?.tripLength)
            setStartDate(itinerary?.startDate)
            setEndDate(itinerary?.endDate)
        }
    }, [itinerary, itineraryLoading])

    const edit = useMutation({
        mutationFn: () => editItinerary({
            itineraryId: searchParams.get('itineraryId'),
            name: name,
            description: description,
            destination: destination,
            startDate: formattedDate(startDate) || null,
            endDate: formattedDate(endDate) || null,
            tripLength
        }),
        onSuccess: (data) => {
            successNotify(data.data)
            refetchItinerary()
            document
                .getElementById(
                    "edit_itinerary_modal"
                )
                .close()
        },
        onError: (error) => {
            warningNotify(error.response.data);
        }
    })

    const handleDeleteItinerary = useMutation({
        mutationFn: () => deleteItinerary({ itineraryId: itinerary._id }),
        onSuccess: (data) => {
            successNotify(data.data)
            handleNavigate('/itinerary')
        },
        onError: (error) => {
            warningNotify(error.response.data);
        }
    })

    const handleDelete = (e) => {
        e.preventDefault()
        handleDeleteItinerary.mutate()
    }

    const handleEdit = (e) => {
        e.preventDefault()
        edit.mutate()
    }

    const generateScheduleDates = (startDate, endDate, experiences) => {
        const formatDate = (dateStr) => {
            return `${dateStr?.substring(0, 4)}-${dateStr?.substring(4, 6)}-${dateStr?.substring(6, 8)}`;
        };
    
        const formatDisplayDate = (date) => {
            return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
        };
    
        let dates = [];
        let currentDate = new Date(formatDate(startDate));
        const end = new Date(formatDate(endDate));
    
        // Sort experiences by start time
        const sortedExperiences = experiences?.sort((a, b) => {
            const timeA = a.startTime; // Assuming startTime is in a comparable format, e.g., 'HH:MM'
            const timeB = b.startTime;
            return timeA?.localeCompare(timeB);
        });
    
        // Create a map to store experiences by their start date
        const experienceMap = sortedExperiences?.reduce((acc, experience) => {
            const expDate = experience.startDate.replace(/-/g, '');
            if (!acc[expDate]) {
                acc[expDate] = [];
            }
            acc[expDate].push(experience);
            return acc;
        }, {});
    
        while (currentDate <= end) {
            const formattedDate = formatDisplayDate(currentDate);
            const dateKey = currentDate.toISOString().split('T')[0].replace(/-/g, '');
            const convertDate = (date) =>  `${date.substring(6, 8)}/${date.substring(4, 6)}/${date.substring(0, 4)}`;
            dates.push({
                date: formattedDate,
                experiences: experienceMap[convertDate(dateKey)] || []
            });
            currentDate.setDate(currentDate.getDate() + 1);
        }
    
        return dates;
    };
    
    // Assuming startDate and endDate are available in your state or props
    const scheduleDates = generateScheduleDates(itinerary?.startDate, itinerary?.endDate, itinerary?.experiences);

    return (
        <>
            <div className="md:px-10 bg-[#FAFBFC]">
                <div className="mx-auto max-w-8xl px-6">
                    {/* Skeleton loading */}
                    {itineraryLoading && (
                        <div className="p-80 flex justify-center">
                            <span className="loading loading-spinner loading-lg"></span>
                        </div>
                    )}
                    {/* Details */}
                    <div className="md:flex">
                        <div className="mx-auto max-w-8xl md:px-6 py-4 md:py-10">
                            <div className="flex justify-between mb-2">
                                <p className="font-bold text-3xl">
                                    {itinerary?.name}
                                </p>
                                <div>
                                    <button
                                        className=" p-4 text-2xl font-semibold border-none bg-transparent"
                                        onClick={() =>
                                            document
                                                .getElementById(
                                                    "edit_itinerary_modal"
                                                )
                                                .showModal()
                                        }
                                    >
                                        <i class="fa-solid fa-pen-to-square"></i>
                                    </button>
                                    <dialog
                                        id="edit_itinerary_modal"
                                        className="modal"
                                    >
                                        <div className="modal-box px-10">
                                            <form method="dialog">
                                                {/* if there is a button in form, it will close the modal */}
                                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                                    ✕
                                                </button>
                                            </form>
                                            <h3 className="font-bold text-2xl my-5">
                                                Edit itinerary details
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
                                                            setName(
                                                                e.target.value
                                                            )
                                                        }
                                                        value={name}
                                                        type="text"
                                                        id="name"
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md w-full p-3 focus:ring-black focus:border-black"
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
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            value={destination}
                                                            type="search"
                                                            id="destination"
                                                            className="block w-full p-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-black focus:border-black"
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
                                                            setDescription(
                                                                e.target.value
                                                            )
                                                        }
                                                        value={description}
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
                                                        Dates or Length of stay
                                                        (optional)
                                                    </label>

                                                    {/*  */}

                                                    <div className="max-w-md mx-auto">
                                                        <div className="flex border-b border-gray-200 rounded-full bg-gray-300">
                                                            <button
                                                                className={`px-4 py-2 text-base focus:outline-none w-1/2 ${
                                                                    activeTab ===
                                                                    1
                                                                        ? "text-gray-900 font-semibold bg-white m-[3px] rounded-full"
                                                                        : "text-black font-thin"
                                                                }`}
                                                                onClick={() =>
                                                                    handleTabClick(
                                                                        1
                                                                    )
                                                                }
                                                            >
                                                                Dates
                                                            </button>
                                                            <button
                                                                className={`px-4 py-2 text-base focus:outline-none w-1/2 ${
                                                                    activeTab ===
                                                                    2
                                                                        ? "text-gray-900 font-semibold bg-white m-[3px] rounded-full"
                                                                        : "text-black font-thin"
                                                                }`}
                                                                onClick={() =>
                                                                    handleTabClick(
                                                                        2
                                                                    )
                                                                }
                                                            >
                                                                Trip length
                                                            </button>
                                                        </div>
                                                        <div className="mt-4">
                                                            {activeTab ===
                                                                1 && (
                                                                <div className="my-6 mb-10">
                                                                    {/* Datepicker */}
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
                                                                                        min={
                                                                                            new Date()
                                                                                                .toISOString()
                                                                                                .split(
                                                                                                    "T"
                                                                                                )[0]
                                                                                        } // Set min date to today
                                                                                        max={
                                                                                            endDate ||
                                                                                            ""
                                                                                        } // Set max date to endDate if it exists
                                                                                        onChange={(
                                                                                            e
                                                                                        ) => {
                                                                                            const newStartDate =
                                                                                                e
                                                                                                    .target
                                                                                                    .value;
                                                                                            setStartDate(
                                                                                                newStartDate
                                                                                            );
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
                                                                                    <span class="datepicker-toggle-button"></span>
                                                                                    <input
                                                                                        id="to-date"
                                                                                        type="date"
                                                                                        className="datepicker-input p-2.5 pt-5 rounded-lg w-[260px] md:w-[210px]"
                                                                                        min={
                                                                                            startDate ||
                                                                                            new Date()
                                                                                                .toISOString()
                                                                                                .split(
                                                                                                    "T"
                                                                                                )[0]
                                                                                        } // Ensure end date is not before start date
                                                                                        onChange={(
                                                                                            e
                                                                                        ) => {
                                                                                            const newEndDate =
                                                                                                e
                                                                                                    .target
                                                                                                    .value;
                                                                                            if (
                                                                                                newEndDate <
                                                                                                startDate
                                                                                            ) {
                                                                                                setStartDate(
                                                                                                    newEndDate
                                                                                                );
                                                                                            }
                                                                                            setEndDate(
                                                                                                newEndDate
                                                                                            );
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
                                                            {activeTab ===
                                                                2 && (
                                                                <div className="flex justify-between my-6 mb-10">
                                                                    <p className="text-base">
                                                                        Number
                                                                        of days
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
                                                                            {tripLength ||
                                                                                1}
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
                                                <div className="divider"></div>
                                                <div className="mb-5">
                                                    <button
                                                        className="btn bg-transparent border-none shadow-none text-red-400 hover:text-red-500"
                                                        onClick={() =>
                                                            document
                                                                .getElementById(
                                                                    "delete_modal"
                                                                )
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
                                                        </svg>{" "}
                                                        Delete Trip
                                                    </button>

                                                    <dialog
                                                        id="delete_modal"
                                                        className="modal modal-bottom sm:modal-middle"
                                                    >
                                                        <div className="bg-white py-10 rounded-xl max-w-4xl px-10">
                                                            <h3 className="font-bold text-2xl mt-4">
                                                                Delete
                                                                Itinerary?
                                                            </h3>
                                                            <p className="pt-4 text-lg">
                                                                Are you sure you
                                                                want to delete
                                                                this Itinerary?
                                                                Deleting a
                                                                Itinerary will
                                                                delete all the
                                                                items and notes
                                                                you have added
                                                                to it. The
                                                                Itinerary cannot
                                                                be retrieved
                                                                once it is
                                                                deleted.
                                                            </p>
                                                            <div className="modal-action mt-3">
                                                                <form method="dialog">
                                                                    {/* if there is a button in form, it will close the modal */}
                                                                    <button className="btn rounded-3xl mx-2">
                                                                        Cancel
                                                                    </button>
                                                                    <button
                                                                        onClick={
                                                                            handleDelete
                                                                        }
                                                                        className="btn bg-black text-white rounded-3xl"
                                                                    >
                                                                        Delete
                                                                    </button>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </dialog>
                                                </div>
                                            </div>
                                            <div className="flex justify-end">
                                                <button
                                                    onClick={(e) =>
                                                        handleEdit(e)
                                                    }
                                                    className="flex btn btn-outline w-full justify-center"
                                                >
                                                    Save Changes
                                                </button>
                                            </div>
                                        </div>
                                    </dialog>
                                </div>
                            </div>
                            <div>
                                <p className="text-gray-500 font-thin text-lg mb-4">
                                    {itinerary?.description}
                                </p>
                            </div>
                            {/* Cover Image */}
                            <div className="mb-14">
                                <figure className="relative">
                                    <img
                                        className="rounded-lg w-full h-[450px] object-cover"
                                        src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/428850473.jpg?k=2d17b2dd618528271d24068071f67168b6aa7179b9a5c812f48b2e13f97ab146&o=&hp=1"
                                        alt="description"
                                    />

                                    <figcaption className="absolute px-8  text-white bottom-6">
                                        <div className="flex items-baseline flex-col md:flex-row">
                                            <div>
                                                <p class="text-white text-sm md:text-2xl">
                                                    <i class="fa-solid fa-location-dot"></i>
                                                    &ensp;{" "}
                                                    {itinerary?.destination}
                                                </p>
                                            </div>
                                            <div className="divider divider-horizontal"></div>

                                            <div>
                                                <p class="text-white text-sm md:text-2xl mt-4 mb-2">
                                                    {itinerary?.startDate ? (
                                                        <span>
                                                            <i class="fa-regular fa-calendar"></i>
                                                            &ensp;{" "}
                                                            {convertDate(
                                                                itinerary?.startDate
                                                            )}{" "}
                                                            <i class="fa-solid fa-arrow-right"></i>{" "}
                                                            {convertDate(
                                                                itinerary?.endDate
                                                            )}
                                                        </span>
                                                    ) : (
                                                        <span>
                                                            <i class="fa-regular fa-calendar"></i>
                                                            &ensp;{" "}
                                                            {
                                                                itinerary?.tripLength
                                                            }{" "}
                                                            day(s)
                                                        </span>
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    </figcaption>
                                </figure>
                            </div>

                            {/* Stay */}
                            <div className="my-4 pb-10">
                                <p className="font-semibold text-2xl my-4">
                                    Stay(s)
                                </p>

                                {/*  Stays List */}
                                {itineraryLoading ? (
                                    <StayCardSkeleton />
                                ) : itinerary?.hotels?.length === 0 ? (
                                    <EmptySection
                                        refetchItinerary={refetchItinerary}
                                        isAddingExperience={false}
                                    />
                                ) : (
                                    <>
                                        {itinerary?.hotels?.map((stay) => (
                                            <StayCard
                                                key={stay.id}
                                                item={stay}
                                                refetchItinerary={
                                                    refetchItinerary
                                                }
                                            />
                                        ))}
                                        <AddItemButton
                                            refetchItinerary={refetchItinerary}
                                            isAddingExperience={false}
                                        />
                                    </>
                                )}
                            </div>

                            {/* Flight */}
                            <div className="my-4 pb-10">
                                <p className="font-semibold text-2xl my-4">
                                    Flight(s)
                                </p>

                                {/*  Flights List */}
                                {itineraryLoading ? (
                                    <FlightCardSkeleton />
                                ) : itinerary?.flights?.length === 0 ? (
                                    <EmptySection />
                                ) : (
                                    <>
                                        {itinerary?.flights?.map((flight) => (
                                            <FlightCard
                                                key={flight.id}
                                                item={flight}
                                                refetchItinerary={
                                                    refetchItinerary
                                                }
                                            />
                                        ))}
                                        <AddItemButton
                                            refetchItinerary={refetchItinerary}
                                            isAddingExperience={false}
                                        />
                                    </>
                                )}
                            </div>

                            {/* Schedule */}
                            <div className="my-4 pb-10">
                                <p className="font-semibold text-2xl my-4">
                                    Schedule
                                </p>
                                {scheduleDates.map((schedule, index) => (
                                    <div key={index} className="ml-4">
                                        <p className="font-semibold text-xl py-4">
                                            Day {index + 1} ({schedule.date})
                                        </p>
                                        <div className="flex flex-col">
                                            {schedule.experiences.length > 0 ? (
                                                <>
                                                    {schedule.experiences.map(
                                                        (
                                                            experience,
                                                            expIndex
                                                        ) => (
                                                            <div
                                                                key={expIndex}
                                                                className="flex items-center"
                                                            >
                                                                <ActivityCard
                                                                    experience={
                                                                        experience
                                                                    }
                                                                    refetchItinerary={
                                                                        refetchItinerary
                                                                    }
                                                                />
                                                            </div>
                                                        )
                                                    )}
                                                    <AddItemButton
                                                        refetchItinerary={
                                                            refetchItinerary
                                                        }
                                                        isAddingExperience={
                                                            true
                                                        }
                                                        date={schedule.date}
                                                    />
                                                </>
                                            ) : (
                                                <>
                                                    <EmptySection
                                                        refetchItinerary={
                                                            refetchItinerary
                                                        }
                                                        isAddingExperience={
                                                            true
                                                        }
                                                        date={schedule.date}
                                                    />
                                                </>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Budget */}
                            <div className="md:hidden">
                                <p className="font-semibold text-2xl mt-4">
                                    Budget
                                </p>
                            </div>
                        </div>
                        <div className="md:w-5/12 mb-10">
                            <BudgetCard itinerary={itinerary} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

function StayCardSkeleton() {
    return (
        <>
            <div className="grid grid-cols-2 card card-compact w-94 md:w-auto bg-white shadow-xl rounded-md">
                <figure className="skeleton h-72 rounded-t-md rounded-b-none"></figure>
                <div className="card-body my-2">
                    <div className="flex flex-row justify-between ">
                        <div class="flex flex-col gap-4 w-full">
                            <div class="skeleton h-10 w-28"></div>
                            <div class="skeleton h-4 w-full"></div>
                            <div class="skeleton h-4 w-full"></div>
                            <div class="skeleton h-4 w-full"></div>
                            <div class="skeleton h-4 w-20"></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function FlightCardSkeleton() {
    return (
        <>
            <figure className="skeleton w-auto h-[230px] rounded-t-md rounded-b-none"></figure>
        </>
    )
}
