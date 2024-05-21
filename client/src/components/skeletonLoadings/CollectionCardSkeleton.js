export default function CollectionCardSkeleton() {
    return (
        <>
            <div className="card card-compact w-94 md:w-auto bg-white shadow-xl rounded-md">
                <figure className="skeleton w-full h-72 rounded-t-md rounded-b-none"></figure>
                <div className="card-body my-2">
                    <div className="flex flex-row justify-between ">
                        <div class="flex flex-col gap-4 w-full">
                            <div class="skeleton h-10 w-28"></div>
                            <div class="skeleton h-4 w-full"></div>
                            <div class="skeleton h-4 w-full"></div>
                            <div class="skeleton h-4 w-full"></div>
                            <div class="skeleton h-4 w-20"></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}