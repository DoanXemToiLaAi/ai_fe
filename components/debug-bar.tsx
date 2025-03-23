"use client"

import { useState, useEffect } from "react"

export default function DebugBar() {
  const [backendUrl, setBackendUrl] = useState("")

  useEffect(() => {
    setBackendUrl(process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000")
  }, [])

  return (
    <div className="fixed bottom-0 left-0 z-50 bg-black/70 text-white p-2 text-sm">
      <p>
        Backend URL: <code>{backendUrl}</code>
      </p>
    </div>
  )
}

