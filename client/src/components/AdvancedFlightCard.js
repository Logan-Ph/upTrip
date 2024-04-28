import { useState, useEffect, useRef, useMemo } from "react";
import { Link } from "react-router-dom";

export default function AdvancedFlightCard({ from, to, flight, tripComPrice, myTripPrice, bayDepPrice, tripComSuccess, myTripSuccess, bayDepSuccess }) {
    return (
        <>
            <div>
                <FlightCard
                    key={flight.flightNo}
                    from={from}
                    to={to}
                    departure={flight.departureTime}
                    arrival={flight.arrivalTime}
                    duration={flight.duration}
                    stop={flight.flightNo.length > 1 ? flight.flightNo.length - 1 + " stop(s)" : "non-stop"}
                    carrier={flight.airline[0]}
                    agodaPrice={flight.agodaPrice}
                    tripComPrice={tripComPrice}
                    myTripPrice={myTripPrice}
                    bayDepPrice={bayDepPrice}
                    tripComSuccess={tripComSuccess}
                    myTripSuccess={myTripSuccess}
                    bayDepSuccess={bayDepSuccess}
                />

            </div>

        </>
    )
}

function FlightCard({ from, to, departure, arrival, duration, stop, carrier, agodaPrice, tripComPrice, myTripPrice, bayDepPrice, tripComSuccess, myTripSuccess, bayDepSuccess }) {
    const websiteLogo = useMemo(() => [
        {
            imgLogo: "https://ik.imagekit.io/Uptrip/booking.com?updatedAt=1712829810252",
            price: agodaPrice,
            success: true
        },
        {
            imgLogo: "https://ik.imagekit.io/Uptrip/traveloka?updatedAt=1712828670481",
            price: bayDepPrice,
            success: bayDepSuccess
        },
        {
            imgLogo: "https://ik.imagekit.io/Uptrip/trip.com?updatedAt=1712830814655",
            price: tripComPrice,
            success: tripComSuccess
        },
        {
            imgLogo: "https://ik.imagekit.io/Uptrip/vna?updatedAt=1712846502664",
            price: myTripPrice,
            success: myTripSuccess
        },
    ], [agodaPrice, myTripPrice, tripComPrice, bayDepPrice])

    const [hearts, setHearts] = useState(
        websiteLogo.map(logo => ({ 
            isFilled: false, 
            imgLogo: logo.imgLogo, 
            price: logo.price, 
            success: logo.success }))
    );
            
    const toggleHeart = (index) => {
        const updatedHearts = hearts.map((heart, i) => ({
            ...heart,
            isFilled: i === index ? !heart.isFilled : false,
        }));
        setHearts(updatedHearts);
    };

    const [isIntersecting, setIsIntersecting] = useState(false);
    const ref = useRef(null);

    // update success status
    useEffect(() => {
        setHearts([
            {
                ...hearts[0],
                success: true
            },
            {
                ...hearts[1],
                price: bayDepPrice,
                success: bayDepSuccess
            },
            {
                ...hearts[2],
                price: tripComPrice,
                success: tripComSuccess
            },
            {
                ...hearts[3],
                price: myTripPrice,
                success: myTripSuccess
            },
        ]);
    }, [bayDepSuccess, myTripSuccess, tripComSuccess]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsIntersecting(entry.isIntersecting);
            },
            { rootMargin: "0px" }
        );

        //console.log(isIntersecting);
        observer.observe(ref.current);


        return () => observer.disconnect();
    }, [isIntersecting]);

    const visibilityClass = isIntersecting ? "opacity-100 translate-y-10 transition ease-in-out" : "opacity-0 translate-y-10";


    return (
        <>
            <div ref={ref} className={`bg-white rounded-md grid grid-cols-3 gap-4 md:gap-8 mb-4 shadow-md ${visibilityClass}`}>
                <div>
                    <img src="https://ik.imagekit.io/Uptrip/vnalogo.png?updatedAt=1712847214914" alt="airline logo" className="w-[200px] w-[100px] md:w-[450px] md:h-[252px] object-cover" />
                </div>

                <div className="flex-col space-y-2 py-4 px-4 md:px-0 col-span-2">
                    <div className="grid grid-cols-3 space-x-4 md:space-x-6">
                        <div className="flex-col">
                            <div className="font-bold text-xs md:text-md">{departure}-{arrival}</div>
                            <div className="font-extralight text-xs md:text-sm text-[#9A9A9A] text-nowrap">{carrier}</div>
                        </div>
                        <div className="mx-auto font-light text-xs md:text-md  text-black">{stop}</div>
                        <div className="flex-col">
                            <div className="font-bold text-xs md:text-md">{duration}</div>
                            <div className="font-extralight text-xs md:text-sm text-[#9A9A9A]">{from}-{to} </div>
                        </div>
                    </div>

                    <hr />

                    {/* price tracking among three websites */}
                    <div>
                        {hearts.map((heart, index) => (

                            <div key={index} className="flex items-center my-2">

                            <div className="border border-[#8DD3BB] w-[30px] h-[30px] flex items-center justify-between rounded-md cursor-pointer py-2" onClick={() => toggleHeart(index)}>
                                {!heart.isFilled 
                                ? (
                                    <svg className="w-[15px] h-[15px] mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                                        fill="">
                                        <path d="M458.4 64.3C400.6 15.7 311.3 23 256 79.3 200.7 23 111.4 15.6 53.6 64.3-21.6 127.6-10.6 230.8 43 285.5l175.4 178.7c10 10.2 23.4 15.9 37.6 15.9 14.3 0 27.6-5.6 37.6-15.8L469 285.6c53.5-54.7 64.7-157.9-10.6-221.3zm-23.6 187.5L259.4 430.5c-2.4 2.4-4.4 2.4-6.8 0L77.2 251.8c-36.5-37.2-43.9-107.6 7.3-150.7 38.9-32.7 98.9-27.8 136.5 10.5l35 35.7 35-35.7c37.8-38.5 97.8-43.2 136.5-10.6 51.1 43.1 43.5 113.9 7.3 150.8z"/>
                                    </svg>
                                ) : (
                                    <svg className="w-[15px] h-[15px] mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                                        fill="#EF4040">
                                        <path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"/>
                                    </svg>
                                )}
                            </div>

                                {/* Placeholder for the rest of the div content */}
                                <div className="border border-transparent bg-[#CDEAE1] rounded-md flex items-center space-y-1 px-8 ml-4 w-full md:w-3/4 gap-2 md:gap-8 pr-2 lg:pr-0">
                                    <div className="mx-auto">
                                        <img src={heart.imgLogo} alt="website logo" className="w-[100px] h-[34px] object-cover" />
                                    </div>
                                    <div className="mx-auto">
                                        <p className="text-xs md:text-lg text-[#222160] font-bold">{heart.success  && heart.price !== null ? heart.price.toLocaleString("vi-VN") + " VND" : "-" }</p>
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

