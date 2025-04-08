import { AgentContextProvider } from "@/context/agent-contex";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <AgentContextProvider>
        <Outlet />
        <TanStackRouterDevtools />
      </AgentContextProvider>
    </>
  ),
});
