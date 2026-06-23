import type { MenuItem } from "../../types/menu";
import { MENU_ITEM_PLACEHOLDER_SRC } from "../../data/site";
import { getMenuImageSources } from "../../utils/menuImages";

type Props = {
  item: MenuItem;
  className?: string;
  imageClassName?: string;
  loading?: "eager" | "lazy";
};

export function MenuItemImage({
  item,
  className,
  imageClassName = "menu-card__image",
  loading = "lazy",
}: Props) {
  const optimized = item.image ? getMenuImageSources(item.image) : null;

  if (optimized) {
    return (
      <picture className={className}>
        <source type="image/avif" srcSet={optimized.avifSrcSet} sizes={optimized.sizes} />
        <source type="image/webp" srcSet={optimized.webpSrcSet} sizes={optimized.sizes} />
        <img
          src={optimized.fallback}
          alt={item.name}
          className={imageClassName}
          loading={loading}
          decoding="async"
          width={optimized.width}
          height={optimized.height}
        />
      </picture>
    );
  }

  return (
    <img
      src={item.image ?? MENU_ITEM_PLACEHOLDER_SRC}
      alt={item.image ? item.name : ""}
      className={`${imageClassName}${item.image ? "" : " menu-card__image--placeholder"}`}
      loading={loading}
      {...(!item.image ? { "aria-hidden": true } : {})}
    />
  );
}
