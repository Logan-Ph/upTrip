import { Link } from "react-router-dom";

export function InfoCardSkeleton() {
    return (
        <>
            <Link href="">
                <div class="card flex-col md:flex-row card-side rounded-lg bg-white shadow-xl">
                    <figure className="w-full h-[250px] md:w-[310px] object-cover skeleton rounded-t-lg rounded-b-none md:rounded-tr-none md:rounded-l-lg bg-gray-300"></figure>
                    <div class="flex md:justify-between flex-col w-full px-5 pt-3 pb-7 md:p-7">
                        <div>
                            <div class="card-title skeleton h-6 w-30 mb-4" />
                            <p class="text-gray-500 skeleton h-4 w-30 mb-2"></p>
                            <p class="text-gray-500 skeleton h-4 w-30 mb-2"></p>
                        </div>
                        <div class="card-actions md:justify-between flex-col md:flex-row md:items-end">
                            <button class="btn btn-sm skeleton rounded-lg w-24"></button>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    );
}
