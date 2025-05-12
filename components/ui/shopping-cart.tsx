"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { X, ShoppingBag, Trash2, Plus, Minus } from "lucide-react"

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
}

export function ShoppingCart() {
  const [isOpen, setIsOpen] = useState(false)
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Digital Entrepreneur's Starter Kit",
      price: 47.0,
      quantity: 1,
      image: "/products/digital-entrepreneur-kit.png",
    },
    {
      id: 2,
      name: "The Magnolia Reset Journal",
      price: 27.0,
      quantity: 1,
      image: "/products/magnolia-reset-journal.png",
    },
  ])

  const toggleCart = () => setIsOpen(!isOpen)

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return
    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

  return (
    <div>
      {/* Cart Button */}
      <button
        onClick={toggleCart}
        className="relative p-2 rounded-full bg-rich-gold/10 hover:bg-rich-gold/20 transition-colors text-rich-gold"
        aria-label="Shopping Cart"
      >
        <ShoppingBag className="h-5 w-5" />
        {cartItems.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-rich-gold text-midnight-blue text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {cartItems.reduce((total, item) => total + item.quantity, 0)}
          </span>
        )}
      </button>

      {/* Cart Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-midnight-blue/80 backdrop-blur-sm z-50 flex justify-end">
          <div className="bg-midnight-blue border-l border-midnight-teal/30 w-full max-w-md h-full overflow-auto">
            <div className="p-4 border-b border-midnight-teal/30 flex justify-between items-center">
              <h2 className="font-heading text-xl text-rich-gold">Your Cart</h2>
              <button
                onClick={toggleCart}
                className="p-2 rounded-full hover:bg-midnight-teal/20 transition-colors"
                aria-label="Close Cart"
              >
                <X className="h-5 w-5 text-magnolia-white" />
              </button>
            </div>

            {cartItems.length === 0 ? (
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-midnight-teal/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="h-8 w-8 text-midnight-teal/70" />
                </div>
                <h3 className="font-heading text-lg text-magnolia-white mb-2">Your cart is empty</h3>
                <p className="text-magnolia-white/70 mb-6">
                  Explore our digital products to find tools for your journey.
                </p>
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-rich-gold text-midnight-blue rounded-md font-accent text-sm hover:bg-rich-gold/90 transition-colors"
                  onClick={toggleCart}
                >
                  Browse Products
                </Link>
              </div>
            ) : (
              <>
                <div className="divide-y divide-midnight-teal/30">
                  {cartItems.map((item) => (
                    <div key={item.id} className="p-4 flex gap-4">
                      <div className="relative h-20 w-20 flex-shrink-0 rounded-md overflow-hidden border border-midnight-teal/30">
                        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-heading text-magnolia-white text-sm mb-1">{item.name}</h3>
                        <p className="text-rich-gold font-accent">${item.price.toFixed(2)}</p>
                        <div className="flex justify-between items-center mt-2">
                          <div className="flex items-center">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 rounded-l-md bg-midnight-teal/20 text-magnolia-white hover:bg-midnight-teal/30 transition-colors"
                              aria-label="Decrease Quantity"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="w-8 text-center bg-midnight-teal/10 text-magnolia-white py-1">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 rounded-r-md bg-midnight-teal/20 text-magnolia-white hover:bg-midnight-teal/30 transition-colors"
                              aria-label="Increase Quantity"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-1 rounded-full hover:bg-midnight-teal/20 transition-colors text-magnolia-white/70 hover:text-magnolia-white"
                            aria-label="Remove Item"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 border-t border-midnight-teal/30">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-magnolia-white">Subtotal</span>
                    <span className="font-accent text-rich-gold">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-magnolia-white">Estimated Tax</span>
                    <span className="font-accent text-rich-gold">${(subtotal * 0.07).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center mb-6 pb-4 border-b border-midnight-teal/30">
                    <span className="text-magnolia-white font-heading text-lg">Total</span>
                    <span className="font-accent text-rich-gold text-xl">${(subtotal * 1.07).toFixed(2)}</span>
                  </div>
                  <button className="w-full py-3 bg-rich-gold text-midnight-blue rounded-md font-accent text-sm hover:bg-rich-gold/90 transition-colors mb-3">
                    Proceed to Checkout
                  </button>
                  <button
                    onClick={toggleCart}
                    className="w-full py-3 border border-rich-gold/50 text-rich-gold rounded-md font-accent text-sm hover:bg-rich-gold/10 transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
