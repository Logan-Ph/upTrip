import { Link } from 'react-router-dom';
import useHandleNavigate from '../utils/useHandleNavigate';

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
                </div>
            </div>
        </section>

    </>
}

function Carousel() {
    const wondersOfVn = [
        { imgUrl: "https://ik.imagekit.io/Uptrip/halongbay.jpg?updatedAt=1712308141006", destination: "Ha Long", city: "Quang Ninh" },
        { imgUrl: "https://ik.imagekit.io/Uptrip/hoian.jpg?updatedAt=1712471800654", destination: "Hoi An", city: "Quang Nam" },
        { imgUrl: "https://ik.imagekit.io/Uptrip/sapa.jpg?updatedAt=1712471905348", destination: "Sapa", city: "Lao Cai" },
        { imgUrl: "https://ik.imagekit.io/Uptrip/danang.jpg?updatedAt=1712471964458", destination: "Da Nang", city: "Da Nang" },
        { imgUrl: "https://ik.imagekit.io/Uptrip/dalat.jpg?updatedAt=1712472061425", destination: "Da Lat", city: "Lam Dong" },
        { imgUrl: "https://ik.imagekit.io/Uptrip/catba.jpg?updatedAt=1712472146159", destination: "Cat Ba", city: "Hai Phong" },
        { imgUrl: "https://ik.imagekit.io/Uptrip/quynhon.jpg?updatedAt=1712472278392", destination: "Quy Nhon", city: "Binh Dinh" },
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
    const handleNavigate = useHandleNavigate(`/quick-search/?keyword=${destination}`);

    return (<>
        <div onClick={handleNavigate}>
            <Link to="" className='transition duration-150 ease-out hover:ease-in-out'>
                <img src={imgUrl} alt={`${destination}`} class="h-[300px] w-[200px] object-cover shadow-lg rounded-xl" />
            </Link>
            <div class="absolute bottom-0 left-0 p-4">
                <p class="text-white text-xl font-extrabold">{destination}</p>
                <p class="text-white text-lg">{city}</p>
            </div>
        </div>
    </>)
}