import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Star, BookOpen, GraduationCap, ArrowRight } from "lucide-react";
import { getMentorById, mentors } from "@/lib/mentors";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return mentors.map((m) => ({ id: m.id }));
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const mentor = getMentorById(id);
  if (!mentor) return { title: "Mentor not found" };
  return {
    title: `${mentor.name} — ${mentor.college} | Mentora`,
    description: mentor.bio,
  };
}

export default async function MentorProfilePage({ params }: Props) {
  const { id } = await params;
  const mentor = getMentorById(id);

  if (!mentor) notFound();

  const badgeColor =
    mentor.collegeType === "IIT"
      ? "text-indigo-300 border-indigo-500/30 bg-indigo-500/10"
      : "text-cyan-300 border-cyan-500/30 bg-cyan-500/10";

  return (
    <div className="mx-auto max-w-7xl px-4 py-28 sm:px-6">
      <div className="grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="glass rounded-3xl p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
              <Image
                src={mentor.avatar}
                alt={mentor.name}
                width={120}
                height={120}
                className="rounded-2xl ring-2 ring-white/10"
              />
              <div>
                <h1 className="text-3xl font-bold">{mentor.name}</h1>
                <span
                  className={`mt-2 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-medium ${badgeColor}`}
                >
                  <GraduationCap className="h-4 w-4" />
                  {mentor.college} · {mentor.branch}
                </span>
                <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-400">
                  <span className="flex items-center gap-1 text-amber-400">
                    <Star className="h-4 w-4 fill-current" />
                    {mentor.rating} rating
                  </span>
                  <span>{mentor.sessions}+ sessions</span>
                </div>
              </div>
            </div>

            <p className="mt-8 text-lg leading-relaxed text-slate-300">{mentor.bio}</p>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div>
                <h2 className="flex items-center gap-2 font-semibold text-indigo-300">
                  <BookOpen className="h-4 w-4" /> Subjects
                </h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {mentor.subjects.map((s) => (
                    <span
                      key={s}
                      className="rounded-lg bg-white/5 px-3 py-1 text-sm text-slate-300"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="font-semibold text-indigo-300">Grades taught</h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {mentor.grades.map((g) => (
                    <span
                      key={g}
                      className="rounded-lg bg-white/5 px-3 py-1 text-sm text-slate-300"
                    >
                      Class {g}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="glass sticky top-24 rounded-2xl p-6">
            <h2 className="text-xl font-semibold">Book your class now</h2>
            <p className="mt-2 text-sm text-slate-400">
              1-hour 1:1 session with {mentor.name.split(" ")[0]}. No payment required.
            </p>
            <Link
              href={`/book?mentor=${mentor.id}`}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 py-3 font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:opacity-90"
            >
              Choose a slot
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
