import { ImageCardCarousel } from "../LazyLoadingComponents";

export default function HPExploreSkeleton() {
    return (
        <section className='mx-auto max-w-7xl px-6 py-6'>
            <div className='flex flex-col md:flex-row '>

                <div className='w-fullmd:w-1/4 flex flex-col'>
                    <p className='text-2xl font-bold py-2'>Wonders of Vietnam</p>
                    <p className="text-lg font-light">Your gateway to unforgettable experiences in Vietnam!</p>
                    <button className="bg-[#EF4040] hover:bg-[#FF8682] text-white p-4 font-bold w-1/2  mt-5 rounded-2xl transition ease-in-out delay-50 hover:-translate-y-1 duration-100 capitalize text-lg">Explore Now</button>
                </div>

                <div className='w-full md:w-3/4'>
                    <div className='relative'>
                        <div className="carousel carousel-end space-x-6 py-4">
                            <ImageCardCarousel/>
                            <ImageCardCarousel/>
                            <ImageCardCarousel/>
                            <ImageCardCarousel/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

