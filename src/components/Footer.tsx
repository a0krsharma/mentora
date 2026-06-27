import Link from "next/link";
import { GraduationCap, MapPin, Phone, Mail, Instagram, Facebook, Twitter, Linkedin, BookOpen, Users, Award, Shield } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-gray-950/50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand & Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500">
                <GraduationCap className="h-5 w-5 text-white" />
              </span>
              <span className="text-lg font-semibold">Mentora</span>
            </div>
            <p className="text-sm text-slate-400">
              1:1 mentoring from IIT & NIT scholars. Personalized learning for Class 2–10 students across India.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/mentors" className="hover:text-white transition">
                  Our Mentors
                </Link>
              </li>
              <li>
                <Link href="/book" className="hover:text-white transition">
                  Book a Class
                </Link>
              </li>
              <li>
                <Link href="/#features" className="hover:text-white transition">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="hover:text-white transition">
                  How It Works
                </Link>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="mb-4 font-semibold text-white">Why Choose Us</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <Award className="h-4 w-4 text-indigo-400" />
                Verified IIT/NIT Mentors
              </li>
              <li className="flex items-center gap-2">
                <Users className="h-4 w-4 text-indigo-400" />
                1:1 Personalized Learning
              </li>
              <li className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-indigo-400" />
                All Subjects Covered
              </li>
              <li className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-indigo-400" />
                Safe & Parent-First
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="mb-4 font-semibold text-white">Contact Us</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-indigo-400" />
                <span>
                  Patna, Bihar<br />
                  India
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-indigo-400" />
                <a href="tel:+919876543210" className="hover:text-white transition">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-indigo-400" />
                <a href="mailto:Contact.mentoraedu@gmail.com" className="hover:text-white transition">
                  Contact.mentoraedu@gmail.com
                </a>
              </li>
            </ul>

            {/* Social Media */}
            <div className="mt-4 flex gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-400 transition hover:border-indigo-500/50 hover:bg-indigo-500/10 hover:text-indigo-400"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-400 transition hover:border-indigo-500/50 hover:bg-indigo-500/10 hover:text-indigo-400"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-400 transition hover:border-indigo-500/50 hover:bg-indigo-500/10 hover:text-indigo-400"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-400 transition hover:border-indigo-500/50 hover:bg-indigo-500/10 hover:text-indigo-400"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-white/5 pt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} Mentora. All rights reserved. Learn brighter.
          </p>
          <div className="flex gap-6 text-xs text-slate-500">
            <Link href="#" className="hover:text-white transition">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white transition">
              Terms of Service
            </Link>
            <Link href="/admin" className="hover:text-white transition">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
