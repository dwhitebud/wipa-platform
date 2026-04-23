import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Blog & News",
  description: "Stay up to date with WIPA news, events, and industry insights.",
};

const mockPosts = [
  {
    slug: "january-2026-newsletter",
    title: "January 2026 Newsletter: A New Chapter, A Familiar Magic",
    excerpt:
      "As we step into 2026, WIPA continues to grow with new chapters, fresh educational content, and exciting networking events planned across all regions.",
    date: "Jan 15, 2026",
    category: "Newsletter",
  },
  {
    slug: "december-2025-newsletter",
    title: "December 2025 Newsletter: A WIPA Year to Remember",
    excerpt:
      "Reflecting on an incredible year of growth, community, and education. Thank you to every member who made 2025 special.",
    date: "Dec 15, 2025",
    category: "Newsletter",
  },
  {
    slug: "wipa-honors-dr-king",
    title: "WIPA Honors Dr. King's Legacy of Inclusion",
    excerpt:
      "WIPA reaffirms its commitment to diversity, equity, inclusion, and belonging in the wedding industry.",
    date: "Jan 20, 2026",
    category: "DEI",
  },
  {
    slug: "eventex-awards-2025",
    title: "Eventex Awards: 50 Most Influential Wedding Professionals",
    excerpt:
      "Several WIPA members have been recognized among the 50 most influential wedding professionals worldwide.",
    date: "Nov 28, 2025",
    category: "Industry News",
  },
  {
    slug: "spring-design-trends-2026",
    title: "Spring 2026 Wedding Design Trends",
    excerpt:
      "From bold florals to sustainable luxury, explore the top design trends that will define weddings this spring.",
    date: "Feb 10, 2026",
    category: "Trends",
  },
  {
    slug: "new-chapters-announcement",
    title: "WIPA Welcomes Two New Chapters",
    excerpt:
      "We're thrilled to announce the formation of new WIPA chapters, expanding our reach to more wedding professionals.",
    date: "Feb 1, 2026",
    category: "Chapters",
  },
];

const categoryColors: Record<string, string> = {
  Newsletter: "bg-blue-100 text-blue-700",
  DEI: "bg-purple-100 text-purple-700",
  "Industry News": "bg-amber-100 text-amber-700",
  Trends: "bg-pink-100 text-pink-700",
  Chapters: "bg-green-100 text-green-700",
};

export default function BlogPage() {
  return (
    <>
      <section className="relative border-b border-border bg-dark py-20">
        <img
          src="https://images.unsplash.com/photo-1455587734955-081b22074882?w=1920&q=80"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-20"
        />
        <div className="relative mx-auto max-w-3xl px-4 text-center">
          <h1 className="text-4xl font-light text-white sm:text-5xl">
            Blog &amp; News
          </h1>
          <div className="mx-auto mt-4 h-px w-24 bg-gold" />
          <p className="mt-6 text-lg text-white/60">
            Industry insights, chapter updates, and WIPA news
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {/* Featured Post */}
          <Card className="overflow-hidden border-0 shadow-md">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                <div className="flex items-center justify-center bg-dark p-12 md:w-1/3">
                  <div className="text-center">
                    <p className="font-display text-sm uppercase tracking-wider text-gold">
                      Latest
                    </p>
                    <p className="mt-2 text-3xl font-light text-white">
                      {mockPosts[0].date.split(",")[0].split(" ")[0]}
                    </p>
                    <p className="text-lg text-white/60">
                      {mockPosts[0].date.split(",")[0].split(" ")[1]}, {mockPosts[0].date.split(", ")[1]}
                    </p>
                  </div>
                </div>
                <div className="flex-1 p-8">
                  <Badge
                    className={
                      categoryColors[mockPosts[0].category] ||
                      "bg-gray-100 text-gray-700"
                    }
                    variant="secondary"
                  >
                    {mockPosts[0].category}
                  </Badge>
                  <h2 className="mt-3 text-2xl font-semibold">
                    {mockPosts[0].title}
                  </h2>
                  <p className="mt-3 text-muted-foreground">
                    {mockPosts[0].excerpt}
                  </p>
                  <button className="mt-4 flex items-center gap-1 text-sm font-medium text-gold hover:text-gold-dark">
                    Read More
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Post Grid */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {mockPosts.slice(1).map((post) => (
              <Card
                key={post.slug}
                className="group cursor-pointer transition-shadow hover:shadow-md"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <Badge
                      className={
                        categoryColors[post.category] ||
                        "bg-gray-100 text-gray-700"
                      }
                      variant="secondary"
                    >
                      {post.category}
                    </Badge>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {post.date}
                    </span>
                  </div>
                  <h3 className="mt-4 text-base font-semibold leading-snug transition-colors group-hover:text-gold">
                    {post.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
                    {post.excerpt}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Newsletter CTA */}
          <div className="mt-16 rounded-lg bg-secondary p-8 text-center">
            <h2 className="text-xl font-light">Subscribe to WIPA News</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              You don&apos;t have to be a WIPA member to enjoy news about our
              organization. Sign up and receive regional specific news, events
              and educational opportunities.
            </p>
            <div className="mx-auto mt-6 flex max-w-md gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-md border border-border bg-background px-4 py-2 text-sm"
              />
              <button className="rounded-md bg-gold px-6 py-2 text-sm font-medium text-white hover:bg-gold-dark">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
