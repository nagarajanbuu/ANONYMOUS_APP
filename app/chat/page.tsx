"use client"

import { useState, useEffect, useRef } from "react"
import { Send, Video, Trash2, Settings as SettingsIcon, ArrowLeft, PhoneOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Message {
  id: number
  text: string
  sender: string
  timestamp: Date
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [showSettings, setShowSettings] = useState(false)
  const [inCall, setInCall] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const message: Message = {
      id: Date.now(),
      text: newMessage,
      sender: "anonymous",
      timestamp: new Date(),
    }

    setMessages([...messages, message])
    setNewMessage("")
  }

  const handleDeleteMessage = (id: number) => {
    setMessages(messages.filter((message) => message.id !== id))
  }

  const startVideoCall = () => {
    setInCall(true)
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream
        }
      })
      .catch(error => console.error("Error accessing media devices:", error))
  }

  const endVideoCall = () => {
    setInCall(false)
    if (videoRef.current?.srcObject) {
      (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop())
    }
  }

  if (showSettings) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="container mx-auto px-4 py-12 max-w-2xl">
          <Button variant="ghost" size="icon" onClick={() => setShowSettings(false)} className="mb-4">
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-2xl font-bold mb-8">Privacy Settings</h1>
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Message Privacy</h2>
              <div className="space-y-4 bg-zinc-900 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <span>Auto-delete messages</span>
                  <input type="checkbox" className="form-checkbox" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (inCall) {
    return (
      <div className="fixed inset-0 bg-black flex flex-col items-center justify-center">
        <Button variant="ghost" size="icon" className="absolute top-4 left-4" onClick={endVideoCall}>
          <ArrowLeft className="w-6 h-6 text-white" />
        </Button>
        <video ref={videoRef} autoPlay playsInline className="w-full max-w-3xl rounded-lg shadow-lg" />
        <Button onClick={endVideoCall} className="mt-4 bg-red-600 hover:bg-red-700">
          <PhoneOff className="w-5 h-5 mr-2" /> End Call
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white flex">
      <div className="w-64 border-r border-zinc-800 p-4">
        <h2 className="font-bold mb-4">Active Users</h2>
        <div className="space-y-2">
          <div className="flex items-center space-x-2 p-2 rounded bg-zinc-900">
            <div className="w-2 h-2 bg-emerald-500 rounded-full" />
            <span>Anonymous_123</span>
          </div>
          <div className="flex items-center space-x-2 p-2 rounded bg-zinc-900">
            <div className="w-2 h-2 bg-emerald-500 rounded-full" />
            <span>Anonymous_456</span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b border-zinc-800 flex justify-between items-center">
          <div>
            <h2 className="font-bold">Anonymous Chat</h2>
            <p className="text-sm text-muted-foreground">Messages self-destruct after 1 hour</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="icon" className="rounded-full" onClick={startVideoCall}>
              <Video className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full" onClick={() => setShowSettings(true)}>
              <SettingsIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "anonymous" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[70%] rounded-lg p-3 ${message.sender === "anonymous" ? "bg-emerald-500" : "bg-zinc-800"}`}>
                  <p>{message.text}</p>
                  <div className="text-xs text-zinc-300 mt-1 flex justify-between">
                    <span>{new Intl.DateTimeFormat("en-US", { hour: "2-digit", minute: "2-digit" }).format(new Date(message.timestamp))}</span>
                    <Button variant="ghost" size="icon" className="h-6 w-6 ml-2" onClick={() => handleDeleteMessage(message.id)}>
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        <form onSubmit={handleSend} className="p-4 border-t border-zinc-800">
          <div className="flex space-x-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="bg-zinc-900 border-zinc-800"
            />
            <Button type="submit" size="icon" className="bg-emerald-500 hover:bg-emerald-600">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
