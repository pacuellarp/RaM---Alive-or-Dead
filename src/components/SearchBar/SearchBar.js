import { useEffect, useState } from "react";
import Image from "next/image";
import { getAllCharacters } from "@services/CharacterService";

const SearchBar = ({ colorBackground, colorHoverBorder, colorFocusBorder }) => {
  const [characters, setCharacters] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    // Llama a la función del servicio para obtener los personajes
    getAllCharacters()
      .then((data) => setCharacters(data))
      .catch((error) => console.error("Error fetching characters:", error));
  }, []);

  useEffect(() => {
    // Filtrar los objetos que coincidan con el término de búsqueda
    if (characters.length > 0 && searchTerm != "") {
      const fData = characters.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setFilteredData(fData);
    }
  }, [characters, searchTerm]);

  return (
    <div
      className={`flex w-full flex-col items-center justify-center ${colorBackground} py-5 ${filteredData.length > 0 && searchTerm != "" ? "" : "pb-5"}`}
    >
      <div className={`relative w-5/6`}>
        <input
          type="text"
          className={`h-10 w-full rounded-full border border-gray-300 px-4 pr-10 text-sm transition duration-300 ${colorHoverBorder} ${colorFocusBorder} grow focus:outline-none`}
          placeholder="Type your character"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="absolute inset-y-0 right-0 px-4 text-gray-600 focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </button>
      </div>
      {/* Mostrar la lista solo si hay elementos filtrados */}
      {filteredData.length > 0 && searchTerm != "" && (
        <div className="top-full max-h-[100svh] w-5/6 overflow-y-auto rounded-b-md border border-gray-300 bg-white">
          <ul>
            {filteredData.map((item) => (
              <div
                key={item.id}
                className="flex cursor-pointer flex-row items-center justify-center hover:bg-blue-100"
              >
                <figure className="md:mr-32 mx-4">
                  <Image
                    key={item.id}
                    src={`${item.image}`}
                    width={100}
                    height={100}
                    alt="Picture of the character"
                    className=""
                  />
                </figure>
                <ul key={item.id} className="flex flex-col justify-start">
                  <li k className="lg:text-sm px-4 py-2 text-xs font-bold	">
                    {item.name}
                  </li>
                  <li className="lg:text-sm px-4 py-2 text-xs ">
                    {item.origin.name}
                  </li>
                </ul>
              </div>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
