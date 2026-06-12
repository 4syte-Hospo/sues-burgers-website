import { marqueeItems } from "../data/site";
import "./Marquee.css";

export function Marquee() {
  const items = [...marqueeItems, ...marqueeItems];

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {items.map((item, i) => (
          <span className="marquee__item" key={`${item}-${i}`}>
            {item}
            <span className="marquee__icon">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
