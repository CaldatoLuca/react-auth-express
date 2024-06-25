import { useState } from "react";

const SearchBar = ({ setSearchQuery }) => {
  const [userInput, setUserInput] = useState("");

  const handleChange = (e) => {
    setUserInput(e.target.value);
    setSearchQuery(e.target.value.trim());
  };

  return (
    <div className="w-full text-center">
      <input
        type="text"
        placeholder="Search Post..."
        className="rounded-md bg-slate-500 bg-opacity-50 p-1 cursor-pointer focus:outline-none focus:border-transparent w-2/3 mb-5"
        onChange={handleChange}
        value={userInput}
      />
    </div>
  );
};

export default SearchBar;
