import { mentors } from "@/lib/mentors";
import { MentorCard } from "@/components/MentorCard";

export const metadata = {
  title: "Mentors — Mentora",
  description: "Browse verified IIT and NIT mentors for Class 2–10",
};

export default function MentorsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-28 sm:px-6">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-bold">Our mentors</h1>
        <p className="mt-3 text-lg text-slate-400">
          Verified educators from IIT, NIT, and India&apos;s top universities. Each mentor
          is selected for teaching skill, patience, and results.
        </p>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2">
        {mentors.map((mentor) => (
          <MentorCard key={mentor.id} mentor={mentor} />
        ))}
      </div>
    </div>
  );
}
