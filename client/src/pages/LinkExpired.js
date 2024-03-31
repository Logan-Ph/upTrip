import useHandleNavigate from "../utils/useHandleNavigate"

export default function LinkExpried(){
    const handleNavigate = useHandleNavigate()

    return(
        <div className="flex h-screen w-screen items-center justify-center bg-loginbackground bg-cover bg-center bg-opacity-60">
            <div className="flex flex-col items-center md:h-1/2 md:flex-row w-full max-w-sm md:max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
                <div className="w-3/4 md:w-1/2">
                    <div className="space-y-2">
                        <p className="text-3xl md:text-4xl font-extrabold text-center text-[#FFA732] p-2">Oops!</p>
                        <p className="text-2xl text-center text-black font-semibold">This link is not valid.</p>
                        <p className="text-sm md:text-md text-center font-light">Maybe the link has expired, revoked or maybe it was not copy correctly.</p>
                    </div>
               
                    <div onClick={handleNavigate} className="mt-6 w-full md:w-1/2 mx-auto">
                        <button
                            type="submit"
                            className="group relative flex w-full justify-center rounded-md border-[#FFA732] border-transparent bg-[#FFA732] py-2 px-4 text-md font-bold text-white hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FFA732] hover:border hover:border-[#FFA732] hover:text-black hover:shadow-md">
                            Take me Home
                        </button>
                    </div>
                </div>

                <div className="w-1/4 mt-4 md:w-1/2 md:mt-0">
                    <img src="https://ik.imagekit.io/Uptrip/linkexpired.jpeg?updatedAt=1711730875405" alt="Link expired" className="rounded-lg w-full h-full object-fill"/>
                </div>
            </div>
        </div>
    )
}