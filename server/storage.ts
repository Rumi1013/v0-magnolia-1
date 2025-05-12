import { 
  users, type User, type InsertUser, 
  tarotCards, type TarotCard, type InsertTarotCard, 
  digitalProducts, type DigitalProduct, type InsertDigitalProduct, 
  patreonContent, type PatreonContent, type InsertPatreonContent,
  clients, type Client, type InsertClient,
  generatedContent, type GeneratedContent, type InsertGeneratedContent,
  orders, type Order, type InsertOrder,
  orderItems, type OrderItem, type InsertOrderItem,
  tasks, type Task, type InsertTask
} from "@shared/schema";
import { db } from "./db";
import { eq, and } from "drizzle-orm";
import { Store } from "express-session";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, user: Partial<Omit<User, "id">>): Promise<User | undefined>;
  updateStripeCustomerId(id: number, customerId: string): Promise<User | undefined>;
  updateUserStripeInfo(id: number, stripeInfo: { customerId: string; subscriptionId: string }): Promise<User | undefined>;
  
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
  
  // Client methods
  getClient(id: number): Promise<Client | undefined>;
  getAllClients(): Promise<Client[]>;
  createClient(client: InsertClient): Promise<Client>;
  updateClient(id: number, client: Partial<Omit<Client, "id">>): Promise<Client | undefined>;
  deleteClient(id: number): Promise<boolean>;
  
  // Generated content methods
  getGeneratedContent(id: number): Promise<GeneratedContent | undefined>;
  getAllGeneratedContent(): Promise<GeneratedContent[]>;
  getGeneratedContentByType(contentType: string): Promise<GeneratedContent[]>;
  getGeneratedContentByUser(userId: number): Promise<GeneratedContent[]>;
  createGeneratedContent(content: InsertGeneratedContent): Promise<GeneratedContent>;
  updateGeneratedContent(id: number, content: Partial<Omit<GeneratedContent, "id">>): Promise<GeneratedContent | undefined>;
  deleteGeneratedContent(id: number): Promise<boolean>;
  
  // Order methods
  getOrder(id: number): Promise<Order | undefined>;
  getAllOrders(): Promise<Order[]>;
  getOrdersByClient(clientId: number): Promise<Order[]>;
  createOrder(order: InsertOrder): Promise<Order>;
  updateOrder(id: number, order: Partial<Omit<Order, "id">>): Promise<Order | undefined>;
  deleteOrder(id: number): Promise<boolean>;
  
  // Order item methods
  getOrderItems(orderId: number): Promise<OrderItem[]>;
  createOrderItem(item: InsertOrderItem): Promise<OrderItem>;
  deleteOrderItem(id: number): Promise<boolean>;
  
  // Task methods
  getTask(id: number): Promise<Task | undefined>;
  getAllTasks(): Promise<Task[]>;
  getTasksByUser(userId: number): Promise<Task[]>;
  createTask(task: InsertTask): Promise<Task>;
  updateTask(id: number, task: Partial<Omit<Task, "id">>): Promise<Task | undefined>;
  deleteTask(id: number): Promise<boolean>;
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
  
  async updateStripeCustomerId(id: number, customerId: string): Promise<User | undefined> {
    const [updatedUser] = await db.update(users)
      .set({ stripeCustomerId: customerId })
      .where(eq(users.id, id))
      .returning();
    return updatedUser;
  }
  
  async updateUserStripeInfo(id: number, stripeInfo: { customerId: string; subscriptionId: string }): Promise<User | undefined> {
    const [updatedUser] = await db.update(users)
      .set({ 
        stripeCustomerId: stripeInfo.customerId,
        stripeSubscriptionId: stripeInfo.subscriptionId
      })
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
  
  // Client methods
  async getClient(id: number): Promise<Client | undefined> {
    const [client] = await db.select().from(clients).where(eq(clients.id, id));
    return client;
  }
  
  async getAllClients(): Promise<Client[]> {
    return await db.select().from(clients);
  }
  
  async createClient(client: InsertClient): Promise<Client> {
    const [newClient] = await db.insert(clients).values(client).returning();
    return newClient;
  }
  
  async updateClient(id: number, clientData: Partial<Omit<Client, "id">>): Promise<Client | undefined> {
    const [updatedClient] = await db.update(clients)
      .set(clientData)
      .where(eq(clients.id, id))
      .returning();
    return updatedClient;
  }
  
  async deleteClient(id: number): Promise<boolean> {
    const result = await db.delete(clients).where(eq(clients.id, id));
    return true;
  }
  
  // Generated content methods
  async getGeneratedContent(id: number): Promise<GeneratedContent | undefined> {
    const [content] = await db.select().from(generatedContent).where(eq(generatedContent.id, id));
    return content;
  }
  
  async getAllGeneratedContent(): Promise<GeneratedContent[]> {
    return await db.select().from(generatedContent);
  }
  
  async getGeneratedContentByType(contentType: string): Promise<GeneratedContent[]> {
    return await db.select().from(generatedContent).where(eq(generatedContent.contentType, contentType));
  }
  
  async getGeneratedContentByUser(userId: number): Promise<GeneratedContent[]> {
    return await db.select().from(generatedContent).where(eq(generatedContent.userId, userId));
  }
  
  async createGeneratedContent(content: InsertGeneratedContent): Promise<GeneratedContent> {
    const [newContent] = await db.insert(generatedContent).values(content).returning();
    return newContent;
  }
  
  async updateGeneratedContent(id: number, contentData: Partial<Omit<GeneratedContent, "id">>): Promise<GeneratedContent | undefined> {
    const [updatedContent] = await db.update(generatedContent)
      .set(contentData)
      .where(eq(generatedContent.id, id))
      .returning();
    return updatedContent;
  }
  
  async deleteGeneratedContent(id: number): Promise<boolean> {
    const result = await db.delete(generatedContent).where(eq(generatedContent.id, id));
    return true;
  }
  
  // Order methods
  async getOrder(id: number): Promise<Order | undefined> {
    const [order] = await db.select().from(orders).where(eq(orders.id, id));
    return order;
  }
  
  async getAllOrders(): Promise<Order[]> {
    return await db.select().from(orders);
  }
  
  async getOrdersByClient(clientId: number): Promise<Order[]> {
    return await db.select().from(orders).where(eq(orders.clientId, clientId));
  }
  
  async createOrder(order: InsertOrder): Promise<Order> {
    const [newOrder] = await db.insert(orders).values(order).returning();
    return newOrder;
  }
  
  async updateOrder(id: number, orderData: Partial<Omit<Order, "id">>): Promise<Order | undefined> {
    const [updatedOrder] = await db.update(orders)
      .set(orderData)
      .where(eq(orders.id, id))
      .returning();
    return updatedOrder;
  }
  
  async deleteOrder(id: number): Promise<boolean> {
    const result = await db.delete(orders).where(eq(orders.id, id));
    return true;
  }
  
  // Order item methods
  async getOrderItems(orderId: number): Promise<OrderItem[]> {
    return await db.select().from(orderItems).where(eq(orderItems.orderId, orderId));
  }
  
  async createOrderItem(item: InsertOrderItem): Promise<OrderItem> {
    const [newItem] = await db.insert(orderItems).values(item).returning();
    return newItem;
  }
  
  async deleteOrderItem(id: number): Promise<boolean> {
    const result = await db.delete(orderItems).where(eq(orderItems.id, id));
    return true;
  }
  
  // Task methods
  async getTask(id: number): Promise<Task | undefined> {
    const [task] = await db.select().from(tasks).where(eq(tasks.id, id));
    return task;
  }
  
  async getAllTasks(): Promise<Task[]> {
    return await db.select().from(tasks);
  }
  
  async getTasksByUser(userId: number): Promise<Task[]> {
    return await db.select().from(tasks).where(eq(tasks.userId, userId));
  }
  
  async createTask(task: InsertTask): Promise<Task> {
    const [newTask] = await db.insert(tasks).values(task).returning();
    return newTask;
  }
  
  async updateTask(id: number, taskData: Partial<Omit<Task, "id">>): Promise<Task | undefined> {
    const [updatedTask] = await db.update(tasks)
      .set(taskData)
      .where(eq(tasks.id, id))
      .returning();
    return updatedTask;
  }
  
  async deleteTask(id: number): Promise<boolean> {
    const result = await db.delete(tasks).where(eq(tasks.id, id));
    return true;
  }
}

export const storage = new DatabaseStorage();