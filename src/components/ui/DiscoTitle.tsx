import { ReactNode } from "react";

interface DiscoTitleProps {
  children: ReactNode;
  className?: string;
}

export function DiscoTitle({ children, className = "" }: DiscoTitleProps) {
  // Simplified title container: removed disco gradient border/glow
  return <div className={className}>{children}</div>;
}
