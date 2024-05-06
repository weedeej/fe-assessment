import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-zinc-400">
      <div className="flex flex-row items-center justify-between p-4">
        <span className="text-2xl font-bold">WEBSITE</span>
        <div className="flex flex-row items-center space-x-4">
          <Link href="/contacts" className="text-lg font-medium text-primary">
            Contacts
          </Link>
        </div>
      </div>
    </header>
  );
}