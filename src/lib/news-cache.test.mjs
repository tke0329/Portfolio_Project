import assert from "node:assert/strict";
import test from "node:test";
import { resolveNews } from "./news-cache.ts";

const item = {
  title: "A story",
  url: "https://news.hada.io/topic?id=1",
  publishedAt: "2026-10-23T00:00:00.000Z",
  source: "GeekNews",
};

test("keeps a recent snapshot when every source times out", async () => {
  const snapshot = { items: [item], updatedAt: 1_000 };
  const result = await resolveNews(snapshot, 1_000 + 31 * 60_000, async () => [], async () => {
    throw new Error("a failed refresh must not overwrite the snapshot");
  });
  assert.deepEqual(result, [item]);
});

test("uses a fresh snapshot without waiting for the sources", async () => {
  const snapshot = { items: [item], updatedAt: 1_000 };
  const result = await resolveNews(snapshot, 1_000 + 5 * 60_000, async () => {
    throw new Error("fresh snapshot should avoid a network request");
  }, async () => {});
  assert.deepEqual(result, [item]);
});

test("replaces an old snapshot after a successful refresh", async () => {
  const next = { ...item, title: "A newer story" };
  let saved;
  const result = await resolveNews({ items: [item], updatedAt: 1_000 }, 1_000 + 31 * 60_000,
    async () => [next], async (snapshot) => { saved = snapshot; });
  assert.deepEqual(result, [next]);
  assert.deepEqual(saved, { items: [next], updatedAt: 1_000 + 31 * 60_000 });
});

test("does not show a snapshot older than two days", async () => {
  const result = await resolveNews({ items: [item], updatedAt: 1_000 }, 1_000 + 49 * 60 * 60_000,
    async () => [], async () => {});
  assert.deepEqual(result, []);
});
