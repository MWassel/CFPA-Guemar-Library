import { useState } from "react";
import MostPopularBooksComp from "./mostPopularBooksComp";
import Image from "next/image";

export default function BookSearchComp({ hight, width }) {
  const [books, setBooks] = useState([]);
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
      setBooks(bookTitles);
    } else {
      setBooks([]);
    }
  };

  return (
    <div
      className={`w-${width} h-${hight} flex flex-col flex-grow rounded-3xl bg-darkBlueCard shadow-md p-4 text-center`}
    >
      <input
        className=" w-11/12 rounded-full px-4 p-2 self-center mt-6 mb-4 focus:outline-none focus:ring-1 bg-gray-700 text-white text-center"
        type="text"
        placeholder="...إبحث عن كتاب"
        value={query}
        onChange={handleSearch}
      />
      {query ? (
        <div className="flex flex-wrap flex-grow justify-end mt-2">
          {books.map((book) => (
            <div
              key={book.id}
              className=" w-44 h-52 flex flex-col items-center justify-center mt-4 mr-2 "
            >
              <Image
                src={"/" + book.book_cover}
                width={120}
                height={130}
                alt={book.book_title}
              />
              <h3 className="text-white font-bold mt-2 text-sm">
                {book.book_title}
              </h3>
              <p className=" text-white text-xs">{book.Author.author_name}</p>
            </div>
          ))}
        </div>
      ) : (
        <MostPopularBooksComp />
      )}
    </div>
  );
}
