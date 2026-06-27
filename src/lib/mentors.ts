export type Mentor = {
  id: string;
  name: string;
  college: string;
  collegeType: "IIT" | "NIT" | "Top University";
  branch: string;
  subjects: string[];
  grades: number[];
  bio: string;
  rating: number;
  sessions: number;
  avatar: string;
};

export const mentors: Mentor[] = [
  {
    id: "arjun-mehta",
    name: "Arjun Mehta",
    college: "IIT Bombay",
    collegeType: "IIT",
    branch: "Computer Science",
    subjects: ["Mathematics", "Physics"],
    grades: [6, 7, 8, 9, 10],
    bio: "JEE Advanced rank holder passionate about making math intuitive for middle schoolers. 3+ years of 1:1 mentoring experience.",
    rating: 4.9,
    sessions: 420,
    avatar: "https://ui-avatars.com/api/?name=Arjun+Mehta&background=6366f1&color=fff&size=256",
  },
  {
    id: "priya-sharma",
    name: "Priya Sharma",
    college: "IIT Delhi",
    collegeType: "IIT",
    branch: "Electrical Engineering",
    subjects: ["Mathematics", "Science"],
    grades: [2, 3, 4, 5, 6],
    bio: "Specializes in building strong foundations for young learners. Patient, playful teaching style loved by parents.",
    rating: 4.95,
    sessions: 380,
    avatar: "https://ui-avatars.com/api/?name=Priya+Sharma&background=8b5cf6&color=fff&size=256",
  },
  {
    id: "rahul-verma",
    name: "Rahul Verma",
    college: "NIT Trichy",
    collegeType: "NIT",
    branch: "Mechanical Engineering",
    subjects: ["Mathematics", "Science", "English"],
    grades: [5, 6, 7, 8],
    bio: "NTSE scholar who helps students connect concepts to real-world applications. Expert in CBSE & ICSE boards.",
    rating: 4.85,
    sessions: 290,
    avatar: "https://ui-avatars.com/api/?name=Rahul+Verma&background=06b6d4&color=fff&size=256",
  },
  {
    id: "ananya-iyer",
    name: "Ananya Iyer",
    college: "IIT Madras",
    collegeType: "IIT",
    branch: "Chemical Engineering",
    subjects: ["Science", "Mathematics"],
    grades: [7, 8, 9, 10],
    bio: "Olympiad mentor focused on conceptual clarity and exam strategy. Helps students gain confidence before board exams.",
    rating: 4.92,
    sessions: 510,
    avatar: "https://ui-avatars.com/api/?name=Ananya+Iyer&background=ec4899&color=fff&size=256",
  },
  {
    id: "vikram-singh",
    name: "Vikram Singh",
    college: "NIT Warangal",
    collegeType: "NIT",
    branch: "Civil Engineering",
    subjects: ["Mathematics", "English"],
    grades: [4, 5, 6, 7, 8],
    bio: "Breaks down complex topics into simple steps. Strong track record improving grades within 8 weeks.",
    rating: 4.88,
    sessions: 340,
    avatar: "https://ui-avatars.com/api/?name=Vikram+Singh&background=10b981&color=fff&size=256",
  },
  {
    id: "meera-patel",
    name: "Meera Patel",
    college: "IIT Kanpur",
    collegeType: "IIT",
    branch: "Physics",
    subjects: ["Physics", "Mathematics"],
    grades: [8, 9, 10],
    bio: "Research-oriented mentor who inspires curiosity. Ideal for students preparing for NTSE, Olympiads, and JEE foundation.",
    rating: 4.97,
    sessions: 460,
    avatar: "https://ui-avatars.com/api/?name=Meera+Patel&background=f59e0b&color=fff&size=256",
  },
  {
    id: "karan-joshi",
    name: "Karan Joshi",
    college: "NIT Surathkal",
    collegeType: "NIT",
    branch: "Information Technology",
    subjects: ["Mathematics", "Science", "Computer Basics"],
    grades: [6, 7, 8, 9],
    bio: "Introduces logical thinking and coding basics alongside core subjects. Great for tech-curious students.",
    rating: 4.86,
    sessions: 275,
    avatar: "https://ui-avatars.com/api/?name=Karan+Joshi&background=3b82f6&color=fff&size=256",
  },
  {
    id: "sneha-reddy",
    name: "Sneha Reddy",
    college: "IIT Hyderabad",
    collegeType: "IIT",
    branch: "Biotechnology",
    subjects: ["Science", "English"],
    grades: [2, 3, 4, 5, 6, 7],
    bio: "Creates engaging science experiments and reading sessions. Perfect for building love of learning early on.",
    rating: 4.94,
    sessions: 395,
    avatar: "https://ui-avatars.com/api/?name=Sneha+Reddy&background=a855f7&color=fff&size=256",
  },
];

export const subjects = [
  "Mathematics",
  "Science",
  "Physics",
  "English",
  "Computer Basics",
] as const;

export const grades = [2, 3, 4, 5, 6, 7, 8, 9, 10] as const;

export function getMentorById(id: string): Mentor | undefined {
  return mentors.find((m) => m.id === id);
}

export function getMentorsForGrade(grade: number): Mentor[] {
  return mentors.filter((m) => m.grades.includes(grade));
}
