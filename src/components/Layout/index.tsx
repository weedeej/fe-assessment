import { Header } from "./Header";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="container">
        {children}
      </main>
    </div>
  );
}