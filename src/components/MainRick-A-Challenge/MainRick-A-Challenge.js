import { useState, useEffect } from "react";
import { getInfoCharacters } from "@services/InfoCharactersService";
import { getInfoEpisodes } from "@services/InfoEpisodesService";
import { getInfoLocations } from "@services/InfoLocationsService";
import { getEpisode } from "@services/EpisodeService";

export default function MainRickANation() {
  const [numEpisodes, setNumEpisodes] = useState(0);
  const [numLocations, setNumLocations] = useState(0);
  const [numCharacters, setNumCharacters] = useState(0);
  const [episodeToFirstQuestion, setEpisodeToFirstQuestion] = useState(null);
  const [charactersToFirstQuestion, setCharactersToFirstQuestion] = useState(
    [],
  );
  const [charactersToSecondQuestion, setCharactersToSecondQuestion] = useState(
    [],
  );
  const [locationsToFirstQuestion, setLocationsToFirstQuestion] = useState([]);
  const [characterToFirstQuestion, setCharacterToFirstQuestion] =
    useState(null);
  const [locationsToThirdQuestion, setLocationsToThirdQuestion] = useState([]);

  useEffect(() => {
    const fetchNumEpisodes = async () => {
      try {
        const numberEpisodes = await getInfoEpisodes();
        const numberLocations = await getInfoLocations();
        const numberCharacters = await getInfoCharacters();
        setNumEpisodes(numberEpisodes);
        setNumLocations(numberLocations);
        setNumCharacters(numberCharacters);
      } catch (error) {
        console.error("Error fetching number of episodes:", error);
      }
    };

    fetchNumEpisodes();
  }, []);

  function generateNaturalNumber(min, max) {
    // Asegurarse de que los valores son enteros
    min = Math.ceil(min);
    max = Math.floor(max);
    // Generar un número aleatorio entre min (incluido) y max (excluido) OJO EXCLUIDO
    return Math.floor(Math.random() * (max - min)) + min;
  }

  // Función para extraer el número de la URL
  function extractURLNumber(url) {
    return parseInt(url.split("/").pop());
  }

  useEffect(() => {
    async function firstQuestion() {
      try {
        await fetchLocationAndCharacters();
      } catch (error) {
        console.error("Error:", error);
      }
    }

    async function fetchLocationAndCharacters() {
      try {
        if (episodeToFirstQuestion == null) {
          const randomEpisode = generateNaturalNumber(1, numEpisodes + 1);
          const episode = await getEpisode(randomEpisode);
          setEpisodeToFirstQuestion(episode);
          console.log(episodeToFirstQuestion);
        }

        // Una vez que episodeToFirstQuestion está configurado correctamente, llamamos a fetchFirstTwoCharacters
        await fetchCharacters();
      } catch (error) {
        console.error("Error:", error);
      }
    }

    async function fetchCharacters() {
      // Verificar si episodeToFirstQuestion es nulo antes de acceder a su propiedad characters
      if (!episodeToFirstQuestion) {
        return;
      }

      // Continuar con el resto de la lógica de fetchFirstTwoCharacters
      let selectedNumbers = [];
      // Obtener dos elementos aleatorios del atributo characters
      while (selectedNumbers.length < 2) {
        const randomIndex = generateNaturalNumber(
          0,
          episodeToFirstQuestion.characters.length,
        );
        const characterUrl = episodeToFirstQuestion.characters[randomIndex];
        const episodeNumber = extractURLNumber(characterUrl);

        // Verificar si el número está entre 1 y 5 (incluyéndolos)
        if (episodeNumber >= 1 && episodeNumber <= 5) {
          continue; // Saltar a la próxima iteración para seleccionar otro número
        }
        if (selectedNumbers[0] != null && selectedNumbers[0] == episodeNumber) {
          continue; // Saltar a la próxima iteración para seleccionar otro número
        }
        selectedNumbers.push(episodeNumber);
      }

      while (selectedNumbers.length >= 2 && selectedNumbers.length < 4) {
        const randomEpisode = generateNaturalNumber(1, numCharacters + 1);
        if (randomEpisode >= 1 && randomEpisode <= 5) {
          continue; // Saltar a la próxima iteración para seleccionar otro número
        }
        if (selectedNumbers.includes(randomEpisode)) {
          continue;
        } else {
          selectedNumbers.push(randomEpisode);
        }
      }

      // Convertir los números a tipo number y agregarlos al estado charactersToFirstQuestion
      setCharactersToFirstQuestion((prevState) => [
        ...prevState,
        ...selectedNumbers,
      ]);
    }

    if (numEpisodes !== 0 && numLocations !== 0 && numCharacters != 0) {
      firstQuestion();
    }
  }, [numEpisodes, numLocations, numCharacters, episodeToFirstQuestion]);

  return (
    <div className="bg-[#C79ABF]">
      <p>Hola</p>
      <button
        onClick={() => {
          console.log(
            numEpisodes,
            numLocations,
            numCharacters,
            episodeToFirstQuestion,
            charactersToFirstQuestion,
          );
        }}
      >
        Click me!
      </button>
    </div>
  );
}
