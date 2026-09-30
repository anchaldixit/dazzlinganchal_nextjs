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
  trekkingInformation: {
    trekkingDistance: string | null;
    trekkingDifficulty: string | null;
    trekkingDuration: string | null;
    trekkingElevation: string | null;
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

          trekkingInformation {
            trekkingDistance
            trekkingDifficulty
            trekkingDuration
            trekkingElevation
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
    category: "Trekking",
  }
);

const treksPosts = treksData.posts.nodes;




const difficultyColor: Record<string, string> = {
  "Easy–Moderate": "text-trek",
  Moderate: "text-travel",
  "Moderate–Difficult": "text-earth",
  Difficult: "text-run",
};

export default function Trekking() {
  return (
    <div className="bg-cream text-charcoal">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[480px] flex items-end pt-16">
        <img
          src="https://images.unsplash.com/photo-1486525546686-3cd5484691f4?w=1920&h=900&fit=crop&auto=format"
          alt="Person before mountain range"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/20 to-charcoal/75" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16 w-full">
          <p className="font-mono text-xs tracking-[0.25em] uppercase text-cream/50 mb-3">
            Trekking
          </p>
          <h1 className="font-serif text-5xl md:text-6xl text-cream leading-tight">
            Trails & Summits
          </h1>
          <p className="mt-3 text-sm text-cream/60 max-w-md">
            Every mountain has a lesson. You just have to earn the right to hear it.
          </p>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-charcoal text-cream">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-3 divide-x divide-cream/10">
            {[
              { label: "Treks completed", value: "10" },
              { label: "Total distance", value: "780 km" },
              { label: "Highest point", value: "15,150 ft" },
            ].map((s) => (
              <div key={s.label} className="py-8 px-6 text-center">
                <p className="font-mono text-2xl text-cream">{s.value}</p>
                <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-cream/40 mt-1">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trek list */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-serif text-3xl text-charcoal mb-10">
            All Treks
          </h2>
          <div className="space-y-px bg-border">
            {treksPosts.map((trek) => (
              <Link
                key={trek.id}
                href={`/trekking/${trek.slug}`}
                className="group grid grid-cols-1 md:grid-cols-4 bg-cream hover:bg-muted/50 transition-colors"
              >
                <div className="overflow-hidden bg-muted aspect-video md:aspect-auto md:min-h-[180px]">
                  <img
                    src={trek.featuredImage?.node?.sourceUrl || ""}
                    alt={trek.featuredImage?.node?.altText || ""}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="md:col-span-3 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <ActivityBadge type="trekking" />
                      <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted-fg">
                        {trek.basicInformation?.durationTime || trek.basicInformation?.durationTime || "Unknown duration" }
                      </span>
                    </div>
                    <h3 className="font-serif text-2xl text-charcoal group-hover:text-earth transition-colors">
                      {trek.title}
                    </h3>
                    <p className="font-mono text-xs text-muted-fg mt-0.5 tracking-wide">
                      {/* {trek.location} */}
                    </p>
                   <p className="text-sm text-muted-fg mt-3 leading-relaxed max-w-lg">
                        {cleanExcerpt(trek.excerpt)}

                    </p>
                  </div>

                  { <div className="flex flex-wrap gap-x-6 gap-y-2 mt-5">
                    {[
                      { label: "Distance", value: trek.trekkingInformation?.trekkingDistance },
                      { label: "Elevation", value: trek.trekkingInformation?.trekkingElevation },
                      { label: "Duration", value: trek.trekkingInformation?.trekkingDuration },
                    ].map((s) => (
                      <div key={s.label}>
                        <p className="font-mono text-[9px] tracking-[0.15em] uppercase text-muted-fg">
                          {s.label}
                        </p>
                        <p className="font-mono text-sm text-charcoal mt-0.5">{s.value}</p>
                      </div>
                    ))}
                    <div>
                      <p className="font-mono text-[9px] tracking-[0.15em] uppercase text-muted-fg">
                        Difficulty
                      </p>
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
    </div>
  );
}
