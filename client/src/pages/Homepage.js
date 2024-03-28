import {Link} from 'react-router-dom';

export default function Homepage(){
    return(
        <>
            <h1>Homepage</h1>
            <br />
            <Link to="/admin">Go to the Admin page</Link>
            <br />
        </>
    )
}

