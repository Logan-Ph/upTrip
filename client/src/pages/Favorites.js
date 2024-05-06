import CollectionCardSkeleton from "../components/skeletonLoadings/CollectionCardSkeleton";

export default function Favorites() {
    return (
        <>
            <div className="md:px-10">
                <div className="mx-auto max-w-8xl px-6 py-10">
                    <p className="text-3xl font-semibold">
                        Favorite Collections
                    </p>
                    <div className="my-6 text-center">
                        <button
                            className="btn w-full border p-4 rounded-md font-semibold border-black bg-white"
                            onClick={() =>
                                document
                                    .getElementById("create_collection_modal")
                                    .showModal()
                            }
                        >
                            <i class="fa-solid fa-plus mr-2"></i> Create new
                            collection
                        </button>
                        <dialog id="create_collection_modal" className="modal">
                            <div className="modal-box">
                                <form method="dialog">
                                    {/* if there is a button in form, it will close the modal */}
                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                        ✕
                                    </button>
                                </form>
                                <h3 className="font-bold text-lg my-4">
                                    Create new collection
                                </h3>
                                <div>
                                    <div className="mb-5 text-start">
                                        <label
                                            for="name"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl w-full p-2.5"
                                            required
                                        />
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
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <button className="flex btn btn-outline btn-success justify-end">
                                        Save
                                    </button>
                                </div>
                            </div>
                        </dialog>
                    </div>

                    <div className="grid grid-cols-3 gap-12">
                        {/* Collection Card */}
                        <CollectionCardSkeleton/>
                        <div className="card card-compact w-94 md:w-auto bg-base-100 shadow-xl rounded-md">
                            <figure>
                                <img
                                    src="https://vcdn1-dulich.vnecdn.net/2022/06/03/cauvang-1654247842-9403-1654247849.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=Swd6JjpStebEzT6WARcoOA"
                                    alt="Cover"
                                />
                            </figure>
                            <div className="card-body my-2">
                                <div className="flex flex-row justify-between ">
                                    <h2 className="card-title text-3xl ml-2 pr-3">
                                        Da Nang
                                    </h2>
                                    <div className="card-actions justify-end">
                                        <button
                                            className="btn"
                                            onClick={() =>
                                                document
                                                    .getElementById(
                                                        "my_modal_1"
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
                                                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                                                />
                                            </svg>
                                        </button>
                                        <dialog
                                            id="my_modal_1"
                                            className="modal"
                                        >
                                            <div className="modal-box">
                                                <h3 className="font-bold text-lg my-4">
                                                    Edit collection
                                                </h3>
                                                <div>
                                                    <div className="mb-5 text-start">
                                                        <label
                                                            for="name"
                                                            className="block mb-2 text-sm font-medium text-gray-900"
                                                        >
                                                            Name
                                                        </label>
                                                        <input
                                                            type="text"
                                                            id="name"
                                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl w-full p-2.5"
                                                            required
                                                        />
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
                                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="modal-action">
                                                    <form method="dialog flex flex-row">
                                                        {/* if there is a button in form, it will close the modal */}
                                                        <div className="flex flex-row space-x-2">
                                                            <button className="btn">
                                                                Close
                                                            </button>
                                                            <button className="flex btn btn-outline btn-success justify-end">
                                                                Save
                                                            </button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </dialog>
                                    </div>
                                </div>

                                <p className="ml-2 text-gray-500 text-lg overflow-hidden line-clamp-3">
                                    Description Description Description
                                    Description Description Description
                                    Description Description Description
                                    Description Description Description
                                </p>
                                <p className="ml-2 text-gray-500 text-lg">
                                    30 items
                                </p>
                            </div>
                        </div>

                        <div className="card card-compact w-94 md:w-auto bg-base-100 shadow-xl rounded-md">
                            <figure>
                                <img
                                    src="https://vcdn1-dulich.vnecdn.net/2022/06/03/cauvang-1654247842-9403-1654247849.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=Swd6JjpStebEzT6WARcoOA"
                                    alt="Cover"
                                />
                            </figure>
                            <div className="card-body my-2">
                                <div className="flex flex-row justify-between ">
                                    <h2 className="card-title text-3xl ml-2 pr-3">
                                        Da Nang
                                    </h2>
                                    <div className="card-actions justify-end">
                                        <button
                                            className="btn"
                                            onClick={() =>
                                                document
                                                    .getElementById(
                                                        "my_modal_1"
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
                                                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                                                />
                                            </svg>
                                        </button>
                                        <dialog
                                            id="my_modal_1"
                                            className="modal"
                                        >
                                            <div className="modal-box">
                                                <h3 className="font-bold text-lg my-4">
                                                    Edit collection
                                                </h3>
                                                <div>
                                                    <div className="mb-5 text-start">
                                                        <label
                                                            for="name"
                                                            className="block mb-2 text-sm font-medium text-gray-900"
                                                        >
                                                            Name
                                                        </label>
                                                        <input
                                                            type="text"
                                                            id="name"
                                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl w-full p-2.5"
                                                            required
                                                        />
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
                                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="modal-action">
                                                    <form method="dialog flex flex-row">
                                                        {/* if there is a button in form, it will close the modal */}
                                                        <div className="flex flex-row space-x-2">
                                                            <button className="btn">
                                                                Close
                                                            </button>
                                                            <button className="flex btn btn-outline btn-success justify-end">
                                                                Save
                                                            </button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </dialog>
                                    </div>
                                </div>

                                <p className="ml-2 text-gray-500 text-lg overflow-hidden line-clamp-3">
                                    Description Description Description
                                    Description Description Description
                                    Description Description Description
                                    Description Description Description
                                </p>
                                <p className="ml-2 text-gray-500 text-lg">
                                    30 items
                                </p>
                            </div>
                        </div>
                        {/* Collection Card */}
                        <div className="card card-compact w-94 md:w-auto bg-base-100 shadow-xl rounded-md">
                            <figure>
                                <img
                                    src="https://vcdn1-dulich.vnecdn.net/2022/06/03/cauvang-1654247842-9403-1654247849.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=Swd6JjpStebEzT6WARcoOA"
                                    alt="Cover"
                                />
                            </figure>
                            <div className="card-body my-2">
                                <div className="flex flex-row justify-between ">
                                    <h2 className="card-title text-3xl ml-2 pr-3">
                                        Da Nang
                                    </h2>
                                    <div className="card-actions justify-end">
                                        <button
                                            className="btn"
                                            onClick={() =>
                                                document
                                                    .getElementById(
                                                        "my_modal_1"
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
                                                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                                                />
                                            </svg>
                                        </button>
                                        <dialog
                                            id="my_modal_1"
                                            className="modal"
                                        >
                                            <div className="modal-box">
                                                <h3 className="font-bold text-lg my-4">
                                                    Edit collection
                                                </h3>
                                                <div>
                                                    <div className="mb-5 text-start">
                                                        <label
                                                            for="name"
                                                            className="block mb-2 text-sm font-medium text-gray-900"
                                                        >
                                                            Name
                                                        </label>
                                                        <input
                                                            type="text"
                                                            id="name"
                                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl w-full p-2.5"
                                                            required
                                                        />
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
                                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="modal-action">
                                                    <form method="dialog flex flex-row">
                                                        {/* if there is a button in form, it will close the modal */}
                                                        <div className="flex flex-row space-x-2">
                                                            <button className="btn">
                                                                Close
                                                            </button>
                                                            <button className="flex btn btn-outline btn-success justify-end">
                                                                Save
                                                            </button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </dialog>
                                    </div>
                                </div>

                                <p className="ml-2 text-gray-500 text-lg overflow-hidden line-clamp-3">
                                    Description Description Description
                                    Description Description Description
                                    Description Description Description
                                    Description Description Description
                                </p>
                                <p className="ml-2 text-gray-500 text-lg">
                                    30 items
                                </p>
                            </div>
                        </div>

                        <div className="card card-compact w-94 md:w-auto bg-base-100 shadow-xl rounded-md">
                            <figure>
                                <img
                                    src="https://vcdn1-dulich.vnecdn.net/2022/06/03/cauvang-1654247842-9403-1654247849.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=Swd6JjpStebEzT6WARcoOA"
                                    alt="Cover"
                                />
                            </figure>
                            <div className="card-body my-2">
                                <div className="flex flex-row justify-between ">
                                    <h2 className="card-title text-3xl ml-2 pr-3">
                                        Da Nang
                                    </h2>
                                    <div className="card-actions justify-end">
                                        <button
                                            className="btn"
                                            onClick={() =>
                                                document
                                                    .getElementById(
                                                        "my_modal_1"
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
                                                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                                                />
                                            </svg>
                                        </button>
                                        <dialog
                                            id="my_modal_1"
                                            className="modal"
                                        >
                                            <div className="modal-box">
                                                <h3 className="font-bold text-lg my-4">
                                                    Edit collection
                                                </h3>
                                                <div>
                                                    <div className="mb-5 text-start">
                                                        <label
                                                            for="name"
                                                            className="block mb-2 text-sm font-medium text-gray-900"
                                                        >
                                                            Name
                                                        </label>
                                                        <input
                                                            type="text"
                                                            id="name"
                                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl w-full p-2.5"
                                                            required
                                                        />
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
                                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="modal-action">
                                                    <form method="dialog flex flex-row">
                                                        {/* if there is a button in form, it will close the modal */}
                                                        <div className="flex flex-row space-x-2">
                                                            <button className="btn">
                                                                Close
                                                            </button>
                                                            <button className="flex btn btn-outline btn-success justify-end">
                                                                Save
                                                            </button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </dialog>
                                    </div>
                                </div>

                                <p className="ml-2 text-gray-500 text-lg overflow-hidden line-clamp-3">
                                    Description Description Description
                                    Description Description Description
                                    Description Description Description
                                    Description Description Description
                                </p>
                                <p className="ml-2 text-gray-500 text-lg">
                                    30 items
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}