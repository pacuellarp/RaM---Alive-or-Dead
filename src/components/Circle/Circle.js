export default function Circle({ message, colorText, textOutline, shape }) {
  return (
    <div className="flex h-screen items-center justify-center bg-[url('/escritorio.png')] bg-cover bg-fixed bg-center bg-no-repeat">
      <div className="container flex h-screen items-center justify-center">
        <div
          className={` ${shape} h-[70svh] w-[90svw] min-[500px]:w-[70svw] sm:w-[60svw] md:h-[80svh] md:w-[50svw] lg:w-[40svw] `}
        ></div>
      </div>
      <div
        className={`animate-fadeIn-second absolute text-center ${colorText}`}
        style={{ zIndex: 2 }}
      >
        <h1 className="fuente-especial text-5xl font-bold sm:text-6xl lg:text-7xl">
          <span className={`${textOutline}`}>Rick-a-nation</span>
        </h1>
        <p className=" fuente-especial mt-6 text-3xl sm:text-4xl lg:text-5xl">
          <span className={`${textOutline}`}>{message}</span>
        </p>
      </div>
    </div>
  );
}
