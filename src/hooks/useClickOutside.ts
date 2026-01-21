import { useEffect } from 'react'

export function useClickOutside<T extends HTMLElement | null>(
  ref: React.RefObject<T> | null,
  handler: () => void
) {
  useEffect(() => {
    function onPointerDown(e: PointerEvent) {
      if (!ref || !ref.current) return
      if (ref.current.contains(e.target as Node)) return

      if ((e.target as HTMLElement).closest('.dropdownInput') || (e.target as HTMLElement).closest('.dropdownContainer'))  return

      handler()
    }

    document.addEventListener('pointerdown', onPointerDown)

    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [ref, handler])
}
