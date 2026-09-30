export interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  readDate: string;
  rating: number;
  coverColor: string;
  image: string;
  tagline: string;
  review: string;
  learned: string;
  whoShouldRead: string;
  highlight: string;
  pages?: number;
  year?: number;
  tags?: string[];
  recommendedFor?: string;
}

export const books: Book[] = [
  {
    id: 1,
    title: "Born to Run",
    author: "Christopher McDougall",
    genre: "Running / Adventure",
    readDate: "March 2024",
    rating: 5,
    coverColor: "#C17B3B",
    image:
      "https://images.unsplash.com/photo-1781779650575-8a1437829010?w=400&h=600&fit=crop&auto=format",
    tagline: "The book that changed how I think about movement.",
    review:
      "I picked this up expecting a book about running. What I got was an investigation into the Tarahumara people, a meditation on why humans evolved to move, and a genuine adventure story told with wit and pace. McDougall writes like a journalist who got too deep into his own story — the best kind. The research is solid, the characters are vivid, and the central thesis — that running is not something we endure but something we are built for — is delivered with enough evidence that it is hard to dismiss.",
    learned:
      "That running is not a sport humans forced themselves to endure but something we are literally built for. Also that barefoot running is far more interesting as a philosophical idea than a practical one.",
    whoShouldRead:
      "Anyone who runs, anyone who wants to start, anyone who has ever wondered why some people seem to love suffering.",
    highlight:
      "The race itself — 50 miles through copper canyons — reads like a film. I missed a bus stop because I could not put the book down.",
    pages: 287,
    year: 2009,
    tags: ["Running", "Adventure", "Science", "Non-fiction"],
    recommendedFor: "Runners, endurance athletes, adventure readers",
  },
  {
    id: 2,
    title: "The Alchemist",
    author: "Paulo Coelho",
    genre: "Fiction / Philosophy",
    readDate: "January 2024",
    rating: 4,
    coverColor: "#3B6B4F",
    image:
      "https://images.unsplash.com/photo-1769766407884-791f8136f239?w=400&h=600&fit=crop&auto=format",
    tagline: "A fable I keep returning to every few years.",
    review:
      "There is a reason this book has been read by everyone — it is deceptively simple and quietly powerful. Coelho writes with the confidence of someone who believes absolutely in what he is saying, and that belief transfers. It is the kind of book that makes you want to do the thing you have been putting off. The story is allegorical and deliberately archetypal, which means it can feel thin if you approach it as a novel. Approach it as a fable, and it becomes something else entirely.",
    learned:
      "That most obstacles between us and what we want are not external. Also that the journey genuinely is the point — not as a consolation prize but as the actual reward.",
    whoShouldRead:
      "Anyone at a crossroads. Anyone who has a dream they have been delaying. Anyone who needs a small, beautiful push.",
    highlight:
      "The part about the Soul of the World. Simple ideas stated with such conviction that they feel like revelations.",
    pages: 197,
    year: 1988,
    tags: ["Fiction", "Philosophy", "Spirituality", "Journey"],
    recommendedFor: "Anyone at a turning point in life",
  },
  {
    id: 3,
    title: "Into the Wild",
    author: "Jon Krakauer",
    genre: "Non-fiction / Adventure",
    readDate: "November 2023",
    rating: 5,
    coverColor: "#3B5068",
    image:
      "https://images.unsplash.com/photo-1758279745202-79570ca2896e?w=400&h=600&fit=crop&auto=format",
    tagline: "Disturbing, beautiful, impossible to dismiss.",
    review:
      "Krakauer does something extraordinary here — he takes a story that could easily be read as foolish tragedy and renders it as something genuinely profound. Christopher McCandless was not stupid; he was someone who took seriously ideas that most of us politely file away. Whether you agree with his choices or not, the book forces you to examine your own. Krakauer's journalism is meticulous and his personal honesty — inserting himself into the narrative in ways that illuminate rather than distract — elevates this well beyond conventional non-fiction.",
    learned:
      "That the desire to strip life down to essentials is universal. That wilderness is both generous and indifferent. That the line between romantic idealism and recklessness is thinner than it looks from a distance.",
    whoShouldRead:
      "Travellers, trekkers, anyone who has ever wanted to disappear into a landscape and find out who they are without the usual scaffolding.",
    highlight:
      "The final pages. I had to set the book down for a few minutes before I could finish.",
    pages: 224,
    year: 1996,
    tags: ["Adventure", "Wilderness", "Non-fiction", "Memoir"],
    recommendedFor: "Trekkers, travellers, wilderness lovers",
  },
  {
    id: 4,
    title: "Endure",
    author: "Alex Hutchinson",
    genre: "Sports Science / Non-fiction",
    readDate: "August 2023",
    rating: 4,
    coverColor: "#8B6347",
    image:
      "https://images.unsplash.com/photo-1761257835921-221eb54a64b2?w=400&h=600&fit=crop&auto=format",
    tagline: "The science behind why some people keep going when others stop.",
    review:
      "Part sports science, part philosophy of limits. Hutchinson investigates the physiology and psychology of endurance — why the brain gives up before the body does, what separates those who finish from those who stop, and how much of performance is mental versus physical. As a runner and trekker, I found myself underlining nearly every page. The writing is accessible without being dumbed down, and the case studies range from elite athletes to ordinary people doing extraordinary things.",
    learned:
      "That the experience of exhaustion is constructed — at least partly — by the brain as a protection mechanism, not a reliable report of actual capacity. That limits are real but the ones we experience in the moment are not always the true ones.",
    whoShouldRead:
      "Runners, cyclists, trekkers, anyone who trains for anything physical. Also anyone interested in the science of willpower and motivation.",
    highlight:
      "The discussion of the two-hour marathon attempt and what it revealed about human limits. Science as adventure writing.",
    pages: 320,
    year: 2018,
    tags: ["Sports Science", "Psychology", "Endurance", "Non-fiction"],
    recommendedFor: "Athletes, coaches, anyone training for a goal",
  },
];
