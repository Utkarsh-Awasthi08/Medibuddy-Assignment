interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
}

function SearchBar({
  value,
  onChange,
  onSearch,
}: SearchBarProps) {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSearch();
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search medicine..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />

      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;