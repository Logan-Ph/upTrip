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
            id: 1,
            imgLogo: "https://upload.wikimedia.org/wikipedia/commons/c/ce/Agoda_transparent_logo.png",
            price: agodaPrice,
            success: true
        },
        {
            id: 2,
            imgLogo: "https://ik.imagekit.io/m1g1xkxvo/Uptrip/baydep.png?updatedAt=1714385150952",
            price: bayDepPrice,
            success: bayDepSuccess
        },
        {
            id: 3,
            imgLogo: "https://ik.imagekit.io/Uptrip/trip.com?updatedAt=1712830814655",
            price: tripComPrice,
            success: tripComSuccess
        },
        {
            id: 4,
            imgLogo: "https://ik.imagekit.io/m1g1xkxvo/Uptrip/Mytrip_Logo_Colar_Pink.png?updatedAt=1714385168260",
            price: myTripPrice,
            success: myTripSuccess
        },
    ], [agodaPrice, myTripPrice, tripComPrice, bayDepPrice])

    const airlineLogo = [
        {name: "Bamboo Airways", imgSrc: "https://upload.wikimedia.org/wikipedia/commons/9/9b/Bamboo_Airways_Logo_QH-BAV.png"},
        {name: "Vietravel Airlines", imgSrc: "https://apea.asia/wp-content/uploads/2022/11/vn-vietravel-logo-ib-2.png"},
        {name: "Vietnam Airlines", imgSrc: "https://ik.imagekit.io/m1g1xkxvo/Uptrip/Logo-VNA-Sky-Te-V-removebg-preview.png?updatedAt=1714388660575"},
        {name: "VietJet Air", imgSrc: "https://media.loveitopcdn.com/3807/logo-vietjet-20.png"}
    ]

     // Find the logo based on the carrier
     const findAirlineLogo = airlineLogo.find(logo => logo.name === carrier)?.imgSrc || "https://via.placeholder.com/150";


    const [hearts, setHearts] = useState(
        websiteLogo.map(logo => ({ 
            isFilled: false, 
            id: logo.id,
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

    // className generator based on id
    const getClassName = (id) => {
        switch (id) {
            case 1: return "w-[60px] h-[30px] md:w-[80px] md:h-[40px]  cursor-pointer";
            case 2: return "w-[90px] h-[22px] md:w-[100px] md:h-[25px] cursor-pointer md:scale-90";
            case 3: return "w-[80px] h-[30px] md:w-[100px] md:h-[40px] object-cover cursor-pointer";
            case 4: return "w-[70px] h-[22px] md:w-[90px] md:h-[22px]  cursor-pointer md:scale-90";
            default: return "bg-gray-500";
        }
    };


    return (
        <>
        <div ref={ref} className={`bg-white rounded-md gap-4 md:gap-8 mb-4 shadow-lg ${visibilityClass}`}>
                <div className="flex-col space-y-2 py-4 px-4 md:px-0 col-span-2">

                    <div className="grid grid-cols-4 space-x-2 md:space-x-2">

                        <div>
                            <img src={findAirlineLogo} alt="airline logo" 
                            className="lg:ms-8 md:w-[120px] md:h-[50px] lg:w-[130px] h-[70px] object-contain lg:object-fill"/>
                        </div>

                        <div className="flex-col">
                            <div className="font-bold text-xs md:text-md">{departure.substring(11, 16)}-{arrival.substring(11, 16)}</div>
                            <div className="font-extralight text-xs md:text-sm text-[#9A9A9A] text-nowrap">{carrier}</div>
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

                                <div  className="mx-auto border border-[#8DD3BB] w-[42px] h-[42px] flex items-center justify-between rounded-md cursor-pointer py-2" onClick={() => toggleHeart(index)}>
                                    {!heart.isFilled 
                                    ? (
                                        <svg className="w-[20px] h-[20px]md:w-:[25px] md:h-[25px] mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
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
                                <div className="border border-transparent
                                bg-[#CDEAE1] rounded-md flex items-center space-y-2 col-span-3 md:col-span-5 h-[42px]">

                                    <div className="p-2 scale-90">
                                        <Link to="">
                                            <img src={heart.imgLogo} alt="website logo" 
                                            className={getClassName(heart.id)} />
                                        </Link>
                                    </div>

                                  
                                    <div className="mx-auto px-8">
                                        <p className="text-xs md:text-lg text-[#222160] font-bold">{heart.success  && heart.price !== null ? heart.price.toLocaleString("vi-VN") + " VND" : "- VND" }</p>
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

