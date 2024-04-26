import { Link } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import { useContext, useState } from "react";
import useHandleNavigate from "../utils/useHandleNavigate";
import AuthContext from "../context/AuthProvider";

export default function Admin(){
    const logout = useLogout();
    const {auth} = useContext(AuthContext)
    console.log(auth)
    const [keyword, setKeyword] = useState('');

    const handleNavigate = useHandleNavigate(`/quick-search/?keyword=${keyword}`);

    const signOut = async () => {
        await logout();
    }

    return (
        <>
            <section>
            <h1>Admins Page</h1>
            <br />
            <div className="flexGrow">
                <Link to="/">Home</Link>
            </div>
            <div className="flexGrow">
                <button onClick={signOut}>Sign Out</button>
            </div>
            <div>
                <input type="text" value={keyword} onChange={e => setKeyword(e.target.value)} />
                <button onClick={handleNavigate}>Fetch Hotels</button>
            </div>
            </section>
        </>
    )
}