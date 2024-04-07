import { Link } from 'react-router-dom';

export default function HPExplore() {
    return <>
        <section className='mx-auto max-w-7xl px-6 py-6'>
            <div className='flex flex-col md:flex-row '>

                <div className='w-fullmd:w-1/4 flex flex-col'>
                    <p className='text-2xl font-bold py-2'>Wonders of Vietnam</p>
                    <p className="text-lg font-light">Your gateway to unforgettable experiences in Vietnam!</p>
                    <button className="bg-[#EF4040] hover:bg-[#FF8682] text-white p-4 font-bold w-1/2  mt-5 rounded-2xl transition ease-in-out delay-50 hover:-translate-y-1 duration-100 capitalize text-lg">Explore Now</button>
                </div>

                <div className='w-full md:w-3/4'>
                    <Carousel />
                    {/* <div className="carousel carousel-end rounded-box shadow-md">
                        <div className="carousel-item">
                            <img src="https://daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg" alt="Drink" />
                        </div> 
                        <div className="carousel-item">
                            <img src="https://daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.jpg" alt="Drink" />
                        </div> 
                        <div className="carousel-item">
                            <img src="https://daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.jpg" alt="Drink" />
                        </div> 
                        <div className="carousel-item">
                            <img src="https://daisyui.com/images/stock/photo-1494253109108-2e30c049369b.jpg" alt="Drink" />
                        </div> 
                        <div className="carousel-item">
                            <img src="https://daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.jpg" alt="Drink" />
                        </div> 
                        <div className="carousel-item">
                            <img src="https://daisyui.com/images/stock/photo-1559181567-c3190ca9959b.jpg" alt="Drink" />
                        </div> 
                        <div className="carousel-item">
                            <img src="https://daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.jpg" alt="Drink" />
                        </div>
                    </div>  */}

                </div>

            </div>

        </section>

    </>
}

function Carousel() {
    const wondersOfVn = [
        { imgUrl: "https://ik.imagekit.io/Uptrip/halongbay.jpg?updatedAt=1712308141006", destination: "Ha Long", city: "Quang Ninh" },
        { imgUrl: "https://ik.imagekit.io/Uptrip/halongbay.jpg?updatedAt=1712308141006", destination: "Hoi An", city: "Quang Nam" },
        { imgUrl: "https://ik.imagekit.io/Uptrip/halongbay.jpg?updatedAt=1712308141006", destination: "Sapa", city: "Lao Cai" },
        { imgUrl: "https://ik.imagekit.io/Uptrip/halongbay.jpg?updatedAt=1712308141006", destination: "Da Nang", city: "Da Nang" },
        { imgUrl: "https://ik.imagekit.io/Uptrip/halongbay.jpg?updatedAt=1712308141006", destination: "Da Lat", city: "Lam Dong" },
        { imgUrl: "https://ik.imagekit.io/Uptrip/halongbay.jpg?updatedAt=1712308141006", destination: "Cat Ba", city: "Hai Phong" },
        { imgUrl: "https://ik.imagekit.io/Uptrip/halongbay.jpg?updatedAt=1712308141006", destination: "Quy Nhon", city: "Binh Dinh" },
    ]

    return (
        <div className="carousel carousel-end space-x-6 py-4">
          {wondersOfVn.map((wonder, index) => (
            <div key={index} className="carousel-item relative overflow-hidden transition ease-out delay-100 hover:translate-x-1 duration-100 hover:border-[#CDEAE1] rounded-xl">
              <DecorativeCard imgUrl={wonder.imgUrl} destination={wonder.destination} city={wonder.city} />
            </div>
          ))}
        </div>
    )
}



function DecorativeCard({ imgUrl, destination, city }) {
    return <>
        <div>
            <Link to="" className='transition duration-150 ease-out hover:ease-in-out'>
                <img src={imgUrl} alt={`${destination}`} class="h-[300px] w-[200px] object-cover shadow-lg rounded-xl" />
            </Link>
            <div class="absolute bottom-0 left-0 p-4">
                <p class="text-white text-xl font-extrabold">{destination}</p>
                <p class="text-white text-lg">{city}</p>
            </div>
        </div>
    </>
}