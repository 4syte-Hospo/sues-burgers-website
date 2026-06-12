import "./AllergenKey.css";

export function AllergenKey() {
  return (
    <div className="allergen-key" aria-label="Allergen information key">
      <h2 className="allergen-key__title">Information Key</h2>
      <ul className="allergen-key__list">
        <li className="allergen-key__item">
          <span className="allergen-key__symbol allergen-key__symbol--contains" aria-hidden="true">
            X
          </span>
          <span>Item contains this allergen</span>
        </li>
        <li className="allergen-key__item">
          <span className="allergen-key__symbol allergen-key__symbol--traces" aria-hidden="true">
            O
          </span>
          <span>Traces of allergen may be present</span>
        </li>
      </ul>
    </div>
  );
}
