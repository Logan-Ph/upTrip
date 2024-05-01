import DetailPageGallery from "../components/DetailPageGallery";
import DetailedPageHotelInformation from "../components/DetailedPageHotelInformation";

export default function HotelDetailedPage(){
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