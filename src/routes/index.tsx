import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import FaviconUpdater from "@/components/dynamic-favicon";
import { Bot } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Agent } from "@/components/agent";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const [disabled, setDisabled] = useState<{
    version1: boolean;
    version2: boolean;
  }>({ version1: false, version2: false });

  return (
    <>
      <FaviconUpdater icon={Bot} title="Marketing Agents" />

      <Tabs defaultValue="Version 1" className="w-full">
        <TabsList>
          <TabsTrigger value="Version 1" disabled={disabled.version1}>
            Version 1
          </TabsTrigger>
          <TabsTrigger value="Version 2" disabled={disabled.version2}>
            Version 2
          </TabsTrigger>
        </TabsList>
        <TabsContent value="Version 1">
          <Agent
            isTalking={(e) => setDisabled((prev) => ({ ...prev, version2: e }))}
            agentId={import.meta.env.VITE_AGENT_ID_1}
          />
        </TabsContent>
        <TabsContent value="Version 2">
          <Agent
            isTalking={(e) => setDisabled((prev) => ({ ...prev, version1: e }))}
            agentId={import.meta.env.VITE_AGENT_ID_2}
          />
        </TabsContent>
      </Tabs>
    </>
  );
}
