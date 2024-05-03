import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { getInfoEpisodes } from "@services/InfoEpisodesService";
import { getEpisode } from "@services/EpisodeService";

export default function InfoMainPage() {
  const [currentImage, setCurrentImage] = useState("/activity1.PNG");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [numEpisodes, setNumEpisodes] = useState(0);
  const [lastEpisode, setLastEpisode] = useState({});

  useEffect(() => {
    const fetchNumEpisodes = async () => {
      try {
        const numberEpisodes = await getInfoEpisodes();
        setNumEpisodes(numberEpisodes);
      } catch (error) {
        console.error("Error fetching number of episodes:", error);
      }
    };
    fetchNumEpisodes();
  }, []);

  useEffect(() => {
    const fetchLastEpisode = async () => {
      try {
        const lastEpi = await getEpisode(numEpisodes);
        setLastEpisode(lastEpi);
      } catch (error) {
        console.error("Error fetching number of episodes:", error);
      }
    };
    if (numEpisodes != 0) {
      fetchLastEpisode();
    }
  }, [numEpisodes]);

  const images = ["/activity1.PNG", "/activity2.PNG", "/activity3.PNG"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1,
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setCurrentImage(images[currentImageIndex]);
  }, [currentImageIndex]);

  return (
    <div className="flex w-full flex-col items-center justify-center py-28">
      <section className="flex flex-col items-center justify-center lg:flex-row lg:justify-between">
        <article className="flex flex-col items-center justify-center text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-principal-blue min-[466px]:text-4xl sm:text-5xl">
            Welcome to Rick-a-nation!
          </h2>
          <p className="text-md mx-auto mt-7 max-w-3xl text-[#6ed33f] min-[466px]:text-lg">
            A website made by and for Rick and Morty fans.
          </p>
        </article>
        <figure className="flex flex-col items-center justify-center">
          <Image
            key="bighead"
            src="/bighead.png"
            width={500}
            height={500}
            alt="Picture of the character"
            className="mx-32 my-10 w-2/3 rounded-lg lg:mx-20 xl:mx-32"
          />
        </figure>
      </section>
      <section className="my-20 flex flex-col items-center justify-center lg:flex-row lg:justify-between">
        <figure className="mx-5 flex flex-col items-center justify-center">
          <Image
            key={currentImageIndex}
            src={currentImage}
            width={500}
            height={500}
            alt={`Activity ${currentImageIndex + 1}`}
            className={`top-0 w-2/3 rounded border transition-opacity duration-1000 max-lg:hidden md:w-full lg:left-0 ${
              images.indexOf(currentImage) === currentImageIndex
                ? "opacity-100"
                : "opacity-0"
            }`}
          />
        </figure>
        <article className="flex flex-col items-center justify-center text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-principal-orange min-[466px]:text-4xl sm:text-5xl">
            Explorer the website
          </h2>
          <p className="text-md mx-10 my-10 mt-7 max-w-3xl text-principal-blue min-[466px]:text-lg">
            Here you will find interactive activities,
            <br /> curiosities and more
          </p>
        </article>
        <figure className="mx-5 flex flex-col items-center justify-center">
          <Image
            key={currentImageIndex}
            src={currentImage}
            width={500}
            height={500}
            alt={`Activity ${currentImageIndex + 1}`}
            className={`left-0 top-0 w-11/12 rounded border transition-opacity duration-1000 md:w-full lg:hidden ${
              images.indexOf(currentImage) === currentImageIndex
                ? "opacity-100"
                : "opacity-0"
            }`}
          />
        </figure>
      </section>
      <section
        className=" mt-20 flex flex-col items-center justify-center"
        id="about"
      >
        <article className="flex flex-col items-center justify-center text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-second-blue min-[466px]:text-4xl sm:text-5xl">
            About
          </h2>
          <p className="md:text-md mx-1 mt-7 max-w-3xl text-gray-500 min-[466px]:text-lg">
            This is a personal project made based on the magnificent work of
            <Link href="https://github.com/afuh">
              {" "}
              <span className="transition-colors duration-300 hover:text-blue-700">
                Axel Fuhrmann
              </span>
            </Link>{" "}
            with his{" "}
            <Link href="https://rickandmortyapi.com/">
              <span className="transition-colors duration-300 hover:text-blue-700">
                API
              </span>
            </Link>{" "}
            .
          </p>
          <p className="text-md mx-auto mt-7 max-w-3xl text-gray-500 min-[466px]:text-lg">
            Of course, updating Rick-a-nation will depend on this API <br />{" "}
            {`(last chapter added: ${lastEpisode.name} - ${lastEpisode.episode}).`}
          </p>
          <p className="text-md mx-auto mt-7 max-w-3xl text-gray-500 min-[466px]:text-lg">
            Enjoy your stay.
          </p>
        </article>
      </section>
    </div>
  );
}
