import { useCallback, useEffect, useId, useLayoutEffect, useRef } from "react";
import type { MenuItem } from "../../types/menu";
import { ORDER_URL } from "../../data/site";
import { formatPrice } from "../../utils/data";
import { MenuItemImage } from "./MenuItemImage";
import "./MenuItemSheet.css";

const EXIT_MS = 340;

type Props = {
  item: MenuItem;
  open: boolean;
  scrollY: number;
  onClose: () => void;
  onExited: () => void;
  returnFocusRef: React.RefObject<HTMLElement | null>;
};

function lockBodyScroll(scrollY: number) {
  document.body.style.position = "fixed";
  document.body.style.top = `-${scrollY}px`;
  document.body.style.left = "0";
  document.body.style.right = "0";
  document.body.style.width = "100%";
}

function unlockBodyScroll(scrollY: number) {
  const previousBehavior = document.documentElement.style.scrollBehavior;
  document.documentElement.style.scrollBehavior = "auto";

  document.body.style.position = "";
  document.body.style.top = "";
  document.body.style.left = "";
  document.body.style.right = "";
  document.body.style.width = "";

  document.documentElement.scrollTop = scrollY;
  document.body.scrollTop = scrollY;
  window.scrollTo(0, scrollY);

  document.documentElement.style.scrollBehavior = previousBehavior;
}

export function MenuItemSheet({
  item,
  open,
  scrollY,
  onClose,
  onExited,
  returnFocusRef,
}: Props) {
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

    unlockBodyScroll(scrollYRef.current);
    dialogRef.current?.close();
    onExited();

    requestAnimationFrame(() => {
      returnFocusRef.current?.focus({ preventScroll: true });
    });
  }, [onExited, returnFocusRef]);

  const beginClose = useCallback(() => {
    if (isClosingRef.current || hasFinishedRef.current) return;

    onClose();

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

    const handleTransitionEnd = (event: TransitionEvent) => {
      if (event.target !== panel || event.propertyName !== "transform") return;
      panel.removeEventListener("transitionend", handleTransitionEnd);
      finishClose();
    };

    panel.addEventListener("transitionend", handleTransitionEnd);
    window.setTimeout(() => {
      panel.removeEventListener("transitionend", handleTransitionEnd);
      finishClose();
    }, EXIT_MS + 80);
  }, [finishClose, onClose]);

  useLayoutEffect(() => {
    scrollYRef.current = scrollY;
    lockBodyScroll(scrollY);
    dialogRef.current?.showModal();
  }, [scrollY]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const frame = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        isAnimatedInRef.current = true;
        dialog.classList.add("menu-item-sheet--visible");
      });
    });

    const handleCancel = (event: Event) => {
      event.preventDefault();
      beginClose();
    };

    dialog.addEventListener("cancel", handleCancel);

    return () => {
      window.cancelAnimationFrame(frame);
      dialog.removeEventListener("cancel", handleCancel);
    };
  }, [beginClose]);

  useEffect(() => {
    if (!open) {
      beginClose();
    }
  }, [open, beginClose]);

  const handleDialogClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    if (event.target === dialogRef.current) {
      beginClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className="menu-item-sheet"
      aria-labelledby={titleId}
      onClick={handleDialogClick}
    >
      <div ref={panelRef} className="menu-item-sheet__panel" role="document">
        <div className="menu-item-sheet__handle" aria-hidden="true" />

        <button
          type="button"
          className="menu-item-sheet__close"
          aria-label={`Close ${item.name}`}
          onClick={beginClose}
        >
          <span aria-hidden="true">&times;</span>
        </button>

        <div className="menu-item-sheet__media">
          <MenuItemImage
            item={item}
            imageClassName="menu-item-sheet__image"
            loading="eager"
          />
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
