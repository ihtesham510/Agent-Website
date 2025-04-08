import { api } from "convex/_generated/api";
import { useQuery } from "convex/react";
export function useCaseStudies() {
  const cs = useQuery(api.caseStudies.getCaseStudy, { tags: [] });
  return { cs };
}
