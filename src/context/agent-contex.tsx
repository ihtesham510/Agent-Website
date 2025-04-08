import { useAgent } from "@/hooks/use-agent";
import type { Conversation } from "@/lib/type";
import { createContext, useContext, type PropsWithChildren } from "react";

export const agentContext = createContext<Conversation | null>(null);

export function AgentContextProvider({ children }: PropsWithChildren) {
  const conversation = useAgent();

  return (
    <agentContext.Provider value={conversation}>
      {children}
    </agentContext.Provider>
  );
}

export function useConversation() {
  const ctx = useContext(agentContext);
  if (!ctx)
    throw new Error("did you forgot to AgentContextProvider in main.tsx");
  return ctx;
}
