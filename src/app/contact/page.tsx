/**
 * Contact Page - Portfolio Marcel
 *
 * Server Component that displays contact information and social media links.
 * Provides multiple ways for visitors to get in touch with Marcel.
 *
 * Features:
 * - Hero section with introduction
 * - Social media buttons and contact information
 * - Professional contact details and availability status
 * - Consistent styling with the rest of the portfolio
 *
 * @page
 * @route /contact
 */

import {
  ContactHeroSection,
  ContactSocialSection,
} from "@/components/sections/contact";

/**
 * Contact page component - Server Component (no "use client")
 *
 * @returns {React.JSX.Element} The rendered contact page
 */
export default function Contact(): React.JSX.Element {
  return (
    <div className="flex flex-col">
      {/* Contact Hero Section */}
      <ContactHeroSection />

      {/* Contact Social Section */}
      <ContactSocialSection />
    </div>
  );
}
