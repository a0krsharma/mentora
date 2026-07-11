import { GraduationCap } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-950 py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white">Privacy Policy</h1>
          <p className="mt-2 text-slate-400">Last updated: July 2025 | Effective Date: July 1, 2025</p>
        </div>

        <div className="space-y-8 text-slate-300">
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">1. Introduction</h2>
            <p className="leading-relaxed">
              Mentora ("we," "our," or "us") is committed to protecting the privacy and security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our 1:1 online mentoring platform (the "Service"). By using our Service, you agree to the collection and use of information in accordance with this policy.
            </p>
            <p className="mt-4 leading-relaxed">
              We are dedicated to maintaining the trust and confidence of our users, particularly parents and guardians who entrust us with their children's educational journey. This policy reflects our commitment to transparency, accountability, and data protection best practices.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">2. Information We Collect</h2>
            <div className="space-y-4">
              <div>
                <h3 className="mb-2 text-lg font-medium text-white">2.1 Personal Information Provided by You</h3>
                <p className="mb-3">We collect information that you voluntarily provide when using our Service:</p>
                <ul className="list-inside list-disc space-y-2">
                  <li><strong>Parent/Guardian Information:</strong> Full name, email address, phone number, and communication preferences</li>
                  <li><strong>Student Information:</strong> Full name, grade/class, school name, date of birth, and academic profile</li>
                  <li><strong>Academic Information:</strong> Subjects of interest, learning goals, areas for improvement, and performance data</li>
                  <li><strong>Booking Information:</strong> Session schedules, mentor preferences, booking history, and payment details</li>
                  <li><strong>Communication Data:</strong> Messages, feedback, and interactions with mentors and support staff</li>
                  <li><strong>Account Information:</strong> Username, password (encrypted), and security questions</li>
                </ul>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-medium text-white">2.2 Automatically Collected Information</h3>
                <p className="mb-3">We automatically collect certain information when you visit our platform:</p>
                <ul className="list-inside list-disc space-y-2">
                  <li><strong>Device Information:</strong> IP address, browser type, operating system, device type, and unique device identifiers</li>
                  <li><strong>Usage Data:</strong> Pages visited, time spent, click patterns, and navigation paths</li>
                  <li><strong>Session Information:</strong> Login times, session duration, and feature usage statistics</li>
                  <li><strong>Location Data:</strong> Approximate geographic location based on IP address (not precise GPS location)</li>
                  <li><strong>Cookies and Similar Technologies:</strong> Cookie IDs, web beacons, and local storage data</li>
                </ul>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-medium text-white">2.3 Information from Third Parties</h3>
                <p className="mb-3">We may receive information about you from third-party sources:</p>
                <ul className="list-inside list-disc space-y-2">
                  <li><strong>Payment Processors:</strong> Transaction data and payment confirmation from Razorpay, Stripe, or similar services</li>
                  <li><strong>Social Media:</strong> Profile information if you choose to sign up via social media accounts</li>
                  <li><strong>Referral Sources:</strong> Information about how you discovered our platform</li>
                  <li><strong>Background Check Services:</strong> Mentor verification and credential confirmation</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">3. How We Use Your Information</h2>
            <p className="mb-4">We use your personal information for the following purposes:</p>
            <ul className="list-inside list-disc space-y-2">
              <li><strong>Service Provision:</strong> To provide, maintain, and improve our mentoring services</li>
              <li><strong>Booking Management:</strong> To process bookings, schedule sessions, and manage payments</li>
              <li><strong>Communication:</strong> To send session reminders, notifications, updates, and promotional content</li>
              <li><strong>Mentor Matching:</strong> To match students with suitable mentors based on academic needs and preferences</li>
              <li><strong>Personalization:</strong> To personalize the learning experience and recommend relevant mentors or subjects</li>
              <li><strong>Analytics:</strong> To analyze usage patterns, improve user experience, and develop new features</li>
              <li><strong>Security:</strong> To detect, prevent, and address technical issues, fraud, and security threats</li>
              <li><strong>Legal Compliance:</strong> To comply with applicable laws, regulations, and legal requests</li>
              <li><strong>Marketing:</strong> To send marketing communications (with your consent)</li>
              <li><strong>Research:</strong> To conduct research and analysis to improve our educational offerings</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">4. Legal Basis for Processing</h2>
            <p className="mb-4">We process your personal information based on the following legal grounds:</p>
            <ul className="list-inside list-disc space-y-2">
              <li><strong>Contractual Necessity:</strong> To fulfill our obligations under our service agreement with you</li>
              <li><strong>Consent:</strong> When you provide explicit consent for specific processing activities</li>
              <li><strong>Legitimate Interests:</strong> For purposes that are necessary for our legitimate business interests</li>
              <li><strong>Legal Obligation:</strong> To comply with applicable laws and regulations</li>
              <li><strong>Vital Interests:</strong> To protect the vital interests of individuals in emergency situations</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">5. Information Sharing and Disclosure</h2>
            <p className="mb-4">We respect your privacy and do not sell your personal information. We may share your information only in the following circumstances:</p>
            <div className="space-y-4">
              <div>
                <h3 className="mb-2 text-lg font-medium text-white">5.1 With Mentors</h3>
                <p>We share relevant student information with assigned mentors to conduct sessions effectively. This includes student name, grade, subject preferences, learning goals, and booking schedules. Mentors are bound by confidentiality agreements and data protection policies.</p>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-medium text-white">5.2 With Service Providers</h3>
                <p>We engage trusted third-party service providers to assist in operating our platform. These include:</p>
                <ul className="list-inside list-disc space-y-2 mt-2">
                  <li><strong>Payment Processors:</strong> Razorpay, Stripe, or similar for payment processing</li>
                  <li><strong>Email Services:</strong> Resend for transactional and marketing emails</li>
                  <li><strong>Video Conferencing:</strong> Jitsi or similar for online sessions</li>
                  <li><strong>Cloud Services:</strong> Vercel, Supabase for hosting and data storage</li>
                  <li><strong>Analytics Services:</strong> Google Analytics for usage analysis</li>
                </ul>
                <p className="mt-2">All service providers are contractually obligated to protect your information and use it only for the specified purposes.</p>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-medium text-white">5.3 Legal Requirements</h3>
                <p>We may disclose your information when required by law, court order, government request, or to protect our rights, property, or safety, or that of our users or others.</p>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-medium text-white">5.4 Business Transfers</h3>
                <p>In connection with any merger, sale of company assets, financing, or acquisition of all or a portion of our business, your information may be transferred to the acquiring entity.</p>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-medium text-white">5.5 With Your Consent</h3>
                <p>We may share your information with third parties with your explicit consent for specific purposes.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">6. Data Security</h2>
            <p className="mb-4">We implement industry-standard security measures to protect your personal information:</p>
            <ul className="list-inside list-disc space-y-2">
              <li><strong>Encryption:</strong> Data is encrypted in transit using SSL/TLS and at rest using industry-standard encryption</li>
              <li><strong>Access Controls:</strong> Strict access controls and authentication mechanisms for our systems</li>
              <li><strong>Regular Audits:</strong> Regular security audits and vulnerability assessments</li>
              <li><strong>Employee Training:</strong> All employees undergo data protection and security training</li>
              <li><strong>Secure Facilities:</strong> Our data centers are located in secure facilities with physical security measures</li>
              <li><strong>Breach Notification:</strong> We will notify you within 72 hours of becoming aware of a data breach</li>
            </ul>
            <p className="mt-4">However, no method of transmission over the internet is 100% secure. While we strive to protect your personal information, we cannot guarantee absolute security.</p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">7. Data Retention</h2>
            <p className="mb-4">We retain your personal information for different periods depending on the purpose:</p>
            <ul className="list-inside list-disc space-y-2">
              <li><strong>Account Information:</strong> Retained while your account is active and for 2 years after account closure</li>
              <li><strong>Booking Records:</strong> Retained for 7 years for legal and tax purposes</li>
              <li><strong>Payment Records:</strong> Retained for 7 years to comply with financial regulations</li>
              <li><strong>Communication Logs:</strong> Retained for 2 years for service quality and dispute resolution</li>
              <li><strong>Analytics Data:</strong> Retained in anonymized/aggregated form indefinitely for analysis</li>
              <li><strong>Marketing Data:</strong> Retained until you unsubscribe or withdraw consent</li>
            </ul>
            <p className="mt-4">After the retention period expires, we securely delete or anonymize your information unless required by law to retain it longer.</p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">8. Your Rights</h2>
            <p className="mb-4">You have the following rights regarding your personal information:</p>
            <ul className="list-inside list-disc space-y-2">
              <li><strong>Right to Access:</strong> Request a copy of the personal information we hold about you</li>
              <li><strong>Right to Rectification:</strong> Request correction of inaccurate or incomplete information</li>
              <li><strong>Right to Erasure:</strong> Request deletion of your personal information (subject to legal obligations)</li>
              <li><strong>Right to Restrict Processing:</strong> Request restriction of processing of your information</li>
              <li><strong>Right to Data Portability:</strong> Request transfer of your information to another service</li>
              <li><strong>Right to Object:</strong> Object to processing of your information based on legitimate interests</li>
              <li><strong>Right to Withdraw Consent:</strong> Withdraw consent at any time for consent-based processing</li>
              <li><strong>Right to Complain:</strong> Lodge a complaint with a supervisory authority</li>
            </ul>
            <p className="mt-4">To exercise these rights, please contact us at Contact.mentoraedu@gmail.com. We will respond to your request within 30 days.</p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">9. Children's Privacy</h2>
            <p className="mb-4">Our platform is designed for students under the age of 18. We have special protections in place:</p>
            <ul className="list-inside list-disc space-y-2">
              <li><strong>Parental Consent:</strong> We collect personal information only from parents or legal guardians</li>
              <li><strong>Age Verification:</strong> We verify that users registering are parents/guardians, not minors</li>
              <li><strong>Limited Data Collection:</strong> We collect only information necessary for educational purposes</li>
              <li><strong>No Marketing to Minors:</strong> We do not directly market to students under 18</li>
              <li><strong>Parental Control:</strong> Parents can review, modify, or delete their child's information at any time</li>
              <li><strong>Safe Environment:</strong> All mentors undergo background checks and are trained in child safety</li>
            </ul>
            <p className="mt-4">We do not knowingly collect personal information from children under 13 without parental consent. If you believe we have inadvertently collected such information, please contact us immediately.</p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">10. Cookies and Tracking Technologies</h2>
            <p className="mb-4">We use cookies and similar tracking technologies to enhance your experience:</p>
            <ul className="list-inside list-disc space-y-2">
              <li><strong>Essential Cookies:</strong> Required for the platform to function properly</li>
              <li><strong>Performance Cookies:</strong> Help us understand how the platform is used</li>
              <li><strong>Functionality Cookies:</strong> Remember your preferences and settings</li>
              <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements (with consent)</li>
            </ul>
            <p className="mt-4">You can control cookies through your browser settings. However, disabling cookies may affect the functionality of our platform. We use Google Analytics and similar tools for analytics purposes.</p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">11. Third-Party Links</h2>
            <p className="leading-relaxed">
              Our platform may contain links to third-party websites, services, or resources. We are not responsible for the privacy practices of such third-party sites. We encourage you to read the privacy policies of any third-party sites you visit. Our inclusion of links does not imply endorsement of the linked sites.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">12. International Data Transfers</h2>
            <p className="leading-relaxed">
              Your information may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place to protect your information in accordance with this Privacy Policy and applicable data protection laws. When we transfer your information internationally, we use standard contractual clauses or other legally approved mechanisms.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">13. Changes to This Privacy Policy</h2>
            <p className="leading-relaxed">
              We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. We will notify you of any material changes by:
            </p>
            <ul className="list-inside list-disc space-y-2 mt-4">
              <li>Posting the new Privacy Policy on this page</li>
              <li>Updating the "Last updated" date</li>
              <li>Sending an email notification to registered users</li>
              <li>Displaying a prominent notice on our platform</li>
            </ul>
            <p className="mt-4">Your continued use of our Service after the effective date of the revised Privacy Policy constitutes your acceptance of the changes.</p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">14. Compliance with Data Protection Laws</h2>
            <p className="mb-4">We are committed to complying with applicable data protection laws, including:</p>
            <ul className="list-inside list-disc space-y-2">
              <li><strong>Information Technology Act, 2000 (India):</strong> Including the SPDI Rules 2011</li>
              <li><strong>Personal Data Protection Bill (India):</strong> Once enacted</li>
              <li><strong>GDPR:</strong> For users in the European Union</li>
              <li><strong>CCPA/CPRA:</strong> For users in California</li>
              <li><strong>COPPA:</strong> For children's online privacy protection</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">15. Data Breach Notification</h2>
            <p className="leading-relaxed">
              In the event of a data breach that poses a risk to your rights and freedoms, we will notify you without undue delay and within 72 hours of becoming aware of the breach. The notification will include:
            </p>
            <ul className="list-inside list-disc space-y-2 mt-4">
              <li>Description of the nature of the breach</li>
              <li>Categories of personal information affected</li>
              <li>Likely consequences of the breach</li>
              <li>Measures taken to address the breach</li>
              <li>Steps you can take to protect yourself</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">16. Contact Us</h2>
            <p className="mb-4">If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:</p>
            <ul className="list-inside list-disc space-y-2">
              <li><strong>Email:</strong> Contact.mentoraedu@gmail.com</li>
              <li><strong>Website:</strong> https://mentora.in</li>
              <li><strong>Instagram:</strong> @mentoraa.ai</li>
              <li><strong>Address:</strong> Patna, Bihar, India</li>
            </ul>
            <p className="mt-4">We will respond to your inquiry within 30 days of receipt. For complaints related to data protection, you also have the right to lodge a complaint with the relevant data protection authority in your jurisdiction.</p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">17. Specific Provisions for Indian Users</h2>
            <p className="mb-4">For users in India, we adhere to the following additional provisions:</p>
            <ul className="list-inside list-disc space-y-2">
              <li><strong>Data Localization:</strong> Critical personal data is stored in India</li>
              <li><strong>Consent Manager:</strong> We maintain a consent manager for tracking user consents</li>
              <li><strong>Grievance Officer:</strong> We have appointed a Grievance Officer for data protection matters</li>
              <li><strong>Right to Forgotten:</strong> Users can request deletion of their data as per applicable laws</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
