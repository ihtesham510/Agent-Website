import { useConversation } from "@11labs/react";
export function useAgent({ agentId }: { agentId: string }) {
  const conversation = useConversation({
    agentId,
  });
  return conversation;
}
