import Link from "next/link";
import { journeys, locations } from "@/app/data/content";
import ActivityBadge from "@/app/compontents/ActivityBadge";
import JourneyCard from "@/app/compontents/JourneyCard";
import { fetchGraphQL } from "@/lib/wpgraphql";
import Image from "next/image";
import PostList from "@/app/compontents/PostList";


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
    first: 12,
    after: null,
  }
);

const posts = data.posts.nodes;


export default function Journal() {
  const [featured, ...rest] = journeys;

  return (
    <div className="bg-cream text-charcoal">

      {/* Header */}
      <div className="pt-28 pb-14 border-b border-border">
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
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">

          <PostList
            initialPosts={posts}
            initialCursor={data.posts.pageInfo.endCursor}
            initialHasNextPage={data.posts.pageInfo.hasNextPage}
          />

        </div>
      </section>


    </div>
  );
}