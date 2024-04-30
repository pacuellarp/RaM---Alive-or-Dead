import { useState, useEffect } from "react";
import Image from "next/image";

export default function TriviaOptions({
  characters,
  locations,
  episodes,
  charactersToSecondQuestion,
  characterToThirdQuestion,
  resetFunction,
  transitionResults,
  setTransitionResults,
}) {
  const [randomizedCharacters, setRandomizedCharacters] = useState([]);
  const [randomizedLocations, setRandomizedLocations] = useState([]);
  const [randomizedEpisodes, setRandomizedEpisodes] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [finished, setFinished] = useState(false);
  const [enableFinished, setEnableFinished] = useState(false);
  const [numCorrectAnswers, setNumCorrectAnswers] = useState(null);
  const [messageResult, setMessageResult] = useState(null);

  useEffect(() => {
    // Genera una copia aleatoria de los personajes
    const charactersWithoutFirst = characters.slice(1);
    const shuffledCharacters = shuffleArray(charactersWithoutFirst);
    setRandomizedCharacters(shuffledCharacters);

    // Genera una copia aleatoria de las locaciones excluyendo el primer elemento
    const shuffledLocations = shuffleArray([...locations]);
    setRandomizedLocations(shuffledLocations);

    // Genera una copia aleatoria de los episodios
    const shuffledEpisodes = shuffleArray([...episodes]);
    setRandomizedEpisodes(shuffledEpisodes);
  }, [characters, locations, episodes]);

  // Función para mezclar un array de manera aleatoria
  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  // Maneja el clic en un botón de personaje
  const handleCharacterClick = (index) => {
    const selectedCharacter = randomizedCharacters[index];
    setSelectedCharacter(selectedCharacter);
  };

  // Maneja el clic en un botón de locación
  const handleLocationClick = (index) => {
    const selectedLocation = randomizedLocations[index];
    setSelectedLocation(selectedLocation);
  };

  // Maneja el clic en un botón de episodio
  const handleEpisodeClick = (index) => {
    const selectedEpisode = randomizedEpisodes[index];
    setSelectedEpisode(selectedEpisode);
  };

  // Maneja el clic en el botón "Finished"
  const handleFinishedClick = () => {
    setTransitionResults(true);
    setTimeout(() => {
      setFinished(true);
    }, 1500);
    setTimeout(() => {
      const element = document.getElementById("results");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 2000);
  };

  useEffect(() => {
    if (selectedCharacter && selectedLocation && selectedEpisode) {
      setEnableFinished(true);
      let correctAnswers = 0;
      if (selectedCharacter.id === characters[1].id) {
        correctAnswers += 1;
      }
      if (selectedLocation.id === locations[0].id) {
        correctAnswers += 1;
      }
      if (selectedEpisode.id === episodes[0].id) {
        correctAnswers += 1;
      }
      setNumCorrectAnswers(correctAnswers);
    }
  }, [
    selectedCharacter,
    selectedLocation,
    selectedEpisode,
    characters,
    locations,
    episodes,
  ]);

  useEffect(() => {
    const defaultMessageResult = [
      "Good luck next time!",
      "Keep practicing!",
      "Well done!",
      "Awesome! Definitely, you're a fan!",
    ];
    if (numCorrectAnswers || numCorrectAnswers === 0) {
      setMessageResult(defaultMessageResult[numCorrectAnswers]);
    }
  }, [numCorrectAnswers]);

  return (
    <div className="animate-fadeIn flex flex-col items-center">
      {!finished && (
        <div
          className={`flex flex-col items-center justify-center ${transitionResults ? "animate-fadeOut" : ""}`}
        >
          <div className="flex flex-col items-center justify-center">
            <h3 className="my-5 text-center text-xl">
              Who did this character share an episode with?
            </h3>
            <div className="my-5 flex flex-col items-center justify-center border border-solid py-2 md:flex-row">
              <figure className="mx-4 md:mr-32">
                <Image
                  key={characters[0].id}
                  src={`${characters[0].image}`}
                  width={100}
                  height={100}
                  alt="Picture of the character"
                  className=""
                />
              </figure>
              <ul
                key={characters[0].id}
                className="flex flex-col justify-start"
              >
                <li k className="px-4 py-2 text-xs font-bold lg:text-sm	">
                  {characters[0].name}
                </li>
                <li className="px-4 py-2 text-xs lg:text-sm ">
                  {characters[0].origin.name}
                </li>
              </ul>
            </div>
            <div className="flex flex-col lg:flex-row">
              {randomizedCharacters.map((character, index) => (
                <button
                  key={index}
                  className={`mx-2 mb-2 rounded-lg border px-4 py-2 ${selectedCharacter && selectedCharacter.id === character.id ? "bg-yellow-500" : "bg-gray-200"}`}
                  onClick={() => handleCharacterClick(index)}
                >
                  <div>
                    <figure className="mx-4 md:mr-32">
                      <Image
                        key={character.id}
                        src={`${character.image}`}
                        width={100}
                        height={100}
                        alt="Picture of the character"
                        className=""
                      />
                    </figure>
                    <ul
                      key={character.id}
                      className="flex flex-col justify-start"
                    >
                      <li k className="px-4 py-2 text-xs font-bold lg:text-sm	">
                        {character.name}
                      </li>
                    </ul>
                  </div>
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <h3 className="my-5 text-center text-xl">
              These two characters share the same location, which one is it?
            </h3>
            <div className="flex flex-col md:flex-row">
              <div className="my-5 mr-2 flex flex-col items-center justify-center border border-solid py-2 md:flex-row">
                <figure className="mx-4 md:mr-32">
                  <Image
                    key={charactersToSecondQuestion[0].id}
                    src={`${charactersToSecondQuestion[0].image}`}
                    width={100}
                    height={100}
                    alt="Picture of the character"
                    className=""
                  />
                </figure>
                <ul
                  key={charactersToSecondQuestion[0].id}
                  className="flex flex-col justify-start"
                >
                  <li k className="px-4 py-2 text-xs font-bold lg:text-sm	">
                    {charactersToSecondQuestion[0].name}
                  </li>
                </ul>
              </div>
              <div className="my-5 flex flex-col items-center justify-center border border-solid py-2 md:flex-row">
                <figure className="mx-4 md:mr-32">
                  <Image
                    key={charactersToSecondQuestion[1].id}
                    src={`${charactersToSecondQuestion[1].image}`}
                    width={100}
                    height={100}
                    alt="Picture of the character"
                    className=""
                  />
                </figure>
                <ul
                  key={charactersToSecondQuestion[1].id}
                  className="flex flex-col justify-start"
                >
                  <li k className="px-4 py-2 text-xs font-bold lg:text-sm	">
                    {charactersToSecondQuestion[1].name}
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row">
              {randomizedLocations.map((location, index) => (
                <button
                  key={index}
                  className={`mx-2 mb-2 rounded-lg border px-4 py-2 ${selectedLocation && selectedLocation.id === location.id ? "bg-yellow-500" : "bg-gray-200"}`}
                  onClick={() => handleLocationClick(index)}
                >
                  {location.name}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <h3 className="my-5 text-center text-xl">
              In which of these episodes did this character appear?
            </h3>
            <div className="my-5 flex flex-col items-center justify-center border border-solid py-2 md:flex-row">
              <figure className="mx-4 md:mr-32">
                <Image
                  key={characterToThirdQuestion.id}
                  src={`${characterToThirdQuestion.image}`}
                  width={100}
                  height={100}
                  alt="Picture of the character"
                  className=""
                />
              </figure>
              <ul
                key={characterToThirdQuestion.id}
                className="flex flex-col justify-start"
              >
                <li k className="px-4 py-2 text-xs font-bold lg:text-sm	">
                  {characterToThirdQuestion.name}
                </li>
                <li className="px-4 py-2 text-xs lg:text-sm ">
                  {characterToThirdQuestion.origin.name}
                </li>
              </ul>
            </div>
            <div className="flex flex-col lg:flex-row">
              {randomizedEpisodes.map((episode, index) => (
                <button
                  key={index}
                  className={`mx-2 mb-2 rounded-lg border px-4 py-2 ${selectedEpisode && selectedEpisode.id === episode.id ? "bg-yellow-500" : "bg-gray-200"}`}
                  onClick={() => handleEpisodeClick(index)}
                >
                  {episode.name}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={handleFinishedClick}
            className={`${!enableFinished ? "cursor-not-allowed bg-gray-500" : "bg-blue-500 hover:bg-blue-400"} my-6 rounded-lg px-4 py-2 text-white`}
            disabled={!enableFinished}
          >
            Finished!
          </button>
        </div>
      )}
      {finished && (
        <div
          className={`flex flex-col items-center justify-center ${transitionResults ? "animate-fadeIn" : "animate-fadeOut"}`}
        >
          <div id="results" className="my-2"></div>
          <div className="flex flex-col items-center justify-center">
            <h1 className="my-5 text-center text-2xl font-bold text-[#1177BF]">
              You got {numCorrectAnswers}/3! {messageResult}{" "}
            </h1>
            <div className="flex flex-col items-center justify-center">
              <h3 className="my-5 text-center text-xl">
                Who did this character share an episode with?
              </h3>
              <div className="my-5 flex flex-col items-center justify-center border border-solid py-2 md:flex-row">
                <figure className="mx-4 md:mr-32">
                  <Image
                    key={characters[0].id}
                    src={`${characters[0].image}`}
                    width={100}
                    height={100}
                    alt="Picture of the character"
                    className=""
                  />
                </figure>
                <ul
                  key={characters[0].id}
                  className="flex flex-col justify-start"
                >
                  <li k className="px-4 py-2 text-xs font-bold lg:text-sm	">
                    {characters[0].name}
                  </li>
                  <li className="px-4 py-2 text-xs lg:text-sm ">
                    {characters[0].origin.name}
                  </li>
                </ul>
              </div>
              <div className="flex flex-col lg:flex-row">
                {randomizedCharacters.map((character, index) => (
                  <button
                    key={index}
                    className={`mx-2 mb-2 rounded-lg border px-4 py-2 text-white ${
                      selectedCharacter && character.id === characters[1].id
                        ? "bg-green-500"
                        : selectedCharacter.id === character.id
                          ? "bg-red-500"
                          : "bg-gray-500"
                    }`}
                    disabled={true}
                  >
                    <div>
                      <figure className="mx-4 md:mr-32">
                        <Image
                          key={character.id}
                          src={`${character.image}`}
                          width={100}
                          height={100}
                          alt="Picture of the character"
                          className=""
                        />
                      </figure>
                      <ul
                        key={character.id}
                        className="flex flex-col justify-start"
                      >
                        <li
                          k
                          className="px-4 py-2 text-xs font-bold lg:text-sm	"
                        >
                          {character.name}
                        </li>
                      </ul>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <h3 className="my-5 text-center text-xl">
                These two characters share the same location, which one is it?
              </h3>
              <div className="flex flex-col md:flex-row">
                <div className="my-5 mr-2 flex flex-col items-center justify-center border border-solid py-2 md:flex-row">
                  <figure className="mx-4 md:mr-32">
                    <Image
                      key={charactersToSecondQuestion[0].id}
                      src={`${charactersToSecondQuestion[0].image}`}
                      width={100}
                      height={100}
                      alt="Picture of the character"
                      className=""
                    />
                  </figure>
                  <ul
                    key={charactersToSecondQuestion[0].id}
                    className="flex flex-col justify-start"
                  >
                    <li k className="px-4 py-2 text-xs font-bold lg:text-sm	">
                      {charactersToSecondQuestion[0].name}
                    </li>
                  </ul>
                </div>
                <div className="my-5 flex flex-col items-center justify-center border border-solid py-2 md:flex-row">
                  <figure className="mx-4 md:mr-32">
                    <Image
                      key={charactersToSecondQuestion[1].id}
                      src={`${charactersToSecondQuestion[1].image}`}
                      width={100}
                      height={100}
                      alt="Picture of the character"
                      className=""
                    />
                  </figure>
                  <ul
                    key={charactersToSecondQuestion[1].id}
                    className="flex flex-col justify-start"
                  >
                    <li k className="px-4 py-2 text-xs font-bold lg:text-sm	">
                      {charactersToSecondQuestion[1].name}
                    </li>
                  </ul>
                </div>
              </div>
              <div className="flex flex-col lg:flex-row">
                {randomizedLocations.map((location, index) => (
                  <button
                    key={index}
                    className={`mx-2 mb-2 rounded-lg border px-4 py-2 text-white ${
                      selectedLocation && location.id === locations[0].id
                        ? "bg-green-500"
                        : selectedLocation.id === location.id
                          ? "bg-red-500"
                          : "bg-gray-500"
                    }`}
                    disabled={true}
                  >
                    {location.name}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <h3 className="my-5 text-center text-xl">
                In which of these episodes did this character appear?
              </h3>
              <div className="my-5 flex flex-col items-center justify-center border border-solid py-2 md:flex-row">
                <figure className="mx-4 md:mr-32">
                  <Image
                    key={characterToThirdQuestion.id}
                    src={`${characterToThirdQuestion.image}`}
                    width={100}
                    height={100}
                    alt="Picture of the character"
                    className=""
                  />
                </figure>
                <ul
                  key={characterToThirdQuestion.id}
                  className="flex flex-col justify-start"
                >
                  <li k className="px-4 py-2 text-xs font-bold lg:text-sm	">
                    {characterToThirdQuestion.name}
                  </li>
                  <li className="px-4 py-2 text-xs lg:text-sm ">
                    {characterToThirdQuestion.origin.name}
                  </li>
                </ul>
              </div>
              <div className="flex flex-col lg:flex-row">
                {randomizedEpisodes.map((episode, index) => (
                  <button
                    key={index}
                    className={`mx-2 mb-2 rounded-lg border px-4 py-2 text-white ${
                      selectedEpisode && episode.id === episodes[0].id
                        ? "bg-green-500"
                        : selectedEpisode.id === episode.id
                          ? "bg-red-500"
                          : "bg-gray-500"
                    }`}
                    disabled={true}
                  >
                    {episode.name}
                  </button>
                ))}
              </div>
            </div>
            <h1 className="my-5 text-center text-2xl font-bold text-[#1177BF]">
              You got {numCorrectAnswers}/3! {messageResult}{" "}
            </h1>
            <button
              onClick={resetFunction}
              className="my-6 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-400"
              disabled={!enableFinished}
            >
              Try again!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
