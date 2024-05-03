import { Link } from "react-router-dom";

export function InfoCardSkeleton() {
    return (
        <>
            <Link href="">
                <div class="card card-side rounded-sm bg-base-100 shadow-xl">
                    <figure className="w-1/3 h-[252px]object-cover skeleton rounded-none"></figure>
                    <div class="card-body">
                        <h2 class="card-title skeleton h-4 w-30"></h2>
                        <p class="text-gray-500 skeleton h-4 w-30 mb-4"></p>
                        <div class="card-actions md:justify-between flex-col md:flex-row md:items-end">
                            <button class="btn skeleton rounded-lg w-28"></button>
                            <div className="skeleton w-20 h-4"></div>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    );
}
