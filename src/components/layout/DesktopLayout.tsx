import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

type DesktopLayoutProps = {
  children: React.ReactNode;
};

export function DesktopLayout({ children }: DesktopLayoutProps) {
  return (
    <div className="hidden md:flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pt-16">{children}</main>
      <Footer />
    </div>
  );
}
