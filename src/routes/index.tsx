import { createFileRoute } from "@tanstack/react-router";
import FaviconUpdater from "@/components/dynamic-favicon";
import { Bot } from "lucide-react";
import { Agent } from "@/components/agent";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <>
      <FaviconUpdater icon={Bot} title="Marketing Agents" />
      <Agent agentId={import.meta.env.VITE_AGENT_ID} />
    </>
  );
}
