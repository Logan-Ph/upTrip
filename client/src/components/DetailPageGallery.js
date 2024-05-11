import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IconCamera } from '@tabler/icons-react';
import { useState } from 'react';

export default function DetailPageGallery({hotelAlbums}){
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return(
        <>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-y-6 xl:gap-4">
            {/* right image */}
            <div className="relative">
                <div>
                    <img loading='lazy' src={hotelAlbums?.hotelTopImages[0]}
                    className="w-full xl:h-[355px] 2xl:h-[376px]  object-cover rounded-lg" onClick={handleOpen}
                    alt='hotel'
                    />
                </div>

                <div onClick={handleOpen} className="absolute bottom-0 right-0 py-2 px-6 bg-white bg-opacity-70 text-black shadow-sm cursor-pointer flex items-center rounded-lg btn btn-outline ">
                    <IconCamera stroke={2} />
                    See all photos
                </div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    >
                    <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] md:w-[1000px] bg-white border-4 shadow-2xl p-4 max-h-[80vh] overflow-auto">
                       <div className='bg-white sticky -top-5 z-50 border-b-2 py-4'>
                            <span onClick={handleClose} className="material-icons cursor-pointer" style={{ float: 'right' }}>

                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className='w-8 h-8 md:w-10 md:h-10 hover:transition-all'>
                                <path d="M464 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm0 394c0 3.3-2.7 6-6 6H54c-3.3 0-6-2.7-6-6V86c0-3.3 2.7-6 6-6h404c3.3 0 6 2.7 6 6v340zM356.5 194.6L295.1 256l61.4 61.4c4.6 4.6 4.6 12.1 0 16.8l-22.3 22.3c-4.6 4.6-12.1 4.6-16.8 0L256 295.1l-61.4 61.4c-4.6 4.6-12.1 4.6-16.8 0l-22.3-22.3c-4.6-4.6-4.6-12.1 0-16.8l61.4-61.4-61.4-61.4c-4.6-4.6-4.6-12.1 0-16.8l22.3-22.3c4.6-4.6 12.1-4.6 16.8 0l61.4 61.4 61.4-61.4c4.6-4.6 12.1-4.6 16.8 0l22.3 22.3c4.7 4.6 4.7 12.1 0 16.8z"/></svg>
                            </span>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                <div className='font-semibold'>Hotel Uploads</div>
                            </Typography>
                       </div>
                        
                        
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            <div className='grid gap-y-4 py-6'>
                            {hotelAlbums?.hotelImagePops.reduce((acc, image, index) => {
                                const chunkIndex = Math.floor(index / 3);

                                if (!acc[chunkIndex]) {
                                    acc[chunkIndex] = []; // start a new chunk
                                }

                                acc[chunkIndex].push(image);

                                return acc;
                            }, []).map((chunk, chunkIndex) => (
                                <div key={chunkIndex} className="grid grid-cols-3 gap-x-4">
                                    {chunk.map((image, index) => (
                                        <div key={index}>
                                                <img loading='lazy' src={image} className='rounded-lg' alt='hotel' />
                                        </div>
                                    ))}
                                </div>
                            ))}
                            </div>
                        </Typography>
                    </Box>
                </Modal>
            </div>

            {/* left image */}
            <div className="col-span-2 ">
                <div className="grid grid-cols-3 gap-4">
                    <div><img loading='lazy' src={hotelAlbums?.hotelTopImages[1]} className='rounded-lg cursor-pointer' onClick={handleOpen} alt='hotel'/></div>
                    <div><img loading='lazy' src={hotelAlbums?.hotelTopImages[2]} className='rounded-lg cursor-pointer' onClick={handleOpen} alt='hotel'/></div>
                    <div><img loading='lazy' src={hotelAlbums?.hotelTopImages[3]} className='rounded-lg cursor-pointer' onClick={handleOpen} alt='hotel'/></div>
                    <div><img loading='lazy' src={hotelAlbums?.hotelTopImages[4]} className='rounded-lg cursor-pointer' onClick={handleOpen} alt='hotel'/></div>
                    <div><img loading='lazy' src={hotelAlbums?.hotelTopImages[5]} className='rounded-lg cursor-pointer' onClick={handleOpen} alt='hotel'/></div>
                    <div><img loading='lazy' src={hotelAlbums?.hotelTopImages[6]} className='rounded-lg cursor-pointer' onClick={handleOpen} alt='hotel'/></div>
                </div>
            </div> 

        </div>
        </>
    )
}


  

