import { Link } from "react-router-dom";

export default function Admin(){
    return (
        <>
            <section>
            <h1>Admins Page</h1>
            <br />
            <div className="flexGrow">
                <Link to="/">Home</Link>
            </div>
        </section>
        </>
    )
}