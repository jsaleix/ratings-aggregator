import { useSearchParams } from "react-router";
import { useEffect } from "react";

import PageHeader from "../../../shared/ui/page-header";
import Divider from "../../../shared/ui/divider";
import useMovieInfo from "../hooks/use-movie-info";
import MediaSelector from "../components/media-selector";
import BaseInfoElement from "../components/compare-page-elements/base-info-element";
import RatingsElement from "../components/compare-page-elements/ratings-element";
import SummaryElement from "../components/compare-page-elements/summary-element";

export default function ComparePage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const {
        setMovieId: setMovieIdA,
        movieId: movieIdA,
        movieInfo: movieA,
    } = useMovieInfo();
    const {
        setMovieId: setMovieIdB,
        movieId: movieIdB,
        movieInfo: movieB,
    } = useMovieInfo();

    useEffect(() => {
        const idA = searchParams.get("a");
        const idB = searchParams.get("b");
        if (idA) setMovieIdA(idA);
        if (idB) setMovieIdB(idB);
    }, []);

    useEffect(() => {
        const newParams = new URLSearchParams(searchParams);

        if (movieIdA) {
            newParams.set("a", movieIdA);
        } else {
            newParams.delete("a");
        }

        if (movieIdB) {
            newParams.set("b", movieIdB);
        } else {
            newParams.delete("b");
        }

        setSearchParams(newParams);
    }, [movieIdA, movieIdB]);

    return (
        <div className="w-full">
            <div className="flex flex-col items-center container mx-auto gap-5 py-5 px-5 md:px-0">
                <PageHeader title="Compare">
                    <MediaSelector
                        onSelectA={setMovieIdA}
                        onSelectB={setMovieIdB}
                    />
                </PageHeader>
                {(movieA || movieB) && (
                    <>
                        <Divider />
                        <div className="w-full flex flex-col gap-5">
                            <div className="w-full flex flex-col md:flex-row gap-5 justify-start">
                                <BaseInfoElement data={movieA?.data} />
                                <BaseInfoElement data={movieB?.data} />
                            </div>
                            <div className="w-full flex flex-col md:flex-row gap-5 justify-start">
                                <SummaryElement
                                    summary={movieA?.summary ?? null}
                                />
                                <SummaryElement
                                    summary={movieB?.summary ?? null}
                                />
                            </div>
                            <div className="w-full flex flex-col md:flex-row gap-5 justify-start">
                                <RatingsElement
                                    ratings={movieA?.ratings ?? null}
                                />
                                <RatingsElement
                                    ratings={movieB?.ratings ?? null}
                                />
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
