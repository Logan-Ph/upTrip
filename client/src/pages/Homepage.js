import {Link} from 'react-router-dom';
import HPPLanYourTrip from '../components/HPPlanYourTrip';
import HPTravelPlanner from '../components/HPTravelPlanner';
import HPExplore from '../components/HPExplore';

export default function Homepage(){
    return(
        <>
            <div className='bg-[#FAFBFC] md:p-10'>
                <h1>Homepage</h1>
                <br />
                <Link to="/admin">Go to the Admin page</Link>
                <HPExplore/>
                <HPPLanYourTrip/>
                <HPTravelPlanner/>
                <br />
            </div>
            
        </>
    )
}

