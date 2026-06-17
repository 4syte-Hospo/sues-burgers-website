import { AboutSection } from "../components/AboutSection";
import { Marquee } from "../components/Marquee";
import { RaisingDavesSection } from "../components/RaisingDavesSection";
import { TikTokSection } from "../components/tiktok/TikTokSection";
import { HeroSlider } from "../components/hero/HeroSlider";
import { MenuSection } from "../components/menu/MenuSection";
import { getHomeTikTokVariant } from "../config/tiktokCarousel";
import { getActiveSlides } from "../utils/data";
import { getFanFavouriteItems } from "../utils/menu";

export function HomePage() {
  const slides = getActiveSlides();
  const fanFavourites = getFanFavouriteItems();
  const tiktokVariant = getHomeTikTokVariant();

  return (
    <>
      <HeroSlider slides={slides} />
      <Marquee />
      <AboutSection />
      <RaisingDavesSection />
      <MenuSection items={fanFavourites} />
      <TikTokSection variant={tiktokVariant} />
    </>
  );
}
