import {ExperienceCard } from "../components/InfoCard";
import { StayCard } from "../components/InfoCard";
import { FlightCard } from "../components/InfoCard";
import { InfoCardSkeleton } from "../components/skeletonLoadings/InfoCardSkeleton";


export default function FavoriteItems() {
    return (
        <>
            <div className="md:px-10 bg-[#FAFBFC]">
                <div className="mx-auto max-w-8xl px-6 py-10">
                    <div className="text-base breadcrumbs">
                        <ul>
                            <li>
                                <a>Favorites</a>
                            </li>
                            <li>
                                {/* Name of favorite collection */}
                                <a>Da Nang</a>
                            </li>
                        </ul>
                    </div>
                    <div className="my-6 space-y-4">
                        <h2 className="font-semibold text-3xl">Da Nang</h2>
                        <p className="text-gray-500 text-lg">
                            Description Description Description Description
                            Description Description Description Description
                            Description Description Description Description
                            Description Description Description Description
                            Description Description Description Description
                            Description Description Description Description
                        </p>
                        <p className="text-right text-gray-500 text-lg">
                            30 items
                        </p>
                        <div class="flex space-x-2 justify-between my-4 overflow-x-auto">
                            <div class="px-7 py-2 border rounded shadow-sm bg-gray-200 font-medium text-gray-500 grow text-center">
                                All
                            </div>
                            <div class="px-7 py-2 border rounded shadow-sm bg-white font-medium text-gray-500 grow text-center">
                                Stays
                            </div>
                            <div class="px-7 py-2 border rounded shadow-sm bg-white font-medium text-gray-500 grow text-center">
                                Flights
                            </div>
                            <div class="px-7 py-2 border rounded shadow-sm bg-white font-medium text-gray-500 grow text-center">
                                Experiences
                            </div>
                        </div>
                        <div className="my-4">
                            <ExperienceCard />
                        </div>
                        <div className="my-4">
                            <ExperienceCard />
                        </div>
                        <div className="my-4">
                            <StayCard />
                        </div>
                        <div className="my-4">
                            <FlightCard />
                        </div>
                        <div className="my-4">
                            <InfoCardSkeleton />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
