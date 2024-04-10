import axios from "../api/axios";
import useHandleNavigate from "../utils/useHandleNavigate";
import useAuth from "./useAuth";

const useLogout = () => {
    const { setAuth } = useAuth();
    const handleNavigate = useHandleNavigate('/login')

    const logout = async () => {
        setAuth(null);
        try {
            await axios('/logout', { withCredentials: true })
            .then((res) => {
                console.log(res.data);
                handleNavigate();
            });
        } catch (err) {
            console.error(err);
        }
    }

    return logout;
}

export default useLogout