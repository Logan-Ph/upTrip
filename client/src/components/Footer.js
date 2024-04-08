import { Link } from "react-router-dom";
import Logo from "../components/images/UptripLogo.png";


export default function Footer(){
    return <>
        <div className="h-sreen md:h-1/2 w-full bg-[#CDEAE1] p-10 lg:px-20 md:py-10">
            <div className="flex flex-wrap justify-center">
                <div className="w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        <div className="w-full md:w-1/2">
                            <Link>
                                <img src={Logo} alt="Logo" className="w-52 h-auto"/>
                            </Link>
                            <p className="mt-4 py-4 font-light text-black">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.</p>
                        </div> 

                        <div>
                            <div className="grid-cols-1 mt-4 md:grid md:grid-cols-2 lg:grid-cols-4">
                                <div className="">
                                    <p className="text-xl font-extrabold pb-2 mt-1">Company</p>

                                    <p className="py-1 text-md font-medium hover:font-bold hover:ease-in-out hover:duration-300"><Link to="" >About Us</Link></p>
                                    <p className="py-1 text-md font-medium hover:font-bold hover:ease-in-out hover:duration-300"><Link>Legal Information</Link></p>
                                    <p className="py-1 text-md font-medium hover:font-bold hover:ease-in-out hover:duration-300"><Link>Contact Us</Link></p>
                                    <p className="py-1 text-md font-medium hover:font-bold hover:ease-in-out hover:duration-300"><Link>Blogs</Link></p>
                                </div>
                                <div className="">
                                    <p className="text-xl font-extrabold pb-2 mt-1">Help Center</p>

                                    <p className="py-1 text-md font-medium hover:font-bold hover:ease-in-out hover:duration-300"><Link to="">Find a Property</Link></p>
                                    <p className="py-1 text-md font-medium hover:font-bold hover:ease-in-out hover:duration-300"><Link to="">How to Host?</Link></p>
                                    <p className="py-1 text-md font-medium hover:font-bold hover:ease-in-out hover:duration-300"><Link to="">Why Us?</Link></p>
                                    <p className="py-1 text-md font-medium hover:font-bold hover:ease-in-out hover:duration-300"><Link to="">FAQS</Link></p>
                                </div>

                                <div className="">
                                    <p className="text-xl font-extrabold pb-2 mt-1">Contact Info</p>

                                    <p className="py-1 text-md font-medium hover:font-bold hover:ease-in-out hover:duration-300"><Link to="">Phone: 1234567890</Link></p>
                                    <p className="py-1 text-md font-medium hover:font-bold hover:ease-in-out hover:duration-300 text-nowrap"><Link mailto="levelupyourtrip@gmail.com">Email: levelupyourtrip@gmail.com </Link></p>
                                    <p className="py-1 text-md font-medium hover:font-bold hover:ease-in-out hover:duration-300 text-nowrap"><Link to="">702 Nguyen Van Linh Street, HCMC</Link></p>
                                    
                                    <div className="inline-flex md:grid gap-0 grid-cols-4 md:gap-4 mt-4 ">
                                            <Link to="" className="md:m-0"><svg className="w-[20px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h137.3V327.7h-63V256h63v-54.6c0-62.2 37-96.5 93.7-96.5 27.1 0 55.5 4.8 55.5 4.8v61h-31.3c-30.8 0-40.4 19.1-40.4 38.7V256h68.8l-11 71.7h-57.8V480H400a48 48 0 0 0 48-48V80a48 48 0 0 0 -48-48z"/></svg></Link>
                                    
                                        
                                        
                                            <Link to="" className="ml-4 md:m-0"><svg className="w-[20px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M459.4 151.7c.3 4.5 .3 9.1 .3 13.6 0 138.7-105.6 298.6-298.6 298.6-59.5 0-114.7-17.2-161.1-47.1 8.4 1 16.6 1.3 25.3 1.3 49.1 0 94.2-16.6 130.3-44.8-46.1-1-84.8-31.2-98.1-72.8 6.5 1 13 1.6 19.8 1.6 9.4 0 18.8-1.3 27.6-3.6-48.1-9.7-84.1-52-84.1-103v-1.3c14 7.8 30.2 12.7 47.4 13.3-28.3-18.8-46.8-51-46.8-87.4 0-19.5 5.2-37.4 14.3-53 51.7 63.7 129.3 105.3 216.4 109.8-1.6-7.8-2.6-15.9-2.6-24 0-57.8 46.8-104.9 104.9-104.9 30.2 0 57.5 12.7 76.7 33.1 23.7-4.5 46.5-13.3 66.6-25.3-7.8 24.4-24.4 44.8-46.1 57.8 21.1-2.3 41.6-8.1 60.4-16.2-14.3 20.8-32.2 39.3-52.6 54.3z"/></svg></Link>
                                        
                                        
                                            <Link to="" className="ml-4 md:m-0"><svg className="w-[20px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/></svg></Link>
                                        
                                        
                                            <Link to="" className="ml-4 md:m-0"><svg className="w-[20px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"/></svg></Link>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div> 

                    <div className="mt-5 flex-col md:mt-20 flex md:flex-row md:justify-between">
                        <div>
                            <p>Copyright © 2024 <span className="font-bold">Uptrip Development Team</span></p>
                        </div>
                        <div>
                            <p>Created with love by <span className="font-bold">Uptrip Development Team</span></p>
                        </div>
                    </div>
                </div>

            </div>

        </div>       
    </>
}

