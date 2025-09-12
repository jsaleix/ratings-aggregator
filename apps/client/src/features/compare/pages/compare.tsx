import { useCallback } from "react";
import PageHeader from "../../../shared/ui/page-header";
import MediaSelector from "../components/media-selector";

export default function ComparePage() {
    const compareFn = useCallback((movieA: string, movieB: string) => {}, []);

    return (
        <div className="w-full">
            <div className="flex flex-col items-center container mx-auto gap-5 py-5 px-5 md:px-0">
                <PageHeader title="Compare">
                    <MediaSelector compareFn={compareFn} />
                </PageHeader>
                <div className="w-full flex flex-row border-2 border-red-400">
                    <div className="flex w-[50%] border-2 border-yellow-400"></div>
                    <div className="flex w-[50%] border-2 border-blue-400"></div>
                </div>
            </div>
        </div>
    );
}
