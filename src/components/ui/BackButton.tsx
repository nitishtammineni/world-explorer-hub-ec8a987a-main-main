import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  to?: string;
  customText?: string;
}

export function BackButton({
  to,
  customText = "Go Back",
  className = "",
}: BackButtonProps & { className?: string }) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (to) {
      navigate({ to });
    } else {
      window.history.back();
    }
  };

  return (
    <div className={`back-button-container ${className}`}>
      <button onClick={handleBack} className="back-button">
        <ArrowLeft className="w-5 h-5 mr-1" />
        <span>{customText}</span>
      </button>
    </div>
  );
}
