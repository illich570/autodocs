import { Link, Router, Route, RootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "../utils/RouterDevTools";
import { Button } from "@/components/ui/button";

const rootRoute = new RootRoute({
  component: () => (
    <>
      <div>Hola!</div>

      <Link to="/about">Sigueme</Link>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: function Index() {
    return (
      <div className="p-2">
        <Button>Click me!</Button>
      </div>
    );
  },
});

const aboutRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: function About() {
    return <div className="p-2">Hello from About!</div>;
  },
});

const routeTree = rootRoute.addChildren([indexRoute, aboutRoute]);

const router = new Router({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export { router };
