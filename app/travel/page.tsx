import Link from "next/link";
import ActivityBadge from "@/app/compontents/ActivityBadge";
import { journeys } from "@/app/data/content";
import { fetchGraphQL } from "@/lib/wpgraphql";





function cleanExcerpt(html: string, wordLimit = 14) {
  const text = html
    .replace(/<[^>]*>/g, " ")       // HTML tags remove
    .replace(/&nbsp;/g, " ")        // nbsp remove
    .replace(/&#8216;/g, "'")
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8230;/g, "...")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();

  const words = text.split(" ");

  if (words.length <= wordLimit) {
    return text;
  }

  return words.slice(0, wordLimit).join(" ") + "...";
}




type TravelPost = {
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
  basicInformation: {
    durationTime: string | null;
    fieldGroupName: string | null;
    locationDetails: string | null;
    subHeadingInBannerImage: string | null;
  } | null;
};

type TravelPostsResponse = {
  posts: {
    nodes: TravelPost[];
  };
};

const TravelData = await fetchGraphQL<TravelPostsResponse>(
  `
    query GetTravelPosts($category: String!) {
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
    category: "travel",
  }
);

const travelPosts = TravelData.posts.nodes;
















const travelJourneys = journeys.filter((j) => j.type === "travel");

const destinations = [
  {
    name: "Spiti Valley",
    state: "Himachal Pradesh",
    count: 3,
    image:
      "https://images.unsplash.com/photo-1764796834177-c06b81b322f1?w=1200&h=700&fit=crop&auto=format",
    alt: "White monastery in green Spiti valley",
    featured: true,
    snippet:
      "High altitude desert, ancient monasteries, and roads that end at the sky.",
  },
  {
    name: "Hampi",
    state: "Karnataka",
    count: 2,
    image:
      "https://images.unsplash.com/photo-1773680690692-8e94e1794f9f?w=800&h=600&fit=crop&auto=format",
    alt: "Stone temple ruins through archway",
    featured: false,
    snippet: "Boulders, ruins, and a river that witnessed an empire rise and fall.",
  },
  {
    name: "Leh–Ladakh",
    state: "Ladakh",
    count: 4,
    image:
      "https://images.unsplash.com/photo-1504193902866-27cfb5aafcc8?w=800&h=600&fit=crop&auto=format",
    alt: "Woman standing on cliff overlooking valley",
    featured: false,
    snippet: "The sky feels closer at 3,500 metres. So does everything that matters.",
  },
];








export default function Travel() {
  return (
    <div className="bg-cream text-charcoal">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[480px] flex items-end pt-16">
        <img
          src="/travel-banner.jpg?w=1920&h=900&fit=crop&auto=format"
          alt="my on mountain cliff"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/20 to-charcoal/70" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16 w-full">
          <p className="font-mono text-xs tracking-[0.25em] uppercase text-cream/50 mb-3">
            Travel
          </p>
          <h1 className="font-serif text-5xl md:text-6xl text-cream leading-tight">
            Places & Journeys
          </h1>
          <p className="mt-3 text-sm text-cream/60 max-w-md">
            Every destination is a question. The journey is the answer.
          </p>
        </div>
      </section>

      {/* Featured destination */}
      <section className="py-20 border-b border-border">
        <div className="max-w-7xl mx-auto px-6">
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-muted-fg mb-8">
            Featured Destination
          </p>
          <Link href="/journal/5" className="group grid grid-cols-1 lg:grid-cols-5 gap-px bg-border">
            <div className="lg:col-span-3 overflow-hidden bg-muted">
              <img
                src={destinations[0].image}
                alt={destinations[0].alt}
                className="w-full h-full object-cover aspect-video lg:aspect-auto min-h-[360px] transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="lg:col-span-2 bg-cream p-10 flex flex-col justify-center">
              <ActivityBadge type="travel" />
              <h2 className="font-serif text-3xl md:text-4xl text-charcoal mt-4 leading-tight">
                {destinations[0].name}
              </h2>
              <p className="font-mono text-xs text-muted-fg mt-1 tracking-wide">
                {destinations[0].state} · {destinations[0].count} visits
              </p>
              <p className="text-sm text-muted-fg mt-5 leading-relaxed max-w-xs">
                {destinations[0].snippet}
              </p>
              <span className="mt-8 text-xs tracking-[0.12em] uppercase text-charcoal border-b border-charcoal/30 pb-0.5 group-hover:border-charcoal transition-colors w-fit">
                Read the story →
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* Travel grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-serif text-3xl text-charcoal mb-10">
            All Destinations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {travelPosts.map((dest) => (
             <div className="bg-cream p-6">
               <Link
                key={dest.id}
                href={`/travel/${dest.slug}`}
                className="group bg-cream block"
              >
                <div className="overflow-hidden bg-muted aspect-[4/3]">
                   <img
                    src={dest.featuredImage?.node?.sourceUrl || ""}
                    alt={dest.featuredImage?.node?.altText || ""}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                </div>
                <div className="p-5">
                  <ActivityBadge type="travel" />
                  <h3 className="font-serif text-xl text-charcoal mt-2 group-hover:text-earth transition-colors">
                    {dest.title}
                  </h3>
                    <p className="font-mono text-xs text-muted-fg mt-0.5 tracking-wide">
                    {dest.basicInformation?.locationDetails}
                    {" · "}
                    {dest.basicInformation?.durationTime} 
                </p>
                 
                  <p className="text-sm text-muted-fg mt-3 leading-relaxed line-clamp-2">
                    {cleanExcerpt(dest.excerpt)}
                    
                  </p>
                </div>
              </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
