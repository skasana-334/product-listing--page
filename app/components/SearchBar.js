"use client";

export default function SearchBar({ searchTerm, onSearch }) {
  return (
    <div className="mb-4 flex justify-center">
      <input
        type="text"
        className="p-2 border rounded focus:outline-blue-500 focus:ring focus:ring-black w-52 md:focus:w-2/4 transition-all focus:w-full"
        placeholder="🔍 Search..."
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
}
