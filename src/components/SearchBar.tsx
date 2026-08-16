import { useEffect, useMemo, useState } from "react";
import { suggestionsFor } from "../lib/search";

export function SearchBar({
  initial = "",
  onSubmit,
}: {
  initial?: string;
  onSubmit: (query: string) => void;
}) {
  const [value, setValue] = useState(initial);
  const suggestions = useMemo(() => suggestionsFor(value), [value]);

  useEffect(() => {
    setValue(initial);
  }, [initial]);

  return (
    <form
      className="search-panel"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(value.trim());
      }}
    >
      <label className="kicker" htmlFor="condition-search">
        Search your condition
      </label>
      <div className="search-row">
        <input
          id="condition-search"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="bruise on dark skin"
          autoComplete="off"
        />
        <button className="primary" type="submit">
          Search
        </button>
      </div>
      <div className="suggestions">
        {suggestions.map((suggestion) => (
          <button
            type="button"
            className="chip"
            key={suggestion}
            onClick={() => {
              setValue(suggestion);
              onSubmit(suggestion);
            }}
          >
            {suggestion}
          </button>
        ))}
      </div>
    </form>
  );
}
