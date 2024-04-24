import { Link } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import { startTransition, useState } from "react";
import useHandleNavigate from "../utils/useHandleNavigate";

export default function Admin(){
    const logout = useLogout();
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