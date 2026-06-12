/** About section copy and collage photos — swap images in public/images/about/ */
export const aboutContent = {
  eyebrow: "About us",
  headline: "Best burgers and thickshakes in Brisbane.",
  body: [
    "You've seen us online — now taste why. Sue's Burgers & Shakes is home to some of Brisbane's favourite smash burgers, Raising Dave's fried chicken boxes, Dirty Sodas and loaded fries. Everything is made fresh, served fast, and designed to live up to the hype.",
    "From our retro-inspired roots to our growing Brisbane locations, we're obsessed with great food, good vibes and creating the kind of meals people can't stop talking about.",
  ],
  cta: { label: "View Menu", href: "#menu" },
  photos: [
    {
      src: "/images/about/raising-daves-box.png",
      alt: "Raising Dave's Box with fried chicken, fries, Texas toast and sauce",
    },
    {
      src: "/images/about/burger-stack.png",
      alt: "A stack of Sue's smash burgers and fried chicken burgers",
    },
  ],
} as const;
