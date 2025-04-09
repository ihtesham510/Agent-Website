import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { BotButton } from "@/components/bot-button";
import { AuroraText } from "@/components/aura-text";
import Pricing from "@/components/pricing";
import { Header } from "@/components/header";
import Features from "@/components/features-1";
import { FAQs } from "@/components/faqs";
import AssistantFeatures from "@/components/features-4";
import FaviconUpdater from "@/components/dynamic-favicon";
import { Bot } from "lucide-react";
import { useConversation } from "@/context/agent-contex";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const [conversationStarted, setConversationStarted] =
    useState<boolean>(false);
  const [errorConversation, setErrorConversation] = useState<boolean>(false);
  const conversation = useConversation();

  const handleConversation = async () => {
    if (conversationStarted) {
      await conversation.endSession();
      setConversationStarted(false);
      return;
    }
    if (!conversationStarted) {
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
    <>
      <FaviconUpdater icon={Bot} title="Marketing Agents" />
      <Header />
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
            errorConversation ||
            (!conversation.isSpeaking && conversationStarted)
              ? "destructive"
              : conversationStarted
                ? "live"
                : "default"
          }
          onClick={handleConversation}
        />
      </div>
      <AssistantFeatures />
      <Features />
      <Pricing />
      <FAQs />
    </>
  );
}
