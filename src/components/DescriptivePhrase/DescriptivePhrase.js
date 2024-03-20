export default function DescriptivePhrase({
  mainPhrase,
  secondPhrase,
  thirdPhrase,
  colorMainPhrase,
}) {
  return (
    <div
      className={`my-24 flex flex-col items-center justify-center text-center ${colorMainPhrase}`}
    >
      <h2 className="sm:text-5xl text-4xl font-extrabold tracking-tight ">
        {`${mainPhrase}`}
      </h2>
      <p className="mx-auto mt-7 max-w-3xl text-lg text-slate-500">
        {`${secondPhrase}`}
      </p>
      <p className="mx-auto mt-7 max-w-3xl text-lg text-slate-500">
        {`${thirdPhrase}`}
      </p>
    </div>
  );
}
