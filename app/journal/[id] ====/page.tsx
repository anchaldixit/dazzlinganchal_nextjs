"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { journeys } from "@/app/data/content";
import ActivityBadge from "@/app/compontents/ActivityBadge";
import JourneyCard from "@/app/compontents/JourneyCard";

export default function Detail() {
  const { id } = useParams<{ id: string }>();
  const journey = journeys.find((j) => j.id === Number(id)) ?? journeys[0];
  const related = journeys.filter((j) => j.id !== journey.id).slice(0, 3);

  return (
    <div className="bg-cream text-charcoal">
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] flex items-end pt-16">
        <img
          src={journey.image.replace("w=800", "w=1920").replace("h=600", "h=1000")}
          alt={journey.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/20 via-transparent to-charcoal/80" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 pb-16 w-full">
          <ActivityBadge type={journey.type} />
          <h1 className="font-serif text-5xl md:text-7xl text-cream mt-3 leading-tight">
            {journey.title}
          </h1>
          <p className="font-mono text-xs text-cream/50 mt-3 tracking-wider">
            {journey.location} · {journey.date}
          </p>
        </div>
      </section>

      {/* Meta + body */}
      <article className="max-w-4xl mx-auto px-6 py-20">
        {/* Stats if available */}
        {(journey.distance || journey.elevation || journey.time) && (
          <div className="flex flex-wrap gap-px bg-border mb-16">
            {journey.distance && (
              <div className="bg-cream px-6 py-4 flex-1 min-w-[120px]">
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-fg">Distance</p>
                <p className="font-mono text-lg text-charcoal mt-1">{journey.distance}</p>
              </div>
            )}
            {journey.elevation && (
              <div className="bg-cream px-6 py-4 flex-1 min-w-[120px]">
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-fg">Elevation</p>
                <p className="font-mono text-lg text-charcoal mt-1">{journey.elevation}</p>
              </div>
            )}
            {journey.difficulty && (
              <div className="bg-cream px-6 py-4 flex-1 min-w-[120px]">
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-fg">Difficulty</p>
                <p className="font-mono text-lg text-charcoal mt-1">{journey.difficulty}</p>
              </div>
            )}
            {journey.duration && (
              <div className="bg-cream px-6 py-4 flex-1 min-w-[120px]">
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-fg">Duration</p>
                <p className="font-mono text-lg text-charcoal mt-1">{journey.duration}</p>
              </div>
            )}
            {journey.time && (
              <div className="bg-cream px-6 py-4 flex-1 min-w-[120px]">
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-fg">Finish Time</p>
                <p className="font-mono text-lg text-charcoal mt-1">{journey.time}</p>
              </div>
            )}
            {journey.pace && (
              <div className="bg-cream px-6 py-4 flex-1 min-w-[120px]">
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-fg">Avg Pace</p>
                <p className="font-mono text-lg text-charcoal mt-1">{journey.pace}</p>
              </div>
            )}
          </div>
        )}

        {/* Story */}
        <div className="prose-article space-y-6">
          <p className="font-serif text-xl text-charcoal leading-relaxed">
            {journey.description}
          </p>
          <p className="text-sm text-muted-fg leading-relaxed">
            The journey began the way all good ones do — with a predawn alarm, a
            packed bag that felt heavier than expected, and a mix of nerves and
            excitement that made breakfast feel like a ritual. There is something
            about stepping onto a trail before the world wakes up that resets
            something fundamental.
          </p>
          <p className="text-sm text-muted-fg leading-relaxed">
            By midday, the altitude was doing what altitude does — slowing the
            body while sharpening the mind. Conversations became shorter, steps
            became more deliberate, and the destination felt both closer and further
            away. That contradiction is the whole point.
          </p>

          <blockquote className="border-l-2 border-earth pl-6 py-2 my-10">
            <p className="font-serif italic text-2xl text-charcoal leading-relaxed">
              &ldquo;The view at the top is never about the view. It&apos;s about
              knowing you earned the right to stand there.&rdquo;
            </p>
          </blockquote>

          <p className="text-sm text-muted-fg leading-relaxed">
            I came back different. Not dramatically, not in any way I could explain
            to anyone who wasn&apos;t there. But different in the way that matters
            — with a slightly revised understanding of what I&apos;m capable of,
            and a very strong desire to do it again.
          </p>
        </div>

        {/* Secondary image */}
        <div className="my-16 aspect-video overflow-hidden bg-muted">
          <img
            src={journey.image.replace("h=600", "h=700")}
            alt={`${journey.title} — additional photo`}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="space-y-5 text-sm text-muted-fg leading-relaxed">
          <p>
            Planning the logistics was its own adventure. Permits, accommodation,
            gear lists — each a small problem to solve before the real challenge
            even begins. I&apos;ve learned to enjoy that phase too. The preparation
            is part of the experience.
          </p>
          <p>
            If you&apos;re considering this route yourself: go. Don&apos;t wait
            until you&apos;re &ldquo;fit enough&rdquo; or &ldquo;free enough.&rdquo; The right
            time is always now, and the best version of any journey is the one
            you actually take.
          </p>
        </div>
      </article>

      {/* Related */}
      <section className="border-t border-border py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-serif text-3xl text-charcoal mb-10">
            Related journeys
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
            {related.map((j) => (
              <div key={j.id} className="bg-cream p-6">
                <JourneyCard journey={j} />
              </div>
            ))}
          </div>
          <div className="mt-12">
            <Link
              href="/journal"
              className="text-xs tracking-[0.12em] uppercase text-charcoal border-b border-charcoal/30 pb-0.5 hover:border-charcoal transition-colors"
            >
              ← All stories
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
