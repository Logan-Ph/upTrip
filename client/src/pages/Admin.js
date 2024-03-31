import { Link } from "react-router-dom";
import useLogout from "../hooks/useLogout";

export default function Admin(){
    const logout = useLogout();

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
        </section>
        </>
    )
}