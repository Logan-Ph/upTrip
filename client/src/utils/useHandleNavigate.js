import { useLocation, useNavigate } from "react-router-dom";

export default function useHandleNavigate(url){
    const navigate = useNavigate(); // get the navigate function
    const location = useLocation(); // get the location object
    const from = location.state?.from?.pathname || url || "/"; // default to home

    return () => navigate(from, { replace: true }); // replace the current entry in the history stack
}

