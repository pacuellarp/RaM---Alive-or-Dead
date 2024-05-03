import Link from "next/link";

export default function Footer() {
  return (
    <footer className="m-4 rounded-lg bg-white shadow dark:bg-gray-900">
      <div className="mx-auto w-full max-w-screen-xl p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link
            href="/"
            className="mb-4 flex items-center space-x-3 sm:mb-0 rtl:space-x-reverse"
          >
            <span className="fuente-especial text-outline-2 self-center whitespace-nowrap text-2xl font-semibold text-principal-blue">
              Rick-a-nation
            </span>
          </Link>
          <ul className="mb-6 flex flex-wrap items-center text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <Link
                href="/#aboutus"
                className="me-4 transition-colors duration-300 hover:text-blue-700 md:me-6"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/aliveordead"
                className="me-4 transition-colors duration-300 hover:text-blue-700 md:me-6"
              >
                Alive or Dead?
              </Link>
            </li>
            <li>
              <Link
                href="/rick-a-challenge"
                className="me-4 transition-colors duration-300 hover:text-blue-700 md:me-6"
              >
                Rick-a-challenge!
              </Link>
            </li>
            <li>
              <Link
                href="/mortypedia"
                className="transition-colors duration-300 hover:text-blue-700"
              >
                Mortypedia
              </Link>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8 dark:border-gray-700" />
        <span className="flex items-center justify-center text-sm text-gray-500 sm:text-center">
          ❮❯ by{" "}
          <Link
            href="https://github.com/pacuellarp"
            target="_blank"
            className="mx-1 transition-colors duration-300 hover:text-blue-700"
          >
            pacuellarp
          </Link>{" "}
          {new Date().getFullYear()}
        </span>
      </div>
    </footer>
  );
}
