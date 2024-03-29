import { Link } from "react-router-dom"

export default function VerifyEmail(){
    return(
        <div className="flex h-screen w-screen items-center justify-center bg-loginbackground bg-cover bg-center bg-opacity-60">
            <div className="flex flex-col items-center md:h-1/2 md:flex-row w-full max-w-sm md:max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
                <div className="w-1/4 md:w-1/2">
                    <img src="https://ik.imagekit.io/Uptrip/EmailVerification.jpeg?updatedAt=1711728311055" alt="Successfully verified email" className="rounded-lg"/>
                </div>
                <div className="w-3/4 md:w-1/2">
                    <div className="space-y-2">
                        <p className="text-3xl md:text-4xl font-extrabold text-center text-[#8DD3BB] p-2">Welcome Aboard!</p>
                        <p className="text-lg text-center text-[#EF4040] font-semibold">Your email has been successfully verified.</p>
                        <p className="text-sm md:text-md text-center font-light">Thank you for joining Uptrip. We're excited to have you with us on this journey!</p>
                    </div>
               
                <div className="mt-6 w-full md:w-1/2 mx-auto">
                    <button
                        type="submit"
                        className="group relative flex w-full justify-center rounded-md border-[#8DD3BB] border-transparent bg-[#8DD3BB] py-2 px-4 text-md font-bold text-white hover:bg-[#CDEAE1] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#CDEAE1] hover:text-black">
                        Explore Now
                    </button>
                </div>
                </div>


                
            </div>
        </div>
    )
}