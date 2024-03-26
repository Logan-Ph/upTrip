import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import axios from "../api/axios";

export default function useRefreshToken() {
  const { setUser } = useContext(UserContext);

  const refresh = async () => {
        const response = await axios.get("/refresh", {
            withCredentials: true,
        })
        .then((res) => {
            setUser((prev) => {
                return { ...prev, accessToken: res.data.accessToken };
            });
        });
        
        return response.data.accessToken;
    };
  return refresh;
}
