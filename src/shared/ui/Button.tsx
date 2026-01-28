import { cva } from "class-variance-authority";

interface ButtonProps {
  mode: 'accent' | 'light';
  onClick?: () => void;
  text?: string;
  children?: React.ReactNode
  type?: 'submit' | 'reset' | 'button';
  addStyle?: string
}

const button = cva('sharedButton text-md font-bold py-2 px-8 rounded-2xl hover:scale-105 hover:shadow-md hover:shadow-accent/30 transition duration-300 ease-in-out self-center', {
  variants: {
    mode: {
      accent: 'bg-accent text-white',
      light: 'bg-background text-accent'
    }
  }
})

export default function Button({mode, onClick, text, type = 'button', children, addStyle}: ButtonProps) {
  return (
    <button
      className={button({mode}) + ' ' + addStyle}
      onClick={onClick}
      type={type}
    >
      {text || children}
    </button>
  )
}
