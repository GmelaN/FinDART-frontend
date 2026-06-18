export function MobileNav() {
  return (
    <header className="flex h-14 items-center justify-between border-b border-line bg-canvas px-5 lg:hidden">
      <div className="flex items-center gap-2.5">
        <span className="flex size-7 items-center justify-center rounded-lg bg-ink text-[11px] font-semibold text-white">fD</span>
        <span className="text-sm font-semibold text-ink">finDART</span>
      </div>
      <span className="rounded-md bg-[#efefed] px-2.5 py-1 text-[11px] font-medium text-[#676661]">Today</span>
    </header>
  );
}
