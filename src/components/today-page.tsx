import { ArrowIcon, BellIcon, CalendarIcon, ChevronIcon } from "./icons";
import type { FeedItem, TodayViewModel } from "@/lib/today";

const regimeCards = [
  { key: "interestRate" as const, label: "금리 국면", mark: "%" },
  { key: "fx" as const, label: "환율 국면", mark: "₩" },
  { key: "inflation" as const, label: "물가 국면", mark: "↗" },
  { key: "growth" as const, label: "성장 국면", mark: "G" },
];

const sentimentColor = {
  positive: "bg-emerald-500",
  negative: "bg-rose-400",
  mixed: "bg-amber-400",
  neutral: "bg-zinc-300",
};

function formatDate(date: string) {
  const parsed = new Date(`${date}T00:00:00+09:00`);
  if (Number.isNaN(parsed.getTime())) return date;
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "short",
    timeZone: "Asia/Seoul",
  }).format(parsed);
}

function formatGeneratedAt(date?: string) {
  if (!date) return null;
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return null;
  return new Intl.DateTimeFormat("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Seoul",
  }).format(parsed);
}

function weekendCopy(date: string) {
  const [year, month, dayOfMonth] = date.split("-").map(Number);
  const day = new Date(Date.UTC(year, month - 1, dayOfMonth)).getUTCDay();
  if (day === 6) return { eyebrow: "Weekly Review", description: "이번 주 시장을 움직인 이슈를 정리했습니다." };
  if (day === 0) return { eyebrow: "Week Ahead", description: "다음 주 확인해야 할 주요 이슈를 미리 살펴봅니다." };
  return { eyebrow: "Daily Brief", description: "오늘 시장에서 놓치지 말아야 할 흐름입니다." };
}

function FeedList({ items, empty }: { items: FeedItem[]; empty: string }) {
  if (!items.length) {
    return <div className="flex min-h-28 items-center justify-center px-5 text-center text-[13px] text-[#aaa9a5]">{empty}</div>;
  }

  return (
    <div className="divide-y divide-line">
      {items.slice(0, 4).map((item) => {
        const content = (
          <div className="group flex gap-3 px-5 py-4 sm:px-6">
            <span className={`mt-[7px] size-1.5 shrink-0 rounded-full ${sentimentColor[item.sentiment ?? "neutral"]}`} />
            <div className="min-w-0 flex-1">
              <div className="flex items-start gap-2">
                <h3 className="text-[14px] font-medium leading-5 text-[#343432] group-hover:text-black">{item.title}</h3>
                <ChevronIcon className="mt-1 size-3.5 shrink-0 text-[#c1c0bc] transition-transform group-hover:translate-x-0.5" />
              </div>
              {item.summary && <p className="mt-1.5 line-clamp-2 text-[12px] leading-[1.65] text-[#888782]">{item.summary}</p>}
            </div>
          </div>
        );
        return item.url ? <a key={item.id} href={item.url} target="_blank" rel="noreferrer">{content}</a> : <div key={item.id}>{content}</div>;
      })}
    </div>
  );
}

function SectionTitle({ children, count }: { children: React.ReactNode; count?: number }) {
  return (
    <div className="flex h-14 items-center border-b border-line px-5 sm:px-6">
      <h2 className="text-[14px] font-semibold tracking-[-0.01em] text-ink">{children}</h2>
      {typeof count === "number" && <span className="ml-2 text-[11px] tabular-nums text-[#aaa9a5]">{count}</span>}
    </div>
  );
}

export function TodayPage({ data }: { data: TodayViewModel }) {
  const copy = weekendCopy(data.date);
  const updatedAt = formatGeneratedAt(data.generatedAt);

  return (
    <main className="mx-auto w-full max-w-[1120px] px-5 pb-20 pt-10 sm:px-8 sm:pt-14 xl:px-10">
      <div className="mb-9 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9a9994]">{copy.eyebrow}</p>
          <h1 className="text-[30px] font-semibold tracking-[-0.04em] text-ink sm:text-[34px]">Today</h1>
          <p className="mt-2 text-[14px] text-muted">{copy.description}</p>
        </div>
        <div className="flex items-center gap-2 text-[12px] text-[#8b8a85]">
          <CalendarIcon className="size-4" />
          <time dateTime={data.date}>{formatDate(data.date)}</time>
          {updatedAt && <><span className="text-[#d3d2ce]">·</span><span>{updatedAt} 업데이트</span></>}
        </div>
      </div>

      <section aria-labelledby="market-title">
        <div className="mb-3 flex items-center justify-between">
          <h2 id="market-title" className="text-[12px] font-semibold uppercase tracking-[0.13em] text-[#8b8a85]">Market</h2>
          <span className="rounded-md bg-[#f0f0ed] px-2 py-1 text-[10px] font-medium text-[#777671]">KR</span>
        </div>
        <div className="grid overflow-hidden rounded-xl border border-line bg-white shadow-soft sm:grid-cols-2 xl:grid-cols-4">
          {regimeCards.map((card) => (
            <article key={card.key} className="min-h-[132px] border-t border-line p-5 first:border-t-0 sm:border-t-0 sm:p-6 sm:[&:nth-child(even)]:border-l sm:[&:nth-child(n+3)]:border-t xl:border-l xl:border-t-0 xl:first:border-l-0">
              <div className="flex items-center justify-between">
                <p className="text-[12px] font-medium text-[#8a8985]">{card.label}</p>
                <span className="flex size-7 items-center justify-center rounded-md bg-[#f5f5f3] text-[11px] font-medium text-[#777671]">{card.mark}</span>
              </div>
              <p className={`mt-7 text-[17px] font-semibold tracking-[-0.02em] ${data.regimes[card.key] ? "text-[#302f2d]" : "text-[#bbb9b4]"}`}>
                {data.regimes[card.key] ?? "데이터 대기 중"}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-6 grid overflow-hidden rounded-xl border border-line bg-white shadow-soft md:grid-cols-2" aria-label="오늘의 주요 소식">
        <div className="md:border-r md:border-line">
          <SectionTitle count={data.headlines.length}>Headlines</SectionTitle>
          <FeedList items={data.headlines} empty="등록된 헤드라인이 없습니다." />
        </div>
        <div className="border-t border-line md:border-t-0">
          <SectionTitle count={data.issues.length}>Issues</SectionTitle>
          <FeedList items={data.issues} empty="등록된 주요 이슈가 없습니다." />
        </div>
      </section>

      <section className="mt-6 overflow-hidden rounded-xl border border-line bg-white shadow-soft" aria-labelledby="tracking-title">
        <div className="flex min-h-14 items-center justify-between border-b border-line px-5 sm:px-6">
          <div className="flex items-center gap-2.5">
            <BellIcon className="size-4 text-[#85847f]" />
            <h2 id="tracking-title" className="text-[14px] font-semibold text-ink">Issue Tracking</h2>
          </div>
          <span className="text-[11px] text-[#aaa9a5]">{data.trackedIssues.length}개 추적 중</span>
        </div>
        {data.trackedIssues.length ? (
          <div className="grid sm:grid-cols-2">
            {data.trackedIssues.map((item, index) => (
              <article key={item.id} className={`p-5 sm:p-6 ${index % 2 ? "border-t border-line sm:border-l sm:border-t-0" : index > 1 ? "border-t border-line" : ""}`}>
                <p className="text-[14px] font-medium text-[#343432]">{item.title}</p>
                {item.summary && <p className="mt-2 line-clamp-2 text-[12px] leading-5 text-[#888782]">{item.summary}</p>}
              </article>
            ))}
          </div>
        ) : (
          <div className="flex min-h-28 flex-col items-center justify-center px-5 py-6 text-center">
            <p className="text-[13px] font-medium text-[#777671]">추적 중인 이슈가 없습니다</p>
            <p className="mt-1 text-[12px] text-[#aaa9a5]">관심 이슈를 추가하면 변화가 여기에 모입니다.</p>
          </div>
        )}
      </section>

      <section className="mt-6 overflow-hidden rounded-xl border border-line bg-white shadow-soft" aria-labelledby="events-title">
        <SectionTitle count={data.events.length}><span id="events-title">Events</span></SectionTitle>
        {data.events.length ? (
          <div className="divide-y divide-line">
            {data.events.map((event) => (
              <article key={event.id} className="flex items-start gap-4 px-5 py-4 sm:px-6">
                <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#f4f4f1]"><CalendarIcon className="size-4 text-[#777671]" /></span>
                <div className="flex-1"><p className="text-[14px] font-medium text-[#343432]">{event.title}</p>{event.summary && <p className="mt-1 text-[12px] leading-5 text-[#888782]">{event.summary}</p>}</div>
                <ArrowIcon className="mt-2 size-4 text-[#bbb9b4]" />
              </article>
            ))}
          </div>
        ) : (
          <div className="flex min-h-24 items-center justify-center px-5 text-[13px] text-[#aaa9a5]">오늘 예정된 이벤트가 없습니다.</div>
        )}
      </section>
    </main>
  );
}

export function TodayError() {
  return (
    <main className="mx-auto flex min-h-[70vh] w-full max-w-[1120px] items-center justify-center px-5">
      <div className="max-w-sm text-center">
        <div className="mx-auto mb-4 flex size-10 items-center justify-center rounded-xl bg-[#f0f0ed] text-lg text-muted">!</div>
        <h1 className="text-lg font-semibold text-ink">Today를 불러오지 못했습니다</h1>
        <p className="mt-2 text-sm leading-6 text-muted">API 서버 연결 상태를 확인한 뒤 페이지를 새로고침해 주세요.</p>
      </div>
    </main>
  );
}
