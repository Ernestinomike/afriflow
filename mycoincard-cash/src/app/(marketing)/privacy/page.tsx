export default function PrivacyPage() {
  return (
    <div className="pt-28 pb-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 prose prose-invert prose-sm">
        <h1 className="section-title text-3xl sm:text-4xl mb-8">Privacy Policy</h1>
        <p className="text-text-soft">Last updated: January 2024</p>

        <h2>1. Information We Collect</h2>
        <p>We collect information you provide directly: name, email, phone, address, financial data (income, employment), and identity documents for KYC verification. We also collect device data, IP addresses, and browsing patterns automatically.</p>

        <h2>2. How We Use Your Information</h2>
        <p>Your data is used to: process loan applications, verify identity, prevent fraud, communicate updates, improve services, and comply with legal obligations.</p>

        <h2>3. Data Sharing</h2>
        <p>We never sell your data. We share with: payment processors (Stripe, Paystack, Flutterwave), identity verification providers, credit bureaus (with consent), and law enforcement when legally required.</p>

        <h2>4. Security</h2>
        <p>All data is encrypted with AES-256 at rest and TLS 1.3 in transit. We are PCI DSS Level 1 compliant. Access is role-based with multi-factor authentication for all staff.</p>

        <h2>5. Your Rights</h2>
        <p>You may request data access, correction, deletion, or portability at any time by emailing privacy@mycoincard.cash. We respond within 30 days.</p>

        <h2>6. Cookies</h2>
        <p>We use essential cookies for authentication and analytics cookies (can be disabled) to improve user experience.</p>

        <h2>7. Contact</h2>
        <p>Privacy Officer: privacy@mycoincard.cash | 123 Finance Ave, New York, NY 10001</p>
      </div>
    </div>
  );
}
