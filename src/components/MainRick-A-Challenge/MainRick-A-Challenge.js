import { useState, useEffect } from "react";
import { getInfoCharacters } from "@services/InfoCharactersService";
import { getInfoEpisodes } from "@services/InfoEpisodesService";
import { getInfoLocations } from "@services/InfoLocationsService";
import { getCharacter } from "@services/CharacterService";
import { getEpisode } from "@services/EpisodeService";
import { getLocation } from "@services/LocationService";
import TriviaOptions from "@components/TriviaOptions/TriviaOptions";

export default function MainRickANation() {
  const [numEpisodes, setNumEpisodes] = useState(0);
  const [numLocations, setNumLocations] = useState(0);
  const [numCharacters, setNumCharacters] = useState(0);
  const [episodeToFirstQuestion, setEpisodeToFirstQuestion] = useState(null);
  const [idCharactersToFirstQuestion, setIdCharactersToFirstQuestion] =
    useState([]);
  const [charactersToFirstQuestion, setCharactersToFirstQuestion] = useState(
    [],
  );
  const [locationsToSecondQuestion, setLocationsToSecondQuestion] = useState(
    [],
  );
  const [idLocationsToSecondQuestion, setIdLocationsToSecondQuestion] =
    useState([]);
  const [idCharactersToSecondQuestion, setIdCharactersToSecondQuestion] =
    useState([]);
  const [charactersToSecondQuestion, setcharactersToSecondQuestion] = useState(
    [],
  );
  const [characterToThirdQuestion, setCharacterToThirdQuestion] =
    useState(null);
  const [idEpisodesToThirdQuestion, setIdEpisodesToThirdQuestion] = useState(
    [],
  );
  const [episodesToThirdQuestion, setEpisodesToThirdQuestion] = useState([]);
  const [enableGoButton, setEnableGoButton] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);
  const [resetQuestions, setResetQustions] = useState(true);
  const [transitionResults, setTransitionResults] = useState(false);

  useEffect(() => {
    const fetchNumEpisodes = async () => {
      try {
        const numberEpisodes = await getInfoEpisodes();
        const numberLocations = await getInfoLocations();
        const numberCharacters = await getInfoCharacters();
        setNumEpisodes(numberEpisodes);
        setNumLocations(numberLocations);
        setNumCharacters(numberCharacters);
        setResetQustions(false);
      } catch (error) {
        console.error("Error fetching number of episodes:", error);
      }
    };

    if (resetQuestions) {
      fetchNumEpisodes();
    }
  }, [resetQuestions]);

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

  //PRIMERA PREGUNTA
  useEffect(() => {
    async function firstQuestion() {
      try {
        await fetchEpisodeAndCharacters();
      } catch (error) {
        console.error("Error:", error);
      }
    }

    async function fetchEpisodeAndCharacters() {
      try {
        if (episodeToFirstQuestion == null) {
          const randomEpisode = generateNaturalNumber(1, numEpisodes + 1);
          const episode = await getEpisode(randomEpisode);
          setEpisodeToFirstQuestion(episode);
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
      setIdCharactersToFirstQuestion((prevState) => [
        ...prevState,
        ...selectedNumbers,
      ]);
    }

    if (numEpisodes !== 0 && numLocations !== 0 && numCharacters != 0) {
      firstQuestion();
    }
  }, [numEpisodes, numLocations, numCharacters, episodeToFirstQuestion]);

  //SEGUNDA PREGUNTA
  useEffect(() => {
    async function secondQuestion() {
      try {
        await fetchLocation();
      } catch (error) {
        console.error("Error:", error);
      }
    }

    async function fetchLocation() {
      try {
        if (locationsToSecondQuestion.length === 0) {
          let newLocations = [];
          let newIds = [];
          while (newLocations.length === 0) {
            const randomLocation = generateNaturalNumber(1, numLocations + 1);
            const location = await getLocation(randomLocation);
            if (location.residents.length >= 2) {
              newLocations = [...newLocations, location];
              console.log(location.id);
              newIds = [...newIds, location.id];
            }
          }
          // Una vez que has recopilado todos los datos necesarios, actualiza el estado
          setLocationsToSecondQuestion(newLocations);
          setIdLocationsToSecondQuestion(newIds);
          // Llama a fetchLocations después de actualizar el estado
        }
        await fetchLocations();
      } catch (error) {
        console.error("Error:", error);
      }
    }

    async function fetchLocations() {
      console.log(locationsToSecondQuestion);
      // Verificar si episodeToFirstQuestion es nulo antes de acceder a su propiedad characters
      if (idLocationsToSecondQuestion.length != 1) {
        console.log("Hola");
        return;
      }
      console.log("Adios");

      let selectedNumbers = [];
      while (selectedNumbers.length < 2) {
        const randomIndex = generateNaturalNumber(1, numLocations + 1);
        // Verificar si el número está entre 1 y 5 (incluyéndolos)
        if (
          selectedNumbers.includes(randomIndex) ||
          idLocationsToSecondQuestion.includes(randomIndex)
        ) {
          continue; // Saltar a la próxima iteración para seleccionar otro número
        }
        selectedNumbers.push(randomIndex);
      }
      setIdLocationsToSecondQuestion((prevState) => [
        ...prevState,
        ...selectedNumbers,
      ]);
      await fetchCharacters();
    }

    async function fetchCharacters() {
      // Verificar si episodeToFirstQuestion es nulo antes de acceder a su propiedad characters
      if (locationsToSecondQuestion.length === 0) {
        return;
      }

      // Continuar con el resto de la lógica de fetchFirstTwoCharacters
      let selectedNumbers = [];
      // Obtener dos elementos aleatorios del atributo characters
      while (selectedNumbers.length < 2) {
        const randomIndex = generateNaturalNumber(
          0,
          locationsToSecondQuestion[0].residents.length,
        );
        const characterUrl =
          locationsToSecondQuestion[0].residents[randomIndex];
        const characterNumber = extractURLNumber(characterUrl);

        // Verificar si el número está entre 1 y 5 (incluyéndolos)
        if (characterNumber >= 1 && characterNumber <= 5) {
          continue; // Saltar a la próxima iteración para seleccionar otro número
        }
        if (
          selectedNumbers[0] != null &&
          selectedNumbers[0] == characterNumber
        ) {
          continue; // Saltar a la próxima iteración para seleccionar otro número
        }
        selectedNumbers.push(characterNumber);
      }

      // Convertir los números a tipo number y agregarlos al estado charactersToFirstQuestion
      setIdCharactersToSecondQuestion((prevState) => [
        ...prevState,
        ...selectedNumbers,
      ]);
    }

    if (numEpisodes !== 0 && numLocations !== 0 && numCharacters != 0) {
      secondQuestion();
    }
  }, [
    numEpisodes,
    numLocations,
    numCharacters,
    locationsToSecondQuestion,
    idLocationsToSecondQuestion,
  ]);

  //TERCERA PREGUNTA
  useEffect(() => {
    async function thirdQuestion() {
      try {
        await fetchLocation();
      } catch (error) {
        console.error("Error:", error);
      }
    }

    async function fetchLocation() {
      try {
        if (!characterToThirdQuestion) {
          const randomCharacter = generateNaturalNumber(6, numCharacters + 1);
          const character = await getCharacter(randomCharacter);
          setCharacterToThirdQuestion(character);
        }
        await fetchEpisodes();
      } catch (error) {
        console.error("Error:", error);
      }
    }

    async function fetchEpisodes() {
      // Verificar si episodeToFirstQuestion es nulo antes de acceder a su propiedad characters
      if (!characterToThirdQuestion) {
        return;
      }

      // Continuar con el resto de la lógica de fetchFirstTwoCharacters
      let selectedNumbers = [];
      const episodesWithCharacter = characterToThirdQuestion.episode.map(
        (url) => extractURLNumber(url),
      );
      // Obtener dos elementos aleatorios del atributo characters

      const randomIndex = generateNaturalNumber(
        0,
        characterToThirdQuestion.episode.length,
      );
      const characterUrl = characterToThirdQuestion.episode[randomIndex];
      const episodeNumber = extractURLNumber(characterUrl);

      selectedNumbers.push(episodeNumber);

      while (selectedNumbers.length >= 1 && selectedNumbers.length < 3) {
        const randomEpisode = generateNaturalNumber(1, numEpisodes + 1);
        if (
          episodesWithCharacter.includes(randomEpisode) ||
          selectedNumbers.includes(randomEpisode)
        ) {
          continue;
        } else {
          selectedNumbers.push(randomEpisode);
        }
      }

      // Convertir los números a tipo number y agregarlos al estado charactersToFirstQuestion
      setIdEpisodesToThirdQuestion((prevState) => [
        ...prevState,
        ...selectedNumbers,
      ]);
    }

    if (numEpisodes !== 0 && numLocations !== 0 && numCharacters != 0) {
      thirdQuestion();
    }
  }, [numEpisodes, numLocations, numCharacters, characterToThirdQuestion]);

  useEffect(() => {
    if (idCharactersToFirstQuestion.length == 4) {
      const fetchFirstCharacters = async () => {
        let characters = [];
        for (const id of idCharactersToFirstQuestion) {
          const character = await getCharacter(id);
          characters.push(character);
        }
        setCharactersToFirstQuestion(characters);
      };
      fetchFirstCharacters();
    }
  }, [idCharactersToFirstQuestion]);

  useEffect(() => {
    if (idLocationsToSecondQuestion.length == 3) {
      const fetchSecondLocations = async () => {
        let locations = [];
        for (const [indice, id] of idLocationsToSecondQuestion.entries()) {
          if (indice > 0) {
            const location = await getLocation(id);
            locations.push(location);
          }
        }
        setLocationsToSecondQuestion((prevState) => [
          ...prevState,
          ...locations,
        ]);
      };
      fetchSecondLocations();
    }
  }, [idLocationsToSecondQuestion]);

  useEffect(() => {
    if (idCharactersToSecondQuestion.length == 2) {
      const fetchSecondCharacter = async () => {
        let characters = [];
        for (const id of idCharactersToSecondQuestion) {
          const character = await getCharacter(id);
          characters.push(character);
        }
        setcharactersToSecondQuestion(characters);
      };
      fetchSecondCharacter();
    }
  }, [idCharactersToSecondQuestion]);

  useEffect(() => {
    if (idEpisodesToThirdQuestion.length == 3) {
      const fetchThirdQuestion = async () => {
        let episodes = [];
        for (const id of idEpisodesToThirdQuestion) {
          const episode = await getEpisode(id);
          episodes.push(episode);
        }
        setEpisodesToThirdQuestion(episodes);
      };
      fetchThirdQuestion();
    }
  }, [idEpisodesToThirdQuestion]);

  useEffect(() => {
    console.log(
      charactersToFirstQuestion,
      locationsToSecondQuestion,
      episodesToThirdQuestion,
      charactersToSecondQuestion,
      characterToThirdQuestion,
    );
    if (
      charactersToFirstQuestion.length == 4 &&
      locationsToSecondQuestion.length == 3 &&
      episodesToThirdQuestion.length == 3
    ) {
      setEnableGoButton(true);
    }
  }, [
    charactersToFirstQuestion,
    locationsToSecondQuestion,
    episodesToThirdQuestion,
  ]);

  // Maneja el clic del botón Go
  const handleGoClick = () => {
    setEnableGoButton(false);
    setShowQuestions(true);
  };

  const handleResetButton = () => {
    setTransitionResults(false);
    setTimeout(() => {
      setShowQuestions(false);
      setEnableGoButton(false);
      setNumEpisodes(0);
      setNumLocations(0);
      setNumCharacters(0);
      setEpisodeToFirstQuestion(null);
      setIdCharactersToFirstQuestion([]);
      setCharactersToFirstQuestion([]);
      setLocationsToSecondQuestion([]);
      setIdLocationsToSecondQuestion([]);
      setIdCharactersToSecondQuestion([]);
      setcharactersToSecondQuestion([]);
      setCharacterToThirdQuestion(null);
      setIdEpisodesToThirdQuestion([]);
      setEpisodesToThirdQuestion([]);
      setResetQustions(true);
    }, 1500);
  };

  return (
    <div className="mb-5 flex flex-col items-center justify-center bg-[#d8bbd3]">
      {!showQuestions && (
        <div className="flex flex-col">
          <h2 className="my-6 text-2xl text-[#1177BF]">Ready?</h2>
          <button
            className={`${enableGoButton ? "bg-blue-500 hover:bg-blue-400" : "bg-gray-500"} my-6 rounded-lg px-4 py-2 text-white`}
            onClick={handleGoClick}
            disabled={!enableGoButton}
            title="If the button doesn't turn blue, refresh the page."
          >
            Go!
          </button>
        </div>
      )}
      {showQuestions && (
        <TriviaOptions
          characters={charactersToFirstQuestion}
          locations={locationsToSecondQuestion}
          episodes={episodesToThirdQuestion}
          resetFunction={handleResetButton}
          charactersToSecondQuestion={charactersToSecondQuestion}
          characterToThirdQuestion={characterToThirdQuestion}
          transitionResults={transitionResults}
          setTransitionResults={setTransitionResults}
        />
      )}
    </div>
  );
}
