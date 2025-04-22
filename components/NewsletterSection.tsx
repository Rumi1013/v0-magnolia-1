"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Mail } from "lucide-react"

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
})

export default function NewsletterSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      firstName: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      form.reset()

      toast({
        title: "Subscription successful!",
        description: "Thank you for joining the Midnight Magnolia community.",
      })
    }, 1500)
  }

  return (
    <div className="rounded-lg p-6 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex items-center mb-4">
          <Mail className="h-6 w-6 text-rich-gold mr-2" />
          <h3 className="font-playfair text-2xl font-bold text-magnolia-white">Join Our Community</h3>
        </div>

        <p className="text-magnolia-white/80 mb-6">
          Subscribe to our newsletter for exclusive content, early access to new products, and insights on Southern
          heritage and digital creativity.
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Your first name"
                      className="bg-midnight-blue/30 border-rich-gold/30 text-magnolia-white placeholder:text-magnolia-white/50"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Your email address"
                      className="bg-midnight-blue/30 border-rich-gold/30 text-magnolia-white placeholder:text-magnolia-white/50"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-rich-gold hover:bg-rich-gold/90 text-midnight-blue"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>
        </Form>

        <p className="text-magnolia-white/60 text-sm mt-4">
          By subscribing, you agree to receive email communications from Midnight Magnolia. We respect your privacy and
          will never share your information.
        </p>
      </motion.div>
    </div>
  )
}
