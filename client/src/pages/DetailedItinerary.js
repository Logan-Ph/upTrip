import { Link } from "react-router-dom";

export default function DetailedItinerary() {
    return (
        <>
            <div className="md:px-10 bg-[#FAFBFC]">
                <div className="mx-auto max-w-8xl px-6 py-10">
                    <div className="flex justify-between mb-2">
                        <p className="font-bold text-3xl">
                            Summer Vaction in Da Nang
                        </p>
                        <div>
                            <button
                                className=" p-4 text-2xl font-semibold border-none bg-transparent"
                                onClick={() =>
                                    document
                                        .getElementById(
                                            "create_itinerary_modal"
                                        )
                                        .showModal()
                                }
                            >
                                <i class="fa-solid fa-pen-to-square"></i>
                            </button>
                            <dialog
                                id="create_itinerary_modal"
                                className="modal"
                            >
                                <div className="modal-box">
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
                                                className="block mb-2 text-sm font-medium text-gray-900"
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
                    </div>
                    <div>
                        <p className="text-gray-500 font-thin text-lg mb-4">
                            Counting down the days until our family adventure in
                            Danang this June! ☀️🌴 5 days of excitement await us
                            as we explore the beautiful beaches, indulge in
                            delicious local cuisine, and create unforgettable
                            memories together. Let the countdown to summer
                            vacation begin! 🏖️😎
                        </p>
                    </div>
                    {/* Cover Image */}
                    <div className="mb-14">
                        <figure className="relative">
                            <img
                                className="rounded-lg w-full h-[450px] object-cover"
                                src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/428850473.jpg?k=2d17b2dd618528271d24068071f67168b6aa7179b9a5c812f48b2e13f97ab146&o=&hp=1"
                                alt="image description"
                            />

                            <figcaption className="absolute px-4 text-lg text-white bottom-6">
                                <div className="flex items-baseline">
                                    <div>
                                        <p class="text-white text-sm md:text-lg">
                                            <i class="fa-solid fa-location-dot"></i>
                                            &ensp; Ho Chi Minh City
                                        </p>
                                    </div>
                                    <div className="divider divider-horizontal"></div>

                                    <div>
                                        <p class="text-white text-sm md:text-lg mt-4 mb-2">
                                            <i class="fa-regular fa-calendar"></i>
                                            &ensp; Mar 6{" "}
                                            <i class="fa-solid fa-arrow-right"></i>{" "}
                                            Mar 20, 2024
                                        </p>
                                    </div>
                                </div>
                            </figcaption>
                        </figure>
                    </div>

                    <div className="my-4 pb-10">
                        <p className="font-semibold text-2xl my-4">Stay(s)</p>

                        {/*  Stays List */}
                        <div class="card card-side rounded-lg md:bg-base-100 md:shadow-xl">
                            <Link>
                                <figure className="rounded-l-lg h-full">
                                    <img
                                        src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/228033379.jpg?k=5559966043302855e467dfa2c28ad78034f95b8ffaec437ca19004ba936c7b49&o=&hp=1"
                                        alt="Itinerary Cover Pic"
                                        className="w-[150px] h-[150px] md:w-[380px] md:h-full object-cover"
                                    />
                                </figure>
                            </Link>

                            <div class="card-body flex-1 p-0 px-4 md:p-7">
                                <div className="flex justify-between items-center mb-2">
                                    <div>
                                        <img
                                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Booking.com_logo.svg/1280px-Booking.com_logo.svg.png"
                                            alt="Logo of platform"
                                            className="w-[120px]"
                                        />
                                    </div>
                                    <div>
                                        <button
                                            className="bg-transparent text-lg border-n"
                                            onClick={() =>
                                                document
                                                    .getElementById(
                                                        "edit_itinerary_card_modal"
                                                    )
                                                    .showModal()
                                            }
                                        >
                                            <i class="fa-solid fa-ellipsis-vertical"></i>
                                        </button>
                                        <dialog
                                            id="edit_itinerary_card_modal"
                                            className="modal modal-bottom sm:modal-middle"
                                        >
                                            <div className="modal-box">
                                                <h3 className="font-bold text-lg text-center">
                                                    Are you sure you want to
                                                    delete
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
                                <Link>
                                    <h2 class="card-title text-base md:text-2xl hover:underline underline-offset-4 mb-4">
                                        InterContinental Da Nang Sun Peninsula
                                        Resort
                                    </h2>
                                </Link>
                                <div className="flex flex-col md:flex-row md:space-x-20 mb-4">
                                    <div className="flex items-center space-x-4">
                                        <div className="text-xl text-gray-600">
                                            <i class="fa-regular fa-calendar"></i>
                                        </div>
                                        <div>
                                            <p className="text-gray-600">
                                                Check-out
                                            </p>
                                            <p className="font-semibold">
                                                24.03.20024
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <div className="text-xl text-gray-600">
                                            <i class="fa-regular fa-calendar"></i>
                                        </div>
                                        <div>
                                            <p className="text-gray-600">
                                                Check-in
                                            </p>
                                            <p className="font-semibold">
                                                18.03.20024
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-between items-end">
                                    <div className="flex items-center space-x-4">
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
                                    <div className="font-bold text-2xl">
                                        1.200.000
                                    </div>
                                </div>
                                <div class="card-actions md:justify-between flex-col md:flex-row md:items-end flex-1"></div>
                            </div>
                        </div>
                    </div>

                    <div className="my-4 pb-10">
                        <p className="font-semibold text-2xl my-4">Flight(s)</p>

                        {/*  Flights List */}
                        <div class="card card-side rounded-lg md:bg-base-100 md:shadow-xl">
                            <div class="card-body flex-1 p-0 px-4 md:p-7">
                                <div className="flex justify-between items-center mb-2">
                                    <div className="font-thin text-xl">
                                        <p>Tue, Mar 18</p>
                                    </div>
                                    <div>
                                        <button
                                            className="bg-transparent text-lg border-n"
                                            onClick={() =>
                                                document
                                                    .getElementById(
                                                        "edit_itinerary_card_modal"
                                                    )
                                                    .showModal()
                                            }
                                        >
                                            <i class="fa-solid fa-ellipsis-vertical"></i>
                                        </button>
                                        <dialog
                                            id="edit_itinerary_card_modal"
                                            className="modal modal-bottom sm:modal-middle"
                                        >
                                            <div className="modal-box">
                                                <h3 className="font-bold text-lg text-center">
                                                    Are you sure you want to
                                                    delete
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
                                <Link>
                                    <img
                                        src="https://www.vietnamairlines.com/~/media/Images/VNANew/Home/Logo%20Header/logo_vna-mobile.png"
                                        alt="Logo of platform"
                                        className="w-[200px]"
                                    />
                                </Link>
                                <div className="flex  mb-4 items-center justify-around px-10">
                                    <p className="font-semibold text-lg flex justify-end">
                                        12:00 pm
                                    </p>
                                    <p className="font-thin text-lg flex justify-end">
                                        Ho Chi Minh City (SGN)
                                    </p>
                                    <div className="mx-4">
                                        <i class="fa-solid fa-plane"></i>
                                    </div>
                                    <p className="font-thin text-lg">
                                        Ha Noi (HAN)
                                    </p>
                                    <p className="font-semibold text-lg">
                                        14:00 pm
                                    </p>
                                </div>
                                <div className="flex justify-end">
                                    <div className="font-bold text-2xl">
                                        1.200.000
                                    </div>
                                </div>
                                <div class="card-actions md:justify-between flex-col md:flex-row md:items-end flex-1"></div>
                            </div>
                        </div>
                    </div>

                    <div className="my-4 pb-10">
                        <p className="font-semibold text-2xl my-4">Schedule</p>
                        <div className="ml-4">
                            <p className="font-semibold text-xl py-4">
                                Day one (19/03/2024)
                            </p>
                            <div className="flex flex-col">
                                {/* Items */}
                                <div className="flex items-center my-2">
                                    <div className="mx-4 text-3xl">
                                        <i class="fa-solid fa-circle-check"></i>
                                    </div>
                                    {/*Schedule Item */}
                                    <div class="flex-1 card card-side rounded-lg md:bg-base-100 md:shadow-md">
                                        <Link>
                                            <figure className="rounded-l-lg h-full">
                                                <img
                                                    src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/228033379.jpg?k=5559966043302855e467dfa2c28ad78034f95b8ffaec437ca19004ba936c7b49&o=&hp=1"
                                                    alt="Itinerary Cover Pic"
                                                    className="w-[150px] h-[150px] md:w-[380px] md:h-full object-cover"
                                                />
                                            </figure>
                                        </Link>

                                        <div class="card-body flex-1 p-0 px-4 md:p-7">
                                            <div className="flex justify-between items-center mb-2">
                                                <div>
                                                    <img
                                                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Booking.com_logo.svg/1280px-Booking.com_logo.svg.png"
                                                        alt="Logo of platform"
                                                        className="w-[120px]"
                                                    />
                                                </div>
                                                <div>
                                                    <button
                                                        className="bg-transparent text-lg border-n"
                                                        onClick={() =>
                                                            document
                                                                .getElementById(
                                                                    "edit_itinerary_card_modal"
                                                                )
                                                                .showModal()
                                                        }
                                                    >
                                                        <i class="fa-solid fa-ellipsis-vertical"></i>
                                                    </button>
                                                    <dialog
                                                        id="edit_itinerary_card_modal"
                                                        className="modal modal-bottom sm:modal-middle"
                                                    >
                                                        <div className="modal-box">
                                                            <h3 className="font-bold text-lg text-center">
                                                                Are you sure you
                                                                want to delete
                                                            </h3>
                                                            <p className="py-4 text-center">
                                                                "Summer Trip"
                                                                itinerary
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
                                            <Link>
                                                <h2 class="card-title text-base md:text-2xl hover:underline underline-offset-4 mb-4">
                                                    InterContinental Da Nang Sun
                                                    Peninsula Resort
                                                </h2>
                                            </Link>
                                            <div className="mb-2">
                                                <p className="text-gray-600">
                                                    The theme park is a popular
                                                    day trip from the coastal
                                                    city of Da Nang, about a
                                                    45-minute drive. Have
                                                    fantastic cable car ride,
                                                    Golden Bridge. The theme
                                                    park is a popular day trip
                                                    from the coastal city of Da
                                                    Nang, about a 45-minute
                                                    drive. Have fantastic cable
                                                    car ride, Golden Bridge
                                                </p>
                                            </div>

                                            <div className="flex justify-between items-end">
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
                                                <div className="font-bold text-2xl">
                                                    1.200.000
                                                </div>
                                            </div>
                                            <div class="card-actions md:justify-between flex-col md:flex-row md:items-end flex-1"></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center my-2">
                                    <div className="mx-4 text-3xl">
                                        <i class="fa-regular fa-circle"></i>
                                    </div>
                                    {/*Schedule Item */}
                                    <div class="flex-1 card card-side rounded-lg md:bg-base-100 md:shadow-md">
                                        <Link>
                                            <figure className="rounded-l-lg h-full">
                                                <img
                                                    src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/228033379.jpg?k=5559966043302855e467dfa2c28ad78034f95b8ffaec437ca19004ba936c7b49&o=&hp=1"
                                                    alt="Itinerary Cover Pic"
                                                    className="w-[150px] h-[150px] md:w-[380px] md:h-full object-cover"
                                                />
                                            </figure>
                                        </Link>

                                        <div class="card-body flex-1 p-0 px-4 md:p-7">
                                            <div className="flex justify-between items-center mb-2">
                                                <div>
                                                    <img
                                                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Booking.com_logo.svg/1280px-Booking.com_logo.svg.png"
                                                        alt="Logo of platform"
                                                        className="w-[120px]"
                                                    />
                                                </div>
                                                <div>
                                                    <button
                                                        className="bg-transparent text-lg border-n"
                                                        onClick={() =>
                                                            document
                                                                .getElementById(
                                                                    "edit_itinerary_card_modal"
                                                                )
                                                                .showModal()
                                                        }
                                                    >
                                                        <i class="fa-solid fa-ellipsis-vertical"></i>
                                                    </button>
                                                    <dialog
                                                        id="edit_itinerary_card_modal"
                                                        className="modal modal-bottom sm:modal-middle"
                                                    >
                                                        <div className="modal-box">
                                                            <h3 className="font-bold text-lg text-center">
                                                                Are you sure you
                                                                want to delete
                                                            </h3>
                                                            <p className="py-4 text-center">
                                                                "Summer Trip"
                                                                itinerary
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
                                            <Link>
                                                <h2 class="card-title text-base md:text-2xl hover:underline underline-offset-4 mb-4">
                                                    InterContinental Da Nang Sun
                                                    Peninsula Resort
                                                </h2>
                                            </Link>
                                            <div className="mb-2">
                                                <p className="text-gray-600">
                                                    The theme park is a popular
                                                    day trip from the coastal
                                                    city of Da Nang, about a
                                                    45-minute drive. Have
                                                    fantastic cable car ride,
                                                    Golden Bridge. The theme
                                                    park is a popular day trip
                                                    from the coastal city of Da
                                                    Nang, about a 45-minute
                                                    drive. Have fantastic cable
                                                    car ride, Golden Bridge
                                                </p>
                                            </div>

                                            <div className="flex justify-between items-end">
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
                                                <div className="font-bold text-2xl">
                                                    1.200.000
                                                </div>
                                            </div>
                                            <div class="card-actions md:justify-between flex-col md:flex-row md:items-end flex-1"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Button */}
                            <div className="flex justify-center my-4">
                                <div className="btn bg-[#9A9A9A] rounded-3xl text-white">
                                    Add Items
                                </div>
                            </div>
                        </div>

                        {/* Another day */}
                        <div className="ml-4">
                            <p className="font-semibold text-xl py-4">
                                Day two (20/03/2024)
                            </p>
                            <div className="flex flex-col">
                                {/* Items */}
                                <div className="flex items-center my-2">
                                    <div className="mx-4 text-3xl">
                                        <i class="fa-solid fa-circle-check"></i>
                                    </div>
                                    {/*Schedule Item */}
                                    <div class="flex-1 card card-side rounded-lg md:bg-base-100 md:shadow-md">
                                        <Link>
                                            <figure className="rounded-l-lg h-full">
                                                <img
                                                    src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/228033379.jpg?k=5559966043302855e467dfa2c28ad78034f95b8ffaec437ca19004ba936c7b49&o=&hp=1"
                                                    alt="Itinerary Cover Pic"
                                                    className="w-[150px] h-[150px] md:w-[380px] md:h-full object-cover"
                                                />
                                            </figure>
                                        </Link>

                                        <div class="card-body flex-1 p-0 px-4 md:p-7">
                                            <div className="flex justify-between items-center mb-2">
                                                <div>
                                                    <img
                                                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Booking.com_logo.svg/1280px-Booking.com_logo.svg.png"
                                                        alt="Logo of platform"
                                                        className="w-[120px]"
                                                    />
                                                </div>
                                                <div>
                                                    <button
                                                        className="bg-transparent text-lg border-n"
                                                        onClick={() =>
                                                            document
                                                                .getElementById(
                                                                    "edit_itinerary_card_modal"
                                                                )
                                                                .showModal()
                                                        }
                                                    >
                                                        <i class="fa-solid fa-ellipsis-vertical"></i>
                                                    </button>
                                                    <dialog
                                                        id="edit_itinerary_card_modal"
                                                        className="modal modal-bottom sm:modal-middle"
                                                    >
                                                        <div className="modal-box">
                                                            <h3 className="font-bold text-lg text-center">
                                                                Are you sure you
                                                                want to delete
                                                            </h3>
                                                            <p className="py-4 text-center">
                                                                "Summer Trip"
                                                                itinerary
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
                                            <Link>
                                                <h2 class="card-title text-base md:text-2xl hover:underline underline-offset-4 mb-4">
                                                    InterContinental Da Nang Sun
                                                    Peninsula Resort
                                                </h2>
                                            </Link>
                                            <div className="mb-2">
                                                <p className="text-gray-600">
                                                    The theme park is a popular
                                                    day trip from the coastal
                                                    city of Da Nang, about a
                                                    45-minute drive. Have
                                                    fantastic cable car ride,
                                                    Golden Bridge. The theme
                                                    park is a popular day trip
                                                    from the coastal city of Da
                                                    Nang, about a 45-minute
                                                    drive. Have fantastic cable
                                                    car ride, Golden Bridge
                                                </p>
                                            </div>

                                            <div className="flex justify-between items-end">
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
                                                <div className="font-bold text-2xl">
                                                    1.200.000
                                                </div>
                                            </div>
                                            <div class="card-actions md:justify-between flex-col md:flex-row md:items-end flex-1"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Button */}
                            <div className="flex justify-center my-4">
                                <div className="btn bg-[#9A9A9A] rounded-3xl text-white">
                                    Add Items
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
