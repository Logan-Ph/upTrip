import { Suspense, lazy } from 'react';
import HPExploreSkeleton from '../components/skeletonLoadings/HPExploreSkeleton';
import HPPLanYourTripSkeleton from '../components/skeletonLoadings/HPPLanYourTripSkeleton';
import HPTravelPlannerSkeleton from '../components/skeletonLoadings/HPTravelPlannerSkeleton';
const HPPLanYourTrip = lazy(() => import('../components/HPPlanYourTrip'));
const HPExplore = lazy(() => import('../components/HPExplore'));
const HPTravelPlanner = lazy(() => import('../components/HPTravelPlanner'));

export default function Homepage(){
    return(
        <>
            <div className='bg-[#FAFBFC] md:p-10'>
                <Suspense fallback={<HPExploreSkeleton/>} >
                    <HPExplore/>
                </Suspense>
                
                <Suspense fallback={<HPPLanYourTripSkeleton/>}>
                    <HPPLanYourTrip/>
                </Suspense> 
                
                <Suspense fallback={<HPTravelPlannerSkeleton/>}>
                    <HPTravelPlanner/>
                </Suspense>
                <br />
            </div>
            
        </>
    )
}

