"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Shield } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Login() {
  const [username, setUsername] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically handle anonymous authentication
    router.push("/chat")
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <Shield className="w-12 h-12 mx-auto mb-4 text-emerald-500" />
          <h1 className="text-2xl font-bold mb-2">Start Chatting Anonymously</h1>
          <p className="text-muted-foreground">Choose any username to begin. No personal info required.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="Enter any username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-zinc-900 border-zinc-800"
            />
          </div>
          <Button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-600">
            Join Anonymously
          </Button>
        </form>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          By continuing, you agree to our commitment to privacy and anonymous communication.
        </div>
      </div>
    </div>
  )
}

