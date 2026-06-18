import type { MenuCategorySection } from "../types/menu";
import menuImageManifest from "../data/menuImageManifest.json";

/** Redcat online ordering — image CDN used by suesburgers.redcatcloud.com.au */
export const REDCAT_ORDERING_IMAGE_BASE =
  "https://suesburgers.redcatcloud.com.au/static/img/ordering";

/**
 * Temporary menu photos sourced from the Redcat ordering menu API
 * (Woolloongabba store). Replace with local assets when ready.
 */
export const redcatMenuImageById: Record<string, string> = {
  "sues-classic": "CLASSIC.png",
  "signature-sue": "SIGNATURE.png",
  "flying-sue": "flyingsueresz.png",
  "southern-fried-chicken": "SOUTHERNFRIEDCHICKEN.png",
  "dirty-bird": "DIRTYBIRD.png",
  nashville: "NASH.png",
  "vego-signature-sue": "vegosignew.png",
  "raising-daves-box": "davesnewrsz2.png",
  fries: "regfriessolosues.png",
  "onion-rings": "ONIONRINGS.png",
  "chilli-mozzarella-sticks": "mozzaresized.png",
  "cheese-bacon-fries": "cnbfriesnew.png",
  "loaded-maple-fries": "maplefriesnew.png",
  "burger-fries": "burgerfriesnew.png",
  "dipping-sauces": "SAUCES.png",
  "pink-flamingo": "PINKFLAMINGO.png",
  "raspberry-cream-cola": "RASPBERRYCREAMCOLA.png",
  "popping-punch": "POPPINGPUNCH.png",
  "raspberry-coconut": "RASPBERRYCOCONUT.png",
  "peach-spritz": "PEACHSPRITZ.png",
  "caramel-cola": "CARAMELCOLA.png",
  "mango-lychee-splash": "MANGOLYCHEESPLASH.png",
  "tropical-sunset": "TROPICALSNSET.png",
  "oreo-cookies-creme": "oreoshakenew.png",
  "nutella-shake": "nutellashakenew.png",
  "crunchy-biscoff": "biscoffshakenew.png",
  "malteser-shake": "maltesershakenew.png",
  "peanut-butter-shake": "pbshakenew.png",
  "classic-shakes": "classicshakenew.png",
  coke: "cokecansues.png",
  "coke-no-sugar": "cokeNScansues.png",
  sprite: "spritecansues.png",
  fanta: "fantacansues.png",
  "sparkling-water": "SPARKLING450.png",
  "still-water": "WATER600.png",
};

export function redcatOrderingImage(filename: string) {
  return `${REDCAT_ORDERING_IMAGE_BASE}/${filename}`;
}

export function applyTemporaryRedcatImages(
  sections: MenuCategorySection[],
): MenuCategorySection[] {
  return sections.map((section) => ({
    ...section,
    items: section.items.map((item) => {
      const localImage = menuImageManifest[item.id as keyof typeof menuImageManifest];
      if (localImage) {
        return { ...item, image: localImage };
      }

      if (item.image?.startsWith("/images/menu/")) return item;

      const filename = redcatMenuImageById[item.id];
      if (!filename) return item;

      return { ...item, image: redcatOrderingImage(filename) };
    }),
  }));
}
