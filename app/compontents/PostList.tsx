"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import ActivityBadge from "@/app/compontents/ActivityBadge";


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

type Post = {
  id: string;
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

  categories: {
    nodes: {
      name: string;
      slug: string;
    }[];
  };

  basicInformation: {
    locationDetails: string | null;
    subHeadingInBannerImage: string | null;
    durationTime: string | null;
  } | null;

  book: {
    authorName: string | null;
    bookRecommendedFor: string | null;
    pages: number | null;
    readIn: string | null;
    year: number | null;
  } | null;

};

type Props = {
  initialPosts: Post[];
  initialCursor: string | null;
  initialHasNextPage: boolean;
};

const allowedCategories = [
  "books",
  "trekking",
  "running",
  "travel",
];

export default function PostList({



    
  initialPosts,
  initialCursor,
  initialHasNextPage,
}: Props) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [cursor, setCursor] = useState<string | null>(initialCursor);
  const [hasNextPage, setHasNextPage] = useState(initialHasNextPage);
  const [loading, setLoading] = useState(false);

  const loaderRef = useRef<HTMLDivElement | null>(null);

  const loadMore = async () => {
    if (loading || !hasNextPage) return;

    setLoading(true);

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          after: cursor,
        }),
      });

      const data = await response.json();

      setPosts((prev) => [...prev, ...data.posts]);

      setCursor(data.pageInfo.endCursor);
      setHasNextPage(data.pageInfo.hasNextPage);
    } catch (error) {
      console.error("Failed to load posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      {
        rootMargin: "300px",
      }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [cursor, hasNextPage, loading]);

  const filteredPosts = posts.filter((post) =>
    post.categories.nodes.some((category) =>
      allowedCategories.includes(category.slug)
    )
  );

  return (

    
    <>
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

      {/* Auto Loader */}
      <div
        ref={loaderRef}
        className="py-10 flex justify-center"
      >
        {loading && (
          <p className="font-mono text-xs text-muted-fg">
            Loading more posts...
          </p>
        )}

        {!loading && !hasNextPage && (
          <p className="font-mono text-xs text-muted-fg">
            No more posts
          </p>
        )}
      </div>
    </>
  );
}