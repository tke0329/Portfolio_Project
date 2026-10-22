import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { logs } from "@/data/logs";
import { siteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/about", "/projects", "/skills", "/logs", "/contact"];
  const publicProjects = projects.filter((project) => project.status === "published");
  return [
    ...paths.map((path) => ({ url: `${siteUrl}${path}`, lastModified: new Date() })),
    ...publicProjects.map((project) => ({ url: `${siteUrl}/projects/${project.slug}`, lastModified: new Date() })),
    ...logs.map((log) => ({ url: `${siteUrl}/logs/${log.slug}`, lastModified: new Date() })),
  ];
}
