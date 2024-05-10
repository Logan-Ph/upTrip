import { Link } from "react-router-dom";

export default function ItineraryCardSkeleton() {
    return (
        <>
            <div class="card flex-col md:flex-row card-side rounded-md bg-white shadow-xl my-4">
                <Link>
                    <figure class="rounded-t-lg md:rounded-tr-none md:rounded-l-lg skeleton w-full h-[150px] md:w-[380px] md:h-full object-cover"></figure>
                </Link>

                <div class="card-body flex-1 px-4 p-7">
                    <Link>
                        <h2 class="skeleton card-title text-base md:text-2xl hover:underline underline-offset-4 h-8"></h2>
                    </Link>
                    <div>
                        <div class="skeleton h-4 w-full mt-4 mb-2"></div>
                        <div class="skeleton h-4 w-full"></div>
                    </div>
                    <button className="btn rounded-lg skeleton h-5 w-16 mt-10"></button>
                </div>
            </div>
        </>
    );
}
