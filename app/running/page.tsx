import Link from "next/link";
import ActivityBadge from "@/app/compontents/ActivityBadge";
import { fetchGraphQL } from "@/lib/wpgraphql";
import type { Metadata } from "next";
import { notFound } from "next/navigation";


function cleanExcerpt(html: string) {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&#8216;/g, "‘")
    .replace(/&#8217;/g, "’")
    .replace(/&#8220;/g, "“")
    .replace(/&#8221;/g, "”")
    .replace(/&hellip;/g, "More…")
    .replace(/\[.*?&hellip;.*?\]/g, "")
    .trim();
}

type TrekPost = {
  id: string;
  databaseId: number;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  featuredImage: {
    node: {
      sourceUrl: string;
      altText: string;
    } | null;
  } | null;
  runningInformation: {
      avgPace: string | null;
      distance: string | null;
      eventName: string | null;
      finishTime: string | null;
      location: string | null;
      runningType: string | null;
    } | null;
  basicInformation: {
    durationTime: string | null;
    fieldGroupName: string | null;
    locationDetails: string | null;
    subHeadingInBannerImage: string | null;
  } | null;
};

type TrekkingPostsResponse = {
  posts: {
    nodes: TrekPost[];
  };
};

const treksData = await fetchGraphQL<TrekkingPostsResponse>(
  `
    query GetTrekkingPosts($category: String!) {
      posts(
        where: {
          categoryName: $category,
          status: PUBLISH
        }
      ) {
        nodes {
          id
          databaseId
          title
          slug
          date
          excerpt

          featuredImage {
            node {
              sourceUrl
              altText
            }
          }

         runningInformation {
          avgPace
          distance
          eventName
          finishTime
          location
          runningType
        }

          basicInformation {
            durationTime
            fieldGroupName
            locationDetails
            subHeadingInBannerImage
          }
        }
      }
    }
  `,
  {
    category: "Running",
  }
);

const runningPosts = treksData.posts.nodes;
 

export default function Running() {
  return (
    <div className="bg-cream text-charcoal">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[480px] flex items-end pt-16">
        <img
          src="https://images.unsplash.com/photo-1758506971986-b0d0edebd8d5?w=1920&h=900&fit=crop&auto=format"
          alt="Runner on city street"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/10 to-charcoal/80" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16 w-full">
          <p className="font-mono text-xs tracking-[0.25em] uppercase text-cream/50 mb-3">
            Running
          </p>
          <h1 className="font-serif text-5xl md:text-6xl text-cream leading-tight">
            Races & Milestones
          </h1>
          <p className="mt-3 text-sm text-cream/60 max-w-md">
            Every finish line is a beginning. Every split tells a story.
          </p>
        </div>
      </section>

      {/* Career stats */}
      <section className="bg-charcoal text-cream">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-cream/10">
            {[
              { label: "Races finished", value: "9" },
              { label: "Half marathons", value: "8" },
              { label: "Total km run", value: "3,240" },
              { label: "PB Half", value: "2:01:58" },
            ].map((s) => (
              <div key={s.label} className="py-8 px-6 text-center">
                <p className="font-mono text-2xl text-cream">{s.value}</p>
                <p className="font-mono text-[12px] tracking-[0.15em] uppercase text-cream/40 mt-1">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Race list */}

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-serif text-3xl text-charcoal mb-10">
            Race Log
          </h2>
          <div className="space-y-px bg-border">
            {runningPosts.map((running) => (
              <Link
                key={running.id}
                href={`/running/${running.slug}`}
                className="group grid grid-cols-1 md:grid-cols-4 bg-cream hover:bg-muted/50 transition-colors"
              >
                <div className="overflow-hidden bg-muted aspect-video md:aspect-auto md:min-h-[180px]">
                  <img
                    src={running.featuredImage?.node?.sourceUrl || ""}
                    alt={running.featuredImage?.node?.altText || ""}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="md:col-span-3 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <ActivityBadge type="running" />
                      <span className="font-mono text-[12px] tracking-[0.15em] uppercase text-muted-fg">
                        {running.basicInformation?.durationTime || running.basicInformation?.durationTime || "Unknown duration" }
                      </span>
                    </div>
                    <h3 className="font-serif text-2xl text-charcoal group-hover:text-earth transition-colors">
                      {running.title}
                    </h3>
                    <span className="font-mono flex  items-center gap-2 text-gray-700 text-xs text-muted-fg tracking-wide">
                      <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-red-500">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25a7.5 7.5 0 1 1 15 0Z" />
                      </svg>
                      <span>{running.runningInformation?.location}</span>
                    </span>
                   <p className="text-sm text-muted-fg mt-3 leading-relaxed max-w-lg">
                        {cleanExcerpt(running.excerpt)}
                    </p>
                  </div>
                  <p className="text-[12px] tracking-[0.15em] uppercase text-muted-fg">
                  <span className="text-charcoal mb-1.5">Event Name:</span> { running.runningInformation?.eventName }</p>

                  { <div className="flex flex-wrap gap-x-6 gap-y-2 mt-1">
                    {[
                      { label: "Running Type", value: running.runningInformation?.runningType},
                      { label: "Distance", value: running.runningInformation?.distance },
                      { label: "Finish Time", value: running.runningInformation?.finishTime },
                      { label: "Avg Pace", value: running.runningInformation?.avgPace },

                    ].map((s) => (
                      <div key={s.label}>
                        <p className="font-mono text-[12px] tracking-[0.15em] uppercase text-muted-fg">
                          {s.label}
                        </p>
                        <p className="font-mono text-sm text-charcoal mt-0.5">{s.value}</p>
                      </div>
                    ))}
                    <div>
                     
                      {/* <p className={`font-mono text-sm mt-0.5 ${difficultyColor[trek.trekkingInformation?.trekkingDifficulty] ?? "text-charcoal"}`}>
                        {trek.trekkingInformation?.trekkingDifficulty}
                      </p> */}
                    </div>
                  </div> }
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>



      {/* <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-serif text-3xl text-charcoal mb-10">Race Log</h2>

          <div className="space-y-px bg-border">
            {races.map((race) => (
              <Link
                key={race.id}
                href={`/journal/${race.id}`}
                className="group grid grid-cols-1 md:grid-cols-4 bg-cream hover:bg-muted/40 transition-colors"
              >
                <div className="overflow-hidden bg-muted aspect-video md:aspect-auto">
                  <img
                    src={race.image}
                    alt={race.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="md:col-span-3 p-8">
                  <div className="flex items-center gap-3 mb-2">
                    <ActivityBadge type="running" />
                    <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted-fg">
                      {race.category}
                    </span>
                    <span className="font-mono text-[10px] tracking-[0.15em] text-muted-fg">
                      · {race.date}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl text-charcoal group-hover:text-earth transition-colors">
                    {race.name}
                  </h3>
                  <p className="font-mono text-xs text-muted-fg mt-0.5 tracking-wide">
                    {race.location}
                  </p>

                  <div className="grid grid-cols-4 gap-6 mt-6">
                    {[
                      { label: "Distance", value: race.distance },
                      { label: "Time", value: race.time },
                      { label: "Pace", value: race.pace },
                      { label: "Position", value: race.position },
                    ].map((s) => (
                      <div key={s.label}>
                        <p className="font-mono text-[9px] tracking-[0.15em] uppercase text-muted-fg">
                          {s.label}
                        </p>
                        <p className="font-mono text-base text-charcoal mt-0.5">
                          {s.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section> */}
    </div>
  );
}
