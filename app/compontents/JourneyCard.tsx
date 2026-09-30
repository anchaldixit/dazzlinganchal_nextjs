import Link from "next/link";
//import type { Journey } from "@/data/content";
import ActivityBadge from "./ActivityBadge";
import type { Journey } from "@/app/data/content";

interface Props {
  journey: Journey;
  variant?: "featured" | "default" | "compact";
}

export default function JourneyCard({ journey, variant = "default" }: Props) {
  if (variant === "featured") {
    return (
      <Link href={`/journal/${journey.id}`} className="group block">
        <div className="relative overflow-hidden bg-muted aspect-[4/3]">
          <img
            src={journey.image}
            alt={journey.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6">
            <ActivityBadge type={journey.type} />
            <h3 className="font-serif text-2xl text-cream mt-2 leading-tight">
              {journey.title}
            </h3>
            <p className="text-xs font-mono text-cream/60 mt-1">
              {journey.location} · {journey.date}
            </p>
          </div>
        </div>
        <p className="mt-3 text-sm text-muted-fg leading-relaxed">
          {journey.description}
        </p>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link href={`/journal/${journey.id}`} className="group flex gap-4 items-start">
        <div className="shrink-0 w-20 h-20 overflow-hidden bg-muted">
          <img
            src={journey.image}
            alt={journey.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <div>
          <ActivityBadge type={journey.type} />
          <h4 className="font-serif text-base text-charcoal mt-1 group-hover:text-earth transition-colors">
            {journey.title}
          </h4>
          <p className="text-xs font-mono text-muted-fg mt-0.5">{journey.location}</p>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/journal/${journey.id}`} className="group block">
      <div className="overflow-hidden bg-muted aspect-[3/4]">
        <img
          src={journey.image}
          alt={journey.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="mt-3">
        <ActivityBadge type={journey.type} />
        <h3 className="font-serif text-lg text-charcoal mt-1.5 group-hover:text-earth transition-colors leading-snug">
          {journey.title}
        </h3>
        <p className="text-xs font-mono text-muted-fg mt-1">
          {journey.location} · {journey.date}
        </p>
        <p className="text-sm text-muted-fg mt-2 leading-relaxed line-clamp-2">
          {journey.description}
        </p>
      </div>
    </Link>
  );
}
