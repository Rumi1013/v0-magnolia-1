"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type TabsContextType = {
  value: string
  onValueChange: (value: string) => void
}

const TabsContext = createContext<TabsContextType | undefined>(undefined)

function useTabs() {
  const context = useContext(TabsContext)
  if (!context) {
    throw new Error("Tabs components must be used within a TabsProvider")
  }
  return context
}

interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue: string
  value?: string
  onValueChange?: (value: string) => void
  children: React.ReactNode
}

export function Tabs({ defaultValue, value, onValueChange, children, ...props }: TabsProps) {
  const [tabValue, setTabValue] = useState(value || defaultValue)

  const handleValueChange = (newValue: string) => {
    if (onValueChange) {
      onValueChange(newValue)
    } else {
      setTabValue(newValue)
    }
  }

  // Update internal state when controlled value changes
  useEffect(() => {
    if (value !== undefined) {
      setTabValue(value)
    }
  }, [value])

  return (
    <TabsContext.Provider
      value={{
        value: value || tabValue,
        onValueChange: handleValueChange,
      }}
    >
      <div {...props}>{children}</div>
    </TabsContext.Provider>
  )
}

interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function TabsList({ children, className, ...props }: TabsListProps) {
  return (
    <div role="tablist" className={`flex overflow-x-auto scrollbar-thin ${className}`} {...props}>
      {children}
    </div>
  )
}

interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
  children: React.ReactNode
}

export function TabsTrigger({ value, children, className, ...props }: TabsTriggerProps) {
  const { value: selectedValue, onValueChange } = useTabs()
  const isSelected = selectedValue === value

  return (
    <button
      role="tab"
      type="button"
      aria-selected={isSelected}
      data-state={isSelected ? "active" : "inactive"}
      onClick={() => onValueChange(value)}
      {...props}
      className={className}
    >
      {children}
    </button>
  )
}

interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
  children: React.ReactNode
}

export function TabsContent({ value, children, className, ...props }: TabsContentProps) {
  const { value: selectedValue } = useTabs()
  const isSelected = selectedValue === value

  if (!isSelected) return null

  return (
    <div role="tabpanel" data-state={isSelected ? "active" : "inactive"} tabIndex={0} className={className} {...props}>
      {children}
    </div>
  )
}
