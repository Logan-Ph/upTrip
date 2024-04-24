import { AdvancedSearchCard } from "../LazyLoadingComponents";
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