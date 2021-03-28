import React, { useState } from "react";
import axios from "axios";
const SearchResults = () => {
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState([]);
  const submitSearch = (e) => {
    e.preventDefault();
    axios
      .post("/note/search", {
        text: searchText,
      })
      .then((res) => {
        setResults(res.data.result);
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="container text-center mt-5" style={{ maxWidth: "60%" }}>
      <input
        type="text"
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Enter search"
        className="form-control"
      />
      <button onClick={submitSearch} className="btn btn-sm btn-success mt-2">
        Search
      </button>
      <hr />
      <h3>Search Results</h3>
      <ul className="list-group">
        {results.map((res) => (
          <li key={res._id} className="list-group-item">
            {res.title} - {res.content}
          </li>
        ))}
        <hr />
        {results.length === 0 ? <h6>No results to show</h6> : <></>}
      </ul>
    </div>
  );
};

export default SearchResults;
