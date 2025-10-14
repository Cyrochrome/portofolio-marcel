"use client";

/**
 * Contact Social Section Component
 *
 * Displays social media buttons and contact information for getting in touch.
 * Reuses the same social links configuration from the Footer component.
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { trackEvent } from "@/lib/analytics-utils";

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
 * Uses the same links from the Footer component
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

export function ContactSocialSection() {
  /**
   * Renders the appropriate FontAwesome icon for each social link
   * @param {string} iconName - The icon name/type
   * @returns {JSX.Element} The FontAwesome icon element
   */
  const renderIcon = (iconName: string): React.JSX.Element => {
    const iconClass = "h-6 w-6";

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
    <section className="container px-4 py-16 mx-auto lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mx-auto max-w-4xl"
      >
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">
              Connect With Me
            </CardTitle>
            <p className="text-muted-foreground">
              Choose your preferred way to get in touch
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {socialLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100,
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outline"
                    className="w-full h-auto p-6 flex flex-col items-center gap-3 hover:shadow-md transition-all"
                    asChild
                  >
                    <Link
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      onClick={() =>
                        trackEvent({
                          name: "social_link_clicked",
                          properties: {
                            platform: link.name.toLowerCase(),
                            link_location: "contact_page",
                          },
                        })
                      }
                    >
                      <div className="flex flex-col items-center gap-3">
                        <div className="text-primary">
                          {renderIcon(link.icon)}
                        </div>
                        <div className="text-center">
                          <div className="font-semibold">{link.name}</div>
                          {link.name === "Email" && (
                            <div className="text-sm text-muted-foreground">
                              marshalinas82@gmail.com
                            </div>
                          )}
                          {link.name === "WhatsApp" && (
                            <div className="text-sm text-muted-foreground">
                              +62 895-3405-02504
                            </div>
                          )}
                        </div>
                      </div>
                    </Link>
                  </Button>
                </motion.div>
              ))}
            </div>

            <Separator className="my-8" />

            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <h3 className="text-lg font-semibold mb-2">
                Professional Inquiries
              </h3>
              <p className="text-muted-foreground mb-4">
                For business opportunities, collaborations, or project
                discussions, feel free to reach out through any of the channels
                above.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
                <span className="bg-secondary px-3 py-1 rounded-full">
                  Available for freelance work
                </span>
                <span className="bg-secondary px-3 py-1 rounded-full">
                  Open to full-time opportunities
                </span>
                <span className="bg-secondary px-3 py-1 rounded-full">
                  Interested in collaborations
                </span>
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
}
