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

    const airlineLogo = [
        {name: "Bamboo Airways", imgSrc: "https://ik.imagekit.io/m1g1xkxvo/Uptrip/Icon-Bamboo-Airways-removebg-preview.png?updatedAt=1714109708696"},
        {imgSrc: "https://apea.asia/wp-content/uploads/2022/11/vn-vietravel-logo-ib-2.png"},
        {imgSrc: "https://static.wixstatic.com/media/9d8ed5_70663b41e71e4453a550be85fbd85b1d~mv2.png/v1/fill/w_980,h_613,al_c,q_90,usm_0.66_1.00_0.01,enc_auto/9d8ed5_70663b41e71e4453a550be85fbd85b1d~mv2.png"},
        {imgSrc: "https://media.loveitopcdn.com/3807/logo-vietjet-20.png"}
    ]

    const [hearts, setHearts] = useState(
        websiteLogo.map(logo => ({ 
            isFilled: false, 
            imgLogo: logo.imgLogo, 
            price: logo.price, 
            success: logo.success })));
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
        <div ref={ref} className={`bg-white rounded-md gap-4 md:gap-8 mb-4 shadow-lg ${visibilityClass}`}>
                <div className="flex-col space-y-2 py-4 px-4 md:px-0 col-span-2">

                    <div className="grid grid-cols-4 space-x-2 md:space-x-2">

                        <div>
                            <img src="https://ik.imagekit.io/m1g1xkxvo/Uptrip/Vietravel_Airlines_Logo.png?updatedAt=1714116491862" alt ="airline logo"
                            className="lg:ms-14 md:w-[120px] md:h-[50px] lg:w-[130px] h-[70px] object-contain lg:object-fill"/>
                        </div>

                        <div className="flex-col">
                            <div className="font-bold text-sm md:text-lg">{departure}-{arrival}</div>
                            <div className="font-extralight text-sm md:text-lg text-[#9A9A9A] text-nowrap">{carrier}</div>
                        </div>

                        <div className="mx-auto font-light text-sm md:text-lg  text-black">{stop}</div>

                        <div className="flex-col">
                            <div className="font-bold text-sm md:text-lg">{duration}</div>
                            <div className="font-extralight text-sm md:text-lg text-[#9A9A9A]">{from}-{to} </div>
                        </div>
                    </div>

                    <hr />

                    {/* price tracking among three websites */}
                    <div className="px-4 lg:px-32">
                      
                            {hearts.map((heart, index) => (

                            <div key={index} className="grid grid-cols-4 md:grid-cols-6 my-2 items-center">

                                <div  className="mx-auto border border-[#8DD3BB] w-[36px] h-[36px] flex items-center justify-between rounded-md cursor-pointer py-2" onClick={() => toggleHeart(index)}>
                                    {!heart.isFilled 
                                    ? (
                                        <svg className="w-[15px] h-[15px]md:w-:[20px] md:h-[20px] mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                                            fill="">
                                            <path d="M458.4 64.3C400.6 15.7 311.3 23 256 79.3 200.7 23 111.4 15.6 53.6 64.3-21.6 127.6-10.6 230.8 43 285.5l175.4 178.7c10 10.2 23.4 15.9 37.6 15.9 14.3 0 27.6-5.6 37.6-15.8L469 285.6c53.5-54.7 64.7-157.9-10.6-221.3zm-23.6 187.5L259.4 430.5c-2.4 2.4-4.4 2.4-6.8 0L77.2 251.8c-36.5-37.2-43.9-107.6 7.3-150.7 38.9-32.7 98.9-27.8 136.5 10.5l35 35.7 35-35.7c37.8-38.5 97.8-43.2 136.5-10.6 51.1 43.1 43.5 113.9 7.3 150.8z"/>
                                        </svg>
                                    ) : (
                                        <svg className="w-[20px] h-[20px] mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                                            fill="#EF4040">
                                            <path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"/>
                                        </svg>
                                    )}
                                </div>

                                {/* Placeholder for the rest of the div content */}
                                <div className="border border-transparent bg-[#CDEAE1] rounded-md flex items-center space-y-1 col-span-3 md:col-span-5">
                                    <div className="mx-auto">
                                        <img src={heart.imgLogo} alt="website logo" className="w-[100px] h-[34px] object-cover" />
                                    </div>
                                    <div className="mx-auto">
                                        <p className="text-xs md:text-lg text-[#222160] font-bold">{heart.success  && heart.price !== null ? heart.price : "Null"} VND</p>
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

