import { useIsMobile } from "@/hooks/use-mobile";
import { MobileLayout } from "./MobileLayout";
import { DesktopLayout } from "./DesktopLayout";
import { useEffect, useState } from "react";

type ResponsiveSwitcherProps = {
  children: React.ReactNode;
};

export function ResponsiveSwitcher({ children }: ResponsiveSwitcherProps) {
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // During SSR or before mounting, we can't be sure,
  // but we can default to one or show nothing to avoid hydration mismatch.
  // Given the requirements, we'll use the hook's value once mounted.
  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-orange-600 font-bold text-xl">
          Loading Explorer Hub...
        </div>
      </div>
    );
  }

  return (
    <>
      {isMobile ? (
        <MobileLayout>{children}</MobileLayout>
      ) : (
        <DesktopLayout>{children}</DesktopLayout>
      )}
    </>
  );
}
