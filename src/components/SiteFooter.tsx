"use client";

import { usePathname } from "next/navigation";
import { useLocale } from "@/components/LocaleProvider";
import { pick } from "@/lib/locale";

export const CONTACT_EMAIL = "hello@maybeshedliketotalk.org";

/* ─────────────────────────────────────────
   Site-wide footer with contact email.
   The homepage renders its own full footer (which also shows the
   contact line), so this slim footer is skipped on "/".
   ───────────────────────────────────────── */
export default function SiteFooter() {
  const pathname = usePathname();
  const { locale } = useLocale();
  const t = (zh: string, en: string) => pick(locale, zh, en);
  if (pathname === "/") return null;

  return (
    <footer className="bg-[#FFF5F0] border-t border-[#F28BAE]/15 px-4 py-4 text-[#1E2A5E]/70">
      <div className="max-w-6xl mx-auto flex flex-col items-stretch text-left sm:items-center sm:text-center">
        <p className="text-xs text-[#1E2A5E]/50 pt-2">{t("聯絡我們", "Contact")}</p>
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="inline-flex items-center sm:justify-center min-h-11 max-w-full break-all text-sm font-semibold text-[#F28B6E] hover:underline"
        >
          {CONTACT_EMAIL}
        </a>
        <p className="text-xs text-[#1E2A5E]/40 min-h-11 flex items-center sm:justify-center">
          © {new Date().getFullYear()} {t("也許妳想找人聊一聊", "Maybe She'd Like to Talk")} · {t("妳的資料我們會好好保護", "We look after your information")}
        </p>
      </div>
    </footer>
  );
}
