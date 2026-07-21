/**
 * Genre catalogue.
 *
 * Each entry powers a real, crawlable route at /genre/<slug> with its own
 * title, meta description, H1 and intro copy. Query-string filters
 * (/?genre=28) are not indexable in any useful way — dedicated URLs with
 * unique on-page text are what actually rank.
 *
 * `intro` is written for readers first: 2 sentences, concrete, no keyword
 * stuffing. `description` is the meta description, kept under 160 chars.
 */
export const GENRES = [
  {
    slug: "action",
    id: 28,
    name: "Action",
    emoji: "💥",
    title: "Action Movies",
    description:
      "Chases, heists and fights that hold up. Browse the best action movies by rating and decade, from 70s grit to modern blockbusters.",
    intro:
      "Action is the genre that travels furthest without subtitles — a well-staged chase reads the same in any language. This list runs from the practical-stunt era of the 1970s through Hong Kong wire work to the long-take fight choreography that defines the genre today.",
  },
  {
    slug: "comedy",
    id: 35,
    name: "Comedy",
    emoji: "😂",
    title: "Comedy Movies",
    description:
      "Comedies that still land. Browse the funniest films by decade and rating — screwball, satire, stoner, deadpan and everything between.",
    intro:
      "Comedy ages faster than any other genre, which makes the films that survive worth paying attention to. Filter by decade below to see how the joke changed: screwball in the 30s, gross-out in the 90s, awkward realism now.",
  },
  {
    slug: "horror",
    id: 27,
    name: "Horror Movies",
    emoji: "👻",
    title: "Horror Movies",
    description:
      "Slow-burn dread and full-tilt terror. Browse the best horror movies by rating and decade, from Universal monsters to modern folk horror.",
    intro:
      "Horror is the cheapest genre to make and the hardest to make well, which is why its highs are so distinctive. You'll find studio monster pictures, video-nasty era grindhouse, J-horror, and the slow-burn arthouse wave that took over the 2010s.",
  },
  {
    slug: "sci-fi",
    id: 878,
    name: "Science Fiction",
    emoji: "🚀",
    title: "Sci-Fi Movies",
    description:
      "Space opera, hard sci-fi and dystopia. Browse the best science fiction movies by rating and decade, with runtimes and ratings for every title.",
    intro:
      "Science fiction is where filmmakers argue about the present using the future as cover. Sort by decade and the anxieties surface clearly — nuclear in the 50s, corporate in the 80s, algorithmic now.",
  },
  {
    slug: "drama",
    id: 18,
    name: "Drama",
    emoji: "🎭",
    title: "Drama Movies",
    description:
      "The genre that wins the awards. Browse top-rated drama movies by decade, with ratings, runtimes and release dates for every title.",
    intro:
      "Drama is the widest category here and the one most likely to reward a random pick. Use the decade filter and the rating sort together to cut a million titles down to a shortlist worth an evening.",
  },
  {
    slug: "romance",
    id: 10749,
    name: "Romance",
    emoji: "❤️",
    title: "Romance Movies",
    description:
      "Romantic films worth the runtime — from classic Hollywood to modern indie love stories. Browse by rating and decade.",
    intro:
      "The best romances are structurally simple and emotionally precise, which is why the great ones stay watchable for decades. This list covers studio-era classics, 90s rom-coms and the quieter, more ambivalent love stories of the last ten years.",
  },
  {
    slug: "thriller",
    id: 53,
    name: "Thriller",
    emoji: "🔪",
    title: "Thriller Movies",
    description:
      "Tension done properly. Browse top-rated thriller movies by decade and rating — conspiracy, psychological, crime and neo-noir.",
    intro:
      "A thriller works on withheld information rather than spectacle, so the genre's best entries tend to be cheaper and tighter than their action cousins. Expect paranoid 70s conspiracies, 90s erotic thrillers and the recent run of slow-tightening festival titles.",
  },
  {
    slug: "animation",
    id: 16,
    name: "Animation",
    emoji: "🎨",
    title: "Animated Movies",
    description:
      "Animation for every age — hand-drawn classics, Studio Ghibli, Pixar and stop-motion. Browse the best animated films by rating and decade.",
    intro:
      "Animation is a medium rather than a genre, which is why this list swings from children's musicals to adult war films without changing category. Hand-drawn, CG, stop-motion and anime all sit together here.",
  },
  {
    slug: "fantasy",
    id: 14,
    name: "Fantasy",
    emoji: "🧙",
    title: "Fantasy Movies",
    description:
      "Epic quests, fairy tales and modern myth. Browse the best fantasy movies by rating and decade, with full ratings and runtimes.",
    intro:
      "Fantasy lives or dies on world-building you believe in, and the difference between the classics and the rest is usually production design rather than budget. Sword-and-sorcery, portal stories, fairy-tale retellings and grounded magical realism all appear below.",
  },
  {
    slug: "crime",
    id: 80,
    name: "Crime",
    emoji: "🕵️",
    title: "Crime Movies",
    description:
      "Heists, mob epics and procedurals. Browse the best crime movies by rating and decade — noir, gangster and true-crime drama.",
    intro:
      "Crime cinema is really about institutions: families, police forces, cartels and the rules they run on. The list spans classic film noir, the 70s gangster epics, and the international crime waves out of Korea, France and Brazil.",
  },
  {
    slug: "adventure",
    id: 12,
    name: "Adventure",
    emoji: "🧭",
    title: "Adventure Movies",
    description:
      "Big journeys and bigger landscapes. Browse top-rated adventure movies by decade and rating — treasure hunts, survival and epic quests.",
    intro:
      "Adventure is the family-table genre — broad enough for most audiences, built around a journey rather than a fight. Treasure hunts, survival stories, seafaring epics and road movies all qualify.",
  },
  {
    slug: "mystery",
    id: 9648,
    name: "Mystery",
    emoji: "🔎",
    title: "Mystery Movies",
    description:
      "Whodunits and unsolved cases. Browse the best mystery movies by rating and decade, from locked-room puzzles to modern detective fiction.",
    intro:
      "A mystery gives you the same information as the detective and dares you to get there first. Locked-room puzzles, hardboiled investigations and ambiguous films that never quite answer the question are all here.",
  },
  {
    slug: "family",
    id: 10751,
    name: "Family",
    emoji: "👨‍👩‍👧",
    title: "Family Movies",
    description:
      "Films that work for every age in the room. Browse top-rated family movies by decade and rating, with runtimes so you can plan the evening.",
    intro:
      "The test for a family film is whether the adults are still watching at the forty-minute mark. Runtimes are listed on every card below, which helps more than the rating when you're picking something for a school night.",
  },
  {
    slug: "history",
    id: 36,
    name: "History",
    emoji: "📜",
    title: "Historical Movies",
    description:
      "Period drama and historical epics. Browse the best history movies by rating and decade, with release dates and runtimes for every title.",
    intro:
      "Historical films tell you at least as much about the decade that made them as the one they depict. Sort by decade below and the shifting attitudes to empire, war and power become hard to miss.",
  },
  {
    slug: "documentary",
    id: 99,
    name: "Documentary",
    emoji: "🎥",
    title: "Documentaries",
    description:
      "Non-fiction worth your time. Browse the best documentaries by rating and decade — nature, true crime, music and political film.",
    intro:
      "Documentary has quietly become one of the strongest categories on any streaming service, helped by cheap cameras and expensive archives. Nature series, true crime, concert films and investigative work all sit in this list.",
  },
  {
    slug: "war",
    id: 10752,
    name: "War",
    emoji: "🎖️",
    title: "War Movies",
    description:
      "War films from every era and every side. Browse the best by rating and decade, with runtimes and release dates for each title.",
    intro:
      "Almost every war film is arguing either for or against the thing it's depicting, and the good ones make that argument through craft rather than dialogue. Combat pictures, home-front drama and post-war reckonings are all included.",
  },
  {
    slug: "western",
    id: 37,
    name: "Western",
    emoji: "🤠",
    title: "Western Movies",
    description:
      "Classic and revisionist westerns. Browse the best by rating and decade — John Ford, spaghetti westerns and modern neo-westerns.",
    intro:
      "The western went from Hollywood's default genre to its most self-critical one in about twenty years. The decade filter makes that arc visible: heroic in the 40s, cynical by the 70s, elegiac ever since.",
  },
  {
    slug: "music",
    id: 10402,
    name: "Music",
    emoji: "🎵",
    title: "Music Movies",
    description:
      "Musicals, concert films and biopics. Browse the best music movies by rating and decade, with runtimes and ratings for every title.",
    intro:
      "This category covers three very different things: staged musicals, concert documentaries and musician biopics. Sorting by rating separates the genuinely great ones from the awards-season formula fairly quickly.",
  },
];

export const GENRE_BY_SLUG = Object.fromEntries(GENRES.map((g) => [g.slug, g]));
export const GENRE_BY_ID = Object.fromEntries(GENRES.map((g) => [g.id, g]));

/** TMDB genre id -> our route slug, for linking from a movie detail page. */
export function slugForGenreId(id) {
  return GENRE_BY_ID[id]?.slug ?? null;
}

export const DECADES = [
  { id: "all", label: "All years" },
  { id: "2020s", label: "2020s" },
  { id: "2010s", label: "2010s" },
  { id: "2000s", label: "2000s" },
  { id: "1990s", label: "1990s" },
  { id: "1980s", label: "1980s" },
  { id: "1970s", label: "1970s" },
  { id: "1960s", label: "1960s" },
];

export const SORTS = [
  { id: "popular", label: "Most popular", tmdb: "popularity.desc" },
  { id: "rating", label: "Highest rated", tmdb: "vote_average.desc" },
  { id: "newest", label: "Newest first", tmdb: "primary_release_date.desc" },
];
