import { Navbar } from "~/components/platform/nav-bar";

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full">
      <Navbar />
      {children}
    </div>
  );
}
