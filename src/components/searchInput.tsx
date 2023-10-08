// src/components/SearchInput.tsx
import React, { useState } from "react";

interface SearchInputProps {
  onSearch: (query: string) => void;
  placeHolder: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch, placeHolder }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setQuery(newValue);
    onSearch(newValue); // Call the onSearch callback with the new value
  };

  return (
    <div className="relative  flex items-center border border-solid border-gray-300 w-9/12 h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
      <div className="grid place-items-center h-full w-12 text-gray-300">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <input
        className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
        type="text"
        placeholder={placeHolder}
        value={query}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SearchInput;
