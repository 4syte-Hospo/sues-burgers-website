export type TikTokVideo = {
  id: string;
  label: string;
  thumbnail: string;
  caption: string;
  creator: string;
  url: string;
};

/** Sue's Love section copy + TikTok carousel videos */
export const tiktokSection = {
  tagline: "Tag us in your creations!",
  handle: "@suesburgersandshakes",
  handleUrl: "https://www.tiktok.com/@suesburgersandshakes",
} as const;

export const tiktokVideos: TikTokVideo[] = [
  {
    id: "7522278041230380295",
    label: "Sue's Burgers & Shakes",
    thumbnail: "/images/tiktok/sues-burgers-shakes.jpg",
    caption:
      "Sue's Burgers & Shakes — hot honey Raising Dave's box, chilli mozzarella sticks and more.",
    creator: "frankiee.eats",
    url: "https://www.tiktok.com/@frankiee.eats/video/7522278041230380295",
  },
  {
    id: "7462215355553844498",
    label: "TikTok review",
    thumbnail: "/images/tiktok/review-raising-canes.jpg",
    caption: "Trying the Raising Cane's dupe — it was so yummy.",
    creator: "xiaoxiao",
    url: "https://www.tiktok.com/@xiaox2/video/7462215355553844498",
  },
  {
    id: "7467718216173849863",
    label: "TikTok review",
    thumbnail: "/images/tiktok/review-woolloongabba.jpg",
    caption: "Trying the Raising Cane's dupe at Sue's Burgers Woolloongabba.",
    creator: "caeleemazis",
    url: "https://www.tiktok.com/@caeleemaziss/video/7467718216173849863",
  },
  {
    id: "7582029615590280478",
    label: "TikTok review",
    thumbnail: "/images/tiktok/fit-by-friday.jpg",
    caption: "I've been dreaming about this since I had it… @Sue's Burgers and Shakes",
    creator: "fitbyfriday",
    url: "https://www.tiktok.com/@fitbyfriday/video/7582029615590280478",
  },
  {
    id: "7491961228449860865",
    label: "Chilli mozza sticks",
    thumbnail: "/images/tiktok/chilli-mozza.jpg",
    caption: "New chilli mozza sticks at Sue's Burgers and Shakes.",
    creator: "burgerquest",
    url: "https://www.tiktok.com/@burgerquest/video/7491961228449860865",
  },
  {
    id: "7609078718463479047",
    label: "Sue's favourite",
    thumbnail: "/images/tiktok/sues-favourite.jpg",
    caption: "Sue's Burgers and Shakes food review — cheese pull heaven.",
    creator: "rogue_riorson_mitchell",
    url: "https://www.tiktok.com/@rogue_riorson_mitchell/video/7609078718463479047",
  },
];

export const TIKTOK_EMBED_BASE = "https://www.tiktok.com/embed/v2";
