import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Left Panel — Branding */}
      <div className="relative hidden w-1/2 flex-col justify-between bg-dark p-12 lg:flex">
        <img
          src="https://images.unsplash.com/photo-1507504031003-b417219a0fde?w=1920&q=80"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40" />
        <Link href="/" className="relative inline-block">
          <img
            src="/wipa-logo.png"
            alt="WIPA"
            className="h-10 w-auto brightness-0 invert"
          />
        </Link>
        <div className="relative">
          <h2 className="text-3xl font-light leading-tight text-white">
            Elevating the
            <span className="block italic text-gold">Wedding Industry</span>
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-white/60">
            Access your member portal, connect with professionals in your
            chapter, and manage your WIPA membership.
          </p>
        </div>
        <p className="relative text-xs text-white/30">
          &copy; {new Date().getFullYear()} Wedding Industry Professionals
          Association
        </p>
      </div>

      {/* Right Panel — Auth Form */}
      <div className="flex w-full flex-col items-center justify-center px-6 py-12 lg:w-1/2 lg:py-0">
        <div className="w-full max-w-sm sm:max-w-md">
          <Link href="/" className="mb-8 inline-block lg:hidden">
            <img src="/wipa-logo.png" alt="WIPA" className="h-8 w-auto" />
          </Link>
          {children}
        </div>
      </div>
    </div>
  );
}
