import { useState, useEffect } from "react";
import Image from "next/image";
import { getCharacter } from "@services/CharacterService";
import { getLocation } from "@services/LocationService";
import { getEpisode } from "@services/EpisodeService";

export default function MainMortypedia({
  selectedItemId,
  selectedOptionToFetch,
  showData,
}) {
  const [dataToShow, setDataToShow] = useState({});

  useEffect(() => {
    if (selectedItemId != null && selectedOptionToFetch === "Characters") {
      getCharacter(selectedItemId)
        .then((data) => setDataToShow(data))
        .catch((error) => console.error("Error fetching character:", error));
    } else if (
      selectedItemId != null &&
      selectedOptionToFetch === "Locations"
    ) {
      getLocation(selectedItemId)
        .then((data) => setDataToShow(data))
        .catch((error) => console.error("Error fetching character:", error));
    } else if (selectedItemId != null && selectedOptionToFetch === "Episodes") {
      getEpisode(selectedItemId)
        .then((data) => setDataToShow(data))
        .catch((error) => console.error("Error fetching character:", error));
    }
  }, [selectedItemId, selectedOptionToFetch]);

  return (
    <div
      className={`${selectedItemId != null ? "animation-up-2" : "animation-down-2"} mb-24 bg-[#faf5b5] py-24`}
    >
      {showData &&
        Object.keys(dataToShow).length > 0 &&
        selectedOptionToFetch === "Characters" && (
          <div className="mx-24 flex flex-col items-center justify-center md:mx-8 md:flex-row md:justify-between lg:mx-24 xl:mx-32">
            <figure>
              <Image
                key={dataToShow.id}
                src={`${dataToShow.image}`}
                width={200}
                height={200}
                alt="Picture of the character"
                className="mb-16 rounded-lg md:mb-0"
              />
            </figure>
            <div className="flex flex-col justify-start">
              <p className="mt-5 text-lg">{`${dataToShow.name}`}</p>
              <p className="text-lg">
                <b>Species: </b>
                {`${dataToShow.species}`}
              </p>
              <p className="text-lg">
                <b>Location: </b>
                {`${dataToShow.location.name}`}
              </p>
            </div>
          </div>
        )}
      {showData &&
        Object.keys(dataToShow).length > 0 &&
        selectedOptionToFetch === "Locations" && (
          <div className="mx-24 flex flex-col items-center justify-center md:mx-8 md:flex-row md:justify-between lg:mx-24 xl:mx-32">
            <div className="flex flex-col justify-start">
              <p className="mt-5 text-lg">{`${dataToShow.name}`}</p>
              <p className="text-lg">
                <b>Type: </b>
                {`${dataToShow.type}`}
              </p>
              <p className="text-lg">
                <b>Dimension: </b>
                {`${dataToShow.dimension}`}
              </p>
            </div>
          </div>
        )}
      {showData &&
        Object.keys(dataToShow).length > 0 &&
        selectedOptionToFetch === "Episodes" && (
          <div className="mx-24 flex flex-col items-center justify-center md:mx-8 md:flex-row md:justify-between lg:mx-24 xl:mx-32">
            <div className="flex flex-col justify-start">
              <p className="mt-5 text-lg">{`${dataToShow.name}`}</p>
              <p className="text-lg">
                <b>Air date: </b>
                {`${dataToShow.air_date}`}
              </p>
              <p className="text-lg">
                <b>Episode: </b>
                {`${dataToShow.episode}`}
              </p>
            </div>
          </div>
        )}
    </div>
  );
}
