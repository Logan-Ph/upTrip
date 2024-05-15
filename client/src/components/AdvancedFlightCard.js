import { useState, useEffect, useRef, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import AddToFavorite from "./AddToFavorite";


export default function AdvancedFlightCard({ from, to, flight, tripComPrice, myTripPrice, bayDepPrice, tripComSuccess, myTripSuccess, bayDepSuccess }) {
    const [searchParams] = useSearchParams();
    const [imgSrc, setImgSrc] = useState();
    const payload = {
        flightNo: flight.flightNo,
        from: from,
        to: to,
        departureTime: flight.departureTime,
        arrivalTime: flight.arrivalTime,
        carrier: flight.airline[0],
        duration: flight.duration,
        day: searchParams.get("day"),
        month: searchParams.get("month"),
        year: searchParams.get("year"),
        seatClass: searchParams.get("seatClass"),
        imgSrc: imgSrc,
        adult: searchParams.get("adult"),
        child: searchParams.get("child"),
        infant: searchParams.get("infant")
    }
    return (
        <>
            <div className="relative">
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
                        setImgSrc={setImgSrc}
                    />
                </div>
                <div className="absolute top-0 right-0">
                    <AddToFavorite payload={payload} hotel={false} experience={false} flight={true}/>
                </div>
            </div>


        </>
    )
}

function FlightCard({ from, to, departure, arrival, duration, stop, carrier, agodaPrice, tripComPrice, myTripPrice, bayDepPrice, tripComSuccess, myTripSuccess, bayDepSuccess, setImgSrc }) {
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
        { name: "Bamboo Airways", imgSrc: "https://upload.wikimedia.org/wikipedia/commons/9/9b/Bamboo_Airways_Logo_QH-BAV.png" },
        { name: "Vietravel Airlines", imgSrc: "https://apea.asia/wp-content/uploads/2022/11/vn-vietravel-logo-ib-2.png" },
        { name: "Vietnam Airlines", imgSrc: "https://ik.imagekit.io/m1g1xkxvo/Uptrip/Logo-VNA-Sky-Te-V-removebg-preview.png?updatedAt=1714388660575" },
        { name: "VietJet Air", imgSrc: "https://media.loveitopcdn.com/3807/logo-vietjet-20.png" }
    ]

    // Find the logo based on the carrier
    const findAirlineLogo = airlineLogo.find(logo => logo.name === carrier)?.imgSrc || "https://via.placeholder.com/150";

    useEffect(() => {
        setImgSrc(findAirlineLogo)
    }, [findAirlineLogo])

    const [hearts, setHearts] = useState(
        websiteLogo.map(logo => ({
            isFilled: false,
            id: logo.id,
            imgLogo: logo.imgLogo,
            price: logo.price,
            success: logo.success
        }))
    );

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

                    <div className="grid grid-cols-4 space-x-2 xl:space-x-2">

                        <div>
                            <img src={findAirlineLogo} alt="airline logo"
                                className="lg:ms-8 md:w-[120px] md:h-[50px] lg:w-[130px] h-[70px] object-contain lg:object-fill sm:scale-90 md:scale-95" />
                        </div>

                        <div className="flex-col justify-center items-center my-auto sm:gap-y-2">
                            <div className="font-bold text-sm xl:text-lg text-nowrap">{departure.substring(11, 16)}-{arrival.substring(11, 16)}</div>
                            <div className="font-extralight text-sm xl:text-lg text-[#9A9A9A] text-nowrap">{carrier}</div>
                        </div>

                        <div className="mx-auto font-light text-sm xl:text-lg text-black my-auto">{stop}</div>

                        <div className="flex-col my-auto">
                            <div className="font-bold text-sm xl:text-lg">{duration}</div>
                            <div className="font-extralight text-sm xl:text-lg text-[#9A9A9A]">{from}-{to} </div>
                        </div>
                    </div>

                    <hr />

                    {/* price tracking among three websites */}
                    <div className="pl-[5.5rem] pr-[0.5px] md:pr-10 md:pl-[10.5rem] xl:pl-[14rem] xl:pr-32">

                        {hearts.map((heart, index) => (

                            <div key={index} className="my-2 items-center">

                                {/* Placeholder for the rest of the div content */}
                                <div className="border border-transparent
                                bg-[#CDEAE1] rounded-lg grid grid-cols-2 h-[42px] hover:bg-[#8DD3BB] ">
                                    <div className="mx-auto my-auto">
                                        <Link to="">
                                            <img src={heart.imgLogo} alt="website logo"
                                                className={getClassName(heart.id)} />
                                        </Link>
                                    </div>
                                    <div className="mx-auto my-auto">
                                        <p className="text-xs md:text-lg text-[#222160] font-bold">{heart.success && heart.price !== null ? heart.price.toLocaleString("vi-VN") + " VND" : "- VND"}</p>
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

