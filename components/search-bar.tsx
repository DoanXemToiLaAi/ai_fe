"use client"

import { useState } from "react"
import { Search, X } from "lucide-react"

export function SearchBar() {
  const [query, setQuery] = useState("")
  const [isFocused, setIsFocused] = useState(false)

  const handleClear = () => {
    setQuery("")
  }

  return (
    <div
      className={`relative transition-all duration-300 ${isFocused ? "ring-2 ring-blue-600 shadow-lg" : "shadow"} rounded-full bg-white`}
    >
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search className={`h-5 w-5 ${isFocused ? "text-blue-600" : "text-gray-400"} transition-colors duration-200`} />
      </div>
      <input
        type="text"
        placeholder="Tìm kiếm sản phẩm..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="block w-full pl-12 pr-12 py-4 border-none rounded-full focus:outline-none focus:ring-0 text-gray-900"
      />
      {query && (
        <button onClick={handleClear} className="absolute inset-y-0 right-0 pr-4 flex items-center">
          <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
        </button>
      )}
    </div>
  )
}

