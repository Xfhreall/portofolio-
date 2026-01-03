import {FloatingNavbar} from "@/components/navbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen w-full">
      <FloatingNavbar />
      <main>{children}</main>
    </div>
  );
}
