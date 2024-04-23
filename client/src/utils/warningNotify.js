import { toast } from "react-toastify";

export default function warningNotify(message) {
    toast.warning(message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        pauseOnHover: false,
        theme: "light",
    })
}

