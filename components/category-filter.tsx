"use client"

import { useState } from "react"
import { Check, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

const categories = ["Tất cả", "Shoes", "Bags", "Watches", "Phones", "Laptops"]

export function CategoryFilter() {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState("Tất cả")

  const handleSelect = (category: string) => {
    setSelected(category)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <Button variant="outline" onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2 border-gray-300">
        {selected}
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 py-1 border border-gray-200 animate-in fade-in slide-in-from-top-5">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleSelect(category)}
              className="flex items-center justify-between w-full px-4 py-2 text-left text-sm hover:bg-gray-50"
            >
              {category}
              {selected === category && <Check className="h-4 w-4 text-blue-600" />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

