import { Link } from "react-router-dom";
import Logo from "../components/images/UptripLogo.png";

export default function Header() {
    return (
        <div>
            <div class="drawer">
                <input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
                <div class="drawer-content flex flex-col">
                    {/* <!-- Navbar --> */}
                    <div class="w-full navbar pt-4 pb-12">
                        <div class="navbar-start items-baseline">
                            <div class="flex-none lg:hidden">
                                <label
                                    for="my-drawer-3"
                                    aria-label="open sidebar"
                                    class="btn btn-square btn-ghost text-white"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="h-7 w-7"
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
                            <div class="flex-1 px-2 mx-2">
                                <a href="/">
                                    <img
                                        src={Logo}
                                        className="w-20 h-auto"
                                        alt="logo"
                                    />
                                </a>
                            </div>
                        </div>
                        <div class="navbar-end">
                            <div class="flex-none hidden lg:block">
                                <ul class="menu menu-horizontal">
                                    {/* <!-- Navbar menu content here --> */}
                                    <li>
                                        <Link
                                            href=""
                                            class="font-semibold text-white"
                                        >
                                            Explore
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href=""
                                            class="font-semibold text-white"
                                        >
                                            Favorites
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href=""
                                            class="font-semibold text-white"
                                        >
                                            Itinerary
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div class="flex-none">
                                <a
                                    href="/login"
                                    class="bg-transparent btn btn-sm rounded-xl text-white font-semibold shadow-lg"
                                >
                                    Login
                                </a>

                                {/* if the user is logged in */}
                                <div class="avatar hidden">
                                    <div class="w-10 rounded-full">
                                        <img
                                            src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                                            alt=""
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="drawer-side">
                    <label
                        for="my-drawer-3"
                        aria-label="close sidebar"
                        class="drawer-overlay"
                    ></label>
                    <ul class="menu p-4 w-80 min-h-full bg-base-200">
                        {/* <!-- Sidebar content here --> */}
                        <li>
                            <Link href="" class="font-semibold">
                                Explore
                            </Link>
                        </li>
                        <li>
                            <Link href="" class="font-semibold">
                                Favorites
                            </Link>
                        </li>
                        <li>
                            <Link href="" class="font-semibold">
                                Itinerary
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
