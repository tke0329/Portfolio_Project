"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/skills", label: "Tech Stack" },
  { href: "/logs", label: "Log" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
    <a className="skip-link" href="#main-content">본문으로 건너뛰기</a>
    <header className="site-header">
      <div className="header-inner shell">
        <Link className="brand" href="/" onClick={() => setMenuOpen(false)} aria-label="The Helpful NPC 홈">
          <span className="brand-mark" aria-hidden="true">✦</span>
          <span>The Helpful NPC</span>
        </Link>
        <nav className="desktop-nav" aria-label="주 메뉴">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={pathname === link.href || (link.href !== "/" && pathname.startsWith(`${link.href}/`)) ? "active" : ""}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <button
          className="menu-button"
          type="button"
          aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
      </div>
      {menuOpen && (
        <nav id="mobile-nav" className="mobile-nav" aria-label="모바일 메뉴">
          {links.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
    </>
  );
}
