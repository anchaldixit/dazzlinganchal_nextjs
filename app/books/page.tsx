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
    .replace(/&hellip;/g, "")
    .replace(/\[.*?&hellip;.*?\]/g, "")
    .trim();
}


type BookPost = {
  id: string;
  databaseId: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  book: {
    authorName: string | null;
    bookRecommendedFor: string | null;
    pages: number | null;
    readIn: string | null;
    year: number | null;
  } | null;
  featuredImage: {
    node: {
      altText: string | null;
      sourceUrl: string | null;
    } | null;
  } | null;
  noNeedToDetailPage: {
    noNeedToDetailPage: boolean | null;
  } | null;
  tags: {
    nodes: {
      name: string;
    }[];
  } | null;
};

type BooksPostsResponse = {
  posts: {
    nodes: BookPost[];
  };
};           


const booksData = await fetchGraphQL<BooksPostsResponse>(
`
query GetBookPosts {
  posts(where: {categoryName: "books", status: PUBLISH}) {
    nodes {
      id
      databaseId
      title
      slug
      excerpt
      date
      content
      book {
        authorName
        bookRecommendedFor
        pages
        readIn
        year
      }
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
      noNeedToDetailPage {
        noNeedToDetailPage
      }
      tags {
        nodes {
          name
        }
      }
    }
  }
}
    `,
);

const reviewBooks = booksData.posts.nodes;



function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={`text-sm ${i < rating ? "text-earth" : "text-border"}`}>
          ★
        </span>
      ))}
    </div>
  );
}

export default function Books() {
  return (
    <div className="bg-cream text-charcoal">
      {/* Hero */}
      <section className="relative h-[55vh] min-h-[440px] flex items-end pt-16">
        <img
          src="https://images.unsplash.com/photo-1758279745202-79570ca2896e?w=1920&h=900&fit=crop&auto=format"
          alt="Bookshelves filled with books"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/20 to-charcoal/80" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16 w-full">
          <p className="font-mono text-xs tracking-[0.25em] uppercase text-cream/50 mb-3">
            Book Reviews
          </p>
          <h1 className="font-serif text-5xl md:text-6xl text-cream leading-tight">
            Books I&apos;ve Read
          </h1>
          <p className="mt-3 text-sm text-cream/60 max-w-lg">
            Personal reviews — honest opinions about books that moved me, challenged
            me, or stayed with me long after the last page.
          </p>
        </div>
      </section>

      {/* Stats */}
      {/* <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-3 divide-x divide-border">
            {[
              { label: "Books reviewed", value: `${books.length}` },
              { label: "Average rating", value: "4.5 ★" },
              { label: "Genres covered", value: "5+" },
            ].map((s) => (
              <div key={s.label} className="py-8 px-6 text-center">
                <p className="font-mono text-xl text-charcoal">{s.value}</p>
                <p className="font-mono text-[9px] tracking-[0.15em] uppercase text-muted-fg mt-1">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Intro */}
      <section className="py-14 border-b border-border">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-sm text-muted-fg leading-relaxed">
            I read because travel taught me that the world is larger than I can
            visit in one lifetime, and books are the only way to see the rest of
            it. These reviews are personal — not summaries, not star-calibrated
            against some universal standard, just honest thoughts from someone who
            reads between trail breaks and finish lines.
          </p>
        </div>
      </section>

      {/* Book list */}
     <section className="py-20">
  <div className="max-w-7xl mx-auto px-6 space-y-px">

    {reviewBooks.map((book) => {
      const noDetailPage =
        book.noNeedToDetailPage?.noNeedToDetailPage;

      return (
        <div
          key={book.id}
          className="group bg-cream grid grid-cols-1 lg:grid-cols-12 gap-px border border-border hover:border-charcoal/30 transition-colors"
        >

          {/* Cover */}
          <div className="lg:col-span-3 overflow-hidden">
            <img
              src={book.featuredImage?.node?.sourceUrl || ""}
              alt={book.featuredImage?.node?.altText || book.title}
              className="w-full h-full object-cover aspect-[3/4] lg:aspect-auto min-h-[280px] relative z-10 mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* Content */}
          <div className="lg:col-span-9 p-8 md:p-10 flex flex-col">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6 pb-6 border-b border-border">

              <div>

                {noDetailPage ? (
                  <h2 className="font-serif text-2xl md:text-3xl text-charcoal leading-tight">
                    {book.title}
                  </h2>
                ) : (
                  <Link href={`/books/${book.slug}`}>
                    <h2 className="font-serif text-2xl md:text-3xl text-charcoal leading-tight hover:text-earth transition-colors">
                      {book.title}
                    </h2>
                  </Link>
                )}

                <p className="font-mono text-xs text-muted-fg mt-1 tracking-wider">
                  {book.book?.authorName}
                </p>

              </div>

              <div className="flex-shrink-0 sm:text-right">
                <p className="font-mono text-[9px] tracking-[0.15em] uppercase text-muted-fg mt-1">
                  Read {book.book?.readIn}
                </p>
              </div>

            </div>


            {/* Tagline */}
            {book.book?.bookRecommendedFor && (
              <p className="font-serif italic text-lg text-charcoal mb-5">
                &ldquo;{book.book.bookRecommendedFor}&rdquo;
              </p>
            )}


            {/* Review excerpt */}
            <p className="text-sm text-muted-fg leading-relaxed mb-6 line-clamp-3">
              {noDetailPage
                ? cleanExcerpt(book.content ?? "")
                : cleanExcerpt(book.excerpt)}
            </p>


            {/* Tags */}
            {book.tags?.nodes?.length ? (
              <div className="flex flex-wrap gap-2 mb-6">
                {book.tags.nodes.map((tag) => (
                  <span
                    key={tag.name}
                    className="font-mono text-[9px] tracking-[0.15em] uppercase border border-border text-muted-fg px-2 py-0.5"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            ) : null}


            {/* Bottom information */}
            <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">

              <div className="flex gap-5">

                {book.book?.pages && (
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-wider text-muted-fg">
                      Pages
                    </p>

                    <p className="font-mono text-sm text-charcoal mt-0.5">
                      {book.book.pages}
                    </p>
                  </div>
                )}

                {book.book?.year && (
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-wider text-muted-fg">
                      Published
                    </p>

                    <p className="font-mono text-sm text-charcoal mt-0.5">
                      {book.book?.year}
                    </p>
                  </div>
                )}

              </div>


              {/* Read review link */}
              {!noDetailPage && (
                <Link
                  href={`/books/${book.slug}`}
                  className="text-xs tracking-[0.12em] uppercase text-charcoal border-b border-charcoal/30 pb-0.5 hover:border-earth hover:text-earth transition-colors"
                >
                  Read my review →
                </Link>
              )}

            </div>

          </div>
        </div>
      );
    })}

  </div>
</section>

      {/* Reading philosophy */}
      <section className="py-24 bg-muted border-t border-border">
        <div className="max-w-3xl mx-auto px-6">
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-muted-fg mb-8 text-center">
            On reading
          </p>
          <blockquote className="font-serif italic text-3xl md:text-4xl text-charcoal leading-[1.3] text-center mb-10">
            &ldquo;A reader lives a thousand lives before dying. The man who never
            reads lives only one.&rdquo;
          </blockquote>
          <p className="text-sm text-muted-fg text-center leading-relaxed max-w-lg mx-auto">
            I read on trails, in tents, on trains between cities. Books and
            adventures have always been the same thing to me — ways of getting
            somewhere you have never been before.
          </p>
        </div>
      </section>
    </div>
  );
}
