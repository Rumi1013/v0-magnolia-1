import Stripe from 'stripe';

// Get the Stripe API key from environment variables
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("Missing required Stripe environment variable: STRIPE_SECRET_KEY");
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-04-30.basil', // Using latest API version
});

export class StripeError extends Error {
  status: number;
  code: string;

  constructor(message: string, status = 500, code = "stripe_error") {
    super(message);
    this.status = status;
    this.code = code;
    Object.setPrototypeOf(this, StripeError.prototype);
  }
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  interval: 'month' | 'year';
  description: string;
  features: string[];
  metadata?: Record<string, string>;
}

export class StripeService {
  /**
   * Create a payment intent for one-time purchases
   */
  async createPaymentIntent(amount: number, currency: string = 'usd', metadata: Record<string, string> = {}) {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Convert to cents
        currency,
        metadata,
      });
      
      return {
        clientSecret: paymentIntent.client_secret,
        id: paymentIntent.id
      };
    } catch (error: any) {
      console.error("Error creating payment intent:", error);
      throw new StripeError(
        error.message || "Failed to create payment intent",
        error.statusCode || 500
      );
    }
  }

  /**
   * Create a customer in Stripe
   */
  async createCustomer(email: string, name: string, metadata: Record<string, string> = {}) {
    try {
      const customer = await stripe.customers.create({
        email,
        name,
        metadata,
      });
      
      return customer;
    } catch (error: any) {
      console.error("Error creating customer:", error);
      throw new StripeError(
        error.message || "Failed to create customer",
        error.statusCode || 500
      );
    }
  }

  /**
   * Create a subscription for a customer
   */
  async createSubscription(customerId: string, priceId: string, metadata: Record<string, string> = {}) {
    try {
      const subscription = await stripe.subscriptions.create({
        customer: customerId,
        items: [{ price: priceId }],
        payment_behavior: 'default_incomplete',
        expand: ['latest_invoice.payment_intent'],
        metadata,
      });
      
      // Return client secret from the latest invoice
      let clientSecret = null;
      // Using as any to bypass TypeScript typing issues with expanded objects
      const invoice = subscription.latest_invoice as any;
      if (invoice && typeof invoice !== 'string' && invoice.payment_intent) {
        const paymentIntent = invoice.payment_intent;
        if (typeof paymentIntent !== 'string' && paymentIntent.client_secret) {
          clientSecret = paymentIntent.client_secret;
        }
      }
      
      return {
        subscriptionId: subscription.id,
        clientSecret,
        status: subscription.status
      };
    } catch (error: any) {
      console.error("Error creating subscription:", error);
      throw new StripeError(
        error.message || "Failed to create subscription",
        error.statusCode || 500
      );
    }
  }

  /**
   * Get subscription details
   */
  async getSubscription(subscriptionId: string) {
    try {
      const subscription = await stripe.subscriptions.retrieve(subscriptionId);
      return subscription;
    } catch (error: any) {
      console.error("Error retrieving subscription:", error);
      throw new StripeError(
        error.message || "Failed to retrieve subscription",
        error.statusCode || 500
      );
    }
  }

  /**
   * Cancel a subscription
   */
  async cancelSubscription(subscriptionId: string) {
    try {
      const subscription = await stripe.subscriptions.cancel(subscriptionId);
      return subscription;
    } catch (error: any) {
      console.error("Error cancelling subscription:", error);
      throw new StripeError(
        error.message || "Failed to cancel subscription",
        error.statusCode || 500
      );
    }
  }

  /**
   * Create a product in Stripe
   */
  async createProduct(name: string, description: string, metadata: Record<string, string> = {}) {
    try {
      const product = await stripe.products.create({
        name,
        description,
        metadata,
      });
      
      return product;
    } catch (error: any) {
      console.error("Error creating product:", error);
      throw new StripeError(
        error.message || "Failed to create product",
        error.statusCode || 500
      );
    }
  }

  /**
   * Create a price for a product
   */
  async createPrice(productId: string, amount: number, currency: string = 'usd', interval: 'month' | 'year' = 'month') {
    try {
      const price = await stripe.prices.create({
        product: productId,
        unit_amount: Math.round(amount * 100), // Convert to cents
        currency,
        recurring: { interval },
      });
      
      return price;
    } catch (error: any) {
      console.error("Error creating price:", error);
      throw new StripeError(
        error.message || "Failed to create price",
        error.statusCode || 500
      );
    }
  }

  /**
   * Create predefined subscription plans
   * This would typically be used during application setup or migrations
   */
  async createSubscriptionPlans(plans: SubscriptionPlan[]) {
    try {
      const results = [];
      
      for (const plan of plans) {
        // Create a product for the plan
        const product = await this.createProduct(
          plan.name, 
          plan.description,
          { 
            features: JSON.stringify(plan.features),
            ...plan.metadata
          }
        );
        
        // Create a price for the product
        const price = await this.createPrice(
          product.id,
          plan.price,
          'usd',
          plan.interval
        );
        
        results.push({
          planId: plan.id,
          productId: product.id,
          priceId: price.id
        });
      }
      
      return results;
    } catch (error: any) {
      console.error("Error creating subscription plans:", error);
      throw new StripeError(
        error.message || "Failed to create subscription plans",
        error.statusCode || 500
      );
    }
  }
}

export const stripeService = new StripeService();