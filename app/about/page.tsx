import { fetchGraphQL } from "@/lib/wpgraphql";
import page from "../page";

const query = `
  {
    page(id: "/about/", idType: URI) {
      id
      databaseId
      slug
      uri
      title
      content
      featuredImage {
        node {
          id
          sourceUrl
          altText
        }
      }
    }
  }
`;

type AboutPageData = {
  page: {
    id: string;
    databaseId: number;
    slug: string;
    uri: string;
    title: string;
    content: string;
    featuredImage: {
      node: {
        id: string;
        sourceUrl: string;
        altText: string;
      };
    };
  };
};


const TestNewFields = `
 {
  page(id: "/about/", idType: URI) {
    title
    aboutPage {
      countriesVisited
      statesVisited
      bestMarathon
      halfMarathon
      racesFinished      
      treksCompleted
      totalTrailKm
      highestSummit
    }
  }
}
`;

type AboutPageDataNewFields = {
  page: {
    title: string;
    aboutPage: {
      countriesVisited: number
      statesVisited: number;
      bestMarathon: string;
      halfMarathon: string;
      racesFinished: number;
      treksCompleted: number;
      highestSummit: string;
      totalTrailKm: string;
    };
  };
};  

const FollowAlongQuery = `{
  page(id: "about", idType: URI) {
    followAlong {
      fieldGroupName
      facebookUrl
      instagramUrl
      linkdinUrl
      stravaUrl
    }
  }
}
`;
type FollowAlongData = {
  page: {
    followAlong: {
      fieldGroupName: string;
      facebookUrl: string;
      instagramUrl: string;
      linkdinUrl: string;
      stravaUrl: string;
    };
  };
};

const whatIDoInfo = `{
  page(id: "about", idType: URI) {
    whatIDoAboutPage {
      whatIDoInfo {
        fieldGroupName
        heading
        whatIDoDescription
        whatIDoShortDetails
        whatIDoColour
      }
      fieldGroupName
    }
  }
}
`; 
type WhatIDoData = {  
  page: {
    whatIDoAboutPage: {
      whatIDoInfo: {
        fieldGroupName: string;
        heading: string;
        whatIDoDescription: string;
        whatIDoShortDetails: string;
        whatIDoColour: string;
      }[];
      fieldGroupName: string;
    };
  };
};


export default async function About() {
  const data = await fetchGraphQL<AboutPageData>(query);
  const page = data.page;

  const newData = await fetchGraphQL<AboutPageDataNewFields>(TestNewFields);  
  const newPage = newData.page;

  // Follow Along data
  const followAlongData = await fetchGraphQL<FollowAlongData>(FollowAlongQuery);
  const followAlong = followAlongData.page.followAlong;

  // What I Do data
  const whatIDoData = await fetchGraphQL<WhatIDoData>(whatIDoInfo);
  const whatIDoPage = whatIDoData.page.whatIDoAboutPage;  


const formatLabel = (key: string) => {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (char) => char.toUpperCase());
};

  if(!page){
    return (
      <main className="p-10">
        <h1>About page not found</h1>
      </main>
    ) 
  }

  return (
   <div className="bg-cream text-charcoal">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-end pt-16">
       
         {page.featuredImage?.node && (
            <img
              src={page.featuredImage.node.sourceUrl}
              alt={page.featuredImage.node.altText || page.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-charcoal/70" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16 w-full">
          <h1 className="font-serif text-5xl md:text-6xl text-cream leading-tight">
            {page.title} Anchal
          </h1>
        </div>
      </section>

      {/* Bio */}
      <section className="py-24 border-b border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2">
              <p className="font-mono text-xs tracking-[0.2em] uppercase text-muted-fg mb-6">
                {page.title}
              </p>
              <h2 className="font-serif text-4xl md:text-5xl text-charcoal leading-tight mb-8">
                More than destinations.
                <br />
                <em>It&apos;s the journey.</em>
              </h2>
              <div className="space-y-5 text-sm text-muted-fg leading-relaxed max-w-xl">
               {page.content ? (
                <div dangerouslySetInnerHTML={{ __html: page.content }} />
               ) : (
                <p>No content available.</p>
               )}
              </div>
            </div>

            {/* Sidebar stats */}
            <div className="space-y-8">
              <div>
                <p className="font-mono text-xs tracking-[0.2em] uppercase text-muted-fg mb-5">
                  By the numbers
                </p>
                <div className="space-y-4">
                  
                {Object.entries(newPage?.aboutPage ?? {}).map(([key, value]) => (
                <div
                  key={key}
                  className="flex justify-between items-baseline border-b border-border pb-3"
                >
                  <span className="font-sans text-xs text-muted-fg">
                    {formatLabel(key)}
                  </span>

                  <span className="font-mono text-sm text-charcoal">
                    {String(value)}
                  </span>
                </div>
              ))}
          
                </div>
              </div>

              <div>
                <p className="font-mono text-xs tracking-[0.2em] uppercase text-muted-fg mb-4">
                  Follow along
                </p>
                <div className="space-y-2">
                  {/* {["Instagram", "Strava", "YouTube"].map((s) => (
                    <a
                      key={s}
                      href="#"
                      className="block text-sm text-muted-fg hover:text-charcoal transition-colors border-b border-border pb-2"
                    >
                      {s} →
                    </a>
                  ))} */}

                  {followAlong.instagramUrl && (      
                    <a href={followAlong.instagramUrl} className="block text-sm text-muted-fg hover:text-charcoal transition-colors border-b border-border pb-2">
                      Instagram →
                    </a>
                  )}
                  {followAlong.facebookUrl && (      
                    <a href={followAlong.facebookUrl} className="block text-sm text-muted-fg hover:text-charcoal transition-colors border-b border-border pb-2">
                      Facebook →
                    </a>
                  )}
                  {followAlong.linkdinUrl && (
                    <a href={followAlong.linkdinUrl} className="block text-sm text-muted-fg hover:text-charcoal transition-colors border-b border-border pb-2">
                      LinkedIn →
                    </a>
                  )} 
                  {followAlong.stravaUrl && (
                    <a href={followAlong.stravaUrl} className="block text-sm text-muted-fg hover:text-charcoal transition-colors border-b border-border pb-2" target="_blank">
                    Strava →
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-24 bg-muted">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-muted-fg mb-8">
            Travel philosophy
          </p>
          <blockquote className="font-serif italic text-3xl md:text-4xl text-charcoal leading-[1.3]">
            &ldquo;The mountains don&apos;t care about your excuses. That&apos;s
            exactly why I keep going back.&rdquo;
          </blockquote>
        </div>
      </section>

      {/* Activities */}
      <section className="py-24 border-t border-border">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-serif text-3xl text-charcoal mb-12">
            What I do
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
            {/* {[
              {
                title: "Travel",
                color: "bg-travel",
                text: "color-travel",
                desc:
                  "Slow travel over rushing. I prefer to stay longer and see less — a town over a country, a neighbourhood over a landmark.",
                highlights: ["12 countries", "6 solo trips", "Backpacking & resort"],
              },
              {
                title: "Trekking",
                color: "bg-trek",
                text: "color-trek",
                desc:
                  "Himalayan trails are my home ground. I prefer multi-day routes with significant elevation — the kind where a porter-free pack is a badge of honour.",
                highlights: ["24 treks completed", "5,029 m highest", "Solo & group"],
              },
              {
                title: "Running",
                color: "bg-run",
                text: "color-run",
                desc:
                  "I run because it teaches me things about myself that nothing else does. I race marathons because finishing one is proof that limits are negotiable.",
                highlights: ["8 races", "2 full marathons", "PB 4:47:22"],
              },
            ].map((act) => (
              <div key={act.title} className="bg-cream p-8">
                <div className={`w-8 h-0.5 ${act.color} mb-5`} />
                <h3 className="font-serif text-2xl text-charcoal mb-3">
                  {act.title}
                </h3>
                <p className="text-sm text-muted-fg leading-relaxed mb-6">
                  {act.desc}
                </p>
                <ul className="space-y-1.5">
                  {act.highlights.map((h) => (
                    <li key={h} className="font-mono text-[10px] tracking-[0.1em] uppercase text-muted-fg">
                      — {h}
                    </li>
                  ))}
                </ul>
              </div>
            ))} */}

            {whatIDoPage.whatIDoInfo.map((act) => (
  <div key={act.heading} className="bg-cream p-8">

    <div className={`w-8 h-0.5 ${act.whatIDoColour} mb-5`} />

    <h3 className="font-serif text-2xl text-charcoal mb-3">
      {act.heading}
    </h3>

    <p className="text-sm text-muted-fg leading-relaxed mb-6">
      {act.whatIDoDescription}
    </p>

    <div
      className="font-mono text-[10px] tracking-[0.1em] uppercase text-muted-fg"
      dangerouslySetInnerHTML={{
        __html: act.whatIDoShortDetails,
      }}
    />

  </div>
))}
            
          </div>
        </div>
      </section>
    </div>
  );
}
