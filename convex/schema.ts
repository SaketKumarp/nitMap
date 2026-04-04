import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  schedules: defineTable({
    userId: v.string(), // Clerk user ID

    time: v.string(),
    title: v.string(),
    location: v.string(),
    block: v.string(),

    isActive: v.optional(v.boolean()),
    reminder: v.optional(v.string()),

    createdAt: v.number(),
  }).index("by_user", ["userId"]),

  rooms: defineTable({
    userId: v.string(),

    name: v.string(),
    block: v.string(),
    status: v.union(v.literal("FREE"), v.literal("OCCUPIED")),
    note: v.string(),

    createdAt: v.number(),
  }).index("by_user", ["userId"]),
});
