import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createListing = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    price: v.number(),
    imageUrls: v.array(v.string()),
    category: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("listings", {
      ...args,
      sellerId: "demo-user",
      status: "active",
      createdAt: Date.now(),
    });
  },
});

export const getListings = query({
  handler: async (ctx) => {
    return await ctx.db.query("listings").collect();
  },
});
