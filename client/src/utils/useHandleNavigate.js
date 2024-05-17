import { startTransition } from "react";
import { useNavigate } from "react-router-dom";

export default function useHandleNavigate() {
    const navigate = useNavigate(); // get the navigate function

    return (url) => {
        startTransition(() => {
            navigate(url, { replace: true }); // navigate to the given url
        });
    };
}