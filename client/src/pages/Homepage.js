import {Link} from 'react-router-dom';
import HPPLanYourTrip from '../components/HPPlanYourTrip';
import HPTravelPlanner from '../components/HPTravelPlanner';

export default function Homepage(){
    return(
        <>
            <div className='bg-[#FAFBFC] md:p-10'>
                <h1>Homepage</h1>
                <br />
                <Link to="/admin">Go to the Admin page</Link>
                <HPPLanYourTrip/>
                <HPTravelPlanner/>
                <br />
            </div>
            
        </>
    )
}

