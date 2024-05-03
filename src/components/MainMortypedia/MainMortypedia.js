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
  const [itemsByDataToShow, setItemsByDataToShow] = useState([]);

  useEffect(() => {
    setItemsByDataToShow([]);
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

  async function fetchDataAndStore(params, dataArray) {
    const items = [];

    for (const url of dataArray) {
      const id = url.split("/").pop();
      let data;

      switch (params) {
        case "Locations":
          data = await getCharacter(id);
          items.push({
            id: data.id,
            name: data.name,
            image: data.image,
            origin: { name: data.origin.name },
          });
          break;
        case "Episodes":
          data = await getCharacter(id);
          items.push({
            id: data.id,
            name: data.name,
            image: data.image,
            origin: { name: data.origin.name },
          });
          break;
        case "Characters":
          data = await getEpisode(id);
          items.push({ id: data.id, name: data.name, episode: data.episode });
          break;
        default:
          console.error("Invalid parameter!");
          break;
      }
    }

    return items;
  }

  useEffect(() => {
    async function fetchData() {
      try {
        let dataArray = [];
        if (selectedOptionToFetch === "Characters") {
          dataArray = dataToShow.episode;
        } else if (selectedOptionToFetch === "Locations") {
          dataArray = dataToShow.residents;
        } else if (selectedOptionToFetch === "Episodes") {
          dataArray = dataToShow.characters;
        }

        const items = await fetchDataAndStore(selectedOptionToFetch, dataArray);
        setItemsByDataToShow(items);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    if (Object.keys(dataToShow).length > 0) {
      fetchData();
    }
  }, [dataToShow, selectedOptionToFetch]);

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
              <p className="my-5 text-lg">
                <b>{`${dataToShow.name}`}</b>
              </p>
              <p className="text-lg">
                <b>Species: </b>
                {`${dataToShow.species}`}
              </p>
              <p className="text-lg">
                <b>Type: </b>
                {`${dataToShow.type}`}
              </p>
              <p className="text-lg">
                <b>Gender: </b>
                {`${dataToShow.gender}`}
              </p>
              <p className="text-lg">
                <b>Origin: </b>
                {`${dataToShow.origin.name}`}
              </p>
              <p className="text-lg">
                <b>Location: </b>
                {`${dataToShow.location.name}`}
              </p>
              <div className="my-3 flex flex-col justify-center">
                <b>Episodes where it appears:</b>
                {itemsByDataToShow.map((item) => (
                  <div
                    key={item.id}
                    className="my-2 flex flex-col justify-center"
                  >
                    <p className="text-md">{`${item.name}`}</p>
                    <p className="text-md">{`${item.episode}`}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      {showData &&
        Object.keys(dataToShow).length > 0 &&
        selectedOptionToFetch === "Locations" && (
          <div className="mx-24 flex flex-col items-center justify-center md:mx-8 md:flex-row md:justify-between lg:mx-24 xl:mx-32">
            <div className="flex flex-col items-center justify-start">
              <p className="my-5  text-lg">
                <b>{`${dataToShow.name}`}</b>
              </p>
              <p className="text-lg">
                <b>Type: </b>
                {`${dataToShow.type}`}
              </p>
              <p className="text-lg">
                <b>Dimension: </b>
                {`${dataToShow.dimension}`}
              </p>
            </div>
            <div className="my-3 flex flex-col  items-center justify-center">
              <b>Residents of this location:</b>
              {itemsByDataToShow.map((item) => (
                <div
                  key={item.id}
                  className="my-2 flex flex-col items-center justify-center md:flex-row"
                >
                  <figure>
                    <Image
                      key={item.id}
                      src={`${item.image}`}
                      width={50}
                      height={50}
                      alt="Picture of the character"
                      className="mx-5 my-2 rounded-lg md:mb-0"
                    />
                  </figure>
                  <div
                    key={item.id}
                    className="my-2 flex flex-col items-center justify-center"
                  >
                    <p className="text-md">{`${item.name}`}</p>
                    <p className="text-md">{`${item.origin.name}`}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      {showData &&
        Object.keys(dataToShow).length > 0 &&
        selectedOptionToFetch === "Episodes" && (
          <div className="flex flex-col items-center justify-center md:mx-8 md:flex-row md:justify-between lg:mx-24 xl:mx-32">
            <div className="flex flex-col items-center justify-start">
              <p className="my-5 text-lg">
                <b>{`${dataToShow.name}`}</b>
              </p>
              <p className="text-lg">
                <b>Air date: </b>
                {`${dataToShow.air_date}`}
              </p>
              <p className="text-lg">
                <b>Episode: </b>
                {`${dataToShow.episode}`}
              </p>
            </div>
            <div className="my-3 flex flex-col items-center justify-center">
              <p>
                <b>Characters that appear:</b>
              </p>
              {itemsByDataToShow.map((item) => (
                <div
                  key={item.id}
                  className="my-2 flex flex-col items-center justify-center md:flex-row"
                >
                  <figure>
                    <Image
                      key={item.id}
                      src={`${item.image}`}
                      width={50}
                      height={50}
                      alt="Picture of the character"
                      className="mx-5 my-2 rounded-lg md:mb-0"
                    />
                  </figure>
                  <div
                    key={item.id}
                    className="my-2 flex flex-col items-center justify-center"
                  >
                    <p className="text-md">{`${item.name}`}</p>
                    <p className="text-md">{`${item.origin.name}`}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
    </div>
  );
}
