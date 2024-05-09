import { Link } from "react-router-dom"
import { IconSwimming, IconGlassChampagne, IconHomeBolt, IconHorseToy,IconToolsKitchen2, IconMassage, IconBarbell, IconDoor, IconPool,IconDesk } from '@tabler/icons-react';
export default function DetailedPageHotelInformation(){
    return(
        <>
        <div className="border-[#8DD3BB] border-2 p-4 rounded-lg space-y-2">
            <div className="flex flex-col space-y-2 lg:flex-row md:items-center lg:space-x-4 mb-2">
                <p className="font-extrabold text-2xl">Hotel Perle dOrient Cat Ba-MGallery</p>

                <div class="flex flex-row items-center space-x-2">
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
                    <p>371 reviews</p>    
                </div>
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
        <div className="my-6">
            <HotelRelatedInformation/>
        </div>
        <div className="my-6">
            <Reviews/>
        </div>
        <div className="my-6">
            <NearbyHotel/>
        </div>
        </>
    )
}

function HotelPriceComparison(){
    const website = [
        
        {imgSrc: "https://ik.imagekit.io/Uptrip/booking.com?updatedAt=1712829810252", price: "3.455.000 VND"},
        {imgSrc: "https://ik.imagekit.io/Uptrip/trip.com?updatedAt=1712830814655", 
        price: "3.650.000 VND",
        linkTo: "https://us.trip.com/hotels/detail/?cityId=6942&hotelId=758788&checkIn=2024-06-23&checkOut=2024-06-24&adult=4&children=0&subStamp=1479&crn=1&ages=&travelpurpose=0&curr=USD&link=button&hoteluniquekey=H4sIAAAAAAAAAONazsjFJMEixMTBKDWHkWNJz71pzEKMRgb3GS22yjvKt74O3NEwwcHT42GVyLptixwCeCYxSnKePQMEa1IcBEGi7iuTHJxYOb7xSDDNYGxZobeCkXEjI1j9-kKHHYxMJxgnMS5g6m-ZLbuLiZXjjaQE0yEgfUROguUUE8MlJoZbTAyPmBheMTF8YmL4xQQxqImZoYuZYRIzK8cifgmWWcwMi5gZpHhTzU0MUy2TTQ2M0kxNFYQ0Viw7sZHNSGkSI1No8ClGKUNzQ0NjU0sTI2MLQyM9S0vjlOwKt7KUMN8UK2YpRjcPxiA2N1dzRyfnKC0u5tBgF0EGMPhgLwXiKcJ4WiCe4fyzq85f_SbjkMSamqcbGpxxgb-AsYuRQ4DRgzGCsYLxFSNI1Q-QfwEpEo_CQgEAAA&subChannel=&masterhotelid_tracelogid=e741e9c502f55&NewTaxDescForAmountshowtype0=T&detailFilters=17%7C1~17~1*80%7C0%7C1~80~0&hotelType=normal&barcurr=USD&locale=en-US"
        },
        {imgSrc: "https://upload.wikimedia.org/wikipedia/commons/c/ce/Agoda_transparent_logo.png", price: "3.406.750 VND",
       
        },
    ]

    return(
        <>
        {website.map((item, index) => (
            <div className="bg-[#CDEAE1] border-transparent grid grid-cols-4 rounded-lg my-2 shadow-md px-2 lg:px-10">

                <div className="my-auto md:pl-5">
                    <img src={item.imgSrc} alt="website logo" className="w-[90px] h-[45px] md:w-[120px] md:h-[60px] object-cover"/>
                </div>

                <div className="col-span-3">
                    <div className="grid grid-cols-3">
                        <div className="font-bold text-xs md:text-xl text-[#222160] my-auto">{item.price}</div>

                            <button onClick={() => window.open(item.linkTo, '_blank')}
                                    className=" mr-2 md:mr-4  btn btn-accent hover:text-white my-2 bg-white bg-opacity-70 text-black shadow-sm cursor-pointer flex items-center rounded-lg">
                                <span className="mx-auto md:py-2 text-sm ">Book Now</span>
                            </button>
                      
                            {/* price drop */}
                            <button href={item.linkTo} target="_blank" 
                                    className="ml-2 md:ml-4  my-2 btn glass btn-success hover:text-white bg-white bg-opacity-70 text-black shadow-sm cursor-pointer flex items-center rounded-lg">
                                <span className="mx-auto md:py-2 text-xs">Alert Price Drop </span>
                            </button>
                       
                    </div>
                </div>

                
            </div>
        ))}
        </>
    )
}

function HotelRelatedInformation(){
    const amenities = [
        { IconComponent: IconSwimming, text: 'Outdoor Swimming Pool' },
        { IconComponent: IconGlassChampagne, text: 'Bar' },
        { IconComponent: IconHorseToy, text: "Kid's Club" },
        { IconComponent: IconHomeBolt, text: 'Sauna' },
        { IconComponent: IconToolsKitchen2, text: 'Restaurant' },
        { IconComponent: IconDesk, text: '24-Hour Front Desk' },
        { IconComponent: IconMassage, text: 'Spa' },
        { IconComponent: IconBarbell, text: 'Fitness Room' },
        { IconComponent: IconDoor, text: 'Meeting Room' },
        { IconComponent: IconPool, text: "Children's Pool" },
    ];
    
    return(
        <>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-6 gap-x-8">

            <div className="border-[#8DD3BB] border-2  rounded-lg">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3731.862860055853!2d107.0471119759641!3d20.715792798452966!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314a45841b71f5e1%3A0x52df34f512ccce2f!2sH%C3%B4tel%20Perle%20d&#39;Orient%20Cat%20Ba%20-%20MGallery!5e0!3m2!1sen!2s!4v1714836200569!5m2!1sen!2s" 
                className="w-full h-[300px]" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"/>
            </div>

            <div className="border-[#8DD3BB] border-2 rounded-lg py-4 px-6">
                <div className="pb-6 font-bold text-xl">Most Popular Amenities</div>
                    <div className="grid grid-cols-2 gap-4">
                        {amenities.map((amenity, index) => (
                            <div key={index} className="flex items-center">
                                <amenity.IconComponent stroke={2} size={28} color="#9A9A9A" />
                                <p className="ml-2 font-semibold text-lg text-gray-900">{amenity.text}</p>
                            </div>
                        ))}
                    </div>
                    
                </div>
            </div>
        </>
    )
}

function Reviews(){
    return(
        <>
        <div className="border-[#8DD3BB] border-2 p-4 rounded-lg">
            {/* Tittle */}
            <div className="text-xl font-bold mb-4">Guest Reviews <span className="font-light text-sm ml-1">(45)</span></div>

            {/* Rating points */}
            <div className="grid grid-cols-1 lg:grid-cols-3">
                <div>
                    {/* Total rating points of a hotel */}
                    <div className="flex items-center my-auto">
                        <div className="border-[#8DD3BB] bg-[#8DD3BB] rounded-full w-1/4 py-1 px-2 flex items-end justify-center">
                            <span className="text-3xl font-extrabold text-white ">4.7</span>
                            <span className="text-xl font-semibold text-[#CDEAE1]">/5</span>
                        </div>
                        
                        <div className="text-2xl ml-2 font-bold">Amazing</div>
                    </div>
                </div>

                {/* Rating bar section */}
                <div className="col-span-2">
                    <div className="grid grid-cols-1 xl:grid-cols-2 md:gap-x-10">
                        
                        <div className="mt-6 lg:mt-0  ">
                            <div className="w-[350px] md:w-[400px] flex items-center justify-between">
                                <div className="font-semibold text-md">Cleanliness</div>
                                <div className="font-bold text-md text-[#222160]">4.8</div>
                            </div>

                            {/* > md
                                1 star = 80px (0.1 star = 8px)                      
                                2 stars = 160px
                                3 stars = 240px
                                4 stars = 320px
                                4.2 stars = 320 + 0.2*8 = 336px
                                4.4 stars =  352px
                                4.6 stars =  368px
                                4.8 stars =  384px 
                                5 stars = 400px
                            */}
                            {/* < md
                                1 star = 70px (0.1 star = 7px)                      
                                2 stars = 140px
                                3 stars = 210px
                                4 stars = 280px
                                5 stars = 350px
                            */}

                            <div className="relative mt-2 h-4">
                                <div className="absolute border-4 border-gray-200 w-[350px] md:w-[400px] rounded-xl"></div>
                                <div className="absolute z-1 top-0 w-[336px] md:w-[384px] rounded-xl border-4 border-[#8DD3BB]"></div>
                            </div>
                        </div>

                        <div>
                            <div className="w-[350px] md:w-[400px] flex items-center justify-between">
                                <div className="font-semibold text-md">Amenities</div>
                                <div className="font-bold text-md text-[#222160]">4.6</div>
                            </div>
                            <div className="relative mt-2 h-4">
                                <div className="absolute border-4 border-gray-200 w-[350px] md:w-[400px] rounded-xl"></div>
                                <div className="absolute z-1 top-0 w-[322px] md:w-[384px] rounded-xl border-4 border-[#8DD3BB]"></div>
                            </div>
                        </div>

                        <div>
                            <div className="w-[350px] md:w-[400px] flex items-center justify-between">
                                <div className="font-semibold text-md">Location</div>
                                <div className="font-bold text-md text-[#222160]">4.6</div>
                            </div>
                            <div className="relative mt-2 h-4">
                                <div className="absolute border-4 border-gray-200 w-[350px] md:w-[400px] rounded-xl"></div>
                                <div className="absolute z-1 top-0 w-[322px] md:w-[384px] rounded-xl border-4 border-[#8DD3BB]"></div>
                            </div>
                        </div>

                        <div>
                            <div className="w-[350px] md:w-[400px] flex items-center justify-between">
                                <div className="font-semibold text-md">Service</div>
                                <div className="font-bold text-md text-[#222160]">4.7</div>
                            </div>
                            <div className="relative mt-2 h-4">
                                <div className="absolute border-4 border-gray-200 w-[350px] md:w-[400px] rounded-xl"></div>
                                <div className="absolute z-1 top-0 w-[329px] md:w-[384px] rounded-xl border-4 border-[#8DD3BB]"></div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Rating comment */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-8">
                <div>
                    {/* users information */}
                    <div className="flex items-center ">
                        {/* avatar */}
                        <div class="avatar">
                            <div class="w-12 h-12 rounded-full">
                                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                            </div>
                        </div>

                        {/* users information */}
                        <div className="mx-6 flex flex-col">
                            <div className="font-bold text-lg">John Doberman</div>
                            <div className="font-light text-md text-gray-500">May 12 2020</div>
                        </div>
                    </div>

                    {/* comment section */}
                    <div className="mt-4 text-md font-medium text-[#9A9A9A]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
                </div>

                <div>
                    {/* users information */}
                    <div className="flex items-center ">
                        {/* avatar */}
                        <div class="avatar">
                            <div class="w-12 h-12 rounded-full">
                                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                            </div>
                        </div>

                        {/* users information */}
                        <div className="mx-6 flex flex-col">
                            <div className="font-bold text-lg">John Doberman</div>
                            <div className="font-light text-md text-gray-500">May 12 2020</div>
                        </div>
                    </div>

                    {/* comment section */}
                    <div className="mt-4 text-md font-medium text-[#9A9A9A]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
                </div>

                <div>
                    {/* users information */}
                    <div className="flex items-center ">
                        {/* avatar */}
                        <div class="avatar">
                            <div class="w-12 h-12 rounded-full">
                                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                            </div>
                        </div>

                        {/* users information */}
                        <div className="mx-6 flex flex-col">
                            <div className="font-bold text-lg">John Doberman</div>
                            <div className="font-light text-md text-gray-500">May 12 2020</div>
                        </div>
                    </div>

                    {/* comment section */}
                    <div className="mt-4 text-md font-medium text-[#9A9A9A]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
                </div>

                <div>
                    {/* users information */}
                    <div className="flex items-center ">
                        {/* avatar */}
                        <div class="avatar">
                            <div class="w-12 h-12 rounded-full">
                                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                            </div>
                        </div>

                        {/* users information */}
                        <div className="mx-6 flex flex-col">
                            <div className="font-bold text-lg">John Doberman</div>
                            <div className="font-light text-md text-gray-500">May 12 2020</div>
                        </div>
                    </div>

                    {/* comment section */}
                    <div className="mt-4 text-md font-medium text-[#9A9A9A]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
                </div>

                <div>
                    {/* users information */}
                    <div className="flex items-center ">
                        {/* avatar */}
                        <div class="avatar">
                            <div class="w-12 h-12 rounded-full">
                                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                            </div>
                        </div>

                        {/* users information */}
                        <div className="mx-6 flex flex-col">
                            <div className="font-bold text-lg">John Doberman</div>
                            <div className="font-light text-md text-gray-500">May 12 2020</div>
                        </div>
                    </div>

                    {/* comment section */}
                    <div className="mt-4 text-md font-medium text-[#9A9A9A]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
                </div>

                <div>
                    {/* users information */}
                    <div className="flex items-center ">
                        {/* avatar */}
                        <div class="avatar">
                            <div class="w-12 h-12 rounded-full">
                                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                            </div>
                        </div>

                        {/* users information */}
                        <div className="mx-6 flex flex-col">
                            <div className="font-bold text-lg">John Doberman</div>
                            <div className="font-light text-md text-gray-500">May 12 2020</div>
                        </div>
                    </div>

                    {/* comment section */}
                    <div className="mt-4 text-md font-medium text-[#9A9A9A]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
                </div>


            </div>

        </div>
        </>
    )
}

function NearbyHotel(){
    const value = 30; // Set your rating value here
    return(
        <>
        <div className="relative">
            <div className="grid grid-cols">

            </div>
        </div>
        </>
    )
}