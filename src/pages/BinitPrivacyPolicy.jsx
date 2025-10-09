import React from 'react';
import { Link } from 'react-router-dom';

const policyText = `
BinIt Privacy Policy
Effective Date: {DATE}

Introduction
Welcome to BINit, a web-based waste management platform designed to improve environmental cleanliness by enabling users to report waste dumps (via SnapIt and BinIt) and schedule pickups for their household or business waste. BINit provides both community-driven reporting and personalized waste collection services.

We are committed to protecting your personal information and respecting your privacy. This Privacy Policy explains how we collect, use, share, and protect your data when you use the BINit web application.

1. Who We Are
BINit is a digital solution focused on empowering individuals and communities to report unattended waste sites and schedule pickups. We believe in transparency, accountability, and respect for your data privacy.

2. What Information We Collect
a. Information You Provide Directly:
- Full Name
- Email Address
- Phone Number
- Pickup Address (this may include your home, business, or any other location you specify for waste collection)
- Photos or descriptions of waste sites
- Comments or feedback

b. Information Collected Automatically:
- Device and browser information
- IP address
- Location data (if permission is granted)
- Usage details (features used, timestamps of reports/pickups/logins, session duration and activity logs)

3. How We Use Your Information
We use collected information to:
- Facilitate dump reporting and pickup scheduling
- Ensure timely and reliable collection of your household or business waste
- Provide real-time responses to your reports
- Communicate with you (e.g., confirmations, reminders, support)
- Improve the functionality, design, and user experience of BINit
- Secure the platform and prevent misuse
- Comply with relevant legal or environmental regulations

We do not sell your personal data.

4. Legal Basis for Processing
We process your information based on consent (which you can withdraw at any time), contractual necessity, legitimate interest, and legal obligations.

5. Account Registration and Login
To access BINit’s features, you must register an account with your name, email, and password. Your account lets you manage reports, pickups, and notifications.

6. Location Data Usage
When you report a dump or request a pickup, the platform may request access to your location. You will be asked for permission before your location is accessed.

7. Notifications and Communication
We may send service notifications, reminders, and platform updates. You can opt out of non-essential notifications via account settings.

8. Cookies and Tracking
BINit may use cookies and analytics tools to remember preferences, monitor traffic and usage, and improve security and performance.

9. API and Third-Party Services
BINit integrates with third-party APIs and services (such as mapping providers, hosting services, and analytics tools) to enable features like location tagging and hosting.

10. How We Share Your Information
Your data may be shared with waste management partners, service providers (under confidentiality agreements), and legal authorities if required by law. We never share data for advertising purposes.

11. International Data Transfers
If your data is transferred or stored outside your country, we ensure appropriate safeguards are in place.

12. Data Protection and Security
We use HTTPS, encrypted storage of sensitive fields, access controls, and regular security reviews.

13. Data Breach Notification
In the event of a data breach, BINit will notify affected users promptly and provide mitigation steps.

14. Data Retention
We retain data only as long as necessary to provide services, comply with legal obligations, or resolve disputes.

15. Your Rights
You may access, correct, delete, or export your data, withdraw consent, or object to processing.

16. Children’s Privacy
BINit is not designed for children under 16. We do not knowingly collect data from them.

17. External Links
BINit may contain links to third-party tools. We are not responsible for their privacy practices.

18. Changes to This Policy
We may update this Privacy Policy; significant changes will be communicated.

19. Contact Us
Email: [BINit support email]
Team: [AltHub Project Team 15]
Website: [URL]

Terms and Conditions

By using BINit you agree to the following terms and conditions:
- You will not misuse the platform to submit fraudulent reports.
- You will provide accurate information for pickups and reports.
- BINit may suspend or terminate accounts that violate the terms or applicable law.
- BINit provides the platform “as is” and is not liable for indirect damages. For full legal terms please contact the team.
`;

export default function BinitPrivacyPolicy() {
  const createdAt = new Date().toLocaleDateString();

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-sm rounded mt-8 mb-12">
      <h1 className="text-2xl font-bold mb-2">BinIt Privacy Policy & Terms</h1>
      <p className="text-sm text-gray-600 mb-4">Effective: {createdAt}</p>

      <div className="prose max-w-none">
        {policyText.split('\n').map((line, idx) => (
          <p key={idx} className={line.trim() === '' ? 'mt-0' : ''}>
            {line.replace('{DATE}', createdAt)}
          </p>
        ))}
      </div>

      <div className="mt-6 text-sm text-gray-700">
        <Link to="/signup" className="text-green-600 hover:underline">
          Back to Sign up
        </Link>
      </div>
    </div>
  );
}
