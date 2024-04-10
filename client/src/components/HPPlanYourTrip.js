import { Link } from "react-router-dom"
import { Suspense } from 'react';
import useHandleNavigate from "../utils/useHandleNavigate";

export default function HPPLanYourTrip(){
    const destinations = [
        {imgSrc:"https://ik.imagekit.io/Uptrip/dn.jpg?updatedAt=1712221156567", destination:"Da Nang"},
        {imgSrc:"https://ik.imagekit.io/Uptrip/hcmc.jpg?updatedAt=1712229571372", destination:"Ho Chi Minh"},
        {imgSrc:"https://ik.imagekit.io/Uptrip/nt.jpg?updatedAt=1712230027971", destination:"Nha Trang"},
        {imgSrc:"https://ik.imagekit.io/Uptrip/quynhon.jpg?updatedAt=1712229571488", destination:"Quy Nhon"},
        {imgSrc:"https://ik.imagekit.io/Uptrip/haiphong.jpg?updatedAt=1712229571728", destination:"Hai Phong"},
        {imgSrc:"https://ik.imagekit.io/Uptrip/phuquoc.jpg?updatedAt=1712229571115", destination:"Phu Quoc"},
        {imgSrc:"https://ik.imagekit.io/Uptrip/hanoi.jpg?updatedAt=1712229565883", destination:"Ha Noi"},
        {imgSrc:"https://ik.imagekit.io/Uptrip/condao.jpg?updatedAt=1712229564530", destination:"Con Dao"},
        {imgSrc:"https://ik.imagekit.io/Uptrip/dalat.jpeg?updatedAt=1712229564839", destination:"Da Lat"}
    ];

    
    return<>
    <section className="mx-auto max-w-7xl px-6 py-6">
        <div>
            <p className="text-2xl font-bold py-2 capitalize">Plan your perfect trip</p>
            <p className="text-lg font-light">Search Flights & Places Hire to our most popular destinations.</p>

        </div>
        <div className="py-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8">
                {destinations.map((destination, index) => (
                    <Suspense fallback={<div>Loading...</div>}>
                        <Box key={index} imgSrc={destination.imgSrc} destination={destination.destination} />
                    </Suspense>
                ))}
            </div>
        </div>
    </section>
    </>
}

function Box({imgSrc, destination}){
    const handleNavigate = useHandleNavigate(`/quick-search/?keyword=${destination}`);

    return<>
        <div onClick={handleNavigate} className="border border-transparent rounded-md shadow-md bg-white transition ease-in-out delay-150 hover:translate-x-0.5 hover:scale-100 duration-300">
            <div className="flex items-center space-x-4 md:space-x-6">
                <div className="p-4 md:w-1/3">
                    <div className="w-[105px] h-[70px]">
                        <Link to="">
                            <img src={imgSrc} alt={`${destination} img`} className="shadow-md rounded-md w-full h-full object-fill"/>
                        </Link>
                    </div>
                </div>
                <div className="flex-col space-y-2 justify-between">
                    <div>
                        <Link to="" className="text-xl font-bold text-[#112211]">{destination}</Link>
                    </div>
                   
                    <div className="grid grid-cols-3 gap-x-2 pr-2 md:pr-0">
                        <div className="transition ease-in-out delay-150 hover:translate-x-0.5 hover:scale-100 duration-300">
                            <Link to="" className="text-md">Flights</Link>
                        </div>

                        <div className="transition ease-in-out delay-150 hover:translate-x-0.5 hover:scale-100 duration-300">
                            <Link to="" className="text-md">Hotels</Link>
                        </div>

                        <div className="transition ease-in-out delay-150 hover:translate-x-0.5 hover:scale-100 duration-300">
                            <Link to="" className="text-md">Resorts</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}