import type { MenuItem } from "../../types/menu";
import { MENU_ITEM_PLACEHOLDER_SRC, ORDER_URL } from "../../data/site";
import { formatPrice } from "../../utils/data";
import "./MenuCard.css";

type Props = {
  item: MenuItem;
};

export function MenuCard({ item }: Props) {
  const orderHref = item.orderLink ?? ORDER_URL;
  const priceDisplay =
    item.priceLabel ?? (item.price != null ? formatPrice(item.price) : "");

  return (
    <article className="menu-card">
      <div className="menu-card__media">
        <img
          src={item.image ?? MENU_ITEM_PLACEHOLDER_SRC}
          alt={item.image ? item.name : ""}
          className={`menu-card__image${item.image ? "" : " menu-card__image--placeholder"}`}
          loading="lazy"
          {...(!item.image ? { "aria-hidden": true } : {})}
        />
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
  );
}
