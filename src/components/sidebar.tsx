import { ChartIcon, FileIcon, PieIcon, StarIcon, SunIcon } from "./icons";

const navigation = [
  { label: "Today", icon: SunIcon, active: true },
  { label: "Economy Overview", icon: ChartIcon },
  { label: "Policy Briefing", icon: FileIcon },
  { label: "Featured", icon: StarIcon },
  { label: "Portfolio Analysis", icon: PieIcon },
];

export function Sidebar() {
  return (
    <aside className="hidden h-screen w-[244px] shrink-0 border-r border-line bg-canvas px-3 py-4 lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:flex-col">
      <div className="flex h-10 items-center gap-2.5 px-3">
        <span className="flex size-7 items-center justify-center rounded-lg bg-ink text-[12px] font-semibold tracking-tight text-white">fD</span>
        <span className="text-[15px] font-semibold tracking-[-0.02em] text-ink">finDART</span>
      </div>

      <nav className="mt-7 space-y-1" aria-label="주요 메뉴">
        {navigation.map(({ label, icon: NavIcon, active }) => (
          <div
            key={label}
            className={`group flex h-10 items-center gap-3 rounded-lg px-3 text-[14px] ${
              active ? "bg-[#efefed] font-medium text-ink" : "cursor-default text-[#8a8985]"
            }`}
            aria-current={active ? "page" : undefined}
            title={active ? undefined : "준비 중인 메뉴입니다"}
          >
            <NavIcon className="size-[18px]" />
            <span>{label}</span>
            {!active && <span className="ml-auto rounded px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wider text-[#aaa9a5] opacity-0 transition-opacity group-hover:opacity-100">Soon</span>}
          </div>
        ))}
      </nav>

      <div className="mt-auto border-t border-line px-3 pt-4 text-[11px] leading-5 text-[#aaa9a5]">
        <p>Data-backed market intelligence</p>
        <p>finDART © 2026</p>
      </div>
    </aside>
  );
}
