export default function HPTravelPlanner(){
    const ImageLink = [
        {imgSRC:"https://ik.imagekit.io/Uptrip/1.jpeg?updatedAt=1712237301601"},
        {imgSRC:"https://ik.imagekit.io/Uptrip/2.jpeg?updatedAt=1712237302711"},
        {imgSRC:"https://ik.imagekit.io/Uptrip/3.jpeg?updatedAt=1712237296909"},
        {imgSRC:"https://ik.imagekit.io/Uptrip/4.jpeg?updatedAt=1712237300755"}
    ]

    return<>
    <section className="mx-auto max-w-7xl px-6 py-6 mt-8">
        <div>
            <p className="text-2xl font-bold py-2">Your Personalize Travel Planner</p>
            <p className="text-lg font-light">Effortlessly plan your dream vacation with our personalized travel planner.</p>
        </div>

        <div className="py-6 flex flex-col">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 md:gap-x-8">
                <Ininerary/>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 md:gap-x-6">
                {ImageLink.map((decorative, index) => (
                    <ImageCard key={index} imgSRC={decorative.imgSRC}/>
                ))}
                </div>
            </div>

            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <DecorativeAirportCard/>
                <DecorativeHotelCard/>
            </div>
            
        </div>
    </section>
    </>
}

function Ininerary(){
    return<>
        <div className="bg-[#8DD3BB] border border-transparent rounded-xl p-8">
            <div className="flex flex-col h-full content-center">
                <div className="text-3xl capitalize font-bold">Prepare for your <br/>next advanture</div>
                <p className="text-md font-light py-8">Stay organized by easily keeping track of your bookings and activities in one place, and tailor your trip to suit your preferences and interests with customizable itineraries. Receive personalized recommendations based on your travel preferences and interests, and collaborate with family and friends by sharing your itinerary. Ready to plan your adventure?</p>
                <button className="bg-white hover:bg-[#FAFBFC] text-black font-bold py-2 px-2 mt-5 rounded w-full transition ease-in-out delay-50 hover:-translate-y-1 duration-100 capitalize text-lg">Create your itinerary</button>
            </div>
        </div>
    </>
}

function ImageCard({imgSRC}){
    return <>
        <div className="rounded-xl border-2 border-[#8DD3BB] w-full lg::w-[300px] lg:h-[190px]">
            <img src={imgSRC} alt="decorative" className="rounded-xl w-full h-full object-cover"/>
        </div>
    </>
}

function DecorativeAirportCard(){
    return<>
    <div className="bg-homepagegairport bg-cover bg-center w-full md:h-[400px] rounded-xl border-4 ">
        <div className="flex flex-col md:flex-row w-full h-full mx-auto p-4 backdrop-opacity-25 backdrop-invert rounded-lg shadow-md">
            <div className="p-4 flex flex-col items-center justify-end mx-auto">
                <p className="font-extrabold text-5xl text-white py-2">Flights</p>
                <p className="font-light text-md text-white py-2">Search Flights & Place Hire to our most popular destinations</p>

                <button href="#" className="bg-[#8DD3BB] hover:bg-[#CDEAE1] text-black font-medium py-2 px-8 rounded transition ease-in-out delay-50 hover:translate-y-1 duration-100 capitalize text-md mt-2 flex items-center justify-center space-x-2">
                    <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z"/></svg> 
                    <span>Show Flights</span>
                    </button>
            </div>
        </div>
    </div>
    </>
}

function DecorativeHotelCard(){
    return<>
    <div className="bg-homepagehotel bg-cover bg-center w-full md:h-[400px] rounded-xl border-4 ">
        <div className="flex flex-col md:flex-row w-full h-full mx-auto p-4 backdrop-opacity-25 backdrop-invert rounded-lg shadow-md">
            <div className="p-4 flex flex-col items-center justify-end mx-auto">
                <p className="font-extrabold text-5xl text-white py-2">Hotels</p>
                <p className="font-light text-md text-white py-2">Search Flights & Place Hire to our most popular destinations</p>

                <button href="#" className="bg-[#8DD3BB] hover:bg-[#CDEAE1] text-black font-medium py-2 px-8 rounded transition ease-in-out delay-50 hover:translate-y-1 duration-100 capitalize text-md mt-2 flex items-center justify-center space-x-2">
                    <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z"/></svg> 
                    <span>Show Hotels</span>
                    </button>
            </div>
        </div>
    </div>
    </>
}

