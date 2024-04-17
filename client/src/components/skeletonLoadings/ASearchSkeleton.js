import { AdvancedSearchCard } from "../LazyLoadingComponents";
import {Skeleton} from '@mui/material'
export default function ASearchSkeleton(){
    return(
        <>
            <div className="flex-co w-full">
                <AdvancedSearchCard/>
                <AdvancedSearchCard/>
                <AdvancedSearchCard/>
            </div>       
        </>
    )
}