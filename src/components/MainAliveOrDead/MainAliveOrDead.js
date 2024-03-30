import { useState, useEffect } from "react";
import Image from "next/image";
import { getCharacter } from "@services/CharacterService";

export default function MainAliveOrDead({ selectedItemId, showCharacter }) {
  const [character, setCharacter] = useState({});
  const [status, setStatus] = useState("");
  const [messageStatus, getMessageStatus] = useState("");
  const [episode, setEpisode] = useState({});

  useEffect(() => {
    if (selectedItemId != null) {
      getCharacter(selectedItemId)
        .then((data) => setCharacter(data))
        .catch((error) => console.error("Error fetching character:", error));
    }
  }, [selectedItemId]);

  useEffect(() => {
    if (Object.keys(character).length > 0) {
      setStatus(character.status);
    }
  }, [character]);

  useEffect(() => {
    const message = [
      "Oops... sorry :(",
      "It's alive! :D",
      "No idea ¯\\_(ツ)_/¯",
    ];
    if (status == "Dead") {
      getMessageStatus(message[0]);
    } else if (status == "Alive") {
      getMessageStatus(message[1]);
    } else {
      getMessageStatus(message[2]);
    }
  }, [status]);

  useEffect(() => {
    // Verificar si el estado del personaje tiene datos y la propiedad episode es un array
    if (
      character.episode &&
      Array.isArray(character.episode) &&
      character.episode.length > 0
    ) {
      const lastEpisodeUrl = character.episode[character.episode.length - 1];

      // Realizar la petición utilizando la URL del último episodio
      fetch(lastEpisodeUrl)
        .then((response) => response.json())
        .then((episodeData) => {
          // Filtrar los atributos necesarios del último episodio
          setEpisode({ name: episodeData.name, episode: episodeData.episode });
        })
        .catch((error) => {
          console.error("Error fetching last episode:", error);
        });
    }
  }, [character]);

  return (
    <div
      className={`${selectedItemId != null ? "animation-up-2" : "animation-down-2"} mb-24 bg-[#51B4BF] py-24`}
    >
      {showCharacter && Object.keys(character).length > 0 && (
        <div className="mx-24 flex flex-col items-center justify-center md:mx-8 md:flex-row md:justify-between lg:mx-24 xl:mx-32">
          <figure>
            <Image
              key={character.id}
              src={`${character.image}`}
              width={200}
              height={200}
              alt="Picture of the character"
              className="mb-16 rounded-lg md:mb-0"
            />
          </figure>
          <div className="flex flex-col justify-start">
            <p
              className={` text-7xl	 ${status == "Dead" ? "fuente-chaos" : "fuente-good-news"} 
              ${status == "Dead" ? "text-red-600" : status == "Alive" ? "text-emerald-600" : "text-slate-600"}`}
            >{`${character.status}`}</p>
            <p className="text-xl	">{`${messageStatus}`}</p>
            <p className="mt-5 text-lg">{`${character.name}`}</p>
            <p className="text-lg">
              <b>Species: </b>
              {`${character.species}`}
            </p>
            <p className="text-lg">
              <b>Location: </b>
              {`${character.location.name}`}
            </p>
            <p className="text-lg">
              <b>Last appearance: </b>
              {`${episode.name}`}
            </p>
            <p className="text-lg">
              <b>Episode: </b>
              {`${episode.episode}`}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
