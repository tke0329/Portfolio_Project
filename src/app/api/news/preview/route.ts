import { getTechNews } from "@/lib/tech-news";

export async function GET() {
  const items = (await getTechNews()).slice(0, 3);

  return Response.json(
    { items },
    {
      status: items.length ? 200 : 503,
      headers: {
        "Cache-Control": items.length
          ? "public, s-maxage=1800, stale-while-revalidate=3600"
          : "no-store",
      },
    },
  );
}
