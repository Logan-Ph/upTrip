import { Link } from "react-router-dom";

export function InfoCardSkeleton() {
    return (
        <>
            <Link href="">
                <div class="card flex-col md:flex-row card-side rounded-lg bg-white shadow-xl">
                    <figure className="w-full h-[150px] md:w-[380px] md:h-[200px] object-cover skeleton rounded-t-lg rounded-b-none md:rounded-tr-none md:rounded-l-lg"></figure>
                    <div class="card-body px-5 pt-3 pb-7 md:p-7">
                        <h2 class="card-title skeleton h-5 w-30"></h2>
                        <p class="text-gray-500 skeleton h-4 w-30 mb-10"></p>
                        <div class="card-actions md:justify-between flex-col md:flex-row md:items-end">
                            <button class="btn skeleton rounded-lg w-28"></button>
                            <div className="hidden md:block skeleton w-32 h-4"></div>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    );
}
