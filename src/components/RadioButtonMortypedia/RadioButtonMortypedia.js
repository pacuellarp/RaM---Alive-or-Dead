export default function RadioButtonMortypedia({
  selectedOptionToFetch,
  setSelectedOptionToFetch,
  showData,
}) {
  const handleOptionSelect = (value) => {
    setSelectedOptionToFetch(value);
  };

  return (
    <div className="my-8 flex items-center justify-center">
      <ul className="mx-auto grid w-full max-w-full grid-cols-1 gap-y-5 px-8 md:grid-cols-3 md:gap-x-5">
        <li>
          <input
            className="peer sr-only"
            type="radio"
            value="Characters"
            name="Characters"
            id="Characters"
            checked={selectedOptionToFetch === "Characters"}
            onChange={() => handleOptionSelect("Characters")}
            disabled={showData}
          />
          <label
            className="flex cursor-pointer justify-center rounded-full border border-gray-300 bg-white px-4 py-2 transition-all duration-500 ease-in-out hover:bg-gray-50 focus:outline-none peer-checked:border-transparent peer-checked:ring-2 peer-checked:ring-indigo-500"
            htmlFor="Characters"
          >
            Characters
          </label>
        </li>

        <li>
          <input
            className="peer sr-only"
            type="radio"
            value="Locations"
            name="Locations"
            id="Locations"
            checked={selectedOptionToFetch === "Locations"}
            onChange={() => handleOptionSelect("Locations")}
            disabled={showData}
          />
          <label
            className="flex cursor-pointer justify-center rounded-full border border-gray-300 bg-white px-4 py-2 transition-all duration-500 ease-in-out hover:bg-gray-50 focus:outline-none peer-checked:border-transparent peer-checked:ring-2 peer-checked:ring-indigo-500"
            htmlFor="Locations"
          >
            Locations
          </label>
        </li>

        <li>
          <input
            className="peer sr-only"
            type="radio"
            value="Episodes"
            name="Episodes"
            id="Episodes"
            checked={selectedOptionToFetch === "Episodes"}
            onChange={() => handleOptionSelect("Episodes")}
            disabled={showData}
          />
          <label
            className="flex cursor-pointer justify-center rounded-full border border-gray-300 bg-white px-4 py-2 transition-all duration-500 ease-in-out hover:bg-gray-50 focus:outline-none peer-checked:border-transparent peer-checked:ring-2 peer-checked:ring-indigo-500"
            htmlFor="Episodes"
          >
            Episodes
          </label>
        </li>
      </ul>
    </div>
  );
}
