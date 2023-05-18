import { createPortal } from "react-dom";
import { useRef, useEffect, useState, ReactNode } from "react";

interface PortalProps {
  children: ReactNode;
}

export const Portal: React.FC<PortalProps> = (props) => {
  const ref = useRef<Element | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.querySelector<HTMLElement>("#portal");
    setMounted(true);
  }, []);

  return mounted && ref.current
    ? createPortal(props.children, ref.current)
    : null;
};
