import { AdvancedSearchCard } from "../LazyLoadingComponents";
export default function ASearchSkeleton(){
    return(
        <>
            <div className="flex-co w-full mt-4">
                <AdvancedSearchCard/>
                <AdvancedSearchCard/>
                <AdvancedSearchCard/>
            </div>       
        </>
    )
}