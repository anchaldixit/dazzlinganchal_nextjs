import Link from "next/link";
import { journeys, locations } from "@/app/data/content";
import ActivityBadge from "@/app/compontents/ActivityBadge";
import JourneyCard from "@/app/compontents/JourneyCard";
import { fetchGraphQL } from "@/lib/wpgraphql";
import Image from "next/image";
import PostList from "@/app/compontents/PostList";


function cleanExcerpt(html: string, wordLimit = 20) {
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


const GetPosts = `
  query GetPosts($first: Int!, $after: String) {
    posts(
      first: $first
      after: $after
      where: {
        status: PUBLISH
      }
    ) {
      nodes {
        id
        title
        slug
        date
        content
        excerpt

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

        tags {
          nodes {
            name
          }
        }

        basicInformation {
          durationTime
          locationDetails
          subHeadingInBannerImage
        }

        trekkingInformation {
          trekkingDistance
          trekkingDifficulty
          trekkingDuration
          trekkingElevation
        }

        runningInformation {
          avgPace
          distance
          eventName
          finishTime
          location
          runningType
        }

        book {
          authorName
          bookRecommendedFor
          pages
          readIn
          year
        }

        noNeedToDetailPage {
          noNeedToDetailPage
        }
      }

      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;


type PostData = {
  id: string;
  title: string;
  slug: string;
  date: string;
  content: string;
  excerpt: string;

  featuredImage: {
    node: {
      sourceUrl: string;
      altText: string;
    } | null;
  } | null;

  tags: {
    nodes: {
      name: string;
    }[];
  } | null;

  categories: {
    nodes: {
      name: string;
      slug: string;
    }[];
  };

  galleryImages: {
    galleryImages: {
      eventGalleryImage: {
        node: {
          id: string;
          databaseId: number;
          sourceUrl: string;
          altText: string | null;
          mediaDetails: {
            width: number;
            height: number;
          } | null;
        } | null;
      } | null;
    }[];
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

  runningInformation: {
    avgPace: string | null;
    distance: string | null;
    eventName: string | null;
    finishTime: string | null;
    location: string | null;
    runningType: string | null;
  } | null;

  book: {
    authorName: string | null;
    bookRecommendedFor: string | null;
    pages: number | null;
    readIn: string | null;
    year: number | null;
  } | null;

  noNeedToDetailPage: {
    noNeedToDetailPage: boolean | null;
  } | null;
};


// GraphQL response type
type PostResponse = {
  posts: {
    nodes: PostData[];
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string | null;
    };
  };
};


const data = await fetchGraphQL<PostResponse>(
  GetPosts,
  {
    first: 6,
    after: null,
  }
);

const posts = data.posts.nodes;

const allowedCategories = [
   "books",
   "trekking",
  "running",
  "travel",
];


  const filteredPosts = posts.filter((post) =>
    post.categories.nodes.some((category) =>
      allowedCategories.includes(category.slug)
    )
  );


export default function LatestJourneys() {
  const [featured, ...rest] = journeys;

  return (
    <div className="bg-cream text-charcoal">

      {/* Header */}
      <div className="pt-16 pb-1 border-border">
        <div className="max-w-7xl mx-auto px-6">

          <p className="font-mono text-xs tracking-[0.25em] uppercase text-muted-fg mb-2">
            Journal
          </p>

          <h1 className="font-serif text-5xl md:text-6xl text-charcoal">
            Stories & Experiences
          </h1>

          <p className="mt-4 text-sm text-muted-fg max-w-md leading-relaxed">
            Documented adventures — unfiltered, honest, and written from the trail.
          </p>

        </div>
      </div>


      {/* Featured post */}
      {/* Your existing commented code */}


      {/* All entries */}
      <section className="py-1">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px  bg-border">
          {filteredPosts.map((post) => {
          const category =
            post.categories.nodes.find((cat) =>
              allowedCategories.includes(cat.slug)
            )?.slug || "journal";

              return (
                <div className="bg-cream p-6">
                <Link
                  key={post.id}
                  href={`/${category}/${post.slug}`}
                  className="group block"
                >
                  <div className="overflow-hidden bg-muted aspect-[3/4]">

                        {post.featuredImage?.node?.sourceUrl ? (
                            <img
                            src={post.featuredImage.node.sourceUrl}
                            alt={post.featuredImage.node.altText || post.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-muted">
                            <span className="font-mono text-xs text-muted-fg">
                                No image
                            </span>
                            </div>
                        )}
                  </div>


                  <div className="mt-3">
                      <ActivityBadge type={category} />

                    <h3 className="font-serif text-lg text-charcoal mt-1.5 group-hover:text-earth transition-colors leading-snug">
                      {post.title}
                    </h3>

                    {/* {post.categories.nodes?.name} */}
                    <p className="text-xs font-mono text-muted-fg mt-1">
                        {post.basicInformation?.locationDetails}
                        {post.book?.authorName}
                        {" · "}
                        {post.basicInformation?.durationTime} {post.book?.readIn}
                    </p>
                    <p className="text-sm text-muted-fg mt-2 leading-relaxed">
                      {cleanExcerpt(post.excerpt, 20)}  Read more
                    </p>

              
                      {/* <p className="text-sm text-muted-fg mt-2 leading-relaxed line-clamp-2">
                      {post.basicInformation?.subHeadingInBannerImage}
                    </p> */}
                  </div>
                </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}