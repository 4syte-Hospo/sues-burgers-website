import { useCallback, useEffect, useRef, useState } from "react";
import type { MenuItem } from "../../types/menu";
import { ORDER_URL } from "../../data/site";
import { formatPrice } from "../../utils/data";
import { MenuItemImage } from "./MenuItemImage";
import { MenuItemSheet } from "./MenuItemSheet";
import "./MenuCard.css";

type Props = {
  item: MenuItem;
};

function useTouchPrimary() {
  const [isTouchPrimary, setIsTouchPrimary] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(hover: none)");
    const update = () => setIsTouchPrimary(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return isTouchPrimary;
}

export function MenuCard({ item }: Props) {
  const cardRef = useRef<HTMLElement>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [sheetMounted, setSheetMounted] = useState(false);
  const [sheetScrollY, setSheetScrollY] = useState(0);
  const isTouchPrimary = useTouchPrimary();

  const orderHref = item.orderLink ?? ORDER_URL;
  const priceDisplay =
    item.priceLabel ?? (item.price != null ? formatPrice(item.price) : "");

  const openSheet = useCallback(() => {
    setSheetScrollY(window.scrollY);
    setSheetMounted(true);
    setSheetOpen(true);
  }, []);

  const handleCardClick = (event: React.MouseEvent<HTMLElement>) => {
    if (!isTouchPrimary) return;
    if ((event.target as HTMLElement).closest("a")) return;
    openSheet();
  };

  const handleCardKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (!isTouchPrimary) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openSheet();
    }
  };

  return (
    <>
      <article
        ref={cardRef}
        className={`menu-card${isTouchPrimary ? " menu-card--touch" : ""}`}
        {...(isTouchPrimary
          ? {
              role: "button",
              tabIndex: 0,
              onClick: handleCardClick,
              onKeyDown: handleCardKeyDown,
              "aria-haspopup": "dialog" as const,
              "aria-expanded": sheetOpen,
            }
          : {})}
      >
        <div className="menu-card__media">
          <MenuItemImage item={item} />
          {item.badge && <span className="menu-card__badge">{item.badge}</span>}
        </div>

        <div className="menu-card__body">
          <div className="menu-card__header">
            <h3 className="menu-card__name">{item.name}</h3>
            {priceDisplay && (
              <span className="menu-card__price">{priceDisplay}</span>
            )}
          </div>

          {item.description && (
            <p className="menu-card__description">{item.description}</p>
          )}

          <a
            href={orderHref}
            className="btn btn--primary btn--compact menu-card__order"
            target="_blank"
            rel="noopener noreferrer"
          >
            Order Now
          </a>
        </div>
      </article>

      {isTouchPrimary && sheetMounted && (
        <MenuItemSheet
          item={item}
          open={sheetOpen}
          scrollY={sheetScrollY}
          onClose={() => setSheetOpen(false)}
          onExited={() => {
            setSheetMounted(false);
            setSheetOpen(false);
          }}
          returnFocusRef={cardRef}
        />
      )}
    </>
  );
}
