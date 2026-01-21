import { cva } from "class-variance-authority";
import { useRef } from "react";
import { useClickOutside } from "../../hooks/useClickOutside";

interface DropdownInputProps {
  value: string;
  name: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelect: (name: string, value: string) => void;
  setUsedDropdown: (value: string) => void;
  usedDropdown: string;
  options: string[];
  isLoading?: boolean;
} 

const tripFormInput = cva("dropdownInput w-full border-2 border-white/80 rounded-2xl py-2 px-4 outline-none bg-white dark:bg-background-dark dark:text-text-color-dark dark:border-transparent transition ease-in-out")
const dropdownItem = cva("dropdownItem px-4 py-2 cursor-pointer hover:bg-accent/50 hover:text-white transition duration-100 ease-in-out")




export default function DropdownInput({ value, name, placeholder, onChange, onSelect, setUsedDropdown, usedDropdown, options, isLoading }: DropdownInputProps) {
  const dropdownIsOpen = usedDropdown === name;

  const dropdownRef = useRef<HTMLDivElement>(null)

  useClickOutside(dropdownRef, () => setUsedDropdown(''))

  const handleSelect = (selectedValue: string) => {
    onSelect(name, selectedValue);
    setUsedDropdown('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSelect(value);
      e.currentTarget.blur();
    }
  }

  return (
    <div className={`dropdown relative ${name === usedDropdown ? "z-30" : ""}`} ref={dropdownRef}>
      <input
        type='text'
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={tripFormInput({
          className: `${dropdownIsOpen ? "rounded-b-none" : ""} ${isLoading ? 'opacity-50' : 'opacity-100'}`,
          
        })}
        onFocus={() => setUsedDropdown(name)}
        onKeyDown={(e) => handleKeyDown(e)}
        disabled={isLoading}
      />

      {dropdownIsOpen && (
        <div className='dropdownContainer absolute top-full left-0 right-0 shadow-md pb-2 bg-background rounded-b-2xl max-h-50 overflow-y-auto'>
          <ul>
            {options.map((item) => (
              <li
                key={item}
                className={dropdownItem()}
                onClick={() => handleSelect(item)}
                onPointerDown={e => e.stopPropagation()}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
