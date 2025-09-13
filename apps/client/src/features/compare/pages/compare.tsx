import { useCallback, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import ApiComparingService from "../services/api-movies.service";
import { mapApiResponseToModel } from "../models";

import PageHeader from "../../../shared/ui/page-header";
import MediaSelector from "../components/media-selector";
import BaseInfoElement from "../components/base-info-element";
import RatingsElement from "../components/ratings-element";
import SummaryElement from "../components/summary-element";
import Divider from "../../../shared/ui/divider";

export default function ComparePage() {
    const [movieIds, setMovieIds] = useState<{
        a: string | null;
        b: string | null;
    }>({ a: null, b: null });

    const { data } = useQuery({
        queryKey: ["movies-comparaison", movieIds],
        queryFn: async () => {
            const { a, b } = movieIds;
            if (!a || !b) return null;
            const res = await ApiComparingService.compareMovies(a, b);
            return mapApiResponseToModel(res);
        },
        enabled: !!movieIds.a && !!movieIds.b,
        initialData: null,
    });

    const compareFn = useCallback((a: string, b: string) => {
        setMovieIds({ a, b });
    }, []);

    return (
        <div className="w-full">
            <div className="flex flex-col items-center container mx-auto gap-5 py-5 px-5 md:px-0">
                <PageHeader title="Compare">
                    <MediaSelector compareFn={compareFn} />
                </PageHeader>
                {data && (
                    <>
                        <Divider />
                        <div className="w-full flex flex-col gap-5">
                            <div className="w-full flex flex-row gap-5 justify-start">
                                <BaseInfoElement data={data.movies[0].data} />
                                <BaseInfoElement data={data.movies[1].data} />
                            </div>
                            <div className="w-full flex flex-row gap-5 justify-start">
                                <SummaryElement
                                    summary={data.movies[0].summary}
                                />
                                <SummaryElement
                                    summary={data.movies[1].summary}
                                />
                            </div>
                            <div className="w-full flex flex-row gap-5 justify-start">
                                <RatingsElement
                                    ratings={data.movies[0].ratings.common}
                                />
                                <RatingsElement
                                    ratings={data.movies[1].ratings.common}
                                />
                            </div>
                            <div className="w-full flex flex-row gap-5 justify-start">
                                <RatingsElement
                                    ratings={data.movies[0].ratings.unique}
                                />
                                <RatingsElement
                                    ratings={data.movies[1].ratings.unique}
                                />
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
