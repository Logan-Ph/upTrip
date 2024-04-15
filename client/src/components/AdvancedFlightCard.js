import { useState, useEffect, useRef } from "react";
export default function AdvancedFlightCard(){
    return(
        <>
        <div>
            <FlightCard/>     
            <FlightCard/>     
            <FlightCard/>     
            <FlightCard/>     
            <FlightCard/>     

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

    const [isIntersecting, setIsIntersecting] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsIntersecting(entry.isIntersecting);  
            },
            {rootMargin: "0px"}
        );

        console.log(isIntersecting);
        observer.observe(ref.current);

        
        return () => observer.disconnect();
      }, [isIntersecting]);

    const visibilityClass = isIntersecting ? "opacity-100 translate-y-10 transition ease-in-out" : "opacity-0 translate-y-10";

    
    return(
        <>
        <div ref={ref} className={`bg-white rounded-md grid grid-cols-3 gap-4 md:gap-8 mb-4 shadow-md ${visibilityClass}`}>
            <div>
                <img src="https://ik.imagekit.io/Uptrip/vnalogo.png?updatedAt=1712847214914" alt ="airline logo" className="w-[200px] w-[100px] md:w-[450px] md:h-[252px] object-cover"/>
            </div>

            <div className="flex-col space-y-2 py-4 px-4 md:px-0 col-span-2">
                <div className="grid grid-cols-3 space-x-4 md:space-x-6">
                    <div className="flex-col">
                        <div className="font-bold text-xs md:text-md">6:00-7:30am</div>
                        <div className="font-extralight text-xs md:text-sm text-[#9A9A9A] text-nowrap">Vietnam Airlines</div>
                    </div>
                    <div className="mx-auto font-light text-xs md:text-md  text-black">none stop</div>
                    <div className="flex-col">
                        <div className="font-bold text-xs md:text-md">1h30m</div>
                        <div className="font-extralight text-xs md:text-sm text-[#9A9A9A]">SGN-DAD </div>
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
                            <div className="border border-transparent bg-[#CDEAE1] rounded-md flex items-center space-y-1 px-8 ml-4 w-full md:w-3/4 gap-2 md:gap-8 pr-2 lg:pr-0">
                                <div className="mx-auto">
                                    <img src={heart.imgLogo} alt="website logo" className="w-[100px] h-[34px] object-cover"/>
                                </div>
                                <div className="mx-auto">
                                    <p className="text-xs md:text-lg text-[#222160] font-bold">1500000VND</p>
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

