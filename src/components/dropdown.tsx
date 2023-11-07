import React, { useState } from "react";

interface DropdownProps {
  filterOptions: string[];
  selectedFilter: string;
  onChange: (selectedFilter: string) => void;
  isDisabled?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
  filterOptions,
  selectedFilter,
  onChange,
  isDisabled,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  console.log(isDisabled);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleFilterChange = (filter: string) => {
    onChange(filter);
    setIsDropdownOpen(false); // Close the dropdown when an option is selected
  };

  return (
    <div className="relative inline-block text-left ">
      <button
        onClick={toggleDropdown}
        className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${
          isDisabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
        type="button"
        disabled={isDisabled}
        data-testId="dropdown-button"
      >
        {selectedFilter}
        <svg
          className={`w-2.5 h-2.5 ml-2.5 transform ${
            isDropdownOpen ? "rotate-180" : "rotate-0"
          }`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>
      {/* Dropdown menu */}
      {isDropdownOpen && (
        <div className="z-10 absolute left-0 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200 cursor-pointer">
            {filterOptions.map((option) => (
              <li key={option}>
                <p
                  onClick={() => handleFilterChange(option)}
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  {option}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
