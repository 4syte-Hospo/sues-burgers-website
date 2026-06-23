import { useCallback, useEffect, useId, useLayoutEffect, useRef } from "react";
import { createPortal } from "react-dom";
import type { MenuItem } from "../../types/menu";
import { ORDER_URL } from "../../data/site";
import { formatPrice } from "../../utils/data";
import {
  lockMenuSheetScroll,
  unlockMenuSheetScroll,
} from "../../utils/menuSheetScroll";
import { MenuItemImage } from "./MenuItemImage";
import "./MenuItemSheet.css";

const TRANSITION_MS = 360;

type Props = {
  item: MenuItem;
  onExited: () => void;
};

export function MenuItemSheet({ item, onExited }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const isAnimatedInRef = useRef(false);
  const isClosingRef = useRef(false);
  const hasFinishedRef = useRef(false);
  const titleId = useId();

  const orderHref = item.orderLink ?? ORDER_URL;
  const priceDisplay =
    item.priceLabel ?? (item.price != null ? formatPrice(item.price) : "");

  const finishClose = useCallback(() => {
    if (hasFinishedRef.current) return;
    hasFinishedRef.current = true;
    isClosingRef.current = false;

    requestAnimationFrame(() => {
      onExited();
    });
  }, [onExited]);

  const beginClose = useCallback(() => {
    if (isClosingRef.current || hasFinishedRef.current) return;

    if (!isAnimatedInRef.current) {
      finishClose();
      return;
    }

    isClosingRef.current = true;
    isAnimatedInRef.current = false;
    rootRef.current?.classList.remove("menu-item-sheet--visible");

    const panel = panelRef.current;
    if (!panel) {
      finishClose();
      return;
    }

    let finished = false;
    const complete = () => {
      if (finished) return;
      finished = true;
      panel.removeEventListener("transitionend", handleTransitionEnd);
      finishClose();
    };

    const handleTransitionEnd = (event: TransitionEvent) => {
      if (event.target !== panel || event.propertyName !== "transform") return;
      complete();
    };

    panel.addEventListener("transitionend", handleTransitionEnd);
    window.setTimeout(complete, TRANSITION_MS + 80);
  }, [finishClose]);

  useLayoutEffect(() => {
    lockMenuSheetScroll();
    return () => unlockMenuSheetScroll();
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    void root.offsetHeight;

    const frame = window.requestAnimationFrame(() => {
      isAnimatedInRef.current = true;
      root.classList.add("menu-item-sheet--visible");
      if (panelRef.current) {
        panelRef.current.style.willChange = "auto";
      }
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        beginClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [beginClose]);

  const handleCloseClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    beginClose();
  };

  return createPortal(
    <div
      ref={rootRef}
      className="menu-item-sheet"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <button
        type="button"
        className="menu-item-sheet__backdrop"
        aria-label="Close menu item"
        onClick={beginClose}
      />

      <div ref={panelRef} className="menu-item-sheet__panel" role="document">
        <div className="menu-item-sheet__media">
          <MenuItemImage
            item={item}
            imageClassName="menu-item-sheet__image"
            loading="eager"
          />

          <div className="menu-item-sheet__chrome">
            <div className="menu-item-sheet__handle" aria-hidden="true" />
            <button
              type="button"
              className="menu-item-sheet__close"
              aria-label={`Close ${item.name}`}
              onClick={handleCloseClick}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </div>

        <div className="menu-item-sheet__body">
          {item.badge && (
            <span className="menu-item-sheet__badge">{item.badge}</span>
          )}

          <div className="menu-item-sheet__header">
            <h2 id={titleId} className="menu-item-sheet__name">
              {item.name}
            </h2>
            {priceDisplay && (
              <p className="menu-item-sheet__price">{priceDisplay}</p>
            )}
          </div>

          {item.description && (
            <p className="menu-item-sheet__description">{item.description}</p>
          )}

          <a
            href={orderHref}
            className="btn btn--primary menu-item-sheet__order"
            target="_blank"
            rel="noopener noreferrer"
          >
            Order Now
          </a>
        </div>
      </div>
    </div>,
    document.body,
  );
}
