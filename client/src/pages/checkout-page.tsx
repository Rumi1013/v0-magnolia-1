import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Loader2, Moon, CreditCard, Info, AlertTriangle, ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Initialize Stripe with public key
if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
  throw new Error('Missing required environment variable: VITE_STRIPE_PUBLIC_KEY');
}
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

// Define pricing plans
const plans = {
  "magnolia-seed": {
    name: "Magnolia Seed",
    monthlyPrice: 0,
    yearlyPrice: 0,
    description: "Explore the surface of the mystical realm with basic tools and limited access.",
  },
  "crescent-bloom": {
    name: "Crescent Bloom",
    monthlyPrice: 9.97,
    yearlyPrice: 97,
    description: "Begin your journey with essential tools for content and brand enchantment.",
  },
  "golden-grove": {
    name: "Golden Grove",
    monthlyPrice: 19.97,
    yearlyPrice: 197,
    description: "Amplify your practice with enhanced tools and expanded access to mystical resources.",
  },
  "moonlit-sanctuary": {
    name: "Moonlit Sanctuary",
    monthlyPrice: 49.97,
    yearlyPrice: 497,
    description: "Immerse yourself in premium resources and personalized guidance for your content journey.",
  },
  "house-of-midnight": {
    name: "House of Midnight",
    monthlyPrice: 99.97,
    yearlyPrice: 997,
    description: "The ultimate mystical content experience with exclusive access and personalized strategy.",
  }
};

const CheckoutForm = ({ clientSecret, planDetails }: { clientSecret: string, planDetails: any }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { toast } = useToast();
  const [location, setLocation] = useLocation();

  useEffect(() => {
    if (!stripe) {
      return;
    }

    // Extract payment intent client_secret from the URL
    const query = new URLSearchParams(window.location.search);
    const paymentIntentClientSecret = query.get("payment_intent_client_secret");

    if (!paymentIntentClientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(paymentIntentClientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent?.status) {
        case "succeeded":
          toast({
            title: "Payment successful",
            description: "Thank you for your subscription to Midnight Magnolia!",
          });
          setTimeout(() => setLocation("/dashboard"), 2000);
          break;
        case "processing":
          toast({
            title: "Payment processing",
            description: "Your payment is being processed. We'll notify you when it's complete.",
          });
          break;
        case "requires_payment_method":
          toast({
            title: "Payment failed",
            description: "Please try another payment method.",
            variant: "destructive",
          });
          break;
        default:
          toast({
            title: "Something went wrong",
            description: "Please try again later.",
            variant: "destructive",
          });
          break;
      }
    });
  }, [stripe, toast, setLocation]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/checkout?success=true`,
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setErrorMessage(error.message || "An error occurred with your payment.");
    } else {
      setErrorMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-6">
      {errorMessage && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Payment Error</AlertTitle>
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}
      
      <div className="border rounded-md p-4 bg-white/60 backdrop-blur-sm">
        <PaymentElement id="payment-element" />
      </div>
      
      <div className="space-y-4">
        <Button
          type="submit"
          className="w-full"
          disabled={isLoading || !stripe || !elements}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <CreditCard className="mr-2 h-4 w-4" />
              Complete Payment
            </>
          )}
        </Button>
        
        <Alert variant="default" className="bg-primary/5 border-primary/20">
          <Info className="h-4 w-4 text-primary" />
          <AlertTitle>Secure Transaction</AlertTitle>
          <AlertDescription className="text-sm">
            All payments are securely processed by Stripe. Your card details are never stored on our servers.
          </AlertDescription>
        </Alert>
      </div>
    </form>
  );
};

function CheckoutPage() {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [planId, setPlanId] = useState<string | null>(null);
  const [cycle, setCycle] = useState<"monthly" | "yearly">("yearly");
  const { user } = useAuth();
  const [location, setLocation] = useLocation();
  const { toast } = useToast();

  // Get plan and cycle from URL
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const planParam = query.get("plan");
    const cycleParam = query.get("cycle") as "monthly" | "yearly" | null;
    
    if (planParam && plans[planParam as keyof typeof plans]) {
      setPlanId(planParam);
    } else {
      setPlanId("golden-grove"); // Default to mid-tier plan
    }
    
    if (cycleParam && (cycleParam === "monthly" || cycleParam === "yearly")) {
      setCycle(cycleParam);
    }
  }, []);

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to continue with checkout",
        variant: "destructive",
      });
      setLocation("/auth");
    }
  }, [user, setLocation, toast]);

  // Create payment intent when component mounts
  const createPaymentIntent = useMutation({
    mutationFn: async () => {
      if (!planId || !plans[planId as keyof typeof plans]) return null;
      
      const plan = plans[planId as keyof typeof plans];
      const amount = cycle === "yearly" ? plan.yearlyPrice : plan.monthlyPrice;
      
      // Skip payment creation for free plan
      if (amount === 0) {
        toast({
          title: "Free Plan Activated",
          description: `You've been subscribed to the ${plan.name} plan.`,
        });
        setTimeout(() => setLocation("/dashboard"), 1000);
        return null;
      }
      
      // Create payment intent
      const response = await apiRequest("POST", "/api/payments/create-intent", {
        amount,
        currency: "usd",
        metadata: {
          planId,
          cycle,
          userId: user?.id
        }
      });
      
      return response.json();
    },
    onSuccess: (data) => {
      if (data && data.success && data.clientSecret) {
        setClientSecret(data.clientSecret);
      }
    },
    onError: (error: Error) => {
      toast({
        title: "Payment initialization failed",
        description: error.message || "Could not initialize payment. Please try again.",
        variant: "destructive",
      });
    }
  });

  useEffect(() => {
    if (user && planId && !clientSecret) {
      createPaymentIntent.mutate();
    }
  }, [user, planId]);

  if (!user) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!planId || !plans[planId as keyof typeof plans]) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center">
        <div className="mb-6">
          <AlertTriangle className="h-12 w-12 text-amber-500 mx-auto" />
        </div>
        <h1 className="text-2xl font-serif mb-4">Invalid Plan Selected</h1>
        <p className="text-muted-foreground mb-6">
          The selected pricing plan is not valid. Please return to our pricing page and select a valid plan.
        </p>
        <Button
          onClick={() => setLocation("/pricing")}
          variant="default"
        >
          View Pricing Plans
        </Button>
      </div>
    );
  }

  const planDetails = plans[planId as keyof typeof plans];
  const amount = cycle === "yearly" ? planDetails.yearlyPrice : planDetails.monthlyPrice;

  // Free plan doesn't need payment
  if (amount === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center">
        <Moon className="h-12 w-12 text-primary mx-auto mb-4" />
        <h1 className="text-2xl font-serif mb-2">Activating Your Free Plan</h1>
        <p className="text-muted-foreground mb-8">
          We're activating your free {planDetails.name} plan. You'll be redirected to your dashboard momentarily.
        </p>
        <div className="flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  // If payment intent is still being created
  if (createPaymentIntent.isPending || !clientSecret) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center">
        <Moon className="h-12 w-12 text-primary mx-auto mb-4" />
        <h1 className="text-2xl font-serif mb-2">Preparing Your Order</h1>
        <p className="text-muted-foreground mb-8">
          We're setting up your payment details. This will only take a moment...
        </p>
        <div className="flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-serif mb-2 text-primary-900">Complete Your Purchase</h1>
        <p className="text-muted-foreground">
          You're just one step away from accessing your mystical digital tools
        </p>
      </div>
      
      <div className="grid md:grid-cols-5 gap-8">
        {/* Order Summary */}
        <div className="md:col-span-2 space-y-6">
          <Card className="border-primary/20 bg-white/80 backdrop-blur-lg">
            <CardHeader className="border-b border-primary/10 bg-primary/5">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-serif">Order Summary</CardTitle>
                <ShoppingCart className="h-5 w-5 text-primary/70" />
              </div>
              <CardDescription>Subscription details for your mystical journey</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">{planDetails.name}</h3>
                  <p className="text-sm text-muted-foreground">{planDetails.description}</p>
                </div>
                <Badge variant="outline" className="bg-primary/5 border-primary/20">
                  {cycle === "yearly" ? "Annual" : "Monthly"}
                </Badge>
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Plan Price</span>
                  <span>${amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Billing</span>
                  <span>{cycle === "yearly" ? "Annual" : "Monthly"}</span>
                </div>
                {cycle === "yearly" && (
                  <div className="flex justify-between text-primary">
                    <span>Annual Savings</span>
                    <span>20%</span>
                  </div>
                )}
              </div>
              
              <Separator className="my-4" />
              
              <div className="flex justify-between items-center font-medium text-lg">
                <span>Total</span>
                <span>${amount}</span>
              </div>
              
              <div className="text-xs text-muted-foreground">
                {cycle === "yearly" 
                  ? "You will be charged annually. You can cancel anytime." 
                  : "You will be charged monthly. You can cancel anytime."}
              </div>
            </CardContent>
          </Card>
          
          <div className="text-sm space-y-4">
            <div className="flex gap-2">
              <div className="bg-primary/10 p-1 rounded-full">
                <Moon className="h-4 w-4 text-primary" />
              </div>
              <p className="text-muted-foreground">
                Access your subscription immediately after payment is processed.
              </p>
            </div>
            <div className="flex gap-2">
              <div className="bg-primary/10 p-1 rounded-full">
                <Info className="h-4 w-4 text-primary" />
              </div>
              <p className="text-muted-foreground">
                Need help? Contact our support team at support@midnightmagnolia.com
              </p>
            </div>
          </div>
        </div>
        
        {/* Payment Form */}
        <div className="md:col-span-3">
          <Card className="border-primary/20 bg-white/80 backdrop-blur-lg">
            <CardHeader className="border-b border-primary/10 bg-primary/5">
              <CardTitle className="text-xl font-serif">Payment Details</CardTitle>
              <CardDescription>Enter your payment information securely</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              {clientSecret && (
                <Elements 
                  stripe={stripePromise} 
                  options={{ 
                    clientSecret,
                    appearance: {
                      theme: 'stripe',
                      variables: {
                        colorPrimary: '#4a4178',
                        colorBackground: '#ffffff',
                        colorText: '#1a1523',
                      },
                    },
                  }}
                >
                  <CheckoutForm clientSecret={clientSecret} planDetails={planDetails} />
                </Elements>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;