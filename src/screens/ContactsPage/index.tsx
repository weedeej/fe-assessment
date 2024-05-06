import { ContactCard } from "@/components/ContactCard";
import { Button } from "@/components/ui/button";
import { AddContact } from "./AddContact";
import { ContactsList } from "./ContactsList";

export function ContactsPage() {
  return (
    <div className="p-10 flex flex-col gap-10 h-full">
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-3xl font-bold">Contacts</h1>
        <AddContact />
      </div>
      <ContactsList />
    </div>
  );
}