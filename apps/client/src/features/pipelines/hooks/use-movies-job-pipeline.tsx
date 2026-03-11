import { useEffect, useRef, useState } from "react";
import { API_ENDPOINT } from "../../../core/config/api";
import type { MovieJobPipelineType } from "../types";
import type { MovieRequestModel } from "../../requests/models/movie-request";

export default function useMoviesJobPipeline() {
    const sseRef = useRef<EventSource>(null);
    const [jobs, setJobs] = useState<MovieJobPipelineType[]>([]);
    const [requests, setRequests] = useState<MovieRequestModel[]>([]);

    const onUpdate = (rawData: any) => {
        const data = JSON.parse(rawData.data) as {
            jobs: MovieJobPipelineType[];
            requests: MovieRequestModel[];
        };
        setJobs(data.jobs);
        setRequests(data.requests);
    };

    useEffect(() => {
        const url = new URL("/pipelines/movies", API_ENDPOINT);
        const eventSource = new EventSource(url);
        sseRef.current = eventSource;
        eventSource.addEventListener("update", onUpdate);

        return () => {
            eventSource.close();
        };
    }, []);

    return { jobs, requests };
}
