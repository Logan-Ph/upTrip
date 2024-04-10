import {Link} from 'react-router-dom';
import HPPLanYourTrip from '../components/HPPlanYourTrip';
import HPTravelPlanner from '../components/HPTravelPlanner';
import HPExplore from '../components/HPExplore';
import { Suspense } from 'react';

export default function Homepage(){
    return(
        <>
            <div className='bg-[#FAFBFC] md:p-10'>
                <h1>Homepage</h1>
                <br />
                <Link to="/admin">Go to the Admin page</Link>
                <Suspense fallback={<div>Loading...</div>}>
                    <HPExplore/>
                </Suspense>

                <Suspense fallback={<div>Loading...</div>}>
                    <HPPLanYourTrip/>
                </Suspense>

                <Suspense fallback={<div>Loading...</div>}>
                    <HPTravelPlanner/>
                </Suspense>
                <br />
            </div>
            
        </>
    )
}

