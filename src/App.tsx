import { Route, Routes } from "react-router-dom"
import WelcomePage from "./pages/WelcomePage"
import Trips from "./pages/Trips"
import { useState } from "react";
import { Moon, Sun } from "lucide-react";

function App() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  }

  return (
    <main className="bg-background h-screen dark:bg-background-dark">
      <div className="md:container mx-auto p-2 relative flex h-full gap-5">
        <button onClick={toggleTheme} className="rounded-full p-2 shadow-md shadow-accent cursor-pointer' text-text-color dark:text-text-color-dark hover:text-accent transition-all ease-in-out absolute right-6 top-6">
          {theme === 'light' ? <Moon/> : <Sun/> }
        </button>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/trips" element={<Trips />} />
        </Routes>
      </div>
    </main>
  )
}

export default App
