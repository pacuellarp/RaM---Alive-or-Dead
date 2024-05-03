import { useState, useEffect } from "react";

export default function PortalVideo() {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    const quotes = [
      ["When I don’t like something about the world", "I change it"],
      ["Wubba lubba dub dub!", ""],
      [
        "Except the pass-the-butter robot:",
        "it has a purpose, passing the butter",
      ],
      ["Sometimes science is more art than science", ""],
      ["He told me you're the clone", ""],
      ["I'm easy to make happy.", "Which is why no one gives a shit if I am"],
      [
        "None of them have to be responsible.",
        "They're all victims of themselves",
      ],
      ["Nobody belongs anywhere.", "Everybody's gonna die. Come watch TV"],
      ["Ability to do anything. But only when I want", ""],
      ["Woah it’s still the commercial", ""],
      ["Literally everything is in space, Morty!", ""],
    ];
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomElement = quotes[randomIndex];
    setQuote(randomElement);
  }, []);

  return (
    <div
      className="
    flex items-center justify-center"
    >
      <video
        width="1280"
        muted
        playsInline
        preload="none"
        loop
        autoPlay
        className="animate-fadeIn max-width:h-screen w-screen"
      >
        <source src="/portal.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div
        className="animate-fadeIn-second absolute text-center text-principal-blue"
        style={{ zIndex: 2 }}
      >
        <h1 className="fuente-especial text-2xl font-bold min-[380px]:text-4xl min-[500px]:text-5xl md:text-6xl min-[900px]:text-8xl">
          <span className="text-outline">Rick-a-nation</span>
        </h1>
        <p className=" fuente-especial mt-6 text-xl md:text-4xl lg:text-5xl">
          <span className="text-outline">
            {quote[0]}
            <br />
            {quote[1]}
          </span>
        </p>
      </div>
    </div>
  );
}
