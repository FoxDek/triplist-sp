import { cva } from 'class-variance-authority';
import { useEffect, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  mode: 'accent' | 'light';
};

const modal = cva('modal fixed inset-0 z-50 flex items-center justify-center');
const modalOverlay = cva('modalOverlay absolute inset-0 bg-black/50')
const modalSubstrate = cva("modalSubstrate relative z-10 rounded-2xl p-6", 
  {
    variants: {
      mode: {
        accent: 'bg-accent',
        light: 'bg-white'
      }
    }
  }
)

export function Modal({ isOpen, onClose, children, mode }: ModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = 'hidden';
    
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', onEsc);
    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', onEsc)
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className={modal()}>

      <div
        className={modalOverlay()}
        onClick={onClose}
      />

      <div className={modalSubstrate({ mode })}>
        {children}
      </div>
    </div>,
    document.body
  );
}
