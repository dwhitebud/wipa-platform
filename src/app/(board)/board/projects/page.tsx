import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, FolderOpen, MessageSquare, CheckSquare, Calendar, Users } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getUserData } from "@/lib/supabase/get-user-data";

export const metadata = {
  title: "Board Projects",
};

export default async function BoardProjectsPage() {
  const userData = await getUserData();
  const supabase = await createClient();

  const chapterId = (
    userData?.chapterMembership?.chapters as { id: string } | undefined
  )?.id;
  const chapterName = (
    userData?.chapterMembership?.chapters as { name: string } | undefined
  )?.name;

  // Fetch real projects for the user's chapter
  let projects: any[] = [];
  if (chapterId) {
    const { data } = await supabase
      .from("board_projects")
      .select("*")
      .eq("chapter_id", chapterId)
      .order("created_at", { ascending: false });
    projects = data || [];
  }

  const activeProjects = projects.filter((p) => p.status === "active");
  const archivedProjects = projects.filter((p) => p.status === "archived");

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-light tracking-tight sm:text-3xl">Board Projects</h1>
          <p className="mt-1 text-muted-foreground">
            Collaborate with your chapter board on projects and initiatives
          </p>
        </div>
        <Button className="bg-gold text-white hover:bg-gold-dark">
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>

      <div className="space-y-4">
        {activeProjects.map((project) => (
          <Link key={project.id} href={`/board/projects/${project.id}`}>
            <Card className="transition-shadow hover:shadow-md">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold/10">
                      <FolderOpen className="h-5 w-5 text-gold" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold">{project.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {project.description}
                      </p>
                      <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MessageSquare className="h-3 w-3" />
                          {project.messages} messages
                        </span>
                        <span className="flex items-center gap-1">
                          <CheckSquare className="h-3 w-3" />
                          {project.todosComplete}/{project.todos} to-dos
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {project.members} members
                        </span>
                      </div>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {project.scope}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {archivedProjects.length > 0 && (
        <>
          <h2 className="text-lg font-semibold text-muted-foreground">Archived</h2>
          <div className="space-y-4 opacity-60">
            {archivedProjects.map((project) => (
              <Link key={project.id} href={`/board/projects/${project.id}`}>
                <Card className="transition-shadow hover:shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                        <FolderOpen className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <h3 className="text-base font-semibold">{project.title}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {project.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
