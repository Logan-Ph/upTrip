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
