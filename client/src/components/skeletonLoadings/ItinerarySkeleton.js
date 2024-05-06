import { Link } from "react-router-dom";

export default function ItineraryCardSkeleton() {
    return (
        <>
            <div class="card card-side rounded-md md:bg-base-100 md:shadow-xl my-4">
                <Link>
                    <figure class="rounded-l-md skeleton w-[150px] h-[150px] md:w-[380px] md:h-full "></figure>
                </Link>

                <div class="card-body flex-1 p-0 px-4 md:p-7">
                    <Link>
                        <h2 class="skeleton card-title text-base md:text-2xl hover:underline underline-offset-4 h-8"></h2>
                    </Link>
                    <div>
                        <div class="skeleton h-4 w-full mt-4 mb-2"></div>
                        <div class="skeleton h-4 w-full"></div>
                    </div>
                        <button className="btn rounded-lg skeleton h-5 w-14 mt-12">
                            
                        </button>
                    
                </div>
            </div>
        </>
    );
}
