import { useState, React, Fragment } from "react";
import { SavedCollectionCard } from "./CollectionCard";
import {IconX} from '@tabler/icons-react'
export default function AddToFavorite(){
    return(
        <>
        <div className="mt-10">
        <AddItemButton/>
        </div>
        
        </>
    )
}

// add item button in detailed itinerary page
function AddItemButton() {
    const [isOpen, setIsOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState("main");
    const [open, setOpen] = useState(false);
    const handleClose = () => setIsOpen(false);

    const toggleDrawer = () => {
        setIsOpen(!isOpen);
    };

    const handleNextButtonClickMain = () => {
        setCurrentPage("chooseSavedItem");
    };

    const handleNextButtonClickSaved = () => {
        setCurrentPage("otherPage");
    };

    const handleBackButtonClick = () => {
        if (currentPage === "chooseSavedItem") {
            setCurrentPage("main");
        } else {
            setCurrentPage("chooseSavedItem");
        }
    };

    return (
        <>
            {/* Button */}
            <div className="flex items-center my-2 md:pr-0 shadow-sm">
                <div className="border-2 bg-[#8DD3BB] border-[#8DD3BB] w-[30px] h-[30px] md:w-[40px] md:h-[40px] flex items-center justify-between rounded-md cursor-pointer py-2" onClick={toggleDrawer}>
                    <svg className="w-[20px] h-[20px] mx-auto hover:transition ease-in-out delay-150:-translate-y-1 hover:scale-110 duration-300 " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                        fill="white">
                        <path d="M458.4 64.3C400.6 15.7 311.3 23 256 79.3 200.7 23 111.4 15.6 53.6 64.3-21.6 127.6-10.6 230.8 43 285.5l175.4 178.7c10 10.2 23.4 15.9 37.6 15.9 14.3 0 27.6-5.6 37.6-15.8L469 285.6c53.5-54.7 64.7-157.9-10.6-221.3zm-23.6 187.5L259.4 430.5c-2.4 2.4-4.4 2.4-6.8 0L77.2 251.8c-36.5-37.2-43.9-107.6 7.3-150.7 38.9-32.7 98.9-27.8 136.5 10.5l35 35.7 35-35.7c37.8-38.5 97.8-43.2 136.5-10.6 51.1 43.1 43.5 113.9 7.3 150.8z"/>
                    </svg>   

                    {/* Khoi fill mau do cung dc */}
                    {/* <svg className="w-[30px] h-[30px] mx-auto hover:transition-colors transition ease-in-out delay-150:-translate-y-1 hover:scale-110 duration-300 " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                        fill="red">
                        <path d="M458.4 64.3C400.6 15.7 311.3 23 256 79.3 200.7 23 111.4 15.6 53.6 64.3-21.6 127.6-10.6 230.8 43 285.5l175.4 178.7c10 10.2 23.4 15.9 37.6 15.9 14.3 0 27.6-5.6 37.6-15.8L469 285.6c53.5-54.7 64.7-157.9-10.6-221.3zm-23.6 187.5L259.4 430.5c-2.4 2.4-4.4 2.4-6.8 0L77.2 251.8c-36.5-37.2-43.9-107.6 7.3-150.7 38.9-32.7 98.9-27.8 136.5 10.5l35 35.7 35-35.7c37.8-38.5 97.8-43.2 136.5-10.6 51.1 43.1 43.5 113.9 7.3 150.8z"/>
                    </svg>      */}
                </div>
            </div>


           
        </>
    );
}

