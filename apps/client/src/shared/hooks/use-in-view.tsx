import { useEffect, useRef, useState } from "react";

export function useInView() {
    const [inView, setInView] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        if (!ref?.current) return;
        const element = ref.current;

        const isIntersecting = (entry: IntersectionObserverEntry) =>
            entry.isIntersecting || entry.intersectionRatio > 0;

        const handleIntersect: IntersectionObserverCallback = (entries) => {
            setInView(isIntersecting(entries[0]));
        };

        const observer = new IntersectionObserver(handleIntersect, {
            root: null,
            threshold: 0.1,
        });

        observer.observe(element);

        return () => {
            observer.unobserve(element);
            observer.disconnect();
        };
    }, []);

    return { ref, inView };
}
