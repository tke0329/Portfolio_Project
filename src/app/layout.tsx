import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { profile } from "@/data/profile";
import { siteUrl } from "@/lib/site-url";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: `The Helpful NPC | ${profile.name}`, template: `%s | The Helpful NPC` },
  description: `${profile.name}의 개발자 포트폴리오. ${profile.introduction}`,
  openGraph: {
    title: `The Helpful NPC | ${profile.name}`,
    description: profile.introduction,
    images: ["/images/hero-workshop.webp"],
    type: "website",
    locale: "ko_KR",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" data-scroll-behavior="smooth">
      <body>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
