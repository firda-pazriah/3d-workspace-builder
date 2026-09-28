import {
  AirVent,
  Armchair,
  Coffee,
  Cpu,
  Footprints,
  Keyboard,
  LampDesk,
  Laptop,
  Monitor,
  Mouse,
  Speaker,
} from "lucide-react";

// lucide has no desk icon; drawn to match its 24px / 2px-stroke style.
function DeskIcon({ size = 24, className, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path d="M2 8h20" />
      <path d="M4 8v12" />
      <path d="M20 8v12" />
      <path d="M14 8v6h6" />
      <path d="M16 11h2" />
    </svg>
  );
}

// Card artwork per catalogue category: an icon on one of DESIGN.md's
// demo-grid surfaces.
export const CATEGORY_VISUALS = {
  desk: { Icon: DeskIcon, surface: "bg-signature-cream" },
  chair: { Icon: Armchair, surface: "bg-signature-peach" },
  monitor: { Icon: Monitor, surface: "bg-signature-mint" },
  laptop: { Icon: Laptop, surface: "bg-signature-mint" },
  mouse: { Icon: Mouse, surface: "bg-signature-yellow" },
  lamp: { Icon: LampDesk, surface: "bg-signature-yellow" },
  keyboard: { Icon: Keyboard, surface: "bg-signature-peach" },
  speaker: { Icon: Speaker, surface: "bg-signature-mustard" },
  cpu: { Icon: Cpu, surface: "bg-surface-strong" },
  coffee_machine: { Icon: Coffee, surface: "bg-signature-cream" },
  air_care: { Icon: AirVent, surface: "bg-signature-mint" },
  fitness: { Icon: Footprints, surface: "bg-signature-peach" },
};

// Human-readable catalogue category, for the card's category tag.
export const CATEGORY_NAMES = {
  desk: "Desk",
  chair: "Chair",
  monitor: "Monitor",
  laptop: "Laptop",
  mouse: "Mouse",
  lamp: "Lamp",
  keyboard: "Keyboard",
  speaker: "Speaker",
  cpu: "Computer",
  coffee_machine: "Coffee machine",
  air_care: "Air care",
  fitness: "Fitness",
};
