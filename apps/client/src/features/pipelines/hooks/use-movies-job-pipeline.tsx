import { useEffect, useRef, useState } from "react";
import { API_ENDPOINT } from "../../../core/config/api";
import type { MovieJobPipelineType } from "../types";

export default function useMoviesJobPipeline() {
    const sseRef = useRef<EventSource>(null);
    const [jobs, setJobs] = useState<MovieJobPipelineType[]>([]);

    const onUpdate = (rawData: any) => {
        const data = JSON.parse(rawData.data) as {
            jobs: MovieJobPipelineType[];
        };
        setJobs(data.jobs);
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

    return { jobs };
}
