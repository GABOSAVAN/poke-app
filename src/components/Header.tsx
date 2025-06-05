import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const isDetailsPage = location.pathname.startsWith('/details/');

  return (
    <>
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f4f4e6] px-10 py-3">
        <div className="flex items-center gap-4 text-[#1c1c0d]">
          <div className="size-4">
            <svg
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
          <h2 className="text-[#1c1c0d] text-lg font-bold leading-tight tracking-[-0.015em]">
            PokeApp
          </h2>
        </div>
        <div className="flex flex-1 justify-end gap-8">
          <div className="flex items-center gap-9">
            {isDetailsPage && (
              <Link
                className="text-[#1c1c0d] text-sm font-medium leading-normal"
                to="/"
              >
                Home
              </Link>
            )}
          </div>
        </div>
      </header>
    </>
  );
}