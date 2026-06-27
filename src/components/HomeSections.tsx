import Link from "next/link";
import { ArrowRight, Sparkles, Users, Video, Calendar } from "lucide-react";
import { MentorCard } from "@/components/MentorCard";
import { mentors, grades } from "@/lib/mentors";

export function Hero() {
  return (
    <section className="hero-glow grid-bg relative overflow-hidden pt-28 pb-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-indigo-500/20 blur-3xl animate-float" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-sm text-indigo-300">
            <Sparkles className="h-4 w-4" />
            IIT · NIT · Top college mentors
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Learn 1:1 from{" "}
            <span className="gradient-text">India&apos;s brightest minds</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
            Mentora connects Class 2–10 students with verified mentors from IIT, NIT,
            and prestigious universities. Book a free demo and start learning smarter.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/book"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 px-8 py-3.5 text-base font-semibold text-white shadow-xl shadow-indigo-500/30 transition hover:opacity-90"
            >
              Book your class now
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/mentors"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-3.5 text-base font-medium text-white transition hover:bg-white/10"
            >
              Browse mentors
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
            {grades.map((g) => (
              <span
                key={g}
                className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-300"
              >
                Class {g}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-3">
          {[
            { icon: Users, label: "8+ verified mentors", sub: "IIT & NIT scholars" },
            { icon: Video, label: "Live 1:1 demos", sub: "Free 30-min session" },
            { icon: Calendar, label: "Flexible slots", sub: "Book in seconds" },
          ].map(({ icon: Icon, label, sub }) => (
            <div key={label} className="glass rounded-2xl p-5 text-center">
              <Icon className="mx-auto h-8 w-8 text-indigo-400" />
              <p className="mt-3 font-semibold">{label}</p>
              <p className="text-sm text-slate-400">{sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FeaturedMentors() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold">Meet your mentors</h2>
            <p className="mt-2 text-slate-400">
              Handpicked educators from India&apos;s top institutions
            </p>
          </div>
          <Link href="/mentors" className="text-sm text-indigo-400 hover:text-indigo-300">
            View all →
          </Link>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {mentors.slice(0, 4).map((m) => (
            <MentorCard key={m.id} mentor={m} compact />
          ))}
        </div>
      </div>
    </section>
  );
}

export function Features() {
  const features = [
    {
      title: "Verified IIT & NIT mentors",
      desc: "Every mentor is background-checked with college credentials and teaching experience.",
    },
    {
      title: "Personalized 1:1 learning",
      desc: "Custom pace, doubt-solving, and homework help tailored to your child's grade and board.",
    },
    {
      title: "Your class",
      desc: "Try before you commit. Book a 1-hour session with any mentor — no payment required.",
    },
    {
      title: "Parent-first safety",
      desc: "Parents manage bookings and receive session links. Full transparency on every class.",
    },
  ];

  return (
    <section id="features" className="border-y border-white/5 bg-white/[0.02] py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-center text-3xl font-bold">Why Mentora?</h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-slate-400">
          Not tuition centers — personal mentors who build confidence and curiosity.
        </p>
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {features.map((f) => (
            <div key={f.title} className="glass rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-indigo-300">{f.title}</h3>
              <p className="mt-2 text-slate-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HowItWorks() {
  const steps = [
    { step: "01", title: "Book your class now", desc: "Pick a mentor, choose a slot, and tell us about your child." },
    { step: "02", title: "Join live class", desc: "Get a Jitsi meeting link via email. Join from any device." },
    { step: "03", title: "Continue learning", desc: "Love your mentor? Upgrade to a weekly 1:1 plan." },
  ];

  return (
    <section id="how-it-works" className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-center text-3xl font-bold">How it works</h2>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.step} className="relative glass rounded-2xl p-6">
              <span className="text-4xl font-bold text-indigo-500/30">{s.step}</span>
              <h3 className="mt-4 text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-slate-400">{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link
            href="/book"
            className="inline-flex rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 px-8 py-3 font-semibold text-white shadow-lg shadow-indigo-500/25"
          >
            Book your class now
          </Link>
        </div>
      </div>
    </section>
  );
}

export function CTA() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600/30 to-cyan-600/20 p-10 text-center ring-1 ring-white/10 sm:p-16">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(99,102,241,0.3),transparent)]" />
          <div className="relative">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Ready to unlock your child&apos;s potential?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-slate-300">
              Join hundreds of families learning with Mentora. First demo is always free.
            </p>
            <Link
              href="/book"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 font-semibold text-indigo-700 transition hover:bg-slate-100"
            >
              Book your class now
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
