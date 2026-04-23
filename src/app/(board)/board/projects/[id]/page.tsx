import { createClient } from "@/lib/supabase/server";
import { getUserData } from "@/lib/supabase/get-user-data";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  ArrowLeft,
  MessageSquare,
  CheckSquare,
  FileText,
  Flame,
  Plus,
  Clock,
} from "lucide-react";
import { format } from "date-fns";

type Props = { params: Promise<{ id: string }> };

export default async function ProjectDetailPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const userData = await getUserData();

  const { data: project } = await supabase
    .from("board_projects")
    .select("*")
    .eq("id", id)
    .single();

  if (!project) notFound();

  // Fetch project data in parallel
  const [messagesRes, todosRes] = await Promise.all([
    supabase
      .from("board_messages")
      .select("id, title, body, created_at, profiles(first_name, last_name)")
      .eq("project_id", id)
      .order("created_at", { ascending: false })
      .limit(5),
    supabase
      .from("board_todos")
      .select("id, title, completed, due_date, assignee:profiles(first_name, last_name)")
      .eq("project_id", id)
      .order("created_at", { ascending: false })
      .limit(10),
  ]);

  const messages = messagesRes.data || [];
  const todos = todosRes.data || [];
  const completedTodos = todos.filter((t: any) => t.completed).length;

  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/board/projects"
          className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-gold"
        >
          <ArrowLeft className="h-3 w-3" />
          All Projects
        </Link>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-light tracking-tight sm:text-3xl">
              {project.name}
            </h1>
            {project.description && (
              <p className="mt-1 text-muted-foreground">{project.description}</p>
            )}
          </div>
          <Badge
            variant="secondary"
            className={
              project.status === "active"
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-700"
            }
          >
            {project.status}
          </Badge>
        </div>
      </div>

      {/* Tool Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Message Board */}
        <Card className="transition-shadow hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-gold" />
              <CardTitle className="text-base">Message Board</CardTitle>
            </div>
            <Button size="sm" variant="ghost" className="text-gold">
              <Plus className="mr-1 h-3 w-3" />
              New
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {messages.length > 0 ? (
              messages.map((msg: any) => {
                const author = msg.profiles;
                const name = author
                  ? [author.first_name, author.last_name]
                      .filter(Boolean)
                      .join(" ")
                  : "Unknown";
                return (
                  <div
                    key={msg.id}
                    className="rounded-md border border-border p-3 transition-colors hover:bg-secondary/50"
                  >
                    <h4 className="text-sm font-medium leading-tight">
                      {msg.title}
                    </h4>
                    <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{name}</span>
                      <span>&middot;</span>
                      <span>{format(new Date(msg.created_at), "MMM d")}</span>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="py-4 text-center text-xs text-muted-foreground">
                No messages yet — start a conversation
              </p>
            )}
          </CardContent>
        </Card>

        {/* To-Do Lists */}
        <Card className="transition-shadow hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div className="flex items-center gap-2">
              <CheckSquare className="h-5 w-5 text-gold" />
              <CardTitle className="text-base">To-Dos</CardTitle>
            </div>
            <Button size="sm" variant="ghost" className="text-gold">
              <Plus className="mr-1 h-3 w-3" />
              New
            </Button>
          </CardHeader>
          <CardContent className="space-y-2">
            {todos.length > 0 ? (
              <>
                <div className="mb-3 flex items-center justify-between text-xs text-muted-foreground">
                  <span>
                    {completedTodos}/{todos.length} completed
                  </span>
                  <div className="h-1.5 flex-1 mx-3 rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-gold"
                      style={{
                        width: `${todos.length > 0 ? (completedTodos / todos.length) * 100 : 0}%`,
                      }}
                    />
                  </div>
                </div>
                {todos.map((todo: any) => (
                  <div
                    key={todo.id}
                    className="flex items-center gap-3 rounded-md border border-border p-2"
                  >
                    <div
                      className={`flex h-5 w-5 items-center justify-center rounded border ${
                        todo.completed
                          ? "border-gold bg-gold text-white"
                          : "border-muted-foreground/30"
                      }`}
                    >
                      {todo.completed && (
                        <CheckSquare className="h-3 w-3" />
                      )}
                    </div>
                    <span
                      className={`flex-1 text-sm ${
                        todo.completed
                          ? "text-muted-foreground line-through"
                          : ""
                      }`}
                    >
                      {todo.title}
                    </span>
                    {todo.due_date && (
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {format(new Date(todo.due_date), "MMM d")}
                      </span>
                    )}
                  </div>
                ))}
              </>
            ) : (
              <p className="py-4 text-center text-xs text-muted-foreground">
                No to-dos yet — add your first task
              </p>
            )}
          </CardContent>
        </Card>

        {/* Campfire Chat */}
        <Card className="transition-shadow hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div className="flex items-center gap-2">
              <Flame className="h-5 w-5 text-orange-500" />
              <CardTitle className="text-base">Campfire</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Flame className="h-10 w-10 text-orange-300" />
              <p className="mt-3 text-sm font-medium">Group Chat</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Real-time chat with your board members
              </p>
              <Link href={`/board/projects/${id}/campfire`}>
                <Button
                  size="sm"
                  className="mt-4 bg-gold text-white hover:bg-gold-dark"
                >
                  Open Campfire
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Files & Docs */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-gold" />
            <CardTitle className="text-base">Files & Docs</CardTitle>
          </div>
          <Button size="sm" variant="outline" className="gap-1">
            <Plus className="h-3 w-3" />
            Upload
          </Button>
        </CardHeader>
        <CardContent>
          <p className="py-6 text-center text-sm text-muted-foreground">
            No files uploaded yet. Share documents, spreadsheets, and images
            with your board.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
