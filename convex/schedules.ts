import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// ✅ Create Schedule
export const createSchedule = mutation({
  args: {
    time: v.string(),
    title: v.string(),
    location: v.string(),
    block: v.string(),
    isActive: v.optional(v.boolean()),
    reminder: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // 🔐 Get logged-in user from Clerk
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    return await ctx.db.insert("schedules", {
      userId: identity.subject, // Clerk user ID
      time: args.time,
      title: args.title,
      location: args.location,
      block: args.block,
      isActive: args.isActive ?? true,
      reminder: args.reminder,
      createdAt: Date.now(),
    });
  },
});
export const getUserSchedules = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    return await ctx.db
      .query("schedules")
      .withIndex("by_user", (q) => q.eq("userId", identity.subject))
      .collect();
  },
});
