import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "convex/react";
import { api } from "convex/_generated/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CaseStudyForm } from "@/components/case-study-form";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export const Route = createFileRoute("/case-studies")({
  component: RouteComponent,
});

function RouteComponent() {
  const caseStudies = useQuery(api.caseStudies.getCaseStudy, { tags: [] });
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Button className="m-10">Add Case-Studies</Button>
        </DialogTrigger>
        <div className="w-full space-y-4 px-20 py-5">
          {!caseStudies && <p>Loading .......</p>}
          {caseStudies?.length === 0 && (
            <p className="text-primary/50">No Current Appointments</p>
          )}
          {caseStudies &&
            caseStudies.length !== 0 &&
            caseStudies.map((c) => (
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">{c.title}</CardTitle>
                  <CardDescription className="flex gap-2">
                    {c.tags.length === 0 ? (
                      <>
                        <p className="text-primary/50">No Tags</p>
                      </>
                    ) : (
                      c.tags.map((tag) => <Badge>{tag}</Badge>)
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent>{c.content}</CardContent>
              </Card>
            ))}
        </div>
        <DialogContent className="min-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add Case Study</DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[70vh] px-2">
            <CaseStudyForm />
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
}
