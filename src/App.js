import React, { useState } from "react";
import { searchQuran } from "./api"
import "./App.css";

const App = () => {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [matchCount, setMatchCount] = useState(0);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await searchQuran(keyword);
      setResults(data.data.matches);
      setMatchCount(data.data.count);
    } catch (err) {
      setError("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Quran Search</h1>
        <div className="search-bar">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Enter keyword..."
            onKeyPress={handleKeyPress}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        {loading && <h1>Searching in Quran...</h1>}
        {error && <p className="error">{error}</p>}
        {matchCount > 0 && (
          <p className="match-count">Found {matchCount} occurrences</p>
        )}
        <div className="results">
          {results.map((result, index) => (
            <div key={index} className="result">
              <h3>
                Surah {result.surah.number}: Ayah {result.numberInSurah}
              </h3>
              <p>{result.text}</p>
            </div>
          ))}
        </div>
      </header>
    </div>
  );
};

export default App;
