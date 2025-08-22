import Analytics from "analytics";
import googleTagManager from "@analytics/google-tag-manager";
import { useLocation } from "react-router";
import { useEffect } from "react";

import { ANALYTICS_CONTAINER_ID } from "../../../core/config/analytics";

const analyticsInstance = ANALYTICS_CONTAINER_ID
    ? Analytics({
          app: "aggregator-client",
          plugins: [
              googleTagManager({
                  containerId: ANALYTICS_CONTAINER_ID,
              }),
          ],
      })
    : undefined;

export default function AnalyticsPageViews() {
    const { pathname } = useLocation();

    useEffect(() => {
        analyticsInstance && analyticsInstance.page();
    }, [pathname]);

    return null;
}
