import { Route, Routes, useLocation } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import Trips from "./pages/Trips";
import { useState } from "react";
import { ArrowBigLeft, Moon, Sun } from "lucide-react";
import TripPage from "./pages/TripPage";

function App() {
  const [theme, setTheme] = useState("light");
  const location = useLocation();

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <main className='bg-background h-full min-h-screen dark:bg-background-dark transition ease-in-out duration-500'>
      <div className='md:container mx-auto p-2 relative flex h-full gap-5'>
        <button
          onClick={toggleTheme}
          className="rounded-full p-2 shadow-md shadow-accent cursor-pointer' text-text-color/60 dark:text-text-color-dark/80 hover:text-accent transition-all ease-in-out absolute right-6 top-6"
        >
          {theme === "light" ? <Moon /> : <Sun />}
        </button>

        {location.pathname !== '/' && <button
          onClick={() => window.history.back()}
          className="rounded-full p-2 shadow-md shadow-accent cursor-pointer' text-text-color/60 dark:text-text-color-dark/80 hover:text-accent transition-all ease-in-out absolute left-6 top-6"
        >
          <ArrowBigLeft />
        </button>}

        <Routes>
          <Route path='/' element={<WelcomePage />} />
          <Route path='/trips' element={<Trips />} />
          <Route path='/trip/:id' element={<TripPage />} />
          <Route path='/new-trip/:countryName' element={<TripPage />} />
        </Routes>
      </div>
    </main>
  );
}

export default App;
