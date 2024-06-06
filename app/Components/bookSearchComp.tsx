import { useState } from "react";

export default function BookSearchComp() {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);
    if (query) {
      const response = await fetch(
        `http://localhost:3000/api/search?query=${query}`
      );
      const bookTitles = await response.json();
      setSearchResults(bookTitles);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <div className=" w-1/4 flex flex-col rounded-3xl bg-darkBlueCard shadow-md p-4">
      <div className="text-right text-white font-bold mr-1">إبحث عن كتاب</div>
      <input
        className="w-full rounded-full px-4 py-2 mt-4 mb-6 focus:outline-none focus:ring-1 bg-gray-700 text-white"
        type="text"
        placeholder="Search"
        value={query}
        onChange={handleSearch}
      />
      {query && (
        <ul className=" text-white">
          {searchResults.map((book) => (
            <li key={book.id}>{book.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
