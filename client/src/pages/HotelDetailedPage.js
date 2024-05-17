import { useSearchParams } from "react-router-dom";
import DetailedPageHotelInformation from "../components/DetailedPageHotelInformation";
import { useQuery } from "@tanstack/react-query";
import { fetchHotelPriceComparison, fetchSpecificHotel, fetchTripAutoComplete, getHotelAlbums, getHotelComments, getHotelInfo, getNearByHotels } from "../api/fetch";
import { useEffect, useRef, useState } from "react";
import DetailPageGallery from "../components/DetailPageGallery";
import DetailedPageGallerySkeleton from "../components/skeletonLoadings/DetailedPageGallerySkeleton";

export default function HotelDetailedPage(){
    const [searchParams] = useSearchParams()
    const listSort = useRef(searchParams.get("listFilters")?.split(",")?.[0]);
    const listFilter = useRef(
        searchParams.get("listFilters")?.split(",")?.slice(1)
    );
    const [payload, setPayload] = useState({
        resultType: searchParams.get("resultType"),
        city: searchParams.get("city"),
        hotelId: searchParams.get("hotelId"),
        cityName: searchParams.get("cityName"),
        hotelName: searchParams.get("hotelName"),   
        provinceId: searchParams.get("provinceId"),
        countryId: searchParams.get("countryId"),
        districtId: searchParams.get("districtId"),
        checkin: searchParams.get("checkin"),
        checkout: searchParams.get("checkout"),
        barCurr: searchParams.get("barCurr"),
        cityType: searchParams.get("cityType"),
        crn: searchParams.get("crn"),
        adult: searchParams.get("adult"),
        children: searchParams.get("children"),
        domestic: searchParams.get("domestic"),
        preHotelIds: [searchParams.get("hotelId")],
        listFilters: `${listSort.current},${listFilter.current}`,
    });

    const { data: autocompletePayload, isSuccess: isAutocompleteSuccess } = useQuery({
        queryKey: ["quick-search", "hotels", payload.hotelName],
        queryFn: () => fetchTripAutoComplete(payload.hotelName),
        refetchOnWindowFocus: false,
        enabled: !!payload.hotelName,
    });

    useEffect(() => {
        if(isAutocompleteSuccess){
            setPayload(prevPayload => ({
                ...prevPayload,
                searchValue: `${autocompletePayload.keyWordSearchResults[0].item.data.filterID}_${autocompletePayload.keyWordSearchResults[0].item.data.type}_${autocompletePayload.keyWordSearchResults[0].item.data.value}_${autocompletePayload.keyWordSearchResults[0].item.data.subType}`,
                searchCoordinate: autocompletePayload.keyWordSearchResults[0].coordinateInfos
                .map(
                    (info) =>
                        `${info.coordinateType}_${info.latitude}_${info.longitude}_${info.accuracy}`
                )
                .join("|"),
                latitude: autocompletePayload.keyWordSearchResults[0].coordinateInfos[3].latitude,
                longitude: autocompletePayload.keyWordSearchResults[0].coordinateInfos[3].longitude,
            }));
        }
    },[isAutocompleteSuccess, autocompletePayload])

    const {
        data: nearByHotels,
        isLoading: isFetchingNearByHotels
    } = useQuery({
        queryKey: ['nearbyHotels', payload.hotelId],
        queryFn: () => getNearByHotels(payload),
        retry: 0,
        refetchOnWindowFocus: false,
        enabled: !!payload
    })

    const {
        data: hotelInfo,
    } = useQuery({
        queryKey: ['hotelInfo', payload.hotelId],
        queryFn: () => getHotelInfo(payload),
        retry: 0,
        refetchOnWindowFocus: false,
        enabled: !!payload
    })

    const {
        data: hotelAlbums,
        isLoading: isFetchingHotelAlbums
    } = useQuery({
        queryKey: ['hotelAlbums', payload.hotelId],
        queryFn: () => getHotelAlbums(payload),
        retry: 0,
        refetchOnWindowFocus: false,
        enabled: !!payload
    })

    const {
        data: hotelComments,
        isLoading: isFetchingHotelComments
    } = useQuery({
        queryKey: ['hotelComments', payload.hotelId],
        queryFn: () => getHotelComments(payload),
        retry: 0,
        refetchOnWindowFocus: false,
        enabled: !!payload
    })

    const {
        data: specificHotel,
    } = useQuery({
        queryKey: ["advanced-search-specific", payload.searchValue],
        queryFn: () => fetchSpecificHotel(payload),
        retry: false,
        refetchOnWindowFocus: false,
        enabled: !!(payload.searchValue && payload.searchCoordinate && payload.latitude && payload.longitude)
    });

    const specificHotelPriceComparison = useQuery({
        queryKey: ["hotel-price-comparison", specificHotel],
        queryFn: () => fetchHotelPriceComparison({ ...payload, hotelNames: [payload.hotelName] }),
        retry: false,
        refetchOnWindowFocus: false,
        enabled: !!(payload.searchValue && payload.searchCoordinate && payload.latitude && payload.longitude)
    });


    return(
        <>
        <div className="bg-[#FAFBFC] md:p-10">
                <section className="mx-auto max-w-8xl px-6 pb-6">
                    <div className="mb-2 flex items-center">
                        <i className="fas fa-chevron-left mr-2 hover:cursor-pointer"></i>
                        <div className="text-lg font-bold hover:cursor-pointer">All Propertises in <span>Ha Long</span></div>
                    </div>
                    
                    {(!hotelAlbums || isFetchingHotelAlbums ) ? <DetailedPageGallerySkeleton /> : <DetailPageGallery hotelAlbums={hotelAlbums}/> }
                    <div className="my-6"></div>
                    <DetailedPageHotelInformation isFetchingHotelComments={isFetchingHotelComments} isFetchingNearByHotels={isFetchingNearByHotels} nearByHotels={nearByHotels} hotelInfo={hotelInfo} hotelComments={hotelComments} specificHotel={specificHotel} specificHotelPriceComparison={specificHotelPriceComparison} payload={payload}/>
                </section>
        </div>
        </>
    )
}