import { useConversation } from "@11labs/react";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { BotButton } from "@/components/bot-button";
import { AuroraText } from "@/components/aura-text";
import Pricing from "@/components/pricing";
import { Header } from "@/components/header";
import Features from "@/components/features-1";
import { FAQs } from "@/components/faqs";
import AssistantFeatures from "@/components/features-4";

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
        await conversation.startSession({
          agentId: "H29Tuxjso2Ztd8C4KcuD",
        });
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
      <Header />
      <div className="h-screen flex gap-10 flex-col justify-center items-center w-full">
        <div className="max-w-[60vw] text-center select-none">
          <h1 className="text-4xl font-bold leading-tight">
            Deploy & Resell{" "}
            <AuroraText className="text-4xl">
              White Label AI Call & AI Chat Assistants
            </AuroraText>{" "}
            Without Any Coding Or Complex Workflows
          </h1>
        </div>

        <BotButton
          variant={
            errorConversation
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
