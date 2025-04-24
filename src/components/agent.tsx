import { useState } from "react";
import { BotButton } from "@/components/bot-button";
import { AuroraText } from "@/components/aura-text";
import { useAgent } from "@/hooks/use-agent";

export function Agent({ agentId }: { agentId: string }) {
  const [conversationStarted, setConversationStarted] =
    useState<boolean>(false);
  const [errorConversation, setErrorConversation] = useState<boolean>(false);
  const conversation = useAgent({ agentId: agentId });

  const handleConversation = async () => {
    if (conversationStarted) {
      await conversation.endSession();
      setConversationStarted(false);
      return;
    } else {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
      } catch (err) {
        console.log("error while accessing microphone", err);
      }
      try {
        await conversation.startSession();
        setConversationStarted(true);
        return;
      } catch (err) {
        setErrorConversation(true);
        console.error("Error while starting conversation", err);
        return;
      }
    }
  };

  return (
    <div className="h-screen flex gap-10 flex-col justify-center items-center w-full">
      <div className="max-w-[60vw] text-center select-none">
        <h1 className="text-4xl font-bold leading-tight">
          Automate Your Marketing With{" "}
          <AuroraText className="text-4xl">
            Realiiz AI Bot & AI Chat Assistants
          </AuroraText>{" "}
          Without Any Coding Or Complex Workflows
        </h1>
      </div>

      <BotButton
        variant={
          errorConversation || (!conversation.isSpeaking && conversationStarted)
            ? "destructive"
            : conversationStarted
              ? "live"
              : "default"
        }
        onClick={handleConversation}
      />
    </div>
  );
}
