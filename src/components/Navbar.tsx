import Link from "next/link";
import { GraduationCap } from "lucide-react";

export function Navbar() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/5 bg-gray-950/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500">
            <GraduationCap className="h-5 w-5 text-white" />
          </span>
          <span className="text-lg">
            Men<span className="text-indigo-400">tora</span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
          <Link href="/#features" className="transition hover:text-white">
            Features
          </Link>
          <Link href="/mentors" className="transition hover:text-white">
            Mentors
          </Link>
          <Link href="/#how-it-works" className="transition hover:text-white">
            How it works
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/book"
            className="rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-indigo-500/25 transition hover:opacity-90"
          >
            Book your class now
          </Link>
        </div>
      </nav>
    </header>
  );
}
