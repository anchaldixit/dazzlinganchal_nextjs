export type ActivityType = "travel" | "trekking" | "running" | "cycling" | "books";

export interface Journey {
  id: number;
  type: ActivityType;
  title: string;
  location: string;
  date: string;
  description: string;
  image: string;
  distance?: string;
  elevation?: string;
  difficulty?: string;
  duration?: string;
  time?: string;
  pace?: string;
}

export interface Race {
  id: number;
  name: string;
  location: string;
  date: string;
  distance: string;
  time: string;
  pace: string;
  position: string;
  experience: string;
  image: string;
}

export interface GalleryPhoto {
  id: number;
  type: ActivityType | "all";
  src: string;
  alt: string;
  aspect: "tall" | "wide" | "square";
}

export const journeys: Journey[] = [
  {
    id: 1,
    type: "trekking",
    title: "Into the Mountains",
    location: "Kedarkantha, Uttarakhand",
    date: "December 2024",
    description:
      "Snow-draped silence at 12,500 feet. A summit that rewarded patience and tested limits.",
    image:
      "https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?w=800&h=1000&fit=crop&auto=format",
    distance: "34 km",
    elevation: "3,810 m",
    difficulty: "Moderate",
    duration: "5 days",
  },
  {
    id: 2,
    type: "travel",
    title: "Ruins and Reverie",
    location: "Hampi, Karnataka",
    date: "November 2024",
    description:
      "An empire's echo in stone. Boulders, banyans, and a river that has seen it all.",
    image:
      "https://images.unsplash.com/photo-1773680690692-8e94e1794f9f?w=800&h=600&fit=crop&auto=format",
  },
  {
    id: 3,
    type: "running",
    title: "21 km at Dawn",
    location: "Mumbai Half Marathon",
    date: "January 2024",
    description:
      "The city breathes differently at 5am. Every km a negotiation between will and physics.",
    image:
      "https://images.unsplash.com/photo-1761064039885-afa38ab58a21?w=800&h=600&fit=crop&auto=format",
    distance: "21.1 km",
    time: "2:18:34",
    pace: "6:34/km",
  },
  {
    id: 4,
    type: "trekking",
    title: "Where the Sky Meets Snow",
    location: "Roopkund, Uttarakhand",
    date: "October 2024",
    description:
      "A glacial lake holds secrets centuries old. The silence above the treeline is absolute.",
    image:
      "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800&h=600&fit=crop&auto=format",
    distance: "53 km",
    elevation: "5,029 m",
    difficulty: "Difficult",
    duration: "8 days",
  },
  {
    id: 5,
    type: "travel",
    title: "The White Temple and the Valley",
    location: "Spiti Valley, Himachal Pradesh",
    date: "September 2024",
    description:
      "Altitude, monasteries, and the kind of remoteness that resets everything.",
    image:
      "https://images.unsplash.com/photo-1764796834177-c06b81b322f1?w=800&h=600&fit=crop&auto=format",
  },
  {
    id: 6,
    type: "running",
    title: "The Full Distance",
    location: "Tata Mumbai Marathon",
    date: "January 2023",
    description:
      "42.2 km of truth. No shortcuts, no pauses — just road, breath and resolve.",
    image:
      "https://images.unsplash.com/photo-1777788613992-5f2655a97e72?w=800&h=600&fit=crop&auto=format",
    distance: "42.2 km",
    time: "4:47:22",
    pace: "6:48/km",
  },
];

export const featuredRace: Race = {
  id: 1,
  name: "Tata Mumbai Marathon",
  location: "Mumbai, Maharashtra",
  date: "15 January 2023",
  distance: "42.2 km",
  time: "4:47:22",
  pace: "6:48 / km",
  position: "#2,847 Overall",
  experience:
    "The sea breeze at Marine Drive felt like a reward earned long before the race began. At km 30 the city fell away and all that remained was the road.",
  image:
    "https://images.unsplash.com/photo-1758506971986-b0d0edebd8d5?w=1200&h=800&fit=crop&auto=format",
};

export const galleryPhotos: GalleryPhoto[] = [
  {
    id: 1,
    type: "trekking",
    src: "https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?w=600&h=800&fit=crop&auto=format",
    alt: "Rocky mountain ridgeline",
    aspect: "tall",
  },
  {
    id: 2,
    type: "travel",
    src: "https://images.unsplash.com/photo-1504193902866-27cfb5aafcc8?w=800&h=500&fit=crop&auto=format",
    alt: "Woman on mountain cliff with arms open",
    aspect: "wide",
  },
  {
    id: 3,
    type: "running",
    src: "https://images.unsplash.com/photo-1761064039885-afa38ab58a21?w=600&h=600&fit=crop&auto=format",
    alt: "City marathon runners",
    aspect: "square",
  },
  {
    id: 4,
    type: "trekking",
    src: "https://images.unsplash.com/photo-1482961667792-d164d3e7ab3d?w=600&h=800&fit=crop&auto=format",
    alt: "Woman hiking mountain trail",
    aspect: "tall",
  },
  {
    id: 5,
    type: "travel",
    src: "https://images.unsplash.com/photo-1764796834177-c06b81b322f1?w=800&h=500&fit=crop&auto=format",
    alt: "White temple in green valley with mountains",
    aspect: "wide",
  },
  {
    id: 6,
    type: "trekking",
    src: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=600&h=600&fit=crop&auto=format",
    alt: "Person on rocky summit",
    aspect: "square",
  },
  {
    id: 7,
    type: "running",
    src: "https://images.unsplash.com/photo-1777788613992-5f2655a97e72?w=600&h=800&fit=crop&auto=format",
    alt: "Marathon race group of runners",
    aspect: "tall",
  },
  {
    id: 8,
    type: "travel",
    src: "https://images.unsplash.com/photo-1773680690692-8e94e1794f9f?w=800&h=500&fit=crop&auto=format",
    alt: "Ancient stone temple ruins through archway",
    aspect: "wide",
  },
  {
    id: 9,
    type: "trekking",
    src: "https://images.unsplash.com/photo-1445452916036-9022dfd33aa8?w=600&h=400&fit=crop&auto=format",
    alt: "Aerial view of mountain range",
    aspect: "wide",
  },
];

export const locations = [
  { name: "Kedarkantha", state: "Uttarakhand", type: "trekking", x: 34, y: 22 },
  { name: "Roopkund", state: "Uttarakhand", type: "trekking", x: 32, y: 20 },
  { name: "Spiti Valley", state: "Himachal Pradesh", type: "travel", x: 28, y: 18 },
  { name: "Hampi", state: "Karnataka", type: "travel", x: 40, y: 62 },
  { name: "Mumbai", state: "Maharashtra", type: "running", x: 28, y: 55 },
  { name: "Leh", state: "Ladakh", type: "travel", x: 30, y: 12 },
  { name: "Manali", state: "Himachal Pradesh", type: "travel", x: 30, y: 18 },
];
