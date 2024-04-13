export function AdvancedHotelCard() {
    return (
        <>
            <div className="flex justify-between">
                <div>
                    <p>
                        Showing 3 of 3164 properties found in Ho Chi Minh City
                    </p>
                </div>
                <div>
                    <p>Sort by</p>
                </div>
            </div>

            <div className="my-10">
                <HotelCard />
            </div>
        </>
    );
}

function HotelCard(imgSrc, hotelName, district, city, price) {
    return (
        <>
            <div className="bg-white rounded-md flex py-6 px-4 shadow-md">
                <div>
                    <img
                        src="https://ik.imagekit.io/Uptrip/hotel.jpg?updatedAt=1712768205495"
                        alt=""
                        className="w-[200px] h-[200px] object-cover"
                    />
                </div>
                <div className="ml-6">
                    <p>New World Saigon Hotel</p>
                    <p>Tan Binh District, Ho Chi Minh City</p>
                    <div>
                        <div className="flex justify-between">
                            <div>heart</div>
                            <div>Traveloka - 1.300.000VND</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
