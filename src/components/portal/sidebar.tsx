"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  User,
  Users,
  Calendar,
  PlayCircle,
  CreditCard,
  Megaphone,
  Settings,
  LogOut,
  ChevronLeft,
  Menu,
  FolderOpen,
  BarChart3,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";

type NavLink = {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
};

const portalLinks: NavLink[] = [
  { name: "Dashboard", href: "/portal/dashboard", icon: LayoutDashboard },
  { name: "My Profile", href: "/portal/profile", icon: User },
  { name: "Directory", href: "/portal/directory", icon: Users },
  { name: "Events", href: "/portal/events", icon: Calendar },
  { name: "Video Library", href: "/portal/videos", icon: PlayCircle },
  { name: "Payments", href: "/portal/payments", icon: CreditCard },
  { name: "Announcements", href: "/portal/announcements", icon: Megaphone },
  { name: "Settings", href: "/portal/settings", icon: Settings },
];

const boardRoles = [
  "director_marketing",
  "director_programs",
  "director_membership",
  "treasurer",
  "secretary",
  "vice_president",
  "president",
];

function NavItems({
  onClick,
  isBoardMember,
  isNationalAdmin,
}: {
  onClick?: () => void;
  isBoardMember: boolean;
  isNationalAdmin: boolean;
}) {
  const pathname = usePathname();

  const adminLinks: NavLink[] = [];
  if (isBoardMember) {
    adminLinks.push(
      { name: "Board Projects", href: "/board/projects", icon: FolderOpen },
      { name: "Chapter Admin", href: "/chapter/dashboard", icon: BarChart3 },
      { name: "Manage Members", href: "/chapter/members", icon: Users },
      { name: "Manage Events", href: "/chapter/events", icon: Calendar },
      { name: "Review Documents", href: "/chapter/documents", icon: BarChart3 }
    );
  }
  if (isNationalAdmin) {
    adminLinks.push({
      name: "National Admin",
      href: "/national/dashboard",
      icon: Globe,
    });
  }

  function renderLink(link: NavLink) {
    const isActive =
      pathname === link.href || pathname.startsWith(link.href + "/");
    return (
      <Link
        key={link.href}
        href={link.href}
        onClick={onClick}
        className={cn(
          "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
          isActive
            ? "bg-accent/10 text-accent"
            : "text-muted-foreground hover:bg-secondary hover:text-foreground"
        )}
      >
        <link.icon className="h-4 w-4" />
        {link.name}
      </Link>
    );
  }

  return (
    <nav className="flex flex-col gap-1">
      {portalLinks.map(renderLink)}
      {adminLinks.length > 0 && (
        <>
          <Separator className="my-2" />
          <p className="px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">
            Admin
          </p>
          {adminLinks.map(renderLink)}
        </>
      )}
    </nav>
  );
}

export function PortalSidebar() {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isBoardMember, setIsBoardMember] = useState(false);
  const [isNationalAdmin, setIsNationalAdmin] = useState(false);

  useEffect(() => {
    async function loadRoles() {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const [{ data: membership }, { data: profile }] = await Promise.all([
        supabase
          .from("chapter_memberships")
          .select("role")
          .eq("profile_id", user.id)
          .limit(1)
          .single(),
        supabase
          .from("profiles")
          .select("national_role")
          .eq("id", user.id)
          .single(),
      ]);

      if (membership && boardRoles.includes(membership.role)) {
        setIsBoardMember(true);
      }
      if (profile?.national_role) {
        setIsNationalAdmin(true);
      }
    }
    loadRoles();
  }, []);

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <>
      {/* Mobile header */}
      <div className="sticky top-0 z-40 flex items-center justify-between border-b border-border bg-background px-4 py-3 lg:hidden">
        <Link href="/portal/dashboard" className="flex items-center gap-2">
          <img src="/wipa-logo.png" alt="WIPA" className="h-6 w-auto" />
          <span className="text-xs text-muted-foreground">Portal</span>
        </Link>
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger className="inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-secondary">
            <Menu className="h-5 w-5" />
          </SheetTrigger>
          <SheetContent side="left" className="w-[280px] p-0">
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            <div className="flex h-full flex-col">
              <div className="border-b border-border p-4">
                <img src="/wipa-logo.png" alt="WIPA" className="h-6 w-auto" />
                <span className="ml-2 text-xs text-muted-foreground">
                  Portal
                </span>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                <NavItems
                  onClick={() => setMobileOpen(false)}
                  isBoardMember={isBoardMember}
                  isNationalAdmin={isNationalAdmin}
                />
              </div>
              <div className="border-t border-border p-4">
                <button
                  onClick={handleSignOut}
                  className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen w-64 flex-shrink-0 border-r border-border bg-background lg:flex lg:flex-col">
        <div className="flex items-center gap-2 border-b border-border px-6 py-5">
          <Link href="/" className="flex items-center gap-2">
            <img src="/wipa-logo.png" alt="WIPA" className="h-7 w-auto" />
          </Link>
          <span className="rounded-full bg-gold/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-gold">
            Portal
          </span>
        </div>
        <div className="flex-1 overflow-y-auto px-3 py-4">
          <NavItems
            isBoardMember={isBoardMember}
            isNationalAdmin={isNationalAdmin}
          />
        </div>
        <div className="border-t border-border px-3 py-4">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Website
          </Link>
          <button
            onClick={handleSignOut}
            className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}
