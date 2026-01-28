import { cva } from "class-variance-authority";
import { useNavigate } from "react-router-dom";
import Button from '../shared/ui/Button';

const welcomeContainer = cva("flex items-center justify-center h-full min-h-screen w-full")


export default function WelcomePage() {
  const navigate = useNavigate();


  return (
    <div className={welcomeContainer()}>
      <Button mode="accent" text="My trips" onClick={() => navigate('/trips')} />
    </div>
  )
}
