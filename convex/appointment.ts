import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getAppointments = query({
  async handler(ctx) {
    return await ctx.db.query("appointments").collect();
  },
});

export const bookAppointment = mutation({
  args: {
    name: v.string(),
    email: v.string(),
  },
  async handler(ctx, args) {
    return await ctx.db.insert("appointments", args);
  },
});
export const deleteAppointment = mutation({
  args: {
    id: v.id("appointments"),
  },
  async handler(ctx, args) {
    return await ctx.db.delete(args.id);
  },
});
