import Link from "next/link";

export function HomePage() {
  // landing page
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-4xl font-bold">Welcome to Website</h1>
      <Link href="/contacts" className="text-lg font-medium text-primary">
        Contacts
      </Link>
    </div>
  );
}