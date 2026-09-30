import Link from "next/link";
import { fetchGraphQL } from "@/lib/wpgraphql";

type FeaturedPost = {
  id: string;
  databaseId: number;
  title: string;
  slug: string;
  date: string;
  uri: string;

  featuredImage: {
    node: {
      sourceUrl: string;
      altText: string;
    } | null;
  } | null;

  categories: {
    nodes: {
      name: string;
      slug: string;
    }[];
  };
};

type FeaturedActivitiesResponse = {
  page: {
    featuredActivities: {
      travelFeaturedPost: {
        edges: {
          node: FeaturedPost;
        }[];
      };

      runningFeaturedPost: {
        edges: {
          node: FeaturedPost;
        }[];
      };

      trekkingFeaturedPost: {
        edges: {
          node: FeaturedPost;
        }[];
      };
    };
  };
};

const FeaturedData = await fetchGraphQL<FeaturedActivitiesResponse>(
  `
  query GetFeaturedActivities {

    page(id: 64, idType: DATABASE_ID) {

      featuredActivities {

        travelFeaturedPost {
          edges {
            node {
              id
              databaseId

              ... on Post {
                title
                slug
                date
                uri

                featuredImage {
                  node {
                    sourceUrl
                    altText
                  }
                }

                categories {
                  nodes {
                    name
                    slug
                  }
                }
              }
            }
          }
        }

        runningFeaturedPost {
          edges {
            node {
              id
              databaseId

              ... on Post {
                title
                slug
                date
                uri

                featuredImage {
                  node {
                    sourceUrl
                    altText
                  }
                }

                categories {
                  nodes {
                    name
                    slug
                  }
                }
              }
            }
          }
        }

        trekkingFeaturedPost {
          edges {
            node {
              id
              databaseId

              ... on Post {
                title
                slug
                date
                uri

                featuredImage {
                  node {
                    sourceUrl
                    altText
                  }
                }

                categories {
                  nodes {
                    name
                    slug
                  }
                }
              }
            }
          }
        }

      }
    }
  }
  `,
);

const activities = FeaturedData.page.featuredActivities;

const FeaturedDataPosts = [
  ...activities.travelFeaturedPost.edges.map(({ node }) => ({
    ...node,
    label: "Travel",
    dot: "bg-blue-500",
    accent: "text-blue-600",
    sub: "Explore my travel experiences.",
  })),

  ...activities.runningFeaturedPost.edges.map(({ node }) => ({
    ...node,
    label: "Running",
    dot: "bg-red-500",
    accent: "text-red-600",
    sub: "Running stories, races and experiences.",
  })),

  ...activities.trekkingFeaturedPost.edges.map(({ node }) => ({
    ...node,
    label: "Trekking",
    dot: "bg-green-500",
    accent: "text-green-600",
    sub: "Mountain journeys and trekking experiences.",
  })),
];

export default function FeaturedActivities() {
  return (
    <section className="py-1 max-w-7xl mx-auto px-6">

      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">

        {FeaturedDataPosts.map((dest) => (

          <Link
            key={dest.id}
            href={dest.uri}
            className="group relative bg-cream overflow-hidden block"
          >

            <div className="aspect-[4/5] overflow-hidden bg-muted">

              <img
                src={
                  dest.featuredImage?.node?.sourceUrl ||
                  "/placeholder.jpg"
                }
                alt={
                  dest.featuredImage?.node?.altText ||
                  dest.title
                }
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-charcoal/30 group-hover:bg-charcoal/20 transition-colors duration-500" />

            </div>

            <div className="p-6">

              <div className="flex items-center gap-2 mb-2">

                <span
                  className={`w-1.5 h-1.5 rounded-full ${dest.dot}`}
                />

                <span
                  className={`font-mono text-xs tracking-[0.2em] uppercase ${dest.accent}`}
                >
                  {dest.label}
                </span>

              </div>

              <h3 className="text-lg font-medium">
                {dest.title}
              </h3>

              <p className="text-sm text-muted-fg leading-relaxed mt-2">
                {dest.sub}
              </p>

              <span className="mt-3 inline-block text-xs tracking-[0.1em] uppercase text-charcoal border-b border-charcoal/30 pb-0.5 group-hover:border-charcoal transition-colors">
                View all →
              </span>

            </div>

          </Link>

        ))}

      </div>

    </section>
  );
}