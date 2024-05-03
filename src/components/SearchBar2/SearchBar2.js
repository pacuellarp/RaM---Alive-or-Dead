import { useEffect, useState } from "react";
import Image from "next/image";
import { getAllCharacters } from "@services/CharactersService";
import { getAllEpisodes } from "@services/EpisodesService";
import { getAllLocations } from "@services/LocationsService";

const SearchBar2 = ({
  colorBackground,
  colorHoverBorder,
  colorFocusBorder,
  handleItemClick,
  selectedItemId,
  showButton,
  selectedOptionToFetch,
}) => {
  const [characters, setCharacters] = useState([]);
  const [locations, setLocations] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dataToFilter, setDataToFilter] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [placeholderMessage, setPlaceholderMessage] = useState("");

  useEffect(() => {
    // Llama a la función del servicio para obtener los personajes
    getAllCharacters()
      .then((data) => setCharacters(data))
      .catch((error) => console.error("Error fetching characters:", error));
  }, []);

  useEffect(() => {
    // Llama a la función del servicio para obtener los episodios
    getAllEpisodes()
      .then((data) => setEpisodes(data))
      .catch((error) => console.error("Error fetching characters:", error));
  }, []);

  useEffect(() => {
    // Llama a la función del servicio para obtener las locaciones
    getAllLocations()
      .then((data) => setLocations(data))
      .catch((error) => console.error("Error fetching characters:", error));
  }, []);

  useEffect(() => {
    setFilteredData([]);
    setSearchTerm("");
    setTimeout(() => {
      if (selectedOptionToFetch === "Characters") {
        setDataToFilter(characters);
        setPlaceholderMessage("Type any character");
      } else if (selectedOptionToFetch === "Locations") {
        setDataToFilter(locations);
        setPlaceholderMessage("Type any location");
      } else if (selectedOptionToFetch === "Episodes") {
        setDataToFilter(episodes);
        setPlaceholderMessage("Type any episode");
      }
    }, 200);
  }, [selectedOptionToFetch]);

  useEffect(() => {
    // Filtrar los objetos que coincidan con el término de búsqueda
    if (dataToFilter.length > 0 && searchTerm !== "") {
      const fData = dataToFilter.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setFilteredData(fData);
    }
  }, [dataToFilter, searchTerm]);

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

  function arraysAreEqual(array1, array2) {
    // Verificar si tienen la misma longitud
    if (array1.length !== array2.length) {
      return false;
    }

    // Verificar si cada elemento es igual
    return array1.every((value, index) => value === array2[index]);
  }

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
          placeholder={placeholderMessage}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          disabled={selectedItemId !== null || selectedOptionToFetch === null} // Deshabilitar si hay un ID seleccionado
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
        searchTerm !== "" &&
        arraysAreEqual(dataToFilter, characters) &&
        selectedOptionToFetch === "Characters" && (
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
                    {
                      (selectedOptionToFetch = "Characters" && (
                        <li className="px-4 py-2 text-xs lg:text-sm ">
                          {item.origin.name}
                        </li>
                      ))
                    }
                  </ul>
                </button>
              ))}
            </ul>
          </div>
        )}
      {/*Locations*/}
      {!showButton &&
        selectedItemId == null &&
        filteredData.length > 0 &&
        searchTerm !== "" &&
        arraysAreEqual(dataToFilter, locations) &&
        selectedOptionToFetch === "Locations" && (
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
                  <ul key={item.id} className="flex flex-col justify-start">
                    <li k className="px-4 py-2 text-xs font-bold lg:text-sm	">
                      {item.name}
                    </li>
                    <li className="px-4 py-2 text-xs lg:text-sm ">
                      {item.dimension}
                    </li>
                  </ul>
                </button>
              ))}
            </ul>
          </div>
        )}
      {/*Episodes*/}
      {!showButton &&
        selectedItemId == null &&
        filteredData.length > 0 &&
        searchTerm !== "" &&
        arraysAreEqual(dataToFilter, episodes) &&
        selectedOptionToFetch === "Episodes" && (
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
                  <ul key={item.id} className="flex flex-col justify-start">
                    <li k className="px-4 py-2 text-xs font-bold lg:text-sm	">
                      {item.name}
                    </li>
                    <li className="px-4 py-2 text-xs lg:text-sm ">
                      {item.episode}
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

export default SearchBar2;
