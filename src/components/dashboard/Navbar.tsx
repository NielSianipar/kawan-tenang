"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useAppStore } from "@/lib/store";
import {
  HomeIcon,
  HeartIcon,
  JournalIcon,
  PeerIcon,
  WindIcon,
  InsightIcon,
  DirectoryIcon,
  UserIcon,
} from "@/components/common/Icons";

const NAV_ITEMS = [
  { label: "Ringkasan", href: "/dashboard", icon: HomeIcon },
  { label: "Mood Tracker", href: "/dashboard/mood", icon: HeartIcon },
  { label: "Journaling", href: "/dashboard/journal", icon: JournalIcon },
  { label: "Peer Support", href: "/dashboard/peer-support", icon: PeerIcon },
  { label: "Micro-CBT", href: "/dashboard/exercises", icon: WindIcon },
  { label: "Insight", href: "/dashboard/insights", icon: InsightIcon },
  { label: "Direktori", href: "/dashboard/directory", icon: DirectoryIcon },
  { label: "Profil", href: "/dashboard/profile", icon: UserIcon },
];

export function DashboardNavbar() {
  const pathname = usePathname();
  const user = useAppStore((s) => s.user);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-ink-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Brand Logo */}
          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="flex items-center gap-2">
              <span className="font-display text-2xl font-bold tracking-tight text-ink-900">
                Ruang
              </span>
              <span className="hidden sm:inline-block rounded-full bg-sage-50 border border-sage-200 px-2.5 py-0.5 text-[10px] font-semibold text-sage-700">
                Gen-Z Mental Space
              </span>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? "bg-sage-600 text-white shadow-sm"
                      : "text-ink-700 hover:text-ink-900 hover:bg-mist-100"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* User Nickname Pill & Mobile Menu Button */}
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard/profile"
              className="flex items-center gap-2 rounded-full border border-ink-200 bg-mist-50 pl-2.5 pr-3.5 py-1.5 hover:bg-mist-100 transition-colors"
            >
              <div className="w-6 h-6 rounded-full bg-sage-600 text-white flex items-center justify-center text-[10px] font-bold">
                {user?.nickname ? user.nickname.charAt(0).toUpperCase() : "U"}
              </div>
              <span className="text-xs font-medium text-ink-900 max-w-[100px] truncate">
                {user?.nickname || "Kawan Ruang"}
              </span>
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-ink-700 hover:bg-mist-100 border border-ink-200"
              aria-label="Menu"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-ink-200 bg-white px-4 pt-3 pb-6 space-y-1 shadow-lg">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-sage-600 text-white"
                    : "text-ink-700 hover:bg-mist-100 hover:text-ink-900"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
