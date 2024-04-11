import { useState } from "react";
export function AdvancedFlightCard(){
    return(
        <>
        <div className="my-10">
            {/* {hotelCardDetails.map((item, index) => (
            <HotelCard
                key={index}
                imgSrc={item.imgSrc}
                hotelName={item.hotelName}
                district={item.district}
                city={item.city}
            />
            ))} */}
            <FlightCard/>

            <div className="w-full">
                <button    
                    className="bg-[#FFA732] hover:bg-[F5EEC8] text-white font-medium py-2 px-8 rounded transition ease-in-out delay-50 hover:translate-y-1 duration-100 capitalize text-md mt-2 flex items-center justify-center space-x-2 w-full">
                    <span>Show more results</span>
                </button>
            </div>        
        </div>

        </>
    )
}

function FlightCard({imgSrc}){
    const websiteLogo =[
        {imgLogo: "https://ik.imagekit.io/Uptrip/traveloka?updatedAt=1712828670481"},
        {imgLogo: "https://ik.imagekit.io/Uptrip/booking.com?updatedAt=1712829810252"},
        {imgLogo: "https://ik.imagekit.io/Uptrip/trip.com?updatedAt=1712830814655"},
        {imgLogo: "https://ik.imagekit.io/Uptrip/vna?updatedAt=1712846502664"},
    ]

    const [hearts, setHearts] = useState(websiteLogo.map(logo => ({ isFilled: false, imgLogo: logo.imgLogo })));

    const toggleHeart = (index) => {
        // Update the state for only the clicked heart, setting it to filled and others to not filled
        const updatedHearts = hearts.map((heart, i) => ({
            ...heart,
            isFilled: i === index ? !heart.isFilled : false // Toggle only the clicked one, reset others
        }));
        setHearts(updatedHearts);
    };

    
    return(
        <>
        <div className="bg-white rounded-md flex space-x-10 shadow-md my-8">
            <div className="w-1/3">
                <img src="https://ik.imagekit.io/Uptrip/vnalogo.png?updatedAt=1712847214914" alt ="airline logo" className="w-[200px] object-cover"/>
            </div>

            <div className="flex-col space-y-2 py-4 w-3/4">
                <div className="grid grid-cols-3 space-x-6">
                    <div className="flex-col">
                        <div className="font-bold text-md">6:00 am - 7:30 am</div>
                        <div className="font-extralight text-sm text-[#9A9A9A]">Vietnam Airlines</div>
                    </div>
                    <div className="mx-auto font-light text-black">none stop</div>
                    <div className="flex-col">
                        <div className="font-bold text-md">1h30m</div>
                        <div className="font-extralight text-sm text-[#9A9A9A]">SGN - DAD </div>
                    </div>
                </div>

                <hr/>

                {/* price tracking among three websites */}
                <div>
                    {hearts.map((heart, index) => (

                        <div key={index} className="flex items-center my-2">

                            <div className="border border-[#8DD3BB] w-[30px] h-[30px] flex items-center justify-between rounded-md cursor-pointer py-2">
                                <svg className="w-[15px] h-[15px] mx-auto"
                                    xmlns="http://www.w3.org/2000/svg" 
                                    viewBox="0 0 512 512" 
                                     onClick={() => toggleHeart(index)}
                                    fill={heart.isFilled ? "#EF4040" : "#000000"}>
                                    <path d="M458.4 64.3C400.6 15.7 311.3 23 256 79.3 200.7 23 111.4 15.6 53.6 64.3-21.6 127.6-10.6 230.8 43 285.5l175.4 178.7c10 10.2 23.4 15.9 37.6 15.9 14.3 0 27.6-5.6 37.6-15.8L469 285.6c53.5-54.7 64.7-157.9-10.6-221.3zm-23.6 187.5L259.4 430.5c-2.4 2.4-4.4 2.4-6.8 0L77.2 251.8c-36.5-37.2-43.9-107.6 7.3-150.7 38.9-32.7 98.9-27.8 136.5 10.5l35 35.7 35-35.7c37.8-38.5 97.8-43.2 136.5-10.6 51.1 43.1 43.5 113.9 7.3 150.8z"/>
                                </svg>
                            </div>

                            {/* Placeholder for the rest of the div content */}
                            <div className="border border-transparent bg-[#CDEAE1] rounded-md flex items-center space-y-1 px-8 ml-4">
                                <div>
                                    <img src={heart.imgLogo} alt="website logo" className="w-[100px] h-[34px] object-cover"/>
                                </div>
                                <div className="ml-4">
                                    <p className="text-md text-[#222160] font-bold">1.500.000 VND</p>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>

            </div>

        </div>









        <div className="bg-white rounded-md flex space-x-10 shadow-md my-8">
            <div className="w-1/3">
                <img src="https://ik.imagekit.io/Uptrip/vietjetlogo?updatedAt=1712846692791" alt ="airline logo" className="w-[200px] h-[200px] object-cover"/>
            </div>

            <div className="flex-col space-y-2 py-4 w-3/4">
                <div className="grid grid-cols-3 space-x-6">
                    <div className="flex-col">
                        <div className="font-bold text-md">6:00 am - 7:30 am</div>
                        <div className="font-extralight text-sm text-[#9A9A9A]">Vietnam Airlines</div>
                    </div>
                    <div className="mx-auto font-light text-black">none stop</div>
                    <div className="flex-col">
                        <div className="font-bold text-md">1h30m</div>
                        <div className="font-extralight text-sm text-[#9A9A9A]">SGN - DAD </div>
                    </div>
                </div>

                <hr/>

                {/* price tracking among three websites */}
                <div>
                    {hearts.map((heart, index) => (

                        <div key={index} className="flex items-center my-2">

                            <div className="border border-[#8DD3BB] w-[30px] h-[30px] flex items-center justify-between rounded-md cursor-pointer py-2">
                                <svg className="w-[15px] h-[15px] mx-auto"
                                    xmlns="http://www.w3.org/2000/svg" 
                                    viewBox="0 0 512 512" 
                                     onClick={() => toggleHeart(index)}
                                    fill={heart.isFilled ? "#EF4040" : "#000000"}>
                                    <path d="M458.4 64.3C400.6 15.7 311.3 23 256 79.3 200.7 23 111.4 15.6 53.6 64.3-21.6 127.6-10.6 230.8 43 285.5l175.4 178.7c10 10.2 23.4 15.9 37.6 15.9 14.3 0 27.6-5.6 37.6-15.8L469 285.6c53.5-54.7 64.7-157.9-10.6-221.3zm-23.6 187.5L259.4 430.5c-2.4 2.4-4.4 2.4-6.8 0L77.2 251.8c-36.5-37.2-43.9-107.6 7.3-150.7 38.9-32.7 98.9-27.8 136.5 10.5l35 35.7 35-35.7c37.8-38.5 97.8-43.2 136.5-10.6 51.1 43.1 43.5 113.9 7.3 150.8z"/>
                                </svg>
                            </div>

                            {/* Placeholder for the rest of the div content */}
                            <div className="border border-transparent bg-[#CDEAE1] rounded-md flex items-center space-y-1 px-8 ml-4">
                                <div>
                                    <img src={heart.imgLogo} alt="website logo" className="w-[100px] h-[34px] object-cover"/>
                                </div>
                                <div className="ml-4">
                                    <p className="text-md text-[#222160] font-bold">1.500.000 VND</p>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>

            </div>

        </div>
        </>
    )
}

