import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
export default defineSchema({
  caseStudies: defineTable({
    title: v.string(),
    tags: v.array(v.string()),
    content: v.string(),
  }),
  appointments: defineTable({
    name: v.string(),
    email: v.string(),
  }),
});
