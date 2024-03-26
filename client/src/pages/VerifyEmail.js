export default function VerifyEmail(){
    return(
        <div className="flex h-screen w-screen items-center justify-center bg-loginbackground bg-cover bg-center">
            <div className="flex flex-col max-w-sm md:max-w-lg mx-auto p-16 bg-[#CDEAE1] bg-opacity-60 backdrop-filter backdrop-blur-md rounded-lg shadow-md">
                    <div className="flex items-center justify-between">
                        <div className="hover:cursor-pointer">
                            <a href="./login">
                                <i className="fa-solid fa-arrow-left text-2xl text-[#ef4040]"></i>
                            </a>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-start text-black">Forgot to verify email?</p>
                        </div>
                        
                    </div>
                    <hr className="my-4"></hr>
                    <div>
                            <p className="text-md font-light text-start text-black">Don't freak out! Just type in your email and we will send you a code to verify it!</p>
                        </div>
                    <div>
                        
                        <form className="mt-8 space-y-6" action="#" method="POST">
                            <p className="font-bold text-md text-black">Your email</p>
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
                                
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        className="h-4 w-4 text-black focus:ring-[#8DD3BB]border-gray-300 rounded"
                                    />
                                    <label htmlFor="remember-me" className="ml-2 text-sm text-gray-900 block">
                                        I accept the <b className="hover:underline">Terms and Conditions</b>
                                    </label>
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="group relative flex w-full justify-center rounded-md border-[#8DD3BB] border-transparent bg-[#8DD3BB] py-2 px-4 text-sm font-medium text-white hover:bg-[#CDEAE1] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#CDEAE1] hover:text-black shadow-md"
                                >
                                    Send email
                                </button>
                            </div>

                            <div className="flex">
                                <p className="mx-auto">If you still need help, <a className="items-center hover:underline font-bold" href="#"> contact Uptrip support</a></p>
                            </div>
                        </form>
                    </div>
            </div>
        </div>
    )
}