import { PortalSidebar } from "@/components/portal/sidebar";

export default function BoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-secondary/30">
      <PortalSidebar />
      <div className="flex-1">
        <main className="mx-auto max-w-6xl px-3 py-4 sm:px-6 sm:py-8 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}
