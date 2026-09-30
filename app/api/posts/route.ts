import { NextResponse } from "next/server";
import { fetchGraphQL } from "@/lib/wpgraphql";

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



      }

      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export async function POST(request: Request) {
  const body = await request.json();

  const data = await fetchGraphQL<any>(
    GetPosts,
    {
      first: 12,
      after: body.after || null,
    }
  );

  return NextResponse.json({
    posts: data.posts.nodes,
    pageInfo: data.posts.pageInfo,
  });
}