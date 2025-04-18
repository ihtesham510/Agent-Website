import { useConversation } from "@11labs/react";
import { useNavigate } from "@tanstack/react-router";
import { api } from "convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { toast } from "sonner";

export function useAgent({ agentId }: { agentId: string }) {
  const navigate = useNavigate();
  const cs = useQuery(api.caseStudies.getCaseStudy, { tags: [] });
  const addAppointment = useMutation(api.appointment.bookAppointment);
  const caseStudies = cs
    ?.map((c) => `#${c.title}\ntags: ${c.tags.join(" ")}\n${c.content}`)
    .join("\n\n");

  const conversation = useConversation({
    agentId,
    clientTools: {
      redirect: (obj: { url: string }) => {
        console.log("url triggered", obj.url);
        toast.promise(
          async () => {
            if (obj.url === "contact-us") {
              await navigate({ to: "/contact-us" });
            } else {
              window.open(obj.url, "_blank");
            }
          },
          { success: "Successfully Redirected" },
        );
      },
      getCaseStudies: () => {
        console.log(caseStudies);
        return caseStudies;
      },
      bookAppointment: async ({
        name,
        email,
      }: {
        name: string;
        email: string;
      }): Promise<void> => {
        await addAppointment({ name, email });
        toast.success("Appointment Created Successfully");
      },
    },
  });
  return conversation;
}
