import React, { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [inputValue, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [cachedData, setCachedData] = useState({});

  const fetchData = async (query = "") => {
    try {
      const res = await fetch(
        `https://dummyjson.com/recipes/search?q=${query}`
      );
      const data = await res.json();
      console.log("Fetched Data:", data);

      if (data.recipes) {
        setResults(data.recipes);
        setCachedData((prev) => ({
          ...prev,
          [query]: data.recipes,
        }));
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData("");
  }, []);

  useEffect(() => {
    if (cachedData[inputValue]) {
      setResults(cachedData[inputValue]);
      return;
    }

    const timer = setTimeout(() => {
      fetchData(inputValue);
    }, 300);

    return () => clearTimeout(timer);
  }, [inputValue]);

  const handleClick = (name) => {
    setInput(name);
    setShowResults(false);
  };

  return (
    <div className="App">
      <h1>Autocomplete Field</h1>
      <div>
        <input
          className="inp"
          type="text"
          value={inputValue}
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => setShowResults(true)}
          onBlur={() => setTimeout(() => setShowResults(false), 200)}
        />
      </div>
      {showResults && (
        <div className="search-results">
          {results.length > 0 ? (
            results.map((item, idx) => (
              <span
                key={idx}
                className="span-box"
                onClick={() => handleClick(item.name)}
              >
                {item?.name}
              </span>
            ))
          ) : (
            <span className="no-results">No results found</span>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
