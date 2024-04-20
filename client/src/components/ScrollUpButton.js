import {React, useState } from "react";
import { ArrowLongUpIcon } from "@heroicons/react/24/solid";
import { Button } from '../components/Style'; 

const ScrollUpButton = () =>{
    const[visible, setVisible] = useState(false);

    const toggleVisible = () => {
        const scroll = document.documentElement.scrollTop;
        if(scroll > 500){
            setVisible(true);
        } 
        else if (scroll < 500){
            setVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
            // you can also use 'auto' behavior in place of 'smooth'
        });
    }
    window.addEventListener('scroll', toggleVisible);

    return (
        <>
        <button className="border-[#CDEAE1] bg-[#8DD3BB] w-[60px] h-[60px] rounded-full p-2 fixed right-10 cursor-pointer bottom-4 skeleton" style={{display: visible ? 'inline' : 'none'}}>
            <ArrowLongUpIcon onClick={scrollToTop}
                             style={{display: visible ? 'inline' : 'none'}}
                             className="rounded-1/2"
                             fill="white"/>
        </button>
        </>
    )
}

export default ScrollUpButton;
