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
    <div className=" w-full h-48 flex flex-col flex-grow rounded-3xl bg-darkBlueCard shadow-md p-4 text-right">
      <div className="text-right text-white font-bold mr-4 text-2xl m-2">
        إبحث عن كتاب
      </div>
      <input
        className="w-full rounded-full px-4 p-2 self-center mt-16 focus:outline-none focus:ring-1 bg-gray-700 text-white"
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
