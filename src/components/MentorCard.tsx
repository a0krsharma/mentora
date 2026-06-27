import Link from "next/link";
import Image from "next/image";
import { Star, ArrowRight } from "lucide-react";
import type { Mentor } from "@/lib/mentors";
import { cn } from "@/lib/utils";

type MentorCardProps = {
  mentor: Mentor;
  compact?: boolean;
};

export function MentorCard({ mentor, compact }: MentorCardProps) {
  const badgeColor =
    mentor.collegeType === "IIT"
      ? "from-indigo-500/20 to-indigo-500/5 text-indigo-300 border-indigo-500/30"
      : mentor.collegeType === "NIT"
        ? "from-cyan-500/20 to-cyan-500/5 text-cyan-300 border-cyan-500/30"
        : "from-violet-500/20 to-violet-500/5 text-violet-300 border-violet-500/30";

  return (
    <Link
      href={`/mentors/${mentor.id}`}
      className={cn(
        "group glass block rounded-2xl p-5 transition hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/10",
        compact && "p-4"
      )}
    >
      <div className="flex items-start gap-4">
        <Image
          src={mentor.avatar}
          alt={mentor.name}
          width={64}
          height={64}
          className="rounded-xl ring-2 ring-white/10"
        />
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-white group-hover:text-indigo-300 transition">
            {mentor.name}
          </h3>
          <span
            className={cn(
              "mt-1 inline-block rounded-full border bg-gradient-to-r px-2.5 py-0.5 text-xs font-medium",
              badgeColor
            )}
          >
            {mentor.college}
          </span>
          {!compact && (
            <p className="mt-2 line-clamp-2 text-sm text-slate-400">{mentor.bio}</p>
          )}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {mentor.subjects.slice(0, 3).map((s) => (
              <span
                key={s}
                className="rounded-md bg-white/5 px-2 py-0.5 text-xs text-slate-300"
              >
                {s}
              </span>
            ))}
          </div>
          <div className="mt-3 flex items-center justify-between text-sm">
            <span className="flex items-center gap-1 text-amber-400">
              <Star className="h-3.5 w-3.5 fill-current" />
              {mentor.rating}
            </span>
            <span className="flex items-center gap-1 text-indigo-400 opacity-0 transition group-hover:opacity-100">
              View profile <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
