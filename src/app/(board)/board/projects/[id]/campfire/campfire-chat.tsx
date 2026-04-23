"use client";

import { useState, useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Flame } from "lucide-react";
import { format } from "date-fns";

type Message = {
  id: string;
  body: string;
  created_at: string;
  author_id: string;
  profiles: {
    first_name: string | null;
    last_name: string | null;
    avatar_url: string | null;
  } | null;
};

export function CampfireChat({
  projectId,
  userId,
  userName,
  initialMessages,
}: {
  projectId: string;
  userId: string;
  userName: string;
  initialMessages: Message[];
}) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Subscribe to Realtime
  useEffect(() => {
    const supabase = createClient();

    const channel = supabase
      .channel(`campfire:${projectId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "campfire_messages",
          filter: `project_id=eq.${projectId}`,
        },
        async (payload) => {
          const newMsg = payload.new as any;

          // Don't duplicate our own optimistic messages
          if (newMsg.author_id === userId) {
            // Update the optimistic message with the real one
            setMessages((prev) => {
              const hasOptimistic = prev.some(
                (m) => m.id.startsWith("optimistic-") && m.body === newMsg.body
              );
              if (hasOptimistic) {
                return prev.map((m) =>
                  m.id.startsWith("optimistic-") && m.body === newMsg.body
                    ? { ...newMsg, profiles: m.profiles }
                    : m
                );
              }
              return prev;
            });
            return;
          }

          // Fetch the author's profile for other users' messages
          const { data: profile } = await supabase
            .from("profiles")
            .select("first_name, last_name, avatar_url")
            .eq("id", newMsg.author_id)
            .single();

          setMessages((prev) => [
            ...prev,
            { ...newMsg, profiles: profile },
          ]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [projectId, userId]);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    const body = newMessage.trim();
    if (!body || sending) return;

    setSending(true);
    setNewMessage("");

    // Optimistic: add message immediately
    const optimisticMsg: Message = {
      id: `optimistic-${Date.now()}`,
      body,
      created_at: new Date().toISOString(),
      author_id: userId,
      profiles: {
        first_name: userName.split(" ")[0] || null,
        last_name: userName.split(" ").slice(1).join(" ") || null,
        avatar_url: null,
      },
    };
    setMessages((prev) => [...prev, optimisticMsg]);

    // Send to Supabase
    const supabase = createClient();
    await supabase.from("campfire_messages").insert({
      project_id: projectId,
      author_id: userId,
      body,
    });

    setSending(false);
    inputRef.current?.focus();
  }

  function getInitials(msg: Message) {
    const p = msg.profiles;
    return (
      ((p?.first_name?.[0] || "") + (p?.last_name?.[0] || "")).toUpperCase() ||
      "?"
    );
  }

  function getAuthorName(msg: Message) {
    const p = msg.profiles;
    return [p?.first_name, p?.last_name].filter(Boolean).join(" ") || "Member";
  }

  return (
    <>
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <Flame className="h-12 w-12 text-orange-300" />
            <h2 className="mt-4 text-lg font-light">Welcome to the Campfire</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Start a conversation with your board members.
              <br />
              Messages appear in real time.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg, i) => {
              const isMe = msg.author_id === userId;
              const showAvatar =
                i === 0 || messages[i - 1].author_id !== msg.author_id;
              const name = getAuthorName(msg);

              return (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${isMe ? "flex-row-reverse" : ""}`}
                >
                  {showAvatar ? (
                    <Avatar className="h-8 w-8 flex-shrink-0">
                      <AvatarImage src={msg.profiles?.avatar_url || ""} />
                      <AvatarFallback className="bg-gold/10 text-xs text-gold">
                        {getInitials(msg)}
                      </AvatarFallback>
                    </Avatar>
                  ) : (
                    <div className="w-8 flex-shrink-0" />
                  )}
                  <div
                    className={`max-w-[75%] ${isMe ? "text-right" : ""}`}
                  >
                    {showAvatar && (
                      <p
                        className={`mb-1 text-xs font-medium ${
                          isMe
                            ? "text-gold"
                            : "text-muted-foreground"
                        }`}
                      >
                        {isMe ? "You" : name}
                      </p>
                    )}
                    <div
                      className={`inline-block rounded-2xl px-4 py-2 text-sm ${
                        isMe
                          ? "bg-gold text-white"
                          : "bg-secondary text-foreground"
                      }`}
                    >
                      {msg.body}
                    </div>
                    <p className="mt-0.5 text-[10px] text-muted-foreground/50">
                      {format(new Date(msg.created_at), "h:mm a")}
                    </p>
                  </div>
                </div>
              );
            })}
            <div ref={bottomRef} />
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-border px-4 py-3">
        <form onSubmit={handleSend} className="flex gap-2">
          <Input
            ref={inputRef}
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1"
            autoFocus
          />
          <Button
            type="submit"
            disabled={!newMessage.trim() || sending}
            className="bg-gold text-white hover:bg-gold-dark"
            size="icon"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </>
  );
}
