"use client";

import { usePathname } from "next/navigation";

export const CONTACT_EMAIL = "hello@maybeshedliketotalk.org";

/* ─────────────────────────────────────────
   Site-wide footer with contact email.
   The homepage renders its own full footer (which also shows the
   contact line), so this slim footer is skipped on "/".
   ───────────────────────────────────────── */
export default function SiteFooter() {
  const pathname = usePathname();
  if (pathname === "/") return null;

  return (
    <footer className="bg-[#FFF5F0] border-t border-[#F28BAE]/15 py-6 px-4 text-center text-xs text-[#1E2A5E]/50">
      <p>
        聯絡我們 Contact:{" "}
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="font-semibold text-[#F28B6E] hover:underline"
        >
          {CONTACT_EMAIL}
        </a>
      </p>
      <p className="mt-1 text-[#1E2A5E]/30">
        © {new Date().getFullYear()} 也許妳想找人聊一聊 · Maybe She&apos;d Like to Talk · 妳的隱私受到保護
      </p>
    </footer>
  );
}
