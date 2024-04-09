import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { fetchQuickSearchAttractions, fetchQuickSearchHotels } from "../api/fetch";

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
        <div>
            <div>
                <h2>Hotels</h2>
                {!hotelsQuery.isLoading && hotelsQuery.data?.map((hotel) => (
                    <div key={hotel.id}>
                        <p>{hotel.hotelName}</p>
                    </div>
                ))}
            </div>
			<hr/>
            <div>
                <h2>Attractions</h2>
                {!attractionsQuery.isLoading && attractionsQuery.data?.map((attraction) => (
                    <div key={attraction.id}>
                        <p>{attraction.attractionName}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
