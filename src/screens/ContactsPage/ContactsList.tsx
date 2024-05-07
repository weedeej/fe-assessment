"use client";

import { ContactCard, ContactModal, Spinner } from "@/components";
import { db } from "@/firebase/config";
import { UserContact } from "@/types";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

export function ContactsList() {
  const [contacts, setContacts] = useState<UserContact[] | null>(null);
  const [selectedContact, setSelectedContact] = useState<UserContact>();

  useEffect(() => {
    return onSnapshot(collection(db, "contacts"), (snapshot) => {
      if (snapshot.empty) return setContacts([]);
      const contactsData = snapshot.docs.map((doc) => {
        return doc.data() as UserContact;
      });
      setContacts(contactsData);
    });
  }, []);

  function handleModalOpenChange(open: boolean) {
    setSelectedContact(!open ? undefined : selectedContact);
  }

  return (
    <div className="flex flex-col h-full gap-2">
      {
        (contacts && !contacts.length) && (
          <div className="flex flex-col h-full items-center justify-center">
            <h2 className="text-center text-3xl font-medium">No contacts found</h2>
            <p className="text-center text-gray-500">Add a contact to get started</p>
          </div>
        )
      }
      {
        !contacts ? (
          <div className="flex flex-col h-full justify-center items-center">
            <Spinner className="w-10 h-10" />
          </div>
        ) : contacts?.map((contact) => (
          <ContactCard key={contact._id} contact={contact} onContactClick={setSelectedContact} />
        ))
      }
      <ContactModal contact={selectedContact} isOpen={!!selectedContact} onOpenChange={handleModalOpenChange}/>
    </div>
  )
}