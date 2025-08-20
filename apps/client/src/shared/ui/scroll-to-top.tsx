import { useEffect } from "react";
import { useLocation } from "react-router";

interface ScrollToTopProps {
    children?: React.ReactNode;
}

export default function ScrollToTop({ children }: ScrollToTopProps) {
    const { pathname } = useLocation();

    useEffect(() => {
        const canControlScrollRestoration =
            "scrollRestoration" in window.history;
        if (canControlScrollRestoration) {
            window.history.scrollRestoration = "manual";
        }

        document.body.style.overflowY = "unset";
        window.scrollTo({top:0, left:0, behavior: "smooth"})
    }, [pathname]);

    return children;
}
