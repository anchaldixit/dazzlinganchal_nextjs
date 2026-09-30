import Link from "next/link";
import { fetchGraphQL } from "@/lib/wpgraphql";
import Image from "next/image";
import GalleryLightbox from "@/app/compontents/common/GalleryLightbox";
import type { Metadata } from "next";


type Props = {
  params: Promise<{
    category: string;
    slug: string;
  }>;
};



const PostSeoData = `
  query PostSeoData($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      title
      slug
      date
      modified

      seo {
        title
        description
        focusKeywords
        canonicalUrl
        robots

        openGraph {
          image {
            secureUrl
            width
            height
          }
        }

        jsonLd {
          raw
        }
      }
    }
  }
`;

type PostSeoDataResponse = {
  post: {
    title: string;
    slug: string;
    date: string;
    modified: string;
    seo: {
      title: string | null;
      description: string | null;
      focusKeywords: string[];
      canonicalUrl: string | null;
      robots: string[] | null;
      openGraph: {
        image: {
          secureUrl: string | null;
          width: number | null;
          height: number | null;
        } | null;
      } | null;
      jsonLd: {
        raw: string | null;
      } | null;
    } | null;
  } | null;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { category, slug } = await params;

  const data = await fetchGraphQL<PostSeoDataResponse>(
    PostSeoData,
    { slug }
  );

  const post = data.post;

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const siteUrl = "https://dazzlinganchal.fun";
  const pageUrl = `${siteUrl}/${category}/${slug}`;

  return {
    title: post.seo?.title || post.title,

    description: post.seo?.description || "",

    alternates: {
      canonical: pageUrl,
    },

    openGraph: {
      title: post.seo?.title || post.title,
      description: post.seo?.description || "",
      url: pageUrl,

      images: post.seo?.openGraph?.image?.secureUrl
        ? [
            {
              url: post.seo.openGraph.image.secureUrl,
              width:
                post.seo.openGraph.image.width || undefined,
              height:
                post.seo.openGraph.image.height || undefined,
            },
          ]
        : undefined,

      type: "article",
    },
  };
}

export default async function DetailPage({ params }: Props) {
  const { category, slug } = await params;

  const seoData = await fetchGraphQL<PostSeoDataResponse>(
    PostSeoData,
    { slug }
  );

  const seoPost = seoData.post;

  const siteUrl = "https://dazzlinganchal.fun";
  const pageUrl = `${siteUrl}/${category}/${slug}`;

  let jsonLd = seoPost?.seo?.jsonLd?.raw || "";

  if(jsonLd) {
    jsonLd = jsonLd
      .replace(/<script[^>]*>/, "")
      .replace(/<\/script>/, "");

    // Rank Math ka WordPress post URL
    const wpPostUrl = `https://controller.dazzlinganchal.fun/${slug}/`;

    // Post URL ko frontend URL se replace karo
    jsonLd = jsonLd.replace(
      new RegExp(
        wpPostUrl.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
        "g"
      ),
      pageUrl
    );

    // WebPage #webpage references bhi frontend URL par
    jsonLd = jsonLd.replace(
      new RegExp(
        `${wpPostUrl.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}#webpage`,
        "g"
      ),
      `${pageUrl}#webpage`
    );

    // Agar Rank Math URL without trailing slash generate kare
    const wpPostUrlWithoutSlash =
      `https://controller.dazzlinganchal.fun/${slug}`;

    jsonLd = jsonLd.replace(
      new RegExp(
        `${wpPostUrlWithoutSlash.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?!/)`,
        "g"
      ),
      pageUrl
    );
  }


  const GetRelatedPosts = `
    query GetRelatedPosts($category: String!) {
      posts(
        first: 4
        where: {
          categoryName: $category
        }
      ) {
        nodes {
          id
          databaseId
          title
          slug
          excerpt
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
        }
      }
    }
  `;

  type RelatedPost = {
    id: string;
    databaseId: number;
    title: string;
    slug: string;
    excerpt: string;
    featuredImage?: {
      node?: {
        sourceUrl: string;
        altText?: string | null;
      } | null;
    } | null;
  };

  type RelatedPostsResponse = {
    posts: {
      nodes: RelatedPost[];
    };
  };

  const relatedData = await fetchGraphQL<RelatedPostsResponse>(
    GetRelatedPosts,
    {
      category,
    }
  );

  const related = relatedData.posts.nodes
  .filter((post) => post.slug !== slug)
  .slice(0, 3);


  // Common data to post details page
    // =========================
  // Common Post Data
  // =========================

  const GetPost = `
    query GetPost($slug: ID!) {
      post(id: $slug, idType: SLUG) {
        id
        title
        slug
        date
        content

        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        tags {
          nodes {
            name
          }
        }

        galleryImages {
          galleryImages {
            eventGalleryImage {
              node {
                id
                databaseId
                sourceUrl
                altText
                mediaDetails {
                  width
                  height
                }
              }
            }
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

        runningInformation {
          avgPace
          distance
          eventName
          finishTime
          location
          runningType
        }

        book{
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
    }
  `;

  type PostData = {
  id: string;
  title: string;
  slug: string;
  date: string;
  content: string;

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

  gallery: {
    id: string;
    databaseId: number;
    sourceUrl: string;
    altText: string | null;
    mediaDetails: {
      width: number;
      height: number;
    } | null;
  }[];

  stats: {
    label: string;
    value: string | null;
  }[];

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

  type PostResponse = {
    post: PostData | null;
  };

  const data = await fetchGraphQL<PostResponse>(
    GetPost,
    { slug }
  );

  const post = data.post;

  let pageData: PostData | null = null;



  if (post) {
    pageData = {
      ...post,

      gallery:
        post.galleryImages?.galleryImages
          ?.map((item) => item.eventGalleryImage?.node)
          .filter(
            (image): image is NonNullable<typeof image> => !!image
          ) ?? [],

      stats: [],
    };

    // Trekking specific data
    if (category === "trekking") {
      // pageData.stats = [
      //   {
      //     label: "Distance",
      //     value: post.trekkingInformation?.trekkingDistance ?? null,
      //   },
      //   {
      //     label: "Elevation",
      //     value: post.trekkingInformation?.trekkingElevation ?? null,
      //   },
      //   {
      //     label: "Difficulty",
      //     value: post.trekkingInformation?.trekkingDifficulty ?? null,
      //   },
      //   {
      //     label: "Duration",
      //     value: post.trekkingInformation?.trekkingDuration ?? null,
      //   },
      // ].filter((item) => item.value);
    }
  }


  if (category === "running") {
    // Running GraphQL query
     // currentPostId = runningPost?.databaseId ?? null;

  }

  if (category === "journal") {
    // Journal GraphQL query
   // currentPostId = journalPost?.databaseId ?? null;
  }

    if (category === "books") {
    // books GraphQL query
   // currentPostId = booksPost?.databaseId ?? null;
  }

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLd,
          }}
        />
      )}


  <div className="bg-cream text-charcoal">
     {/* Hero */}
    <section className="relative h-[700px] w-full">

      <Image
        src={pageData?.featuredImage?.node?.sourceUrl ?? ""}
        alt={
          pageData?.featuredImage?.node?.altText ??
          pageData?.title ??
          "Post"
        }
        fill
        sizes="100vw"
        preload
        className="object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/20 via-transparent to-charcoal/80" />

      {/* Text at bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <div className="max-w-4xl mx-auto px-6 pb-16 w-full">

          {category === "trekking" && pageData && (
            <span className="text-cream">
              Trekking
            </span>
          )}

          <h1 className="font-serif text-5xl md:text-7xl text-cream mt-3 leading-tight">
            {pageData?.title}
          </h1>

          <p className="font-mono text-xs text-cream/50 mt-3 tracking-wider">
            {post?.basicInformation?.locationDetails}
            {" · "}
            {post?.basicInformation?.durationTime}
          </p>

        </div>
      </div>

    </section>


      {/* Meta + body */}
      <article className="max-w-4xl mx-auto px-6 py-7">
        {/* Stats if available */}
          {post?.runningInformation?.eventName && (
            <div className="bg-cream px-6 py-4 flex-1 min-w-[120px]">
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-fg">Event Name</p>
              <p className="font-mono text-lg text-charcoal mt-1">{post.runningInformation.eventName}</p>
            </div>
          )}

        {category === "trekking" && (
          (post?.trekkingInformation?.trekkingDistance ||
            post?.trekkingInformation?.trekkingElevation ||
            post?.trekkingInformation?.trekkingDifficulty ||
            post?.trekkingInformation?.trekkingDuration) && (
            <div className="flex flex-wrap gap-px bg-border mb-1">
              {post?.trekkingInformation?.trekkingDistance && (
                <div className="bg-cream px-6 py-4 flex-1 min-w-[120px]">
                  <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-fg">Distance</p>
                  <p className="font-mono text-lg text-charcoal mt-1">{post.trekkingInformation.trekkingDistance}</p>
                </div>
              )}
              {post?.trekkingInformation?.trekkingElevation && (
                <div className="bg-cream px-6 py-4 flex-1 min-w-[120px]">
                  <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-fg">Elevation</p>
                  <p className="font-mono text-lg text-charcoal mt-1">{post.trekkingInformation.trekkingElevation}</p>
                </div>
              )}
              {post?.trekkingInformation?.trekkingDifficulty && (
                <div className="bg-cream px-6 py-4 flex-1 min-w-[120px]">
                  <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-fg">Difficulty</p>
                  <p className="font-mono text-lg text-charcoal mt-1">{post.trekkingInformation.trekkingDifficulty}</p>
                </div>
              )}
              {post?.trekkingInformation?.trekkingDuration && (
                <div className="bg-cream px-6 py-4 flex-1 min-w-[120px]">
                  <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-fg">Duration</p>
                  <p className="font-mono text-lg text-charcoal mt-1">{post.trekkingInformation.trekkingDuration}</p>
                </div>
              )}
              {/* {journey.time && (
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
              )} */}
            </div>
          )
        )}
        {category === "running" && (
          (post?.runningInformation?.avgPace ||
            post?.runningInformation?.distance ||
            post?.runningInformation?.eventName ||
            post?.runningInformation?.finishTime ||
            post?.runningInformation?.location ||
            post?.runningInformation?.runningType) && (
          
            <div className="flex flex-wrap gap-px bg-border mb-1">
            
              {post?.runningInformation?.distance && (
                <div className="bg-cream px-6 py-4 flex-1 min-w-[120px]">
                  <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-fg">Distance</p>
                  <p className="font-mono text-lg text-charcoal mt-1">{post.runningInformation.distance}</p>
                </div>
              )}
              {post?.runningInformation?.avgPace && (
                <div className="bg-cream px-6 py-4 flex-1 min-w-[120px]">
                  <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-fg">Avg Pace</p>
                  <p className="font-mono text-lg text-charcoal mt-1">{post.runningInformation.avgPace}</p>
                </div>
              )}
              {post?.runningInformation?.finishTime && (
                <div className="bg-cream px-6 py-4 flex-1 min-w-[120px]">
                  <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-fg">Finish Time</p>
                  <p className="font-mono text-lg text-charcoal mt-1">{post.runningInformation.finishTime}</p>
                </div>
              )}
              {post?.runningInformation?.location && (
                <div className="bg-cream px-6 py-4 flex-1 min-w-[120px]">
                  <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-fg">Location</p>
                  <p className="font-mono text-lg text-charcoal mt-1">{post.runningInformation.location}</p>
                </div>
              )}
              {post?.runningInformation?.runningType && (
                <div className="bg-cream px-6 py-4 flex-1 min-w-[120px]">
                  <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-fg">Running Type</p>
                  <p className="font-mono text-lg text-charcoal mt-1">{post.runningInformation.runningType}</p>
                </div>
              )}
            </div>
          )
        )}

        {post?.book?.bookRecommendedFor && (
          <div className="bg-cream px-6 py-4 flex-1 min-w-[120px]">
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-fg">Book Recommended For</p>
            <p className="font-mono text-lg text-charcoal mt-1">{post.book.bookRecommendedFor}</p>
          </div>
        )}

        {category === "books" && (
          (post?.book?.authorName ||
            post?.book?.bookRecommendedFor ||
            post?.book?.pages ||
            post?.book?.readIn ||
            post?.book?.year) && (
          
              
            <div className="flex flex-wrap gap-px bg-border mb-1">
            
              {post?.book?.authorName && (
                <div className="bg-cream px-6 py-4 flex-1 min-w-[120px]">
                  <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-fg">Author Name</p>
                  <p className="font-mono text-lg text-charcoal mt-1">{post.book.authorName}</p>
                </div>
              )}
              {post?.book?.pages && (
                <div className="bg-cream px-6 py-4 flex-1 min-w-[120px]">
                  <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-fg">Pages</p>
                  <p className="font-mono text-lg text-charcoal mt-1">{post.book.pages}</p>
                </div>
              )}
              {post?.book?.readIn && (
                <div className="bg-cream px-6 py-4 flex-1 min-w-[120px]">
                  <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-fg">Read In</p>
                  <p className="font-mono text-lg text-charcoal mt-1">{post.book.readIn}</p>
                </div>
              )}
              {post?.book?.year && (
                <div className="bg-cream px-6 py-4 flex-1 min-w-[120px]">
                  <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-fg">Year</p>
                  <p className="font-mono text-lg text-charcoal mt-1">{post.book.year}</p>
                </div>
              )}
            </div>
          )
        )}

        {/* Story */}
        <div className="prose-article space-y-6">
          <article
            className="w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
            dangerouslySetInnerHTML={{
              __html: post?.content ?? "",
            }}
          />
          {post?.galleryImages?.galleryImages &&
            post.galleryImages.galleryImages.length > 0 && (
              <GalleryLightbox
                images={post.galleryImages.galleryImages
                  .map((item) => item.eventGalleryImage?.node)
                  .filter(
                    (image): image is NonNullable<typeof image> => !!image
                  )}
                title={post.title}
              />
            )}

            {/* tags */}
              {post?.tags?.nodes?.length ? (
                <div className="flex flex-wrap gap-2 mb-6">
                  {post.tags.nodes.map((tag) => (
                    <span
                      key={tag.name}
                      className="font-mono text-[9px] tracking-[0.15em] uppercase border border-border text-muted-fg px-2 py-0.5"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              ) : null}
      </div>
      </article>

      {/* Related */}
     
       <section className="border-t border-border py-20">
        <div className="max-w-7xl mx-auto px-6">

          <h2 className="font-serif text-3xl text-charcoal mb-10">
            Related {category === "trekking" ? "Trekks" : category === "books" ? "Books" : category === "Running" ? "Runs" : "Stories"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">

            {related.map((j) => (
              
              <div key={j.id} className="bg-cream p-6">

                <Link
                  href={`/${category}/${j.slug}`}
                  className="group block"
                >
                  {/* Image */}
                  <div className="overflow-hidden bg-muted aspect-[3/4]">
                    <img
                      src={j.featuredImage?.node?.sourceUrl || ""}
                      alt={j.featuredImage?.node?.altText || j.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  {/* Content */}
                  <div className="mt-3">

                    {/* Category / Type */}
                    <p className="text-[10px] font-mono uppercase tracking-[0.12em] text-muted-fg">
                      {category}
                    </p>

                    {/* Title */}
                    <h3 className="font-serif text-lg text-charcoal mt-1.5 group-hover:text-earth transition-colors leading-snug">
                      {j.title}
                    </h3>

                    {/* Description */}
                    <p
                      className="text-sm text-muted-fg mt-2 leading-relaxed line-clamp-2"
                      dangerouslySetInnerHTML={{
                        __html: j.excerpt || "",
                      }}
                    />

                  </div>
                </Link>

              </div>
            ))}

          </div>

          {/* All category link */}
          <div className="mt-12">
            <Link
              href={`/${category}`}
              className="text-xs tracking-[0.12em] uppercase text-charcoal border-b border-charcoal/30 pb-0.5 hover:border-charcoal transition-colors"
            >
              ← All {category}
            </Link>
          </div>

        </div>
      </section>


    </div>
    </>
  );
<<<<<<< Updated upstream
}
=======
}
>>>>>>> Stashed changes
