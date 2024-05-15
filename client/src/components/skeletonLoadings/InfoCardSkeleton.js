import { Link } from "react-router-dom";

export function InfoCardSkeleton() {
    return (
        <>
            <Link href="">
                <div class="card flex-col md:flex-row card-side rounded-lg bg-white shadow-xl">
                    <figure className="w-full h-[300px] md:w-[380px] md:h-[380px] object-cover skeleton rounded-t-lg rounded-b-none md:rounded-tr-none md:rounded-l-lg"></figure>
                    <div class="card-body px-5 pt-3 pb-7 md:p-7">
                        <div class="card-title skeleton h-5 w-30"/>
                        <p class="text-gray-500 skeleton w-30"></p>
                        <div class="card-actions md:justify-between flex-col md:flex-row md:items-end">
                            <button class="btn skeleton rounded-lg w-28"></button>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    );
}
