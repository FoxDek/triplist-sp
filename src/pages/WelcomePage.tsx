import { cva } from "class-variance-authority";
import { Link } from "react-router-dom";

const welcomeContainer = cva("flex items-center justify-center h-full w-full")
const welcomeButton = cva("bg-white border-accent border-2 text-black font-bold py-2 px-8 rounded-2xl hover:scale-105 transition duration-300 ease-in-out ")

export default function WelcomePage() {
  return (
    <div className={welcomeContainer()}>
      <Link to="/trips" className={welcomeButton()}>My Trips</Link>
    </div>
  )
}
