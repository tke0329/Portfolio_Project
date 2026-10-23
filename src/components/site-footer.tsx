import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-inner">
        <div>
          <div className="footer-brand">✦ The Helpful NPC</div>
          <p>문제에서 출발하는 개발자의 포트폴리오</p>
        </div>
        <div className="footer-links">
          <Link href="/projects">Projects</Link>
          <Link href="/logs">Engineering Log</Link>
          <Link href="/news">Tech Bulletin</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
