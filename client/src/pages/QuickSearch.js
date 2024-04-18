import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { fetchQuickSearchAttractions, fetchQuickSearchHotels } from "../api/fetch";
import { QuickSearchSkeletonCard } from "../components/LazyLoadingComponents";
import { QuickStayCard } from "../components/QuickSearchCard";
import { QuickExperienceCard } from "../components/QuickSearchCard";

export default function QuickSearch() {
	const [searchParams] = useSearchParams();
    const keyword = searchParams.get("keyword");

    const hotelsQuery = useQuery({
        queryKey: ["quick-search", "hotels", keyword],
        queryFn: () => fetchQuickSearchHotels(keyword),
        retry: false,
        refetchOnWindowFocus: false
    });

    const attractionsQuery = useQuery({
        queryKey: ["quick-search", "attractions", keyword],
        queryFn: () => fetchQuickSearchAttractions(keyword),
        retry: false,
        refetchOnWindowFocus: false
    });

    if (hotelsQuery.isLoading && attractionsQuery.isLoading) return <div>Loading...</div>;
    if (hotelsQuery.isError) return <div>Error: {hotelsQuery.error.message}</div>;
    if (attractionsQuery.isError) return <div>Error: {attractionsQuery.error.message}</div>;

    return (
      <>
        <div class="md:px-10">
          <div class="flex flex-col md:flex-row mx-auto max-w-8xl px-6 py-6">
            {/* filter section */}
            <div class="hidden md:block">
              <ul class="menu bg-white drop-shadow-lg w-56">
                <p className="my-3 px-4 text-lg font-extrabold">
                  Filter Results
                </p>
                <li>
                  <a class="font-semibold underline">All</a>
                </li>
                <li>
                  <a>Stays</a>
                </li>
                <li>
                  <a>Experiences</a>
                </li>
              </ul>
            </div>
            <div class="md:hidden flex space-x-2 justify-between">
              <div class="px-7 py-2 border rounded shadow-sm bg-gray-200 font-medium text-gray-500">
                All
              </div>
              <div class="px-7 py-2 border rounded shadow-sm bg-white font-medium text-gray-500">
                Stays
              </div>
              <div class="px-7 py-2 border rounded shadow-sm bg-white font-medium text-gray-500">
                Experiences
              </div>
            </div>
            <div class="divider lg:divider-horizontal"></div>
            {/*  result section */}
            <div class="grow">
              <div>
                <p className="text-sm md:text-lg font-medium">
                  Results matching{" "}
                  <span className="font-medium text-sm md:text-lg text-wrap md:text-nowrap text-[#FF8682]">
                    "Ho Chi Minh City"
                  </span>
                </p>
              </div>

              <div class="my-3 space-x-3">
                <QuickStayCard/>
                <QuickExperienceCard/>

                {/* Skeleton */}
                <QuickSearchSkeletonCard />
              </div>
            </div>
          </div>
        </div>

        <div>
          <div>
            <h2>Hotels</h2>
            {!hotelsQuery.isLoading &&
              hotelsQuery.data?.map((hotel) => (
                <div key={hotel.id}>
                  <p>{hotel.hotelName}</p>
                </div>
              ))}
          </div>
          <hr />
          <div>
            <h2>Attractions</h2>
            {!attractionsQuery.isLoading &&
              attractionsQuery.data?.map((attraction) => (
                <div key={attraction.id}>
                  <p>{attraction.attractionName}</p>
                </div>
              ))}
          </div>
        </div>
      </>
    );
}
