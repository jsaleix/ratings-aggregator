import { useEffect, useRef, useState } from "react";
import { API_ENDPOINT } from "../../../core/config/api";
import type { MovieJobPipelineType } from "../types";

interface Props {
    slug: string | undefined;
    cb?: (status: MovieJobPipelineType | null) => void;
}

export default function useMovieJobPipeline({ slug, cb }: Props) {
    const sseRef = useRef<EventSource>(null);
    const [status, setStatus] = useState<MovieJobPipelineType | null>(null);

    const onUpdate = (rawData: any) => {
        const data = JSON.parse(rawData.data) as {
            job: MovieJobPipelineType | null;
        };
        setStatus(data.job);
        cb && cb(data.job);
    };

    useEffect(() => {
        const url = new URL(`/sse/movies/${slug}`, API_ENDPOINT);
        const eventSource = new EventSource(url, {
            withCredentials: true,
        });
        sseRef.current = eventSource;
        eventSource.addEventListener("update", onUpdate);

        return () => {
            eventSource.close();
        };
    }, [slug]);

    return { status };
}
