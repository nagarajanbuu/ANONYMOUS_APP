import Link from "next/link"
import { Shield, MessageSquare, Video } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">SecureChat</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your privacy matters. Experience truly anonymous communication with end-to-end encryption, self-destructing
            messages, and private video calls.
          </p>
        </header>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <Shield className="w-12 h-12 mb-4 text-emerald-500" />
              <CardTitle>Complete Anonymity</CardTitle>
              <CardDescription>No personal data required. Just choose a username and start chatting.</CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <MessageSquare className="w-12 h-12 mb-4 text-emerald-500" />
              <CardTitle>Self-Destructing Messages</CardTitle>
              <CardDescription>
                Messages automatically disappear after they're read for maximum privacy.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <Video className="w-12 h-12 mb-4 text-emerald-500" />
              <CardTitle>Private Video Calls</CardTitle>
              <CardDescription>Peer-to-peer encrypted video calls with no data storage.</CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="text-center">
          <Button asChild size="lg" className="bg-emerald-500 hover:bg-emerald-600">
            <Link href="/login">Start Anonymous Chat</Link>
          </Button>
        </div>

        <div className="mt-24">
          <h2 className="text-2xl font-bold text-center mb-8">How It Works</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle>1. Anonymous Login</CardTitle>
              </CardHeader>
              <CardContent>Choose any username. No email or personal information required.</CardContent>
            </Card>

            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle>2. Start a Chat</CardTitle>
              </CardHeader>
              <CardContent>Begin an encrypted conversation with another anonymous user.</CardContent>
            </Card>

            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle>3. Video Call</CardTitle>
              </CardHeader>
              <CardContent>Start a private video call with peer-to-peer encryption.</CardContent>
            </Card>

            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle>4. Stay Private</CardTitle>
              </CardHeader>
              <CardContent>All messages self-destruct. No logs. No traces.</CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

