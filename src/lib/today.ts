export type Sentiment = "positive" | "negative" | "mixed" | "neutral";

export interface FeedItem {
  id: string;
  title: string;
  summary?: string;
  source?: string;
  sourceType?: string;
  publishedAt?: string;
  sentiment?: Sentiment;
  url?: string;
  subscriptionKey?: string;
}

export interface TodayViewModel {
  date: string;
  title: string;
  generatedAt?: string;
  regimes: Record<"interestRate" | "fx" | "inflation" | "growth", string | null>;
  headlines: FeedItem[];
  issues: FeedItem[];
  trackedIssues: FeedItem[];
  events: FeedItem[];
}

type UnknownRecord = Record<string, unknown>;

const isRecord = (value: unknown): value is UnknownRecord =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const text = (value: unknown): string | undefined =>
  typeof value === "string" && value.trim() ? value : undefined;

function toItem(value: unknown, index: number): FeedItem | null {
  if (!isRecord(value)) return null;
  const title = text(value.title) ?? text(value.headline) ?? text(value.name);
  if (!title) return null;

  const sentiment = text(value.sentiment);
  return {
    id: text(value.id) ?? text(value.doc_id) ?? text(value.subscription_key) ?? `${title}-${index}`,
    title,
    summary: text(value.summary) ?? text(value.text) ?? text(value.description),
    source: text(value.source),
    sourceType: text(value.source_type) ?? text(value.type),
    publishedAt: text(value.published_at) ?? text(value.published_time),
    sentiment:
      sentiment === "positive" || sentiment === "negative" || sentiment === "mixed"
        ? sentiment
        : "neutral",
    url: text(value.news_url) ?? text(value.url),
    subscriptionKey: text(value.subscription_key),
  };
}

const toItems = (value: unknown): FeedItem[] =>
  Array.isArray(value)
    ? value.map(toItem).filter((item): item is FeedItem => item !== null)
    : [];

function regimeValue(source: UnknownRecord, ...keys: string[]): string | null {
  for (const key of keys) {
    const value = source[key];
    if (typeof value === "string" && value.trim()) return value;
    if (isRecord(value)) {
      const nested = text(value.label) ?? text(value.value) ?? text(value.summary);
      if (nested) return nested;
    }
  }
  return null;
}

export function normalizeToday(raw: unknown): TodayViewModel {
  const root = isRecord(raw) ? raw : {};
  const payload = isRecord(root.payload) ? root.payload : {};
  const regimeSource = isRecord(payload.market_regimes)
    ? payload.market_regimes
    : isRecord(payload.regimes)
      ? payload.regimes
      : {};

  const suppliedHeadlines = toItems(payload.headlines);
  const suppliedIssues = toItems(payload.issues);
  const keyIssues = toItems(payload.key_issues);
  const inferredHeadlines = keyIssues.filter((item) =>
    ["news", "disclosure"].includes(item.sourceType ?? ""),
  );
  const inferredIssues = keyIssues.filter(
    (item) => !["news", "disclosure"].includes(item.sourceType ?? ""),
  );

  return {
    date: text(root.page_date) ?? text(payload.page_date) ?? new Date().toISOString().slice(0, 10),
    title: text(root.title) ?? text(payload.headline) ?? "오늘의 주요 흐름",
    generatedAt: text(root.generated_at),
    regimes: {
      interestRate: regimeValue(regimeSource, "interest_rate", "interestRate", "rate"),
      fx: regimeValue(regimeSource, "fx", "exchange_rate", "exchangeRate"),
      inflation: regimeValue(regimeSource, "inflation", "prices"),
      growth: regimeValue(regimeSource, "growth"),
    },
    headlines: suppliedHeadlines.length ? suppliedHeadlines : inferredHeadlines,
    issues: suppliedIssues.length ? suppliedIssues : inferredIssues,
    trackedIssues: toItems(payload.tracked_issues),
    events: toItems(payload.events),
  };
}

export async function getToday(): Promise<{ data: TodayViewModel | null; error: boolean }> {
  const baseUrl = process.env.FINDART_API_BASE_URL;
  if (!baseUrl) return { data: null, error: true };

  try {
    const response = await fetch(`${baseUrl}/today?market=KR`, {
      cache: "no-store",
      headers: { Accept: "application/json" },
    });
    if (!response.ok) throw new Error(`Today API returned ${response.status}`);
    return { data: normalizeToday(await response.json()), error: false };
  } catch (error) {
    console.error("Failed to load Today page", error);
    return { data: null, error: true };
  }
}
