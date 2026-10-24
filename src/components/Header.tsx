"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import LanguageToggle from "@/components/LanguageToggle";
import { useLocale } from "@/components/LocaleProvider";
import { pick } from "@/lib/locale";

const NAV_LINKS = [
  { href: "/#about", zh: "關於", en: "About" },
  { href: "/#journey", zh: "旅程", en: "Journey" },
  { href: "/#pricing", zh: "方案", en: "Pricing" },
];

export default function Header() {
  const { locale } = useLocale();
  const t = (zh: string, en: string) => pick(locale, zh, en);
  const [user, setUser] = useState<User | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /* ── Auth state ── */
  useEffect(() => {
    const supabase = createClient();

    // Get initial session
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user));

    // Subscribe to auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  /* ── Scroll shadow ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Close menu on resize ── */
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleSignOut = useCallback(async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setUser(null);
    setMenuOpen(false);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const userInitial = user?.email?.[0]?.toUpperCase() ?? "U";
  const userDisplayName =
    user?.user_metadata?.full_name ?? user?.email?.split("@")[0] ?? "User";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 glass transition-shadow duration-300 ${
          scrolled ? "shadow-md" : ""
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-3 min-h-16 md:min-h-20 py-2">
            {/* Logo */}
            <Link
              href="/"
              className="flex-shrink-0 group min-w-0"
              onClick={closeMenu}
            >
              <span
                className="block font-bold text-sm md:text-base leading-tight tracking-tight transition-opacity group-hover:opacity-80"
                style={{ color: "var(--coral)", fontFamily: "var(--font-noto), sans-serif" }}
              >
                {t("也許妳想找人聊一聊", "Maybe She'd Like to Talk")}
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200"
                  style={{ color: "var(--navy)", fontFamily: "var(--font-quicksand), sans-serif" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(242,139,110,0.1)";
                    (e.currentTarget as HTMLElement).style.color = "var(--coral)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                    (e.currentTarget as HTMLElement).style.color = "var(--navy)";
                  }}
                >
                  {t(link.zh, link.en)}
                </Link>
              ))}
            </nav>

            {/* Desktop Auth */}
            <div className="hidden md:flex items-center gap-3">
              <LanguageToggle />
              {user ? (
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-sm flex-shrink-0"
                    style={{ backgroundColor: "var(--coral)" }}
                    title={userDisplayName}
                  >
                    {userInitial}
                  </div>
                  <span
                    className="text-sm font-medium max-w-[120px] truncate hidden lg:block"
                    style={{ color: "var(--navy)" }}
                  >
                    {userDisplayName}
                  </span>
                  <button
                    onClick={handleSignOut}
                    className="text-sm font-semibold px-4 py-2 rounded-full border-2 transition-colors duration-200"
                    style={{
                      borderColor: "var(--navy)",
                      color: "var(--navy)",
                      fontFamily: "var(--font-quicksand), sans-serif",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.backgroundColor = "var(--navy)";
                      (e.currentTarget as HTMLElement).style.color = "#fff";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                      (e.currentTarget as HTMLElement).style.color = "var(--navy)";
                    }}
                  >
                    {t("登出", "Log out")}
                  </button>
                </div>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    className="text-sm font-semibold px-4 py-2 rounded-full border-2 transition-colors duration-200"
                    style={{
                      borderColor: "var(--coral)",
                      color: "var(--coral)",
                      fontFamily: "var(--font-quicksand), sans-serif",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.backgroundColor = "var(--coral)";
                      (e.currentTarget as HTMLElement).style.color = "#fff";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                      (e.currentTarget as HTMLElement).style.color = "var(--coral)";
                    }}
                  >
                    {t("登入", "Log in")}
                  </Link>
                  <Link
                    href="/#pricing"
                    className="btn-primary text-sm"
                  >
                    {t("預購", "Pre-order")}
                  </Link>
                </>
              )}
            </div>

            <div className="md:hidden flex items-center gap-2 flex-shrink-0">
              <LanguageToggle />
              <button
              className="md:hidden p-2 rounded-lg transition-colors"
              style={{ color: "var(--navy)" }}
              aria-label={menuOpen ? t("關閉選單", "Close menu") : t("開啟選單", "Open menu")}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {menuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="7" x2="21" y2="7" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="17" x2="21" y2="17" />
                  </>
                )}
              </svg>
            </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
          style={{ borderTop: menuOpen ? "1px solid rgba(242,139,110,0.15)" : "none" }}
        >
          <div
            className="px-4 py-4 space-y-1"
            style={{ background: "rgba(255,245,240,0.97)" }}
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="block px-4 py-3 rounded-xl text-base font-semibold transition-colors"
                style={{ color: "var(--navy)", fontFamily: "var(--font-noto), sans-serif" }}
              >
                {t(link.zh, link.en)}
              </Link>
            ))}

            <div className="pt-3 border-t border-coral/10 space-y-2">
              {user ? (
                <>
                  <div
                    className="px-4 py-2 text-sm font-medium"
                    style={{ color: "var(--navy)" }}
                  >
                    {t("歡迎，", "Hi,")} {userDisplayName}
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-4 py-3 rounded-xl text-base font-semibold transition-colors"
                    style={{ color: "var(--coral)" }}
                  >
                    {t("登出", "Log out")}
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    onClick={closeMenu}
                    className="block px-4 py-3 rounded-xl text-base font-semibold transition-colors"
                    style={{ color: "var(--coral)" }}
                  >
                    {t("登入", "Log in")}
                  </Link>
                  <Link
                    href="/#pricing"
                    onClick={closeMenu}
                    className="block btn-primary text-center"
                  >
                    {t("預購", "Pre-order")}
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Spacer to prevent content hiding under fixed header */}
      <div className="h-16 md:h-20" aria-hidden="true" />
    </>
  );
}
