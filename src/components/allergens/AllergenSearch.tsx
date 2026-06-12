import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type SyntheticEvent,
} from "react";
import {
  scrollToAllergenItem,
  searchAllergenItems,
  type AllergenSearchResult,
} from "../../utils/allergenSearch";
import "./AllergenSearch.css";

export function AllergenSearch() {
  const inputId = useId();
  const listboxId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<AllergenSearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setActiveIndex(-1);
      return;
    }

    setResults(searchAllergenItems(query));
    setActiveIndex(-1);
  }, [query]);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, []);

  const openResults = () => {
    if (query.trim()) setIsOpen(true);
  };

  const selectResult = (result: AllergenSearchResult) => {
    scrollToAllergenItem(result.id);
    setQuery(result.name);
    setIsOpen(false);
    setActiveIndex(-1);
    inputRef.current?.blur();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || results.length === 0) {
      if (event.key === "ArrowDown" && query.trim()) {
        setIsOpen(true);
      }
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((current) => (current + 1) % results.length);
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((current) => (current <= 0 ? results.length - 1 : current - 1));
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      const selected = activeIndex >= 0 ? results[activeIndex] : results[0];
      if (selected) selectResult(selected);
      return;
    }

    if (event.key === "Escape") {
      setIsOpen(false);
      setActiveIndex(-1);
    }
  };

  const showList = isOpen && query.trim().length > 0;

  return (
    <div className="allergen-search" ref={rootRef}>
      <label className="allergen-search__label" htmlFor={inputId}>
        Find a menu item
      </label>

      <div className="allergen-search__field">
        <svg
          className="allergen-search__icon"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path d="M16 16l5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>

        <input
          ref={inputRef}
          id={inputId}
          type="search"
          className="allergen-search__input"
          placeholder="Search burgers, sides, shakes..."
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setIsOpen(true);
          }}
          onFocus={openResults}
          onKeyDown={handleKeyDown}
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={showList}
          aria-controls={showList ? listboxId : undefined}
          aria-activedescendant={
            showList && activeIndex >= 0 ? `${listboxId}-option-${activeIndex}` : undefined
          }
          autoComplete="off"
        />
      </div>

      {showList && (
        <ul
          id={listboxId}
          className="allergen-search__results"
          role="listbox"
          aria-label="Menu item matches"
        >
          {results.length === 0 ? (
            <li className="allergen-search__empty" role="presentation">
              No items found — try another name
            </li>
          ) : (
            results.map((result, index) => (
              <li key={result.id} role="presentation">
                <button
                  id={`${listboxId}-option-${index}`}
                  type="button"
                  role="option"
                  aria-selected={index === activeIndex}
                  className={`allergen-search__option${
                    index === activeIndex ? " allergen-search__option--active" : ""
                  }`}
                  onMouseDown={(event: SyntheticEvent) => event.preventDefault()}
                  onClick={() => selectResult(result)}
                >
                  <span className="allergen-search__option-name">{result.name}</span>
                  <span className="allergen-search__option-section">{result.sectionTitle}</span>
                </button>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
