import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
  }),

  listings: defineTable({
    title: v.string(),
    description: v.string(),
    price: v.number(),
    imageUrls: v.array(v.string()),// this url will come from cloudinary
    category: v.string(),
    sellerId: v.string(),
    status: v.string(),
    createdAt: v.number(),
  }),

  messages: defineTable({
    conversationId: v.string(),
    senderId: v.string(),
    text: v.string(),
    createdAt: v.number(),
  }),
});
