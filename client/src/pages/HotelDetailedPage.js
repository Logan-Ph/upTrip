import { useSearchParams } from "react-router-dom";
import DetailPageGallery from "../components/DetailPageGallery";
import DetailedPageHotelInformation from "../components/DetailedPageHotelInformation";
import { useQuery } from "@tanstack/react-query";
import { fetchHotelPriceComparison, fetchSpecificHotel, getHotelAlbums, getHotelInfo, getNearByHotels } from "../api/fetch";
import { useRef } from "react";

export default function HotelDetailedPage(){
    const [searchParams] = useSearchParams()
    const listSort = useRef(searchParams.get("listFilters")?.split(",")?.[0]);
    const listFilter = useRef(
        searchParams.get("listFilters")?.split(",")?.slice(1)
    );
    const payload = {
        resultType: searchParams.get("resultType"),
        city: searchParams.get("city"),
        hotelId: searchParams.get("hotelId"),
        cityName: searchParams.get("cityName"),
        hotelName: searchParams.get("hotelName"),   
        searchValue: searchParams.get("searchValue"),
        provinceId: searchParams.get("provinceId"),
        countryId: searchParams.get("countryId"),
        districtId: searchParams.get("districtId"),
        checkin: searchParams.get("checkin"),
        checkout: searchParams.get("checkout"),
        barCurr: searchParams.get("barCurr"),
        cityType: searchParams.get("cityType"),
        latitude: searchParams.get("latitude"),
        longitude: searchParams.get("longitude"),
        searchCoordinate: searchParams.get("searchCoordinate"),
        crn: searchParams.get("crn"),
        adult: searchParams.get("adult"),
        children: searchParams.get("children"),
        domestic: searchParams.get("domestic"),
        preHotelIds: searchParams.getAll("preHotelIds"),
        listFilters: `${listSort.current},${listFilter.current}`,
    }

    const {
        data: nearbyHotels
    } = useQuery({
        queryKey: ['nearbyHotels', payload],
        queryFn: () => getNearByHotels(payload),
        retry: 0,
        refetchOnWindowFocus: false,
        enabled: !!payload
    })

    const {
        data: hotelInfo
    } = useQuery({
        queryKey: ['hotelInfo', payload],
        queryFn: () => getHotelInfo(payload),
        retry: 0,
        refetchOnWindowFocus: false,
        enabled: !!payload
    })

    const {
        data: hotelAlbums
    } = useQuery({
        queryKey: ['hotelAlbums', payload],
        queryFn: () => getHotelAlbums(payload),
        retry: 0,
        refetchOnWindowFocus: false,
        enabled: !!payload
    })

    const {
        data: specificHotel,
        status: specificHotelStatus,
    } = useQuery({
        queryKey: ["advanced-search-specific"],
        queryFn: () => fetchSpecificHotel(payload),
        retry: false,
        refetchOnWindowFocus: false,
    });

    const {
        data: specificHotelPriceComparison
    } = useQuery({
        queryKey: ["hotel-price-comparison", specificHotel],
        queryFn: () => fetchHotelPriceComparison({ ...payload, hotelNames: [specificHotel.matchHotel.name] }),
        retry: false,
        refetchOnWindowFocus: false,
    });

    return(
        <>
        <div className="bg-[#FAFBFC] md:p-10">
                <section className="mx-auto max-w-8xl px-6 py-6">
                    <DetailPageGallery/>
                    <div className="my-6"></div>
                    <DetailedPageHotelInformation/>
                </section>
        </div>
        </>
    )
}