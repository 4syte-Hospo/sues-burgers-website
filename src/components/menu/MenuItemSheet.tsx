import { useCallback, useEffect, useId, useLayoutEffect, useRef } from "react";
import type { MenuItem } from "../../types/menu";
import { ORDER_URL } from "../../data/site";
import { formatPrice } from "../../utils/data";
import {
  isMenuSheetScrollLocked,
  lockMenuSheetScroll,
  unlockMenuSheetScroll,
} from "../../utils/menuSheetScroll";
import { MenuItemImage } from "./MenuItemImage";
import "./MenuItemSheet.css";

const TRANSITION_MS = 360;

type Props = {
  item: MenuItem;
  scrollY: number;
  onExited: () => void;
};

export function MenuItemSheet({ item, scrollY, onExited }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const scrollYRef = useRef(scrollY);
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

    const dialog = dialogRef.current;
    if (dialog) {
      dialog.style.visibility = "hidden";
    }

    unlockMenuSheetScroll(scrollYRef.current);

    requestAnimationFrame(() => {
      dialogRef.current?.close();
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
    dialogRef.current?.classList.remove("menu-item-sheet--visible");

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
    scrollYRef.current = scrollY;

    if (!isMenuSheetScrollLocked()) {
      lockMenuSheetScroll();
    }

    const dialog = dialogRef.current;
    if (!dialog) return;

    dialog.showModal();

    // Ensure the closed transform is committed before animating open.
    void dialog.offsetHeight;

    const frame = window.requestAnimationFrame(() => {
      isAnimatedInRef.current = true;
      dialog.classList.add("menu-item-sheet--visible");
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [scrollY]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleCancel = (event: Event) => {
      event.preventDefault();
      beginClose();
    };

    dialog.addEventListener("cancel", handleCancel);
    return () => dialog.removeEventListener("cancel", handleCancel);
  }, [beginClose]);

  const handleDialogClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    if (event.target === dialogRef.current) {
      beginClose();
    }
  };

  const handleCloseClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    beginClose();
  };

  return (
    <dialog
      ref={dialogRef}
      className="menu-item-sheet"
      aria-labelledby={titleId}
      onClick={handleDialogClick}
    >
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
    </dialog>
  );
}
