import { useEffect, useState } from "react";
import Image from "next/image";
import { getAllCharacters } from "@services/CharactersService";

const SearchBar = ({
  colorBackground,
  colorHoverBorder,
  colorFocusBorder,
  handleItemClick,
  selectedItemId,
  showButton,
}) => {
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
    if (characters.length > 0 && searchTerm !== "") {
      const fData = characters.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setFilteredData(fData);
    }
  }, [characters, searchTerm]);

  const handleKeyDown = (e, itemId) => {
    if (e.key === "Enter") {
      handleItemClick(itemId);
    }
  };

  useEffect(() => {
    if (selectedItemId == null) {
      setSearchTerm("");
    }
  }, [selectedItemId]);

  return (
    <div
      className={`flex w-full flex-col items-center justify-center ${colorBackground} py-5 ${
        filteredData.length > 0 && searchTerm !== "" ? "" : "pb-5"
      }`}
    >
      <div className={`relative w-5/6`}>
        <input
          type="text"
          className={`h-10 w-full rounded-full border border-gray-300 px-4 pr-10 text-sm transition duration-300 ${colorHoverBorder} ${colorFocusBorder} grow focus:outline-none`}
          placeholder="Type your character"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          disabled={selectedItemId !== null} // Deshabilitar si hay un ID seleccionado
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
      {!showButton &&
        selectedItemId == null &&
        filteredData.length > 0 &&
        searchTerm !== "" && (
          <div className="top-full max-h-[100svh] w-5/6 overflow-y-auto rounded-b-md border border-gray-300 bg-white">
            <ul>
              {filteredData.map((item) => (
                <button
                  key={item.id}
                  className={`flex w-full cursor-pointer flex-row items-center justify-center hover:bg-blue-100 ${
                    selectedItemId === item.id ? "bg-gray-300" : ""
                  }`}
                  onClick={() => handleItemClick(item.id)} // Manejar clics en elementos
                  onKeyDown={(e) => handleKeyDown(e, item.id)} // Manejar teclas en elementos
                  tabIndex={0} // Hacer el elemento enfocable
                >
                  <figure className="mx-4 md:mr-32">
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
                    <li k className="px-4 py-2 text-xs font-bold lg:text-sm	">
                      {item.name}
                    </li>
                    <li className="px-4 py-2 text-xs lg:text-sm ">
                      {item.origin.name}
                    </li>
                  </ul>
                </button>
              ))}
            </ul>
          </div>
        )}
    </div>
  );
};

export default SearchBar;
