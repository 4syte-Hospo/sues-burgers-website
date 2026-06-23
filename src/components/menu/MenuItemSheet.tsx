import { useCallback, useEffect, useId, useRef } from "react";
import type { MenuItem } from "../../types/menu";
import { ORDER_URL } from "../../data/site";
import { formatPrice } from "../../utils/data";
import { MenuItemImage } from "./MenuItemImage";
import "./MenuItemSheet.css";

type Props = {
  item: MenuItem;
  open: boolean;
  scrollY: number;
  onClose: () => void;
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
  document.body.style.position = "";
  document.body.style.top = "";
  document.body.style.left = "";
  document.body.style.right = "";
  document.body.style.width = "";
  window.scrollTo(0, scrollY);
}

export function MenuItemSheet({ item, open, scrollY, onClose, returnFocusRef }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  const orderHref = item.orderLink ?? ORDER_URL;
  const priceDisplay =
    item.priceLabel ?? (item.price != null ? formatPrice(item.price) : "");

  const requestClose = useCallback(() => {
    dialogRef.current?.close();
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open) {
      lockBodyScroll(scrollY);
      if (!dialog.open) {
        dialog.showModal();
      }
      return;
    }

    if (dialog.open) {
      dialog.close();
    }
  }, [open, scrollY]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => {
      unlockBodyScroll(scrollY);
      onClose();
      requestAnimationFrame(() =>
        returnFocusRef.current?.focus({ preventScroll: true }),
      );
    };

    dialog.addEventListener("close", handleClose);
    return () => {
      dialog.removeEventListener("close", handleClose);
      if (document.body.style.position === "fixed") {
        unlockBodyScroll(scrollY);
      }
    };
  }, [onClose, returnFocusRef, scrollY]);

  const handleDialogClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    if (event.target === dialogRef.current) {
      requestClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className="menu-item-sheet"
      aria-labelledby={titleId}
      onClick={handleDialogClick}
    >
      <div className="menu-item-sheet__panel" role="document">
        <div className="menu-item-sheet__handle" aria-hidden="true" />

        <button
          type="button"
          className="menu-item-sheet__close"
          aria-label={`Close ${item.name}`}
          onClick={requestClose}
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
