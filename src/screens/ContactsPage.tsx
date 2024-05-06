import { ContactCard } from "@/components/ContactCard";
import { Button } from "@/components/ui/button";

export function ContactsPage() {
  return (
    <div className="p-10 flex flex-col gap-10">
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-3xl font-bold">Contacts</h1>
        <Button>+ Add Contact</Button>
      </div>
      <div className="flex flex-col gap-2">
        <ContactCard name="John Doe" imagePath="/images/john-doe.jpg" lastContactDate={new Date()} />
      </div>
    </div>
  );
}