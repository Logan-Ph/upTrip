import { PlanYourTripCard } from "../LazyLoadingComponents";

export default function HPPLanYourTripSkeleton() {
    return (
        <section className="mx-auto max-w-7xl px-6 py-6">
        <div>
            <p className="text-2xl font-bold py-2 capitalize">Plan your perfect trip</p>
            <p className="text-lg font-light">Search Flights & Places Hire to our most popular destinations.</p>

        </div>
        <div className="py-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8">
                <PlanYourTripCard/>
                <PlanYourTripCard/>
                <PlanYourTripCard/>
            </div>
        </div>
    </section>
    )
}

