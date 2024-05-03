import { useState, useEffect } from "react";
import Link from "next/link";

export default function Header() {
  const [isScrolling, setIsScrolling] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 0) {
        setIsScrolling(true);
      } else {
        setIsScrolling(false);
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`flex flex-row items-center justify-between ${isScrolling ? "transition-bg bg-[#3A4143] duration-300" : "bg-transparent"} fixed top-0 z-10 w-full p-4 text-white`}
    >
      <div className="container mx-auto">
        <Link
          href="/"
          className="mb-4 flex items-center space-x-3 sm:mb-0 rtl:space-x-reverse"
        >
          <span className="fuente-especial text-outline-3 text-md self-center whitespace-nowrap font-semibold text-[#F26671] min-[330px]:text-lg min-[500px]:text-xl sm:text-2xl md:text-3xl">
            Rick-a-nation
          </span>
        </Link>
      </div>
      <nav className="hidden w-2/3 flex-col md:flex">
        <ul className="flex flex-row items-center justify-center text-sm text-white sm:mb-0 xl:text-base  dark:text-gray-400">
          <li>
            <Link
              href="/#about"
              className="transition-colors duration-300 hover:text-[#F2CA7E] md:me-6"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/aliveordead"
              className="transition-colors duration-300 hover:text-[#F2CA7E] md:me-6"
            >
              Alive or Dead?
            </Link>
          </li>
          <li>
            <Link
              href="/rick-a-challenge"
              className="transition-colors duration-300 hover:text-[#F2CA7E] md:me-6"
            >
              Rick-a-challenge!
            </Link>
          </li>
          <li>
            <Link
              href="/mortypedia"
              className="transition-colors duration-300 hover:text-[#F2CA7E] md:me-6"
            >
              Mortypedia
            </Link>
          </li>
        </ul>
      </nav>
      <div className=" mr-5 flex flex-col sm:mr-2 md:hidden">
        <div className="md:hidden">
          {/* Botón de hamburguesa */}
          <button
            className="focus:text-gray-5 block text-white focus:outline-none"
            onClick={() => setOpen(!open)}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>

          {/* Menú desplegable */}
          <div className="md:hidden">
            {" "}
            {/* Solo visible en dispositivos con ancho menor al breakpoint md */}
            {open && (
              <div className="absolute right-0 mt-2 w-48 rounded-lg bg-white shadow-lg">
                <Link
                  href="/#about"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  About
                </Link>
                <Link
                  href="/aliveordead"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Alive or Dead?
                </Link>
                <Link
                  href="/rick-a-challenge"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Rick-a-challenge!
                </Link>
                <Link
                  href="/mortypedia"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Mortypedia
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
