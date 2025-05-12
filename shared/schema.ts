import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email"),
  fullName: text("full_name"),
  role: text("role").default("user"),
  membershipTier: text("membership_tier"),
  stripeCustomerId: text("stripe_customer_id"),
  stripeSubscriptionId: text("stripe_subscription_id"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  fullName: true,
  role: true,
  membershipTier: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Tarot cards database model
export const tarotCards = pgTable("tarot_cards", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  arcanaType: text("arcana_type").notNull(),
  persona: text("persona"),
  status: text("status").default("draft"),
  upright: text("upright"),
  reversed: text("reversed"),
  affirmation: text("affirmation"),
  journalPrompt: text("journal_prompt"),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertTarotCardSchema = createInsertSchema(tarotCards).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertTarotCard = z.infer<typeof insertTarotCardSchema>;
export type TarotCard = typeof tarotCards.$inferSelect;

// Digital products database model
export const digitalProducts = pgTable("digital_products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  price: integer("price").notNull(), // Stored in cents
  status: text("status").default("draft"),
  platform: text("platform"),
  description: text("description"),
  featuredImage: text("featured_image"),
  downloadUrl: text("download_url"),
  relatedCards: text("related_cards").array(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertDigitalProductSchema = createInsertSchema(digitalProducts).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertDigitalProduct = z.infer<typeof insertDigitalProductSchema>;
export type DigitalProduct = typeof digitalProducts.$inferSelect;

// Patreon content database model
export const patreonContent = pgTable("patreon_content", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  contentType: text("content_type").notNull(),
  tier: text("tier").notNull(),
  status: text("status").default("draft"),
  publishDate: timestamp("publish_date"),
  content: text("content"),
  featuredImage: text("featured_image"),
  downloadUrl: text("download_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertPatreonContentSchema = createInsertSchema(patreonContent).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertPatreonContent = z.infer<typeof insertPatreonContentSchema>;
export type PatreonContent = typeof patreonContent.$inferSelect;

// Clients database model
export const clients = pgTable("clients", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  platform: text("platform"), // Where the client came from (Etsy, Shopify, Patreon, etc.)
  membershipTier: text("membership_tier"),
  notes: text("notes"),
  status: text("status").default("active"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertClientSchema = createInsertSchema(clients).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertClient = z.infer<typeof insertClientSchema>;
export type Client = typeof clients.$inferSelect;

// Generated content model for storing AI-generated content
export const generatedContent = pgTable("generated_content", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  contentType: text("content_type").notNull(), // affirmation, tarot, journal, product
  content: text("content").notNull(),
  prompt: text("prompt"), // The prompt used to generate this content
  tags: text("tags").array(),
  status: text("status").default("draft"), // draft, published, archived
  userId: integer("user_id"), // Who created it
  imageUrl: text("image_url"),
  productId: integer("product_id"), // If this content is associated with a product
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertGeneratedContentSchema = createInsertSchema(generatedContent).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertGeneratedContent = z.infer<typeof insertGeneratedContentSchema>;
export type GeneratedContent = typeof generatedContent.$inferSelect;

// Orders database model
export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  clientId: integer("client_id").notNull(),
  totalAmount: integer("total_amount").notNull(), // In cents
  status: text("status").default("pending"),
  stripePaymentIntentId: text("stripe_payment_intent_id"),
  platform: text("platform"), // Etsy, Shopify, Direct, etc.
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertOrderSchema = createInsertSchema(orders).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type Order = typeof orders.$inferSelect;

// Order items database model
export const orderItems = pgTable("order_items", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id").notNull(),
  productId: integer("product_id").notNull(),
  quantity: integer("quantity").notNull().default(1),
  pricePerUnit: integer("price_per_unit").notNull(), // In cents
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertOrderItemSchema = createInsertSchema(orderItems).omit({
  id: true,
  createdAt: true,
});

export type InsertOrderItem = z.infer<typeof insertOrderItemSchema>;
export type OrderItem = typeof orderItems.$inferSelect;

// Tasks database model for the dashboard
export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  status: text("status").default("pending"), // pending, in-progress, completed
  priority: text("priority").default("medium"), // low, medium, high
  dueDate: timestamp("due_date"),
  userId: integer("user_id").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertTaskSchema = createInsertSchema(tasks).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertTask = z.infer<typeof insertTaskSchema>;
export type Task = typeof tasks.$inferSelect;
