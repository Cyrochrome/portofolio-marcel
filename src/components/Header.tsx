"use client";

/**
 * Header Component - Portfolio Marcel
 *
 * This component renders the main navigation header for the portfolio website.
 * It includes the site logo, navigation menu, and responsive mobile menu functionality.
 *
 * Features:
 * - Responsive design with mobile hamburger menu
 * - Smooth scroll navigation to different sections
 * - Active state highlighting for current page
 * - Accessible navigation with proper ARIA labels
 * - Smooth animations powered by Framer Motion
 *
 * @component
 * @example
 * ```tsx
 * import Header from '@/components/Header';
 *
 * export default function Layout() {
 *   return (
 *     <header>
 *       <Header />
 *     </header>
 *   );
 * }
 * ```
 */

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

/**
 * Navigation item interface for type safety
 */
interface NavItem {
  name: string;
  href: string;
  external?: boolean;
}

/**
 * Navigation items configuration
 * Defines all main navigation links in the portfolio
 */
const navItems: NavItem[] = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
];

/**
 * Header component that provides site-wide navigation
 *
 * @returns {JSX.Element} The rendered header component
 */
export default function Header(): React.JSX.Element {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  /**
   * Toggles the mobile menu open/closed state
   */
  const toggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  /**
   * Closes the mobile menu
   */
  const closeMenu = (): void => {
    setIsMenuOpen(false);
  };

  return (
    <motion.header
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container flex h-16 md:h-20 items-center px-4 md:px-6 lg:px-8">
        {/* Logo/Brand */}
        <motion.div
          className="mr-4 flex-1 md:flex-initial hidden md:flex"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold text-base md:text-lg">
              Portfolio Marcel
            </span>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
          {navItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Link
                href={item.href}
                className={`relative transition-colors hover:text-foreground/80 ${
                  pathname === item.href
                    ? "text-foreground"
                    : "text-foreground/60"
                }`}
              >
                {item.name}
                {pathname === item.href && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                    layoutId="navbar"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Mobile Menu Sheet */}
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
              size="sm"
              asChild
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  animate={{ rotate: isMenuOpen ? 90 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FontAwesomeIcon icon={faBars} className="h-5 w-5" />
                </motion.div>
                <span className="sr-only">Toggle Menu</span>
              </motion.button>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <SheetHeader>
              <SheetTitle>Navigation</SheetTitle>
            </SheetHeader>
            <motion.nav
              className="grid gap-6 mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    className={`flex w-full items-center rounded-md p-3 text-sm font-medium hover:underline transition-colors ${
                      pathname === item.href
                        ? "text-foreground bg-accent"
                        : "text-foreground/70 hover:text-foreground hover:bg-accent/50"
                    }`}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </motion.nav>
          </SheetContent>
        </Sheet>
      </div>
    </motion.header>
  );
}
