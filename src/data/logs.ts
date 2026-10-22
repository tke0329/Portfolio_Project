export type LogEntry = { slug: string; title: string; date: string; category: string; tags: string[]; summary: string };

// Add an entry only when its corresponding authored MDX article is available.
export const logs: LogEntry[] = [];
