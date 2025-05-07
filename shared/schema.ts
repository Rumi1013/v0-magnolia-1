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
