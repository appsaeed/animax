import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { getThemeStore, setThemeStore } from "utilies";
import settings from "../app/settings";
import { cn } from "../app/utilies";
import Moon from "../components/Moon";
import Sun from "../components/Sun";
import BrandLogo from "./BrandLogo";
import SwitchSidebar from "./SwitchSidebar";

export default function Header() {
  return (
    <>
      <header
        id="header"
        className={cn(
          `transition-all z-[999] top-0 left-0 right-0 w-full bg-slate-200 dark:bg-slate-800 shadow-2xl  fixed py-2`
        )}
      >
        <nav className={"w-full px-8"}>
          <div className="w-full flex flex-wrap items-center justify-between mx-auto">
            <BrandLogo logo={settings.logo} href="/" />

            <SwtichTheme />

            <div className="flex items-center md:order-2">
              <a
                href="http://github.com/appsaeed/animax"
                target="_blank"
                rel="noopener noreferrer"
                className="link p-2 text-gray-900  hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent cursor-pointer text-3xl  rounded-full"
              >
                <FaGithub />
              </a>
            </div>

            <SwitchSidebar />
          </div>
        </nav>
      </header>
    </>
  );
}

export function SwtichTheme() {
  const [dark, setDark] = useState(
    getThemeStore(settings.theme_store) === "dark"
  );

  const handleTheme = () => {
    const theme = dark ? "light" : "dark";
    setDark(!dark);
    setThemeStore(theme, settings.theme_store);
    if (theme === "dark") {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <div
      onClick={handleTheme}
      className={`p-2 text-gray-900  hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent cursor-pointer text-2xl rounded-full`}
    >
      {dark ? <Moon /> : <Sun />}
    </div>
  );
}
