import { allergenColumns } from "../../data/allergens";
import type { AllergenSection } from "../../types/allergens";
import { getAllergenItemId } from "../../utils/allergenSearch";
import "./AllergenTable.css";

type AllergenTableProps = {
  section: AllergenSection;
};

function AllergenCell({ status }: { status: "contains" | "traces" }) {
  const symbol = status === "contains" ? "X" : "O";
  const label = status === "contains" ? "Contains allergen" : "Traces may be present";

  return (
    <span
      className={`allergen-cell allergen-cell--${status}`}
      aria-label={label}
      title={label}
    >
      <span aria-hidden="true">{symbol}</span>
    </span>
  );
}

export function AllergenTable({ section }: AllergenTableProps) {
  return (
    <section className="allergen-table-section" aria-labelledby={`allergen-${section.id}`}>
      <h2 id={`allergen-${section.id}`} className="allergen-table-section__title">
        {section.title}
      </h2>

      <div className="allergen-mobile-list" aria-label={`${section.title} allergen details`}>
        {section.rows.map((row) => {
          const itemId = getAllergenItemId(section.id, row.name);

          return (
          <article key={row.name} id={itemId} className="allergen-mobile-card allergen-item-target">
            <h3 className="allergen-mobile-card__name">{row.name}</h3>
            <dl className="allergen-mobile-card__grid">
              {allergenColumns.map((column) => (
                <div key={column.key} className="allergen-mobile-card__row">
                  <dt className="allergen-mobile-card__term">{column.label}</dt>
                  <dd className="allergen-mobile-card__value">
                    <AllergenCell status={row.allergens[column.key]} />
                  </dd>
                </div>
              ))}
            </dl>
          </article>
          );
        })}
      </div>

      <div className="allergen-table-wrap">
        <table className="allergen-table">
          <thead>
            <tr>
              <th scope="col" className="allergen-table__item-col">
                Item
              </th>
              {allergenColumns.map((column) => (
                <th key={column.key} scope="col" className="allergen-table__allergen-col">
                  <span className="allergen-table__abbr">{column.abbr}</span>
                  <span className="allergen-table__label">{column.label}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {section.rows.map((row) => {
              const itemId = getAllergenItemId(section.id, row.name);

              return (
              <tr key={row.name} id={itemId} className="allergen-item-target">
                <th scope="row" className="allergen-table__item">
                  {row.name}
                </th>
                {allergenColumns.map((column) => (
                  <td key={column.key} className="allergen-table__cell">
                    <AllergenCell status={row.allergens[column.key]} />
                  </td>
                ))}
              </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
