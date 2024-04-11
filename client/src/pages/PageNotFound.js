import useHandleNavigate from "../utils/useHandleNavigate";

export default function PageNotFound(){
    const handleNavigate = useHandleNavigate()

    return(
        <div className="flex h-screen w-screen items-center justify-center bg-loginbackground bg-cover bg-center bg-opacity-60">
            <div className="flex flex-col items-center h-1/2 md:flex-row w-full max-w-sm md:max-w-3xl mx-auto p-6 bg-[#CDEAE1] bg-opacity-60 backdrop-filter backdrop-blur-md rounded-lg shadow-md">
                <div className="">
                    <p className="text-4xl font-extrabold text-center p-2">404. Page Not Found</p>
                    <p className="text-lg text-center font-light">Sorry, we can't find that page! Don't worry though, everything is STILL AWESOME! </p>

                    <div onClick={handleNavigate} className="flex items-center justify-center my-5">
                        <p className="text-2xl font-bold hover:text-[#9A9A9A] mr-4">Go back</p>
                        <div className="text-2xl font-bold hover:cursor-pointer">
                            <i className="fa-solid fa-arrow-right"></i>
                        </div>
                    </div>
                </div>
                <div className="w-1/2">
                    <img src="https://ik.imagekit.io/Uptrip/404-error-page.jpg?updatedAt=1711463090130" alt="404 not found" className="rounded-lg"/>
                </div>
            </div>
        </div>
    )
}