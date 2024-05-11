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


            <div className="relative">
                {/* Drawer */}
                
                <div
                    className={`fixed top-0 right-0 h-full w-11/12 sm:w-1/2 md:w-4/12 bg-white shadow-lg transition-all duration-300 ease-in-out z-50 px-2 md:px-6 ${
                        isOpen ? "translate-x-0" : "translate-x-full"
                    } overflow-y-auto`}>

                    
                    {/* close button */}
                    <div 
                        onClick={handleClose} className="material-icons cursor-pointer my-6 transition ease-in-out delay-150:-translate-y-1 hover:scale-110 duration-300" style={{ float: 'right' }}>
                        <IconX stroke={2} size={40}/>
                    </div>
                
                    {/* Content inside the drawer */}
                    
                    {/* create new collection if users require */}
                    <div className="border-b my-6 text-center">
                        <button
                            className="btn w-full border p-4 rounded-md font-semibold border-black bg-white"
                            onClick={() =>
                                document
                                    .getElementById("create_collection_modal")
                                    .showModal()
                            }
                        >
                            <i class="fa-solid fa-plus mr-2"></i> Create new
                            collection
                        </button>
                        <dialog id="create_collection_modal" className="modal">
                            <div className="modal-box">
                                <form method="dialog">
                                    {/* if there is a button in form, it will close the modal */}
                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                        ✕
                                    </button>
                                </form>
                                <h3 className="font-bold text-lg my-4">
                                    Create new collection
                                </h3>
                                <div>
                                    <div className="mb-5 text-start">
                                        <label
                                            for="name"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl w-full p-2.5 focus:ring-black focus:border-black"
                                            required
                                        />
                                    </div>
                                    <div className="mb-5 text-start">
                                        <label
                                            for="description"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Description
                                        </label>
                                        <textarea
                                            type="text"
                                            id="description"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 focus:ring-black focus:border-black"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <button className="flex btn btn-outline  justify-end">
                                        Save
                                    </button>
                                </div>
                            </div>
                        </dialog>
                    </div>
                   
                    
                    {/* Selection a collection to save your items */}
                    <div className=" ">
                        <div className="py-6 bg-white mb-6 text-center sticky top-0 z-50 border-b-2">
                            <h1 className="text-2xl font-semibold mb-2">Choose a collection</h1>
                            <p className="text-gray-500 text-center">Select the collection to save your favorite items</p>
                        </div>
                        <SavedCollectionCard />
                        <SavedCollectionCard />
                        <SavedCollectionCard />
                        <SavedCollectionCard />
                        <SavedCollectionCard />
                        <SavedCollectionCard />
                        <SavedCollectionCard />
                        <SavedCollectionCard />
                    </div>
                    
                    {/* If no collection, hidden */}
                    <div className="sticky bottom-[-10px] bg-white w-full py-6 flex justify-end border-t">
                        <div
                            className="btn btn-outline bg-black text-white hover:bg-gray-900 rounded-full">
                            Save
                        </div>
                    </div>
                    
                </div>

                {/* Overlay to close the drawer */}
                {isOpen && (
                    <div
                        onClick={toggleDrawer}
                        className="fixed top-0 left-0 h-full w-full bg-gray-800 opacity-50 transition-opacity duration-300 ease-in-out z-10"
                    ></div>
                )}
            </div>
        </>
    );
}

