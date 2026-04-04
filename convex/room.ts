import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// ✅ CREATE ROOM
export const createRoom = mutation({
  args: {
    name: v.string(),
    block: v.string(),
    status: v.union(v.literal("FREE"), v.literal("OCCUPIED")),
    note: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new Error("Unauthorized");

    return await ctx.db.insert("rooms", {
      userId: identity.subject,
      name: args.name,
      block: args.block,
      status: args.status,
      note: args.note,
      createdAt: Date.now(),
    });
  },
});

// ✅ GET USER ROOMS
export const getUserRooms = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new Error("Unauthorized");

    return await ctx.db
      .query("rooms")
      .withIndex("by_user", (q) => q.eq("userId", identity.subject))
      .collect();
  },
});
