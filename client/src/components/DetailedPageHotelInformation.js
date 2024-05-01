export default function DetailedPageHotelInformation(){
    return(
        <>
        <div className="border-[#8DD3BB] border-2 p-4 rounded-lg">
            <div className="flex items-center space-x-4 mb-2">
                <p className="font-extrabold text-2xl">Hotel Perle dOrient Cat Ba-MGallery</p>

                <div class="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                        <div>
                            <svg className="w-4 h-4 md:w-5 md:h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                            <path fill="#FFA732" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"/></svg>
                        </div>
                        <div className="border border-[#CDEAE1] px-1 md:px-2 bg-[#CDEAE1]">
                            <p className="font-bold text-sm md:text-md">5<span className="text-sm md:text-md font-light">/5</span></p>
                        </div>
                    </div>
                    <p className="font-bold text-sm md:text-md">Very good</p>      
                </div>

                <p>371 reviews</p>
            </div>

            {/* Hotel location */}
            <div className="flex items-center mb-2">
                <div className="pr-1">
                    <svg
                        className="w-[15px] h-[15px]"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 384 512"
                       
                    >
                        <path fill="red"
                            d="M172.3 501.7C27 291 0 269.4 0 192 0 86 86 0 192 0s192 86 192 192c0 77.4-27 99-172.3 309.7-9.5 13.8-29.9 13.8-39.5 0zM192 272c44.2 0 80-35.8 80-80s-35.8-80-80-80-80 35.8-80 80 35.8 80 80 80z"
                            
                        />
                    </svg>
                </div>
                <div className="font-light text-sm md:text-md">
                    <span className="font-medium text-gray-500 text-sm md:text-lg"> Cat Co 3 Beach, TT. Cat Ba, Haiphong, Vietnam</span>
                </div>
            </div>

            <div>
                <div className="flex items-center">
                    <div className="pr-1">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="w-[15px] h-[15px]">
                            <path fill="red" d="M560 64c8.8 0 16-7.2 16-16V16c0-8.8-7.2-16-16-16H16C7.2 0 0 7.2 0 16v32c0 8.8 7.2 16 16 16h16v384H16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h240v-80c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v80h240c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16h-16V64h16zm-304 44.8c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v38.4c0 6.4-6.4 12.8-12.8 12.8h-38.4c-6.4 0-12.8-6.4-12.8-12.8v-38.4zm0 96c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v38.4c0 6.4-6.4 12.8-12.8 12.8h-38.4c-6.4 0-12.8-6.4-12.8-12.8v-38.4zm-128-96c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v38.4c0 6.4-6.4 12.8-12.8 12.8h-38.4c-6.4 0-12.8-6.4-12.8-12.8v-38.4zM179.2 256h-38.4c-6.4 0-12.8-6.4-12.8-12.8v-38.4c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v38.4c0 6.4-6.4 12.8-12.8 12.8zM192 384c0-53 43-96 96-96s96 43 96 96H192zm256-140.8c0 6.4-6.4 12.8-12.8 12.8h-38.4c-6.4 0-12.8-6.4-12.8-12.8v-38.4c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v38.4zm0-96c0 6.4-6.4 12.8-12.8 12.8h-38.4c-6.4 0-12.8-6.4-12.8-12.8v-38.4c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v38.4z"/>
                        </svg>
                    </div>
                    <p className="font-bold text-black text-sm md:text-lg">About Accommodation</p>
                </div>
                <p>Get your trip off to a great start with a stay at this property, which offers free Wi-Fi in all rooms. Conveniently situated in the Cát Bà Town Beach part of Cat Ba Island, this property puts you close to attractions and interesting dining options. Don't leave before paying a visit to the famous Quiri Pub Cocktail & Restaurant. Rated with 5 stars, this high-quality property provides guests with access to massage, restaurant and fitness center on-site.</p>
            </div>
        </div>
        <div className="my-6">
            <HotelPriceComparison/>
        </div>
        </>
    )
}

function HotelPriceComparison(){
    const website = [
        
        {imgSrc: "https://ik.imagekit.io/Uptrip/booking.com?updatedAt=1712829810252", price: "3.455.000 VND"},
        {imgSrc: "https://ik.imagekit.io/Uptrip/trip.com?updatedAt=1712830814655", price: "3.650.000 VND"},
        {imgSrc: "https://upload.wikimedia.org/wikipedia/commons/c/ce/Agoda_transparent_logo.png", price: "3.406.750 VND"},
    ]

    return(
        <>
        {website.map((item, index) => (
            <div className="bg-[#CDEAE1] border-transparent grid grid-cols-2 rounded-lg my-2">
                <div className="my-auto pl-5">
                    <img src={item.imgSrc} alt="website logo" className="w-[120px] h-[60px] object-cover"/>
                </div>

                <div className="grid grid-cols-3 my-auto">
                    <div>{item.price}</div>
                    <div>Book Now</div>
                    <div> Heart</div>
                </div>
            </div>
        ))}
        

        </>
    )
}