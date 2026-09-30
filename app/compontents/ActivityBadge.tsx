import type { ActivityType } from "@/app/data/content";

const styles: Record<ActivityType, string> = {
  travel: "text-travel border-travel/40",
  trekking: "text-trek border-trek/40",
  running: "text-run border-run/40",
  cycling: "text-earth border-earth/40",
  books: "text-earth border-earth/40",


};

const labels: Record<ActivityType, string> = {
  travel: "Travel",
  trekking: "Trekking",
  running: "Running",
  cycling: "Cycling",
  books: "books",


};

export default function ActivityBadge({ type }: { type: ActivityType }) {
  return (
    <span
      className={`inline-block text-[10px] font-mono tracking-[0.2em] uppercase border px-2 py-0.5 ${styles[type]}`}
    >
      {labels[type]}
    </span>
  );
}
