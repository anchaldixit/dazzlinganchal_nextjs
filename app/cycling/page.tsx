import ActivityBadge from "@/app/compontents/ActivityBadge";

const rides = [
  {
    id: 1,
    name: "Rajpur to Kanpur Road",
    location: "Uttar Pradesh",
    date: "June 2026",
    distance: "62.0 km",
    duration: "3h 12m",
    elevation: "1,240 m",
    type: "Gran Fondo",
    image:
      "/cycling/cycling2.jpg?w=600&h=400&fit=crop&auto=format",
    alt: "Cyclists riding along coastal road",
    snippet:
      "My first century ride. The last 20 km were a negotiation between pride and pain — pride won, barely.",
  },
  {
    id: 2,
    name: "Rajpur to Pukhrayan",
    location: "Uttar Pradesh",
    date: "May 2026",
    distance: "50.14 km",
    duration: "2h 46m",
    elevation: "980 m",
    type: "Hill Climb",
    image:
      "/cycling/cycling5.jpg?w=600&h=400&fit=crop&auto=format",
    alt: "Cyclist on winding forest road",
    snippet:
      "The ghat section humbled me completely. Twelve hairpin bends and a gradient that turns your legs to lead.",
  },
   {
    id: 3,
    name: "Mountain Ride",
    location: "Rishikesh, Uttarakhand",
    date: "Oct 2024",
    distance: "48.5 km",
    duration: "2h 35m",
    elevation: "1,560 m",
    type: "Gravel",
    image:
      "/cycling/cycling7.jpg?w=600&h=400&fit=crop&auto=format",
    alt: "Cyclist on dirt trail",
    snippet:
      "Off-road, unplanned, magnificent. Gravel riding forces you to stay present in a way tarmac never does.",
  },
//   {
//     id: 4,
//     name: "Sunday Morning Group Ride",
//     location: "Pune, Maharashtra",
//     date: "Ongoing",
//     distance: "50 km",
//     duration: "2h 30m",
//     elevation: "420 m",
//     type: "Group Ride",
//     image:
//       "https://images.unsplash.com/photo-1514507058299-c327ecadcf26?w=600&h=400&fit=crop&auto=format",
//     alt: "Group of cyclists on road",
//     snippet:
//       "The weekly ritual. Before the city wakes up, before the heat arrives — just wheels, road and good company.",
//   },
 
];

const typeColor: Record<string, string> = {
  "Gran Fondo": "text-travel",
  "Hill Climb": "text-trek",
  "Group Ride": "text-run",
  Gravel: "text-earth",
};

export default function Cycling() {
  return (
    <div className="bg-cream text-charcoal">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[780px] flex items-end pt-16">
        <img
          src="/cycling/cycling4.jpg?w=1920&h=900&fit=crop&auto=format"
          alt="Cyclists riding along a scenic road"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/10 to-charcoal/75" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16 w-full">
          <p className="font-mono text-xs tracking-[0.25em] uppercase text-cream/50 mb-3">
            Cycling
          </p>
          <h1 className="font-serif text-5xl md:text-6xl text-cream leading-tight">
            Roads & Rides
          </h1>
          <p className="mt-3 text-sm text-cream/60 max-w-md">
            Two wheels, an open road, and the freedom to go exactly as far as you
            choose.
          </p>
        </div>
      </section>

      {/* Personal intro */}
      <section className="py-20 border-b border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="font-mono text-xs tracking-[0.2em] uppercase text-muted-fg mb-4">
                My cycling journey
              </p>
              <h2 className="font-serif text-4xl text-charcoal leading-tight mb-6">
                How I fell in love
                <br />
                <em>with the road.</em>
              </h2>
              <div className="space-y-4 text-sm text-muted-fg leading-relaxed max-w-md">
                <p>
                  I started cycling as a recovery tool between running training
                  blocks. What began as cross-training quickly became something I
                  looked forward to more than the runs themselves.
                </p>
                <p>
                  There is a particular quality to cycling that running can&apos;t
                  replicate — the sense of covering real distance, of watching
                  landscapes shift gradually from one thing to another. A 60 km
                  ride takes you somewhere. A 25 km run brings you back to where
                  you started.
                </p>
                <p>
                  I ride early mornings, mostly solo, occasionally with a group.
                  The ghat roads around my hometown have become a second home. I&apos;m
                  still a student of the sport — learning to climb better, to read
                  the road, to trust the machine.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/6] overflow-hidden bg-muted max-w-sm ml-auto">
                <img
                  src="/cycling/cycling.jpg?w=600&h=750&fit=crop&auto=format"
                  alt="Cyclist on forest road"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* <div className="absolute -bottom-4 -left-4 bg-earth px-4 py-2">
                <p className="font-mono text-xs tracking-[0.15em] uppercase text-cream">
                  On the road
                </p>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* Why I cycle — personal */}
      <section className="py-20 bg-muted border-b border-border">
        <div className="max-w-7xl mx-auto px-6">
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-muted-fg mb-10 text-center">
            What cycling gives me
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
            {[
              {
                icon: "◯",
                title: "Clarity",
                text:
                  "Two to Three hours on a bike resets my mind in a way that nothing else quite manages. By the time I return, whatever felt complicated feels smaller.",
              },
              {
                icon: "△",
                title: "Progress",
                text:
                  "Every route has a benchmark — a time up the climb, a distance in the legs. Cycling makes improvement visible, measurable, satisfying.",
              },
              {
                icon: "□",
                title: "Presence",
                text:
                  "You cannot be anywhere else on a bike. The road demands full attention. That forced presence is, paradoxically, the most restful thing I know.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-cream p-8">
                <span className="font-mono text-xl text-earth block mb-4">
                  {item.icon}
                </span>
                <h3 className="font-serif text-2xl text-charcoal mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-fg leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-charcoal text-cream">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-cream/10">
            {[
              { label: "Rides logged", value: "48" },
              { label: "Total distance", value: "2,840 km" },
              { label: "Longest ride", value: "100 km" },
              { label: "Total elevation", value: "28,400 m" },
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

      {/* Ride log */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-serif text-3xl text-charcoal mb-10">Top 3 logged rides</h2>

          <div className="space-y-px bg-border">
            {rides.map((ride) => (
              <div
                key={ride.id}
                className="grid grid-cols-1 md:grid-cols-4 bg-cream hover:bg-muted/40 transition-colors"
              >
                <div className="overflow-hidden bg-muted aspect-video md:aspect-[4/6] md:min-h-[180px]">
                  <img
                    src={ride.image}
                    alt={ride.alt}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="md:col-span-3 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <ActivityBadge type="cycling" />
                      <span
                        className={`font-mono text-[10px] tracking-[0.15em] uppercase ${typeColor[ride.type] ?? "text-muted-fg"}`}
                      >
                        {ride.type}
                      </span>
                      <span className="font-mono text-[10px] tracking-[0.15em] text-muted-fg">
                        · {ride.date}
                      </span>
                    </div>
                    <h3 className="font-serif text-2xl text-charcoal">
                      {ride.name}
                    </h3>
                    <p className="font-mono text-xs text-muted-fg mt-0.5 tracking-wide">
                      {ride.location}
                    </p>
                    <p className="text-sm text-muted-fg mt-3 leading-relaxed max-w-lg">
                      {ride.snippet}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-x-6 gap-y-2 mt-5">
                    {[
                      { label: "Distance", value: ride.distance },
                      { label: "Duration", value: ride.duration },
                      { label: "Elevation", value: ride.elevation },
                    ].map((s) => (
                      <div key={s.label}>
                        <p className="font-mono text-[9px] tracking-[0.15em] uppercase text-muted-fg">
                          {s.label}
                        </p>
                        <p className="font-mono text-sm text-charcoal mt-0.5">
                          {s.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Goals */}
      <section className="py-20 bg-muted border-t border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="font-mono text-xs tracking-[0.2em] uppercase text-muted-fg mb-4">
                What&apos;s ahead
              </p>
              <h2 className="font-serif text-3xl text-charcoal leading-tight mb-6">
                Goals & future rides
              </h2>
              <div className="space-y-4">
                {[
                  {
                    goal: "Complete a 200 km brevet",
                    desc: "The step from century to randonneuring. Different discipline, same obsession.",
                  },
                  {
                    goal: "Ride the Manali–Leh highway",
                    desc: "5,300 m passes, barren landscapes, and a road that exists between seasons.",
                  },
                  {
                    goal: "First multi-day touring trip",
                    desc: "Panniers, camping gear, and nowhere to be — proper cycle touring.",
                  },
                  {
                    goal: "Sub-4h century",
                    desc:
                      "The speed benchmark I&apos;m working toward. Getting closer every month.",
                  },
                ].map((item) => (
                  <div
                    key={item.goal}
                    className="flex gap-4 items-start border-b border-border pb-4"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-earth mt-2 flex-shrink-0" />
                    <div>
                      <span className="font-serif text-base text-charcoal my-px:1px">{item.goal}</span>
                      <p className="text-xs text-muted-fg mt-0.5 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="aspect-[4/6] overflow-hidden bg-muted">
              <img
                src="/cycling/cycling2.jpg?w=800&h=800&fit=crop&auto=format"
                alt="Group of cyclists on open road"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pull quote */}
      <section className="py-24 border-t border-border">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <blockquote className="font-serif italic text-3xl md:text-4xl text-charcoal leading-[1.3]">
            &ldquo;The bicycle is the most efficient machine ever created. For a
            human being on a bicycle, the energy cost is almost nothing.&rdquo;
          </blockquote>
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-muted-fg mt-6">
            — Something I remind myself at kilometre 40 of a 60 km ride, when my legs are screaming and my lungs are on fire.
          </p>
        </div>
      </section>
    </div>
  );
}
