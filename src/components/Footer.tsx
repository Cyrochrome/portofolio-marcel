"use client";

/**
 * Footer Component - Portfolio Marcel
 *
 * This component renders the footer section of the portfolio website.
 * It includes copyright information, social links, and additional navigation.
 *
 * Features:
 * - Responsive design that works on all screen sizes
 * - Social media links and contact information
 * - Copyright notice with dynamic year
 * - Clean, professional styling with Tailwind CSS
 * - Smooth animations powered by Framer Motion
 *
 * @component
 * @example
 * ```tsx
 * import Footer from '@/components/Footer';
 *
 * export default function Layout() {
 *   return (
 *     <footer>
 *       <Footer />
 *     </footer>
 *   );
 * }
 * ```
 */

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faLinkedin,
  faInstagram,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

/**
 * Social media link interface for type safety
 */
interface SocialLink {
  name: string;
  href: string;
  icon: string;
  external: boolean;
}

/**
 * Social media links configuration
 * Defines all social media and external links in the footer
 */
const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    href: "https://github.com/Cyrochrome",
    icon: "github",
    external: true,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/cyrochrome-dev21/",
    icon: "linkedin",
    external: true,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/mrshlnsx_/",
    icon: "instagram",
    external: true,
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/62895340502504",
    icon: "whatsapp",
    external: true,
  },
  {
    name: "Email",
    href: "mailto:marshalinas82@gmail.com",
    icon: "mail",
    external: true,
  },
];

/**
 * Footer component that provides site-wide footer information
 *
 * @returns {JSX.Element} The rendered footer component
 */
export default function Footer(): React.JSX.Element {
  /**
   * Gets the current year for the copyright notice
   * @returns {number} The current year
   */
  const getCurrentYear = (): number => {
    return new Date().getFullYear();
  };

  /**
   * Renders the appropriate FontAwesome icon for each social link
   * @param {string} iconName - The icon name/type
   * @returns {JSX.Element} The FontAwesome icon element
   */
  const renderIcon = (iconName: string): React.JSX.Element => {
    const iconClass = "h-5 w-5";

    switch (iconName) {
      case "github":
        return <FontAwesomeIcon icon={faGithub} className={iconClass} />;
      case "linkedin":
        return <FontAwesomeIcon icon={faLinkedin} className={iconClass} />;
      case "instagram":
        return <FontAwesomeIcon icon={faInstagram} className={iconClass} />;
      case "whatsapp":
        return <FontAwesomeIcon icon={faWhatsapp} className={iconClass} />;
      case "mail":
        return <FontAwesomeIcon icon={faEnvelope} className={iconClass} />;
      default:
        return <FontAwesomeIcon icon={faGithub} className={iconClass} />;
    }
  };

  return (
    <motion.footer
      className="w-full border-t bg-background"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="container px-4 py-12 md:px-6 md:py-16 lg:px-8 lg:py-20">
        {/* Main Footer Content */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-between gap-6 md:flex-row md:gap-8">
              {/* Copyright Section */}
              <motion.div
                className="flex flex-col items-center gap-4 text-center md:text-left"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <p className="text-sm leading-loose text-muted-foreground">
                  © {getCurrentYear()} Portfolio Marcel. All rights reserved.
                </p>
              </motion.div>

              {/* Social Links Section */}
              <motion.div
                className="flex items-center gap-4"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {socialLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.4,
                      delay: 0.6 + index * 0.1,
                      type: "spring",
                      stiffness: 100,
                    }}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      asChild
                      className="h-auto p-2 text-muted-foreground hover:text-foreground"
                    >
                      <Link
                        href={link.href}
                        target={link.external ? "_blank" : undefined}
                        rel={link.external ? "noopener noreferrer" : undefined}
                        aria-label={`Visit ${link.name} profile`}
                      >
                        {renderIcon(link.icon)}
                        <span className="sr-only">{link.name}</span>
                      </Link>
                    </Button>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Footer Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col items-center gap-4"
        >
          <Separator className="w-full" />
          <motion.p
            className="text-center text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            Built with{" "}
            <motion.span
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                href="https://nextjs.org"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium underline underline-offset-4 hover:text-primary"
              >
                Next.js
              </Link>
            </motion.span>
            ,{" "}
            <motion.span
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                href="https://www.typescriptlang.org"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium underline underline-offset-4 hover:text-primary"
              >
                TypeScript
              </Link>
            </motion.span>
            ,{" "}
            <motion.span
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                href="https://ui.shadcn.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium underline underline-offset-4 hover:text-primary"
              >
                shadcn/ui
              </Link>
            </motion.span>
            ,{" "}
            <motion.span
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                href="https://tailwindcss.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium underline underline-offset-4 hover:text-primary"
              >
                Tailwind CSS
              </Link>
            </motion.span>
            , and{" "}
            <motion.span
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                href="https://www.framer.com/motion"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium underline underline-offset-4 hover:text-primary"
              >
                Framer Motion
              </Link>
            </motion.span>
            .
          </motion.p>
        </motion.div>
      </div>
    </motion.footer>
  );
}
