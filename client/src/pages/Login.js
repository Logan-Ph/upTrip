export default function Login() {
    return (
        <div className="flex h-screen w-screen items-center justify-center bg-loginbackground bg-cover bg-center">
            <div className="flex flex-col md:flex-row w-full max-w-sm md:max-w-3xl mx-auto p-6 bg-[#CDEAE1] bg-opacity-60 backdrop-filter backdrop-blur-md rounded-lg shadow-md">
                
                <div className="hidden md:flex md:w-1/2 justify-center items-center p-4 ">
                    <div className="border-1 h-full shadow-lg rounded-lg">
                        <img src="https://ik.imagekit.io/Uptrip/newdecorativeimg.jpg?updatedAt=1711383997767" alt="decorative image" className="w-full h-full object-fill rounded-lg"/>
                    </div>
                </div>

                <div className="w-full md:w-1/2 p-6">
                    <div>
                        {/* <img
                            className="h-full w-full p-10"
                            src="https://ik.imagekit.io/Uptrip/Logo.png?updatedAt=1711376738884"
                            alt="Uptrip logo"
                        /> */}
                        <p className="text-start text-2xl font-extrabold text-gray-900">
                            Log in
                        </p>
                        <p className="text-start text-md font-light text-gray-600 mt-2">Get an <b>Uptrip</b> account to level up your trip</p>
                    </div>
                    <form className="mt-8 space-y-6" action="#" method="POST">
                        <input type="hidden" name="remember" value="true" />
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="email-address" className="sr-only">
                                    Email address
                                </label>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-[#8DD3BB] focus:outline-none focus:ring-[#8DD3BB] sm:text-sm"
                                    placeholder="Email address"
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-[#8DD3BB] focus:outline-none focus:ring-[#8DD3BB] sm:text-sm"
                                    placeholder="Password"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-black focus:ring-[#8DD3BB]border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <a href="#" className="font-medium text-black hover:underline">
                                    Forgot your password?
                                </a>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group relative flex w-full justify-center rounded-md border-[#8DD3BB] border-transparent bg-[#8DD3BB] py-2 px-4 text-sm font-medium text-white hover:bg-[#CDEAE1] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#CDEAE1] hover:text-black"
                            >
                                Log in
                            </button>
                        </div>

                        <div className="flex">
                            <p className="mx-auto">Don't have an account ? <a className="items-center hover:underline font-bold" href="#">Sign up</a></p>
                            
                        </div>

                        <div className="flex items-center">
                            <hr className="w-1/2 mr-2"/>
                            <p>Or</p>
                            <hr className="w-1/2 ml-2"/>
                        </div>

                        <div className="group relative flex w-full justify-center rounded-md border-[#8DD3BB] border-2 bg-white py-2 px-4 text-sm font-medium text-black hover:bg-[#CDEAE1] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#CDEAE1] hover:text-black hover:border-[#CDEAE1]">
                            <img className="w-5 h-5" src="https://ik.imagekit.io/Uptrip/google.png?updatedAt=1711371495172" />
                            <a type="submit" target="_blank" className="ml-2">Login with Google</a>
                        </div>
                    </form>
                </div> 
            </div>
                
        </div>
    );
}
