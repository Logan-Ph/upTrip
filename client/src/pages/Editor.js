import { Link } from "react-router-dom";

export default function Admin(){
    return (
        <>
            <section>
            <h1>Editor Page</h1>
            <br />
            <div className="flexGrow">
                <Link to="/">Home</Link>
            </div>
        </section>
        </>
    )
}