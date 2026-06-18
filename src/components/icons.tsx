import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function Icon({ children, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      {children}
    </svg>
  );
}

export const SunIcon = (props: IconProps) => <Icon {...props}><circle cx="12" cy="12" r="3.5"/><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42"/></Icon>;
export const ChartIcon = (props: IconProps) => <Icon {...props}><path d="M4 19V9M10 19V5M16 19v-7M22 19H2"/></Icon>;
export const FileIcon = (props: IconProps) => <Icon {...props}><path d="M6 2h8l4 4v16H6z"/><path d="M14 2v5h5M9 12h6M9 16h6"/></Icon>;
export const StarIcon = (props: IconProps) => <Icon {...props}><path d="m12 3 2.8 5.67 6.2.9-4.5 4.39 1.06 6.19L12 17.22l-5.56 2.93 1.06-6.19L3 9.57l6.2-.9z"/></Icon>;
export const PieIcon = (props: IconProps) => <Icon {...props}><path d="M11 3a9 9 0 1 0 9 9h-9z"/><path d="M14 2.5V9h6.5A9 9 0 0 0 14 2.5z"/></Icon>;
export const ChevronIcon = (props: IconProps) => <Icon {...props}><path d="m9 18 6-6-6-6"/></Icon>;
export const ArrowIcon = (props: IconProps) => <Icon {...props}><path d="M5 12h14M14 7l5 5-5 5"/></Icon>;
export const BellIcon = (props: IconProps) => <Icon {...props}><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/></Icon>;
export const CalendarIcon = (props: IconProps) => <Icon {...props}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></Icon>;
export const MenuIcon = (props: IconProps) => <Icon {...props}><path d="M4 7h16M4 12h16M4 17h16"/></Icon>;
