import { users, type User, type InsertUser, tarotCards, type TarotCard, type InsertTarotCard, digitalProducts, type DigitalProduct, type InsertDigitalProduct, patreonContent, type PatreonContent, type InsertPatreonContent } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";
import { Store } from "express-session";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, user: Partial<Omit<User, "id">>): Promise<User | undefined>;
  
  // Tarot card methods
  getTarotCard(id: number): Promise<TarotCard | undefined>;
  getAllTarotCards(): Promise<TarotCard[]>;
  createTarotCard(card: InsertTarotCard): Promise<TarotCard>;
  updateTarotCard(id: number, card: Partial<Omit<TarotCard, "id">>): Promise<TarotCard | undefined>;
  deleteTarotCard(id: number): Promise<boolean>;
  
  // Digital product methods
  getDigitalProduct(id: number): Promise<DigitalProduct | undefined>;
  getAllDigitalProducts(): Promise<DigitalProduct[]>;
  createDigitalProduct(product: InsertDigitalProduct): Promise<DigitalProduct>;
  updateDigitalProduct(id: number, product: Partial<Omit<DigitalProduct, "id">>): Promise<DigitalProduct | undefined>;
  deleteDigitalProduct(id: number): Promise<boolean>;
  
  // Patreon content methods
  getPatreonContent(id: number): Promise<PatreonContent | undefined>;
  getAllPatreonContent(): Promise<PatreonContent[]>;
  getPatreonContentByTier(tier: string): Promise<PatreonContent[]>;
  createPatreonContent(content: InsertPatreonContent): Promise<PatreonContent>;
  updatePatreonContent(id: number, content: Partial<Omit<PatreonContent, "id">>): Promise<PatreonContent | undefined>;
  deletePatreonContent(id: number): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }
  
  async updateUser(id: number, userData: Partial<Omit<User, "id">>): Promise<User | undefined> {
    const [updatedUser] = await db.update(users)
      .set(userData)
      .where(eq(users.id, id))
      .returning();
    return updatedUser;
  }
  
  // Tarot card methods
  async getTarotCard(id: number): Promise<TarotCard | undefined> {
    const [card] = await db.select().from(tarotCards).where(eq(tarotCards.id, id));
    return card;
  }
  
  async getAllTarotCards(): Promise<TarotCard[]> {
    return await db.select().from(tarotCards);
  }
  
  async createTarotCard(card: InsertTarotCard): Promise<TarotCard> {
    const [newCard] = await db.insert(tarotCards).values(card).returning();
    return newCard;
  }
  
  async updateTarotCard(id: number, cardData: Partial<Omit<TarotCard, "id">>): Promise<TarotCard | undefined> {
    const [updatedCard] = await db.update(tarotCards)
      .set(cardData)
      .where(eq(tarotCards.id, id))
      .returning();
    return updatedCard;
  }
  
  async deleteTarotCard(id: number): Promise<boolean> {
    const result = await db.delete(tarotCards).where(eq(tarotCards.id, id));
    return true; // PostgreSQL doesn't return deleted rows count by default, we assume success
  }
  
  // Digital product methods
  async getDigitalProduct(id: number): Promise<DigitalProduct | undefined> {
    const [product] = await db.select().from(digitalProducts).where(eq(digitalProducts.id, id));
    return product;
  }
  
  async getAllDigitalProducts(): Promise<DigitalProduct[]> {
    return await db.select().from(digitalProducts);
  }
  
  async createDigitalProduct(product: InsertDigitalProduct): Promise<DigitalProduct> {
    const [newProduct] = await db.insert(digitalProducts).values(product).returning();
    return newProduct;
  }
  
  async updateDigitalProduct(id: number, productData: Partial<Omit<DigitalProduct, "id">>): Promise<DigitalProduct | undefined> {
    const [updatedProduct] = await db.update(digitalProducts)
      .set(productData)
      .where(eq(digitalProducts.id, id))
      .returning();
    return updatedProduct;
  }
  
  async deleteDigitalProduct(id: number): Promise<boolean> {
    const result = await db.delete(digitalProducts).where(eq(digitalProducts.id, id));
    return true;
  }
  
  // Patreon content methods
  async getPatreonContent(id: number): Promise<PatreonContent | undefined> {
    const [content] = await db.select().from(patreonContent).where(eq(patreonContent.id, id));
    return content;
  }
  
  async getAllPatreonContent(): Promise<PatreonContent[]> {
    return await db.select().from(patreonContent);
  }
  
  async getPatreonContentByTier(tier: string): Promise<PatreonContent[]> {
    return await db.select().from(patreonContent).where(eq(patreonContent.tier, tier));
  }
  
  async createPatreonContent(content: InsertPatreonContent): Promise<PatreonContent> {
    const [newContent] = await db.insert(patreonContent).values(content).returning();
    return newContent;
  }
  
  async updatePatreonContent(id: number, contentData: Partial<Omit<PatreonContent, "id">>): Promise<PatreonContent | undefined> {
    const [updatedContent] = await db.update(patreonContent)
      .set(contentData)
      .where(eq(patreonContent.id, id))
      .returning();
    return updatedContent;
  }
  
  async deletePatreonContent(id: number): Promise<boolean> {
    const result = await db.delete(patreonContent).where(eq(patreonContent.id, id));
    return true;
  }
}

export const storage = new DatabaseStorage();