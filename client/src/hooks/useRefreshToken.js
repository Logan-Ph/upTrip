import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.get('/refresh', {
            withCredentials: true
        });
        setAuth(prev => {
            return { ...prev, accessToken: response.data.accessToken, email: response.data.email, _id: response.data._id }
        });
        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;