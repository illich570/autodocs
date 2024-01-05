import { lazy } from "react";

const TanStackRouterDevtools = import.meta.env.PROD // Are we in production?
  ? () => null // Render nothing in production
  : lazy(() =>
      // Lazy load in development
      import("@tanstack/router-devtools").then((res) => ({
        default: res.TanStackRouterDevtools,
        // For Embedded Mode
        // default: res.TanStackRouterDevtoolsPanel
      }))
    );

export { TanStackRouterDevtools };
