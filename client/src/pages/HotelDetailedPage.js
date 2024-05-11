import { useSearchParams } from "react-router-dom";
import DetailedPageHotelInformation from "../components/DetailedPageHotelInformation";
import { useQuery } from "@tanstack/react-query";
import { fetchHotelPriceComparison, fetchSpecificHotel, fetchTripAutoComplete, getHotelAlbums, getHotelComments, getHotelInfo, getNearByHotels } from "../api/fetch";
import { Suspense, lazy, useEffect, useRef, useState } from "react";
import DetailedPageGallerySkeleton from "../components/skeletonLoadings/DetailedPageGallerySkeleton";
const DetailPageGallery = lazy(() => import('../components/DetailPageGallery'));

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
                <section className="mx-auto max-w-8xl px-6 py-6">

                    <Suspense fallback={<DetailedPageGallerySkeleton />}>
                        <DetailPageGallery hotelAlbums={hotelAlbums}/>
                    </Suspense>
                    <div className="my-6"></div>
                    <DetailedPageHotelInformation isFetchingHotelComments={isFetchingHotelComments} isFetchingNearByHotels={isFetchingNearByHotels} nearByHotels={nearByHotels} hotelInfo={hotelInfo} hotelComments={hotelComments} specificHotel={specificHotel} specificHotelPriceComparison={specificHotelPriceComparison} payload={payload}/>
                </section>
        </div>
        </>
    )
}