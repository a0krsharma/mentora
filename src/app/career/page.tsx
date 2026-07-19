"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Briefcase, Users, GraduationCap, QrCode } from "lucide-react";

const jobs = [
  {
    id: "sales-intern",
    title: "Sales Intern",
    icon: Briefcase,
    description: "Join our sales team and help connect students with the best mentors. Great opportunity to learn sales and marketing.",
    requirements: [
      "Excellent communication skills",
      "Currently pursuing or recently graduated",
      "Passion for education",
      "Basic computer skills"
    ],
    type: "Internship",
    location: "Remote"
  },
  {
    id: "manager",
    title: "Manager",
    icon: Users,
    description: "Lead and manage our team of mentors and coordinators. Drive growth and ensure quality education delivery.",
    requirements: [
      "3+ years of management experience",
      "Strong leadership skills",
      "Background in education preferred",
      "Excellent problem-solving abilities"
    ],
    type: "Full-time",
    location: "Remote/Hybrid"
  },
  {
    id: "teacher",
    title: "Teacher",
    icon: GraduationCap,
    description: "Teach and mentor students from Class 2-10. Share your knowledge and help students excel academically.",
    requirements: [
      "Graduate from IIT/NIT/IIM/AIIMS or top universities",
      "Strong subject knowledge",
      "Teaching experience preferred",
      "Passion for education"
    ],
    type: "Part-time/Full-time",
    location: "Remote"
  }
];

export default function CareerPage() {
  const [selectedJob, setSelectedJob] = useState(jobs[0].id);
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const selectedJobData = jobs.find(j => j.id === selectedJob)!;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    try {
      const response = await fetch("/api/career", {
        method: "POST",
        body: formData,
      });
      
      if (response.ok) {
        setSubmitted(true);
      } else {
        alert("Failed to submit application. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("Failed to submit application. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 px-4 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <div className="glass rounded-3xl p-12">
            <div className="mb-6 flex justify-center">
              <div className="rounded-full bg-green-500/20 p-4">
                <svg className="h-16 w-16 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <h1 className="mb-4 text-4xl font-bold text-white">Application Submitted!</h1>
            <p className="mb-8 text-xl text-slate-300">
              Thank you for your interest in joining Mentora. We&apos;ll review your application and get back to you soon.
            </p>
            <Button onClick={() => setSubmitted(false)} size="lg">
              Submit Another Application
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 px-4 py-16">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-5xl font-bold text-white">Join Our Team</h1>
          <p className="text-xl text-slate-300">
            Build the future of education with India&apos;s brightest minds
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Job Listings */}
          <div className="lg:col-span-2">
            <h2 className="mb-6 text-2xl font-semibold text-white">Open Positions</h2>
            <div className="space-y-4">
              {jobs.map((job) => {
                const Icon = job.icon;
                return (
                  <button
                    key={job.id}
                    onClick={() => setSelectedJob(job.id)}
                    className={`glass w-full rounded-2xl p-6 text-left transition-all ${
                      selectedJob === job.id 
                        ? "border-2 border-indigo-500 bg-indigo-500/10" 
                        : "border border-white/10 hover:border-indigo-500/50"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="rounded-xl bg-indigo-500/20 p-3">
                        <Icon className="h-6 w-6 text-indigo-400" />
                      </div>
                      <div className="flex-1">
                        <div className="mb-2 flex items-center gap-3">
                          <h3 className="text-xl font-semibold text-white">{job.title}</h3>
                          <span className="rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-medium text-indigo-300">
                            {job.type}
                          </span>
                        </div>
                        <p className="mb-3 text-slate-300">{job.description.replace(/'/g, "&apos;")}</p>
                        <div className="flex items-center gap-4 text-sm text-slate-400">
                          <span>📍 {job.location}</span>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Job Details */}
            <div className="mt-8 glass rounded-2xl p-6">
              <h3 className="mb-4 text-2xl font-semibold text-white">
                {selectedJobData.title} - Requirements
              </h3>
              <ul className="space-y-3">
                {selectedJobData.requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-300">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-indigo-400" />
                    {req}
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <Button onClick={() => setShowForm(true)} size="lg" className="w-full">
                  Apply for {selectedJobData.title}
                </Button>
              </div>
            </div>
          </div>

          {/* QR Code & Info */}
          <div className="space-y-6">
            <div className="glass rounded-2xl p-6">
              <h3 className="mb-4 text-xl font-semibold text-white">Quick Apply</h3>
              <p className="mb-4 text-slate-300">
                Scan the QR code to apply directly from your phone
              </p>
              <div className="flex justify-center">
                <div className="rounded-xl bg-white p-4">
                  <QrCode className="h-48 w-48 text-slate-900" />
                </div>
              </div>
              <p className="mt-4 text-center text-sm text-slate-400">
                Scan to open career page
              </p>
            </div>

            <div className="glass rounded-2xl p-6">
              <h3 className="mb-4 text-xl font-semibold text-white">Why Mentora?</h3>
              <ul className="space-y-3 text-slate-300">
                <li className="flex items-start gap-3">
                  <span className="text-indigo-400">✓</span>
                  Work with India&apos;s top educators
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-400">✓</span>
                  Flexible remote work
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-400">✓</span>
                  Competitive compensation
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-400">✓</span>
                  Make a real impact
                </li>
              </ul>
            </div>

            <div className="glass rounded-2xl p-6">
              <h3 className="mb-4 text-xl font-semibold text-white">Contact Us</h3>
              <p className="mb-2 text-slate-300">
                Have questions? Reach out to us:
              </p>
              <p className="text-indigo-400">contact@mentoraonline.guru</p>
              <p className="text-slate-300">+91 97099 20220</p>
            </div>
          </div>
        </div>

        {/* Application Form Modal */}
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
            <div className="glass max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl p-8">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Apply for {selectedJobData.title}</h2>
                <button
                  onClick={() => setShowForm(false)}
                  className="rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">Full Name</label>
                  <Input name="name" required placeholder="Your full name" />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">Email</label>
                  <Input name="email" required type="email" placeholder="your@email.com" />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">Phone</label>
                  <div className="flex">
                    <span className="flex items-center rounded-l-lg border border-r-0 border-white/20 bg-white/10 px-3 text-sm font-medium text-white">
                      +91
                    </span>
                    <Input 
                      name="phone" 
                      required 
                      placeholder="98765 43210" 
                      type="tel" 
                      pattern="\d{10}" 
                      title="Enter 10 digits" 
                      maxLength={10}
                      className="rounded-l-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">Position Applied For</label>
                  <Select name="position" required defaultValue={selectedJob}>
                    {jobs.map((job) => (
                      <option key={job.id} value={job.id} className="bg-gray-900">
                        {job.title}
                      </option>
                    ))}
                  </Select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">Experience (Years)</label>
                  <Input name="experience" required type="number" min="0" placeholder="0" />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">Highest Qualification</label>
                  <Select name="education" required defaultValue="">
                    <option value="" className="bg-gray-900" disabled>
                      Select your qualification
                    </option>
                    <option value="10th" className="bg-gray-900">10th</option>
                    <option value="12th" className="bg-gray-900">12th</option>
                    <option value="Diploma" className="bg-gray-900">Diploma</option>
                    <option value="Graduate" className="bg-gray-900">Graduate (Any Stream)</option>
                    <option value="B.Tech" className="bg-gray-900">B.Tech / B.E.</option>
                    <option value="B.Sc" className="bg-gray-900">B.Sc</option>
                    <option value="B.Com" className="bg-gray-900">B.Com</option>
                    <option value="B.A" className="bg-gray-900">B.A</option>
                    <option value="BCA" className="bg-gray-900">BCA</option>
                    <option value="BBA" className="bg-gray-900">BBA</option>
                    <option value="M.Tech" className="bg-gray-900">M.Tech / M.E.</option>
                    <option value="M.Sc" className="bg-gray-900">M.Sc</option>
                    <option value="M.Com" className="bg-gray-900">M.Com</option>
                    <option value="M.A" className="bg-gray-900">M.A</option>
                    <option value="MCA" className="bg-gray-900">MCA</option>
                    <option value="MBA" className="bg-gray-900">MBA</option>
                    <option value="PhD" className="bg-gray-900">PhD</option>
                    <option value="Other" className="bg-gray-900">Other</option>
                  </Select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">Resume Link (Google Drive/LinkedIn)</label>
                  <Input name="resume" required placeholder="https://drive.google.com/..." />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">Why do you want to join Mentora?</label>
                  <textarea
                    name="coverLetter"
                    required
                    rows={4}
                    className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none"
                    placeholder="Tell us about yourself and why you're interested..."
                  />
                </div>

                <div className="flex gap-4">
                  <Button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="flex-1 bg-white/10 hover:bg-white/20"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="flex-1" disabled={loading}>
                    {loading ? "Submitting..." : "Submit Application"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
