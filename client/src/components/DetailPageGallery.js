import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

export default function DetailPageGallery(){
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return(
        <>
        <div className="grid grid-cols-3 gap-6">

            {/* right image */}
            <div className="relative">
                <div>
                    <img src="https://ik.imagekit.io/m1g1xkxvo/Uptrip/Hotel.jpg?updatedAt=1714558165765"
                    className="w-full h-[440px] object-cover rounded-lg" onClick={handleOpen}/>
                </div>

                <div onClick={handleOpen} className="absolute bottom-0 right-0 py-2 px-6 bg-white bg-opacity-70 text-black shadow-sm cursor-pointer flex items-center rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 512 512"
                        className='w-4 h-4 mr-2'>
                            <path d="M512 144v288c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V144c0-26.5 21.5-48 48-48h88l12.3-32.9c7-18.7 24.9-31.1 44.9-31.1h125.5c20 0 37.9 12.4 44.9 31.1L376 96h88c26.5 0 48 21.5 48 48zM376 288c0-66.2-53.8-120-120-120s-120 53.8-120 120 53.8 120 120 120 120-53.8 120-120zm-32 0c0 48.5-39.5 88-88 88s-88-39.5-88-88 39.5-88 88-88 88 39.5 88 88z"/></svg>
                    See all photos
                </div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    >
                    <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] bg-white border-2 border-black shadow-2xl p-4 max-h-[80vh] overflow-auto">
                        <span onClick={handleClose} className="material-icons cursor-pointer" style={{ float: 'right' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className='w-10 h-10 hover:transition-all'>
                            <path d="M464 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm0 394c0 3.3-2.7 6-6 6H54c-3.3 0-6-2.7-6-6V86c0-3.3 2.7-6 6-6h404c3.3 0 6 2.7 6 6v340zM356.5 194.6L295.1 256l61.4 61.4c4.6 4.6 4.6 12.1 0 16.8l-22.3 22.3c-4.6 4.6-12.1 4.6-16.8 0L256 295.1l-61.4 61.4c-4.6 4.6-12.1 4.6-16.8 0l-22.3-22.3c-4.6-4.6-4.6-12.1 0-16.8l61.4-61.4-61.4-61.4c-4.6-4.6-4.6-12.1 0-16.8l22.3-22.3c4.6-4.6 12.1-4.6 16.8 0l61.4 61.4 61.4-61.4c4.6-4.6 12.1-4.6 16.8 0l22.3 22.3c4.7 4.6 4.7 12.1 0 16.8z"/></svg>
                        </span>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Hotel Uploads
                        </Typography>
                        
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            <div className='grid gap-y-4'>
                                <div className="grid grid-cols-3 gap-x-4">
                                    <div>
                                        <img src="https://ik.imagekit.io/m1g1xkxvo/Uptrip/Hotel.jpg?updatedAt=1714558165765" className='rounded-lg'/>
                                    </div>
                                    <div><img src="https://ik.imagekit.io/m1g1xkxvo/Uptrip/Hotel.jpg?updatedAt=1714558165765" className='rounded-lg'/></div>
                                    <div><img src="https://ik.imagekit.io/m1g1xkxvo/Uptrip/Hotel.jpg?updatedAt=1714558165765" className='rounded-lg'/></div>
                                </div>

                                <div className="grid grid-cols-3 gap-x-4">
                                    <div><img src="https://ik.imagekit.io/m1g1xkxvo/Uptrip/Hotel.jpg?updatedAt=1714558165765" className='rounded-lg'/></div>
                                    <div><img src="https://ik.imagekit.io/m1g1xkxvo/Uptrip/Hotel.jpg?updatedAt=1714558165765" className='rounded-lg'/></div>
                                    <div><img src="https://ik.imagekit.io/m1g1xkxvo/Uptrip/Hotel.jpg?updatedAt=1714558165765" /></div>
                                </div>

                                <div className="grid grid-cols-3 gap-x-4">
                                    <div><img src="https://ik.imagekit.io/m1g1xkxvo/Uptrip/Hotel.jpg?updatedAt=1714558165765"/></div>
                                    <div><img src="https://ik.imagekit.io/m1g1xkxvo/Uptrip/Hotel.jpg?updatedAt=1714558165765"/></div>
                                    <div><img src="https://ik.imagekit.io/m1g1xkxvo/Uptrip/Hotel.jpg?updatedAt=1714558165765"/></div>
                                </div>

                                <div className="grid grid-cols-3 gap-x-4">
                                    <div><img src="https://ik.imagekit.io/m1g1xkxvo/Uptrip/Hotel.jpg?updatedAt=1714558165765"/></div>
                                    <div><img src="https://ik.imagekit.io/m1g1xkxvo/Uptrip/Hotel.jpg?updatedAt=1714558165765"/></div>
                                    <div><img src="https://ik.imagekit.io/m1g1xkxvo/Uptrip/Hotel.jpg?updatedAt=1714558165765"/></div>
                                </div>
                                <div className="grid grid-cols-3 gap-x-4">
                                    <div><img src="https://ik.imagekit.io/m1g1xkxvo/Uptrip/Hotel.jpg?updatedAt=1714558165765"/></div>
                                    <div><img src="https://ik.imagekit.io/m1g1xkxvo/Uptrip/Hotel.jpg?updatedAt=1714558165765"/></div>
                                    <div><img src="https://ik.imagekit.io/m1g1xkxvo/Uptrip/Hotel.jpg?updatedAt=1714558165765"/></div>
                                </div>
                            </div>
                        </Typography>
                    </Box>
                </Modal>
            </div>


            {/* left image */}
            <div className="grid col-span-2 gap-y-2">
                <div className="grid grid-cols-3 gap-x-4">
                    <div><img src="https://ik.imagekit.io/m1g1xkxvo/Uptrip/Hotel.jpg?updatedAt=1714558165765" className='rounded-lg cursor-pointer' onClick={handleOpen}/></div>
                    <div><img src="https://ik.imagekit.io/m1g1xkxvo/Uptrip/Hotel.jpg?updatedAt=1714558165765" className='rounded-lg cursor-pointer'/></div>
                    <div><img src="https://ik.imagekit.io/m1g1xkxvo/Uptrip/Hotel.jpg?updatedAt=1714558165765" className='rounded-lg cursor-pointer'/></div>
                </div>

                <div className="grid grid-cols-3 gap-x-4">
                    <div><img src="https://ik.imagekit.io/m1g1xkxvo/Uptrip/Hotel.jpg?updatedAt=1714558165765" className='rounded-lg cursor-pointer'/></div>
                    <div><img src="https://ik.imagekit.io/m1g1xkxvo/Uptrip/Hotel.jpg?updatedAt=1714558165765" className='rounded-lg cursor-pointer'/></div>
                    <div><img src="https://ik.imagekit.io/m1g1xkxvo/Uptrip/Hotel.jpg?updatedAt=1714558165765" className='rounded-lg cursor-pointer'/></div>
                </div>
            </div>
        </div>
        </>
    )
}


  

