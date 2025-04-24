import { createFileRoute } from "@tanstack/react-router";
import FaviconUpdater from "@/components/dynamic-favicon";
import { Bot } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Agent } from "@/components/agent";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <>
      <FaviconUpdater icon={Bot} title="Marketing Agents" />

      <Tabs defaultValue="Version 1" className="w-full">
        <TabsList>
          <TabsTrigger value="Version 1">Version 1</TabsTrigger>
          <TabsTrigger value="Version 2">Version 2</TabsTrigger>
          <TabsTrigger value="Version 3">Version 3</TabsTrigger>
        </TabsList>
        <TabsContent value="Version 1">
          <Agent agentId={import.meta.env.VITE_AGENT_ID_1} />
        </TabsContent>
        <TabsContent value="Version 2">
          <Agent agentId={import.meta.env.VITE_AGENT_ID_2} />
        </TabsContent>
        <TabsContent value="Version 3">
          <Agent agentId={import.meta.env.VITE_AGENT_ID_3} />
        </TabsContent>
      </Tabs>
    </>
  );
}
