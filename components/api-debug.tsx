"use client"

import { useState } from "react"
import { Bug, ChevronDown, ChevronUp, RefreshCw } from "lucide-react"

interface ApiCall {
  endpoint: string
  method: string
  timestamp: Date
  status: "success" | "error" | "pending"
  response?: any
  error?: any
}

export default function ApiDebug() {
  const [isOpen, setIsOpen] = useState(false)
  const [apiCalls, setApiCalls] = useState<ApiCall[]>([])
  const [isTestingApi, setIsTestingApi] = useState(false)

  // Giả lập test API endpoints
  const testApiEndpoints = async () => {
    setIsTestingApi(true)

    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
    const endpoints = [
      { url: "/home", method: "GET" },
      { url: "/product-page/p1", method: "GET" },
      { url: "/recommendations/u1", method: "GET" },
    ]

    const newApiCalls: ApiCall[] = []

    for (const endpoint of endpoints) {
      const apiCall: ApiCall = {
        endpoint: endpoint.url,
        method: endpoint.method,
        timestamp: new Date(),
        status: "pending",
      }

      newApiCalls.push(apiCall)
      setApiCalls([...newApiCalls])

      try {
        const response = await fetch(`${baseUrl}${endpoint.url}`, {
          method: endpoint.method,
          headers: {
            "Content-Type": "application/json",
          },
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()

        // Update the API call with success status and response
        const index = newApiCalls.findIndex((call) => call.endpoint === endpoint.url && call.status === "pending")

        if (index !== -1) {
          newApiCalls[index].status = "success"
          newApiCalls[index].response = data
          setApiCalls([...newApiCalls])
        }
      } catch (error) {
        // Update the API call with error status
        const index = newApiCalls.findIndex((call) => call.endpoint === endpoint.url && call.status === "pending")

        if (index !== -1) {
          newApiCalls[index].status = "error"
          newApiCalls[index].error = error
          setApiCalls([...newApiCalls])
        }
      }
    }

    setIsTestingApi(false)
  }

  return (
    <div className="fixed bottom-0 right-0 z-50 w-96 max-w-full" data-testid="api-debug">
      <div className="bg-gray-800 text-white rounded-tl-lg shadow-lg">
        <div className="flex justify-between items-center p-3 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
          <h3 className="font-medium flex items-center">
            <Bug className="w-4 h-4 mr-2" /> API Debug
          </h3>
          <div className="flex items-center">
            <button
              onClick={(e) => {
                e.stopPropagation()
                testApiEndpoints()
              }}
              className="mr-2 p-1 rounded hover:bg-gray-700 disabled:opacity-50"
              disabled={isTestingApi}
              title="Test API endpoints"
            >
              <RefreshCw className={`w-4 h-4 ${isTestingApi ? "animate-spin" : ""}`} />
            </button>
            {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </div>
        </div>

        {isOpen && (
          <div className="p-3 max-h-96 overflow-auto">
            {apiCalls.length === 0 ? (
              <p className="text-gray-400 text-sm">
                No API calls recorded yet. Click the refresh button to test endpoints.
              </p>
            ) : (
              <div className="space-y-3">
                {apiCalls.map((call, index) => (
                  <div key={index} className="border border-gray-700 rounded p-2">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-mono text-xs">
                        {call.method} {call.endpoint}
                      </span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded ${
                          call.status === "success"
                            ? "bg-green-900 text-green-100"
                            : call.status === "error"
                              ? "bg-red-900 text-red-100"
                              : "bg-yellow-900 text-yellow-100"
                        }`}
                      >
                        {call.status}
                      </span>
                    </div>
                    <div className="text-xs text-gray-400">{call.timestamp.toLocaleTimeString()}</div>
                    {call.status === "success" && (
                      <pre className="mt-1 text-xs bg-gray-900 p-1 rounded overflow-auto max-h-32">
                        {JSON.stringify(call.response, null, 2)}
                      </pre>
                    )}
                    {call.status === "error" && (
                      <div className="mt-1 text-xs text-red-400">{call.error?.toString()}</div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

