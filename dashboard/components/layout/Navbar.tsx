import Link from "next/link";

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-surface-container-lowest/90 shadow-[0_1px_8px_rgba(0,0,0,0.04)] backdrop-blur-xl print:hidden">
      <div className="mx-auto flex h-16 max-w-[960px] items-center justify-between px-gutter">
        <Link
          href="/"
          className="flex items-center gap-space-sm rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface-container-lowest"
        >
          <svg
            aria-hidden="true"
            className="h-8 w-8"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="32" height="32" rx="10" fill="#4338ca" />
            <path
              d="M16 6.5c-4.14 0-7.5 3.36-7.5 7.5 0 5.63 7.5 11.5 7.5 11.5s7.5-5.87 7.5-11.5c0-4.14-3.36-7.5-7.5-7.5Z"
              fill="#ffffff"
            />
            <circle cx="16" cy="14" r="2.75" fill="#4338ca" />
          </svg>
          <span className="text-headline-sm font-bold tracking-tight text-on-surface">
            ChurnGuard
          </span>
        </Link>

        <nav>
          <Link
            aria-current="page"
            className="rounded-full bg-surface-container px-3 py-1.5 text-label-md font-semibold text-on-surface transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface-container-lowest"
            href="/"
          >
            Predictor
          </Link>
        </nav>
      </div>
    </header>
  );
}
