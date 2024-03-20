export default function PortalVideo() {
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
        className="animate-fadeIn w-screen max-width:h-screen"
      >
        <source src="/portal.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div
        className="animate-fadeIn-second absolute text-center text-principal-blue"
        style={{ zIndex: 2 }}
      >
        <h1 className="fuente-especial text-8xl	 font-bold">
          <span className="text-outline">Rick-a-nation</span>
        </h1>
        <p className=" fuente-especial mt-6 text-4xl">
          <span className="text-outline">Hello</span>
        </p>
      </div>
    </div>
  );
}
