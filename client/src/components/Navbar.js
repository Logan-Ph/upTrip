import { Link } from "react-router-dom";
import Logo from "../components/images/UptripLogo.png";
import { useContext, useState } from "react";
import AuthContext from "../context/AuthProvider";
import useLogout from "../hooks/useLogout";

export default function Header() {
    const { auth } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);
    const logout = useLogout();

    const handleLogout = async () => {
        await logout();
    }

    return (
        <div>
            <div className="drawer z-50">
                <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col">
                    {/* <!-- Navbar --> */}
                    <div className="mx-auto max-w-8xl px-6 py-6 navbar mt-4 mb-12">

                        <div className="navbar-start">
                            <div className="flex-none lg:hidden">
                                <label
                                    for="my-drawer-3"
                                    aria-label="open sidebar"
                                    className="btn btn-square btn-ghost text-white"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-8 w-8"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M4 6h16M4 12h8m-8 6h16"
                                        />
                                    </svg>
                                </label>
                            </div>
                            <div className="flex-1 px-2 mx-2">
                                <a href="/">
                                    <img
                                        src={Logo}
                                        classNameName="w-28 h-auto"
                                        alt="logo"
                                    />
                                </a>
                            </div>
                        </div>
                        <div className="navbar-end">
                            <div className="flex-none hidden lg:block">
                                <ul className="menu menu-horizontal">
                                    {/* <!-- Navbar menu content here --> */}
                                    <li>
                                        <Link
                                            href=""
                                            className="font-semibold text-white text-lg drop-shadow-xl"
                                        >
                                            Explore
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/favorites"
                                            className="font-semibold text-white text-lg drop-shadow-xl"
                                        >
                                            Favorites
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/itinerary"
                                            class="font-semibold text-white text-lg drop-shadow-xl"
                                        >
                                            Itinerary
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="flex-none md:pl-3 drop-shadow-xl lg:block">
                                <Link
                                    to="/login"
                                    className={`bg-transparent btn btn-sm rounded-xl text-white font-semibold shadow-lg text-lg ${auth?.accessToken ? 'hidden' : ''}`}
                                >
                                    Login
                                </Link>

                                {auth?.accessToken && (
                                    <div className="lg:flex items-center relative hidden">
                                        <button
                                            type="button"
                                            className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300"
                                            id="user-menu-button"
                                            aria-expanded="false"
                                            data-dropdown-toggle="user-dropdown"
                                            data-dropdown-placement="bottom"
                                        >
                                            <span className="sr-only">
                                                Open user menu
                                            </span>
                                            <div className="avatar placeholder">
                                                {" "}
                                                {/* hidden */}
                                                <div className="bg-neutral text-neutral-content rounded-full w-12"
                                                    onClick={() => setIsOpen((prev) => !prev)}
                                                >
                                                    <span className="text-xl">
                                                        {auth.email[0].toUpperCase()}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* if user already upload their profile image */}
                                            <div className="avatar hidden">
                                                {" "}
                                                {/* hidden */}
                                                <div className="w-12 rounded-full">
                                                    <img
                                                        src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                                                        alt=""
                                                    />
                                                </div>
                                            </div>
                                        </button>
                                        {/* <!-- Dropdown menu --> */}
                                        {isOpen && (
                                            <div
                                                className="my-4 text-base list-none bg-white divide-gray-100 rounded-lg shadow w-36 ml-4 absolute -left-2 top-8 hover:bg-gray-100"
                                                id="user-dropdown"
                                            >
                                                <ul
                                                    className=""
                                                    aria-labelledby="user-menu-button"
                                                >
                                                    <li>
                                                        <Link className="flex px-4 py-2 text-sm text-gray-700" onClick={handleLogout}>
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                stroke-width="1.5"
                                                                stroke="currentColor"
                                                                className="w-6 h-6"
                                                            >
                                                                <path
                                                                    stroke-linecap="round"
                                                                    stroke-linejoin="round"
                                                                    d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                                                                />
                                                            </svg>
                                                            &nbsp; Sign out
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="drawer-side">
                    <label
                        for="my-drawer-3"
                        aria-label="close sidebar"
                        className="drawer-overlay"
                    ></label>

                    <ul className="menu p-4 w-80 min-h-full bg-base-200">
                        {/* If user havent login */}
                        <div className="flex justify-end drop-shadow-xl">
                            <Link
                                to="/login"
                                className={`bg-transparent btn btn-sm rounded-xl text-black font-semibold shadow-lg text-lg border-black ${auth?.accessToken ? 'hidden' : ''}`}
                            >
                                Login
                            </Link>

                            {/* if the user is logged in */}
                            <div className="avatar hidden">
                                <div className="w-12 rounded-full">
                                    <img
                                        src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                                        alt=""
                                    />
                                </div>
                            </div>
                            {auth?.accessToken && (
                                <div className="avatar placeholder">
                                    <div className="bg-neutral text-neutral-content rounded-full w-12">
                                        <span className="text-xl">{auth.email[0].toUpperCase()}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                        {/* <!-- Sidebar content here --> */}
                        <li>
                            <Link href="" className="font-semibold">
                                Explore
                            </Link>
                        </li>
                        <li>
                            <Link to="/favorites" className="font-semibold">
                                Favorites
                            </Link>
                        </li>
                        <li>
                            <Link to="/itinerary" className="font-semibold">
                                Itinerary
                            </Link>
                        </li>
                        {auth?.accessToken && (
                            <li className="pt-4  hover:bg-gray-100">
                                <Link
                                    href=""
                                    className="font-semibold border-black border-2 hover:bg-black hover:text-white"
                                    onClick={handleLogout}
                                    >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        className="w-6 h-6"
                                        >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                                            />
                                    </svg>
                                    Sign out
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}
