import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {ExperienceCard } from "../components/InfoCard";
import { StayCard } from "../components/InfoCard";
import { FlightCard } from "../components/InfoCard";
import { InfoCardSkeleton } from "../components/skeletonLoadings/InfoCardSkeleton";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { fetchFavoriteItems } from "../api/fetch";

export default function FavoriteItems() {
    const { auth } = useContext(AuthContext);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const collectionId = searchParams.get('collectionId');
    const [tab, setTab] = useState('all');

    useEffect(() => {
        if (!auth?.accessToken) {
            navigate('/login')
        }
    }, [auth, navigate])

    const {
        data: favorite,
        isLoading: isFavoriteLoading,
        refetch: refetchFavorite
    } = useQuery({
        queryKey: ['favorite-items', collectionId],
        queryFn: () => fetchFavoriteItems({ collectionId }),
        retry: 0,
        refetchOnWindowFocus: false
    })

    return (
        <>
            <div className="md:px-10 bg-[#FAFBFC]">
                <div className="mx-auto max-w-8xl px-6 py-10">
                    <div className="text-base breadcrumbs">
                        <ul>
                            <li>
                                <Link to="/favorites">Favorites</Link>
                            </li>
                            <li>
                                {/* Name of favorite collection */}
                                <div>{favorite?.name}</div>
                            </li>
                        </ul>
                    </div>
                    <div className="my-6 space-y-4">
                        <h2 className="font-semibold text-3xl">
                            {favorite?.name}
                        </h2>
                        <p className="text-gray-500 text-lg">
                            {favorite?.description}
                        </p>
                        <p className="text-right text-gray-500 text-lg">
                            {favorite?.experience?.length +
                                favorite?.hotels?.length +
                                favorite?.flights?.length}{" "}
                            items
                        </p>
                        <div class="flex space-x-2 justify-between my-4 overflow-x-auto">
                            <div
                                class={`px-7 py-2 border rounded shadow-sm font-medium text-gray-500 grow text-center cursor-pointer ${
                                    tab === "all" ? "bg-gray-200" : "bg-white"
                                }`}
                                onClick={() => setTab("all")}
                            >
                                All
                            </div>
                            <div
                                class={`px-7 py-2 border rounded shadow-sm font-medium text-gray-500 grow text-center cursor-pointer ${
                                    tab === "stays" ? "bg-gray-200" : "bg-white"
                                }`}
                                onClick={() => setTab("stays")}
                            >
                                Stays
                            </div>
                            <div
                                class={`px-7 py-2 border rounded shado  w-sm font-medium text-gray-500 grow text-center cursor-pointer ${
                                    tab === "flights"
                                        ? "bg-gray-200"
                                        : "bg-white"
                                }`}
                                onClick={() => setTab("flights")}
                            >
                                Flights
                            </div>
                            <div
                                class={`px-7 py-2 border rounded shadow-sm font-medium text-gray-500 grow text-center cursor-pointer ${
                                    tab === "experiences"
                                        ? "bg-gray-200"
                                        : "bg-white"
                                }`}
                                onClick={() => setTab("experiences")}
                            >
                                Experiences
                            </div>
                        </div>
                        {!favorite && 
                        <>
                            <div className="text-center text-xl py-16">
                                <p>No items in your collection yet.</p>
                                <a href="/" className="font-semibold text-[18px]">
                                    Start browsing to add your favorite travel
                                    items!
                                </a>
                            </div>
                        </>
                        }
                        {isFavoriteLoading ? (
                            <div className="my-4">
                                <InfoCardSkeleton />
                            </div>
                        ) : tab === "all" ? (
                            <>
                                {favorite?.hotels?.map((item) => (
                                    <div className="my-4">
                                        <StayCard key={item.id} item={item} refetchFavorite={refetchFavorite}/>
                                    </div>
                                ))}
                                {favorite?.flights?.map((item) => (
                                    <div className="my-4">
                                        <FlightCard key={item.id} item={item} refetchFavorite={refetchFavorite}/>
                                    </div>
                                ))}
                                {favorite?.experience?.map((item) => (
                                    <div className="my-4">
                                        <ExperienceCard
                                            key={item.id}
                                            item={item}
                                            refetchFavorite={refetchFavorite}
                                        />
                                    </div>
                                ))}
                            </>
                        ) : tab === "stays" ? (
                            favorite?.hotels?.map((item) => (
                                <div className="my-4">
                                    <StayCard key={item.id} item={item} refetchFavorite={refetchFavorite}/>
                                </div>
                            ))
                        ) : tab === "flights" ? (
                            favorite?.flights?.map((item) => (
                                <div className="my-4">
                                    <FlightCard key={item.id} item={item} refetchFavorite={refetchFavorite}/>
                                </div>
                            ))
                        ) : tab === "experiences" ? (
                            favorite?.experience?.map((item) => (
                                <div className="my-4">
                                    <ExperienceCard key={item.id} item={item} refetchFavorite={refetchFavorite}/>
                                </div>
                            ))
                        ) : null}
                    </div>
                </div>
            </div>
        </>
    );
}
