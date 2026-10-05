import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import MedicineCard from "../components/MedicineCard";
import { searchMedicines } from "../services/fdaApi";
import type { Medicine } from "../types/medicine";

function Home() {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  // Cache previous searches
  const cache = useRef<Map<string, Medicine[]>>(new Map());

  // Used to prevent an older request from replacing newer results
  const requestId = useRef(0);

  const handleSearch = async () => {
    const searchTerm = query.trim().toLowerCase();

    if (!searchTerm) {
      setMedicines([]);
      setError("");
      setSearched(false);
      return;
    }

    setSearched(true);
    setError("");

    // Check cache first
    const cachedResults = cache.current.get(searchTerm);

    if (cachedResults) {
      setMedicines(cachedResults);
      return;
    }

    const currentRequestId = ++requestId.current;

    setLoading(true);

    try {
      const results = await searchMedicines(searchTerm);

      // Ignore old request results
      if (currentRequestId !== requestId.current) {
        return;
      }

      cache.current.set(searchTerm, results);
      setMedicines(results);
    } catch (err) {
      if (currentRequestId !== requestId.current) {
        return;
      }

      setMedicines([]);

      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong while searching.");
      }
    } finally {
      if (currentRequestId === requestId.current) {
        setLoading(false);
      }
    }
  };

  return (
    <main className="app">
      <div className="container">

        <header className="header">
          <h1>MediBuddy</h1>

          <p>
            Search medicines and view information from the FDA Drug Label API.
          </p>
        </header>

        <SearchBar
          value={query}
          onChange={setQuery}
          onSearch={handleSearch}
        />

        {loading && (
          <div className="status">
            <div className="loader"></div>
            <p>Searching medicines...</p>
          </div>
        )}

        {!loading && error && (
          <div className="status error">
            <h2>Unable to search</h2>
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && searched && medicines.length === 0 && (
          <div className="status empty">
            <h2>No results found</h2>

            <p>
              Try searching with another medicine brand name.
            </p>
          </div>
        )}

        {!loading && !error && medicines.length > 0 && (
          <section className="results">

            <div className="results-header">
              <h2>Search Results</h2>

              <span>
                {medicines.length}{" "}
                {medicines.length === 1 ? "result" : "results"}
              </span>
            </div>

            <div className="medicine-grid">
              {medicines.map((medicine) => (
                <MedicineCard
                  key={medicine.id}
                  medicine={medicine}
                  onClick={() =>
                    navigate(
                      `/medicine/${encodeURIComponent(medicine.id)}`
                    )
                  }
                />
              ))}
            </div>

          </section>
        )}

      </div>
    </main>
  );
}

export default Home;