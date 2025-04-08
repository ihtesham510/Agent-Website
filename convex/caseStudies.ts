import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
export const createCaseStudy = mutation({
  args: {
    title: v.string(),
    tags: v.array(v.string()),
    content: v.string(),
  },
  async handler(ctx, args) {
    return await ctx.db.insert("caseStudies", args);
  },
});

export const getCaseStudy = query({
  args: {
    tags: v.array(v.string()),
  },
  async handler(ctx, { tags }) {
    const cs = await ctx.db.query("caseStudies").collect();
    if (tags.length === 0) {
      return cs;
    }
    return cs.filter((cs) => matchArr(cs.tags, tags));
  },
});

function matchArr(arr1: Array<any>, arr2: Array<any>) {
  let match: boolean = false;
  for (const element of arr1) {
    if (arr2.includes(element)) {
      match = true;
    } else {
      match = false;
    }
  }
  return match;
}
