import { Link } from "react-router-dom";
import Logo from "../components/images/UptripLogo.png";

export default function Header() {
    return (
      <div>
        <div class="drawer">
          <input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
          <div class="drawer-content flex flex-col">
            {/* <!-- Navbar --> */}
            <div class="mx-auto max-w-8xl px-6 py-6 navbar mt-4 mb-12">
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
                    <img src={Logo} className="w-28 h-auto" alt="logo" />
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
                        class="font-semibold text-white text-lg drop-shadow-xl"
                      >
                        Explore
                      </Link>
                    </li>
                    <li>
                      <Link
                        href=""
                        class="font-semibold text-white text-lg drop-shadow-xl"
                      >
                        Favorites
                      </Link>
                    </li>
                    <li>
                      <Link
                        href=""
                        class="font-semibold text-white text-lg drop-shadow-xl"
                      >
                        Itinerary
                      </Link>
                    </li>
                  </ul>
                </div>
                <div class="flex-none md:pl-3 drop-shadow-xl hidden lg:block">
                  <a
                    href="/login"
                    class="bg-transparent btn btn-sm rounded-xl text-white font-semibold shadow-lg text-lg hidden" //hidden
                  >
                    Login
                  </a>

                  <div class="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <button
                      type="button"
                      class="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300"
                      id="user-menu-button"
                      aria-expanded="false"
                      data-dropdown-toggle="user-dropdown"
                      data-dropdown-placement="bottom"
                    >
                      <span class="sr-only">Open user menu</span>
                      <div class="avatar placeholder">
                        {" "}
                        {/* hidden */}
                        <div class="bg-neutral text-neutral-content rounded-full w-12">
                          <span class="text-xl">D</span>
                        </div>
                      </div>

                      {/* if user already upload their profile image */}
                      <div class="avatar hidden"> {/* hidden */}
                        <div class="w-12 rounded-full">
                          <img
                            src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                            alt=""
                          />
                        </div>
                      </div>
                    </button>
                    {/* <!-- Dropdown menu --> */}
                    <div
                      class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-36 ml-4"
                      id="user-dropdown"
                    >
                      <ul class="py-2" aria-labelledby="user-menu-button">
                        <li>
                          <a
                            href="#"
                            class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
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
                                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                              />
                            </svg>{" "}
                            &nbsp; Profile
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            class="flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
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
                                d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                              />
                            </svg>
                            &nbsp; Sign out
                          </a>
                        </li>
                      </ul>
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
              {/* If user havent login */}
              <div class="flex justify-end drop-shadow-xl">
                <a
                  href="/login"
                  class="bg-transparent btn btn-sm rounded-xl text-black font-semibold shadow-lg text-lg border-black hidden"
                >
                  Login
                </a>

                {/* if the user is logged in */}
                <div class="avatar hidden">
                  <div class="w-12 rounded-full">
                    <img
                      src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                      alt=""
                    />
                  </div>
                </div>

                {/* If user havent uploaded their profile picture */}
                <div class="avatar placeholder">
                  <div class="bg-neutral text-neutral-content rounded-full w-12">
                    <span class="text-xl">D</span>
                  </div>
                </div>
              </div>
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
              <li>
                <Link href="" class="font-semibold">
                  Profile
                </Link>
              </li>
              <li class="pt-4">
                <Link
                  href=""
                  class="font-semibold border-black border-2 hover:bg-black hover:text-white"
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
                      d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                    />
                  </svg>
                  Sign out
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
}
